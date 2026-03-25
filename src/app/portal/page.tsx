'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { ensureDashboardAccessRequest, getPrimaryAdminEmail, normalizeEmail } from '@/lib/admin-access';

type Status = 'loading' | 'pending' | 'active' | 'unauthenticated';

export default function PortalPage() {
  const router = useRouter();
  const [status, setStatus] = useState<Status>('loading');
  const [userEmail, setUserEmail] = useState('');
  const [signingOut, setSigningOut] = useState(false);
  const adminEmail = getPrimaryAdminEmail();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user?.email) {
        setStatus('unauthenticated');
        router.replace('/login');
        return;
      }

      const email = normalizeEmail(user.email);
      setUserEmail(email);

      const access = await ensureDashboardAccessRequest(email);
      if (access?.status === 'active') {
        router.replace('/en/dashboard');
        return;
      }

      setStatus('pending');
    });

    return () => unsubscribe();
  }, [router]);

  const handleSignOut = async () => {
    setSigningOut(true);
    await signOut(auth);
    router.push('/login');
  };

  if (status === 'loading') {
    return (
      <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="h-10 w-10 rounded-full border-4 border-amber-300 border-t-transparent animate-spin" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-4 flex items-center justify-center">
      <div className="mx-auto w-full max-w-md">
        {/* Status card */}
        <div className="rounded-2xl border border-amber-200/20 bg-white/[0.03] p-8 shadow-2xl backdrop-blur-sm text-center">
          {/* Icon */}
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-amber-300/30 bg-amber-300/10">
            <svg className="h-8 w-8 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>

          <h1 className="mb-2 text-2xl font-bold text-white">Access Pending</h1>
          <p className="mb-1 text-sm text-slate-400">Signed in as</p>
          <p className="mb-6 text-sm font-medium text-amber-300 break-all">{userEmail}</p>

          <div className="mb-6 rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-left space-y-3">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-yellow-500/20 text-yellow-400 text-xs font-bold">!</span>
              <p className="text-sm text-slate-300">
                Your account has been created and is <span className="text-amber-300 font-medium">awaiting admin approval</span>.
                You will be notified once access is granted.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold">i</span>
              <p className="text-sm text-slate-300">
                To request access, contact the admin at{' '}
                <a href={`mailto:${adminEmail}`} className="text-amber-300 hover:underline">{adminEmail}</a>.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => void handleSignOut()}
              disabled={signingOut}
              className="w-full rounded-xl border border-white/15 bg-white/5 py-3 font-semibold text-white transition-colors hover:bg-white/10 disabled:opacity-60"
            >
              {signingOut ? 'Signing out…' : 'Sign Out'}
            </button>
            <a
              href="/"
              className="block w-full rounded-xl border border-white/10 py-3 text-sm text-slate-400 transition-colors hover:text-white text-center"
            >
              Back to Home
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
