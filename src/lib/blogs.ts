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

export interface BlogsPageBannerConfig {
  bannerUrl: string;
  card: BlogsBannerCard;
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

export const loadBlogsFromServer = async (): Promise<BlogPost[]> => {
  try {
    const response = await fetch('/api/blogs', { cache: 'no-store' });
    const result = await response.json() as { success?: boolean; blogs?: BlogPost[] };

    if (!response.ok || !result.success || !Array.isArray(result.blogs)) {
      throw new Error('Failed to load blogs');
    }

    const blogs = result.blogs.sort((a, b) => b.createdAt - a.createdAt);

    writeBlogsToStorage(blogs);
    return blogs;
  } catch {
    return readBlogsFromStorage();
  }
};

export const loadBlogBySlugFromServer = async (slug: string): Promise<BlogPost | null> => {
  try {
    const response = await fetch(`/api/blogs/slug/${encodeURIComponent(slug)}`, { cache: 'no-store' });
    const result = await response.json() as { success?: boolean; blog?: BlogPost };

    if (!response.ok || !result.success || !result.blog) {
      throw new Error('Failed to load blog');
    }

    return result.blog;
  } catch {
    const localBlogs = readBlogsFromStorage();
    return localBlogs.find((item) => item.slug === slug) || null;
  }
};

export const saveBlogToServer = async (blog: BlogPost, updatedBy?: string): Promise<BlogPost> => {
  const response = await fetch('/api/blogs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ blog, updatedBy }),
  });

  const result = await response.json() as { success?: boolean; blog?: BlogPost; message?: string };

  if (!response.ok || !result.success || !result.blog) {
    throw new Error(result.message || 'Failed to save blog');
  }

  const savedBlog = result.blog;

  const localBlogs = readBlogsFromStorage();
  const existingIndex = localBlogs.findIndex((item) => item.id === savedBlog.id);
  const nextBlogs = [...localBlogs];

  if (existingIndex >= 0) {
    nextBlogs[existingIndex] = savedBlog;
  } else {
    nextBlogs.unshift(savedBlog);
  }

  writeBlogsToStorage(nextBlogs.sort((a, b) => b.createdAt - a.createdAt));

  return savedBlog;
};

export const deleteBlogFromServer = async (blogId: string) => {
  const response = await fetch(`/api/blogs/${encodeURIComponent(blogId)}`, {
    method: 'DELETE',
  });

  const result = await response.json() as { success?: boolean; message?: string };

  if (!response.ok || !result.success) {
    throw new Error(result.message || 'Failed to delete blog');
  }

  const nextBlogs = readBlogsFromStorage().filter((blog) => blog.id !== blogId);
  writeBlogsToStorage(nextBlogs);
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

export const loadBlogsPageBannerConfigFromServer = async (): Promise<BlogsPageBannerConfig> => {
  const localCard = readBlogsPageBannerCardFromStorage();
  const localBanner = readBlogsPageBannerFromStorage();

  try {
    const response = await fetch('/api/blogs/banner-config', { cache: 'no-store' });
    const result = await response.json() as { success?: boolean; config?: BlogsPageBannerConfig };

    if (!response.ok || !result.success || !result.config) {
      throw new Error('Failed to load banner config');
    }

    const cloudBanner = result.config.bannerUrl || '';
    const cloudCard = result.config.card;

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

export const saveBlogsPageBannerConfigToServer = async (payload: {
  bannerUrl?: string;
  card?: BlogsBannerCard;
  updatedBy?: string;
}) => {
  const localCard = payload.card || readBlogsPageBannerCardFromStorage();
  const localBanner = payload.bannerUrl ?? readBlogsPageBannerFromStorage();

  writeBlogsPageBannerToStorage(localBanner);
  writeBlogsPageBannerCardToStorage(localCard);

  const response = await fetch('/api/blogs/banner-config', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      bannerUrl: localBanner,
      card: localCard,
      updatedBy: payload.updatedBy,
    }),
  });

  const result = await response.json() as { success?: boolean; config?: BlogsPageBannerConfig; message?: string };

  if (!response.ok || !result.success || !result.config) {
    throw new Error(result.message || 'Failed to save banner config');
  }

  writeBlogsPageBannerToStorage(result.config.bannerUrl);
  writeBlogsPageBannerCardToStorage(result.config.card);

  return result.config;
};
