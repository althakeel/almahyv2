import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  titleAr?: string;
  shortDescription: string;
  shortDescriptionAr?: string;
  content: string;
  contentAr?: string;
  date: string;
  image: string;
  imageAr?: string;
  bannerImage?: string;
  bannerImageAr?: string;
  createdAt: number;
}

export const BLOGS_STORAGE_KEY = 'almahy_blogs_posts';
export const BLOGS_PAGE_BANNER_STORAGE_KEY = 'almahy_blogs_page_banner';
export const BLOGS_PAGE_BANNER_CARD_STORAGE_KEY = 'almahy_blogs_page_banner_card';

export interface BlogsBannerCard {
  titleEn: string;
  titleAr: string;
  subEn: string;
  subAr: string;
}

interface BlogsPageBannerConfig {
  bannerUrl: string;
  card: BlogsBannerCard;
}

const BLOGS_CONFIG_COLLECTION = 'siteContent';
const BLOGS_BANNER_CONFIG_DOC = 'blogsPageBanner';

export const slugify = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

export const readBlogsFromStorage = (): BlogPost[] => {
  if (typeof window === 'undefined') {
    return [];
  }

  const raw = localStorage.getItem(BLOGS_STORAGE_KEY);
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as BlogPost[];
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.sort((a, b) => b.createdAt - a.createdAt);
  } catch {
    return [];
  }
};

export const writeBlogsToStorage = (blogs: BlogPost[]) => {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.setItem(BLOGS_STORAGE_KEY, JSON.stringify(blogs));
};

export const readBlogsPageBannerFromStorage = (): string => {
  if (typeof window === 'undefined') {
    return '';
  }

  return localStorage.getItem(BLOGS_PAGE_BANNER_STORAGE_KEY) || '';
};

export const writeBlogsPageBannerToStorage = (bannerUrl: string) => {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.setItem(BLOGS_PAGE_BANNER_STORAGE_KEY, bannerUrl);
};

export const readBlogsPageBannerCardFromStorage = (): BlogsBannerCard => {
  if (typeof window === 'undefined') {
    return { titleEn: '', titleAr: '', subEn: '', subAr: '' };
  }

  const raw = localStorage.getItem(BLOGS_PAGE_BANNER_CARD_STORAGE_KEY);
  if (!raw) return { titleEn: '', titleAr: '', subEn: '', subAr: '' };

  try {
    return JSON.parse(raw) as BlogsBannerCard;
  } catch {
    return { titleEn: '', titleAr: '', subEn: '', subAr: '' };
  }
};

export const writeBlogsPageBannerCardToStorage = (card: BlogsBannerCard) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(BLOGS_PAGE_BANNER_CARD_STORAGE_KEY, JSON.stringify(card));
};

export const loadBlogsPageBannerConfigFromCloud = async (): Promise<BlogsPageBannerConfig> => {
  const localCard = readBlogsPageBannerCardFromStorage();
  const localBanner = readBlogsPageBannerFromStorage();

  try {
    const configRef = doc(db, BLOGS_CONFIG_COLLECTION, BLOGS_BANNER_CONFIG_DOC);
    const snapshot = await getDoc(configRef);

    if (!snapshot.exists()) {
      return {
        bannerUrl: localBanner,
        card: localCard,
      };
    }

    const data = snapshot.data() as {
      bannerUrl?: string;
      card?: Partial<BlogsBannerCard>;
    };

    const cloudBanner = data.bannerUrl || '';
    const cloudCard = {
      titleEn: data.card?.titleEn || '',
      titleAr: data.card?.titleAr || '',
      subEn: data.card?.subEn || '',
      subAr: data.card?.subAr || '',
    };

    writeBlogsPageBannerToStorage(cloudBanner);
    writeBlogsPageBannerCardToStorage(cloudCard);

    return {
      bannerUrl: cloudBanner,
      card: cloudCard,
    };
  } catch {
    return {
      bannerUrl: localBanner,
      card: localCard,
    };
  }
};

export const saveBlogsPageBannerConfigToCloud = async (payload: {
  bannerUrl?: string;
  card?: BlogsBannerCard;
  updatedBy?: string;
}) => {
  const localCard = payload.card || readBlogsPageBannerCardFromStorage();
  const localBanner = payload.bannerUrl ?? readBlogsPageBannerFromStorage();

  writeBlogsPageBannerToStorage(localBanner);
  writeBlogsPageBannerCardToStorage(localCard);

  const configRef = doc(db, BLOGS_CONFIG_COLLECTION, BLOGS_BANNER_CONFIG_DOC);
  await setDoc(
    configRef,
    {
      bannerUrl: localBanner,
      card: localCard,
      updatedBy: payload.updatedBy || null,
      updatedAt: Date.now(),
    },
    { merge: true }
  );
};
