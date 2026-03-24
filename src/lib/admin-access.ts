import { collection, deleteDoc, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export type DashboardAccessRole = 'admin' | 'editor';
export type DashboardAccessStatus = 'pending' | 'active';

export interface DashboardAccessRecord {
  email: string;
  role: DashboardAccessRole;
  status: DashboardAccessStatus;
  approvedBy?: string;
  createdAt: number;
  updatedAt: number;
}

const DASHBOARD_ACCESS_COLLECTION = 'dashboardAccessUsers';

export const normalizeEmail = (email: string) => email.trim().toLowerCase();

const getAccessDocId = (email: string) => encodeURIComponent(normalizeEmail(email));

export const getPrimaryAdminEmail = () => normalizeEmail(process.env.NEXT_PUBLIC_PRIMARY_ADMIN_EMAIL || 'althakeel.com@gmail.com');

export const isPrimaryAdminEmail = (email: string) => {
  const primaryAdminEmail = getPrimaryAdminEmail();
  return Boolean(primaryAdminEmail) && normalizeEmail(email) === primaryAdminEmail;
};

export const ensurePrimaryAdminAccess = async (email: string) => {
  const normalizedEmail = normalizeEmail(email);
  if (!isPrimaryAdminEmail(normalizedEmail)) {
    return null;
  }

  const now = Date.now();
  const accessRef = doc(db, DASHBOARD_ACCESS_COLLECTION, getAccessDocId(normalizedEmail));
  const existing = await getDoc(accessRef);

  const payload: DashboardAccessRecord = {
    email: normalizedEmail,
    role: 'admin',
    status: 'active',
    createdAt: existing.exists() ? (existing.data().createdAt as number) || now : now,
    updatedAt: now,
  };

  await setDoc(accessRef, payload, { merge: true });
  return payload;
};

export const getDashboardAccess = async (email: string): Promise<DashboardAccessRecord | null> => {
  const normalizedEmail = normalizeEmail(email);
  if (!normalizedEmail) {
    return null;
  }

  await ensurePrimaryAdminAccess(normalizedEmail);
  const accessRef = doc(db, DASHBOARD_ACCESS_COLLECTION, getAccessDocId(normalizedEmail));
  const snapshot = await getDoc(accessRef);

  if (!snapshot.exists()) {
    return null;
  }

  return snapshot.data() as DashboardAccessRecord;
};

export const ensureDashboardAccessRequest = async (email: string) => {
  const normalizedEmail = normalizeEmail(email);
  if (!normalizedEmail) {
    return null;
  }

  if (isPrimaryAdminEmail(normalizedEmail)) {
    return ensurePrimaryAdminAccess(normalizedEmail);
  }

  const existing = await getDashboardAccess(normalizedEmail);
  if (existing) {
    return existing;
  }

  const now = Date.now();
  const payload: DashboardAccessRecord = {
    email: normalizedEmail,
    role: 'editor',
    status: 'pending',
    createdAt: now,
    updatedAt: now,
  };

  await setDoc(doc(db, DASHBOARD_ACCESS_COLLECTION, getAccessDocId(normalizedEmail)), payload, { merge: true });
  return payload;
};

export const approveDashboardAccess = async (email: string, approvedBy: string) => {
  const normalizedEmail = normalizeEmail(email);
  if (!normalizedEmail) {
    throw new Error('Email is required');
  }

  if (isPrimaryAdminEmail(normalizedEmail)) {
    return ensurePrimaryAdminAccess(normalizedEmail);
  }

  const now = Date.now();
  const accessRef = doc(db, DASHBOARD_ACCESS_COLLECTION, getAccessDocId(normalizedEmail));
  const existing = await getDoc(accessRef);
  const existingData = existing.exists() ? (existing.data() as DashboardAccessRecord) : null;

  const payload: DashboardAccessRecord = {
    email: normalizedEmail,
    role: existingData?.role === 'admin' ? 'admin' : 'editor',
    status: 'active',
    approvedBy: normalizeEmail(approvedBy),
    createdAt: existingData?.createdAt || now,
    updatedAt: now,
  };

  await setDoc(accessRef, payload, { merge: true });
  return payload;
};

export const listDashboardUsers = async () => {
  const snapshot = await getDocs(collection(db, DASHBOARD_ACCESS_COLLECTION));
  return snapshot.docs
    .map((item) => item.data() as DashboardAccessRecord)
    .sort((left, right) => {
      if (left.role !== right.role) {
        return left.role === 'admin' ? -1 : 1;
      }
      return left.email.localeCompare(right.email);
    });
};

export const revokeDashboardAccess = async (email: string) => {
  const normalizedEmail = normalizeEmail(email);
  if (isPrimaryAdminEmail(normalizedEmail)) {
    throw new Error('Primary admin access cannot be removed');
  }

  await deleteDoc(doc(db, DASHBOARD_ACCESS_COLLECTION, getAccessDocId(normalizedEmail)));
};
