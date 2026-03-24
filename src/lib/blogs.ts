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
