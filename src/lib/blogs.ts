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

export const loadBlogsFromServer = async (): Promise<BlogPost[]> => {
  try {
    const response = await fetch('/api/blogs', { cache: 'no-store' });
    const result = await response.json() as { success?: boolean; blogs?: BlogPost[] };

    if (!response.ok || !result.success || !Array.isArray(result.blogs)) {
      throw new Error('Failed to load blogs');
    }

    return result.blogs.sort((a, b) => b.createdAt - a.createdAt);
  } catch {
    return [];
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
    return null;
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

  return result.blog;
};

export const deleteBlogFromServer = async (blogId: string) => {
  const response = await fetch(`/api/blogs/${encodeURIComponent(blogId)}`, {
    method: 'DELETE',
  });

  const result = await response.json() as { success?: boolean; message?: string };

  if (!response.ok || !result.success) {
    throw new Error(result.message || 'Failed to delete blog');
  }
};

export const loadBlogsPageBannerConfigFromServer = async (): Promise<BlogsPageBannerConfig> => {
  try {
    const response = await fetch('/api/blogs/banner-config', { cache: 'no-store' });
    const result = await response.json() as { success?: boolean; config?: BlogsPageBannerConfig };

    if (!response.ok || !result.success || !result.config) {
      throw new Error('Failed to load banner config');
    }

    return {
      bannerUrl: result.config.bannerUrl || '',
      card: result.config.card,
    };
  } catch {
    return {
      bannerUrl: '',
      card: { titleEn: '', titleAr: '', subEn: '', subAr: '' },
    };
  }
};

export const saveBlogsPageBannerConfigToServer = async (payload: {
  bannerUrl?: string;
  card?: BlogsBannerCard;
  updatedBy?: string;
}) => {
  const response = await fetch('/api/blogs/banner-config', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      bannerUrl: payload.bannerUrl ?? '',
      card: payload.card ?? { titleEn: '', titleAr: '', subEn: '', subAr: '' },
      updatedBy: payload.updatedBy,
    }),
  });

  const result = await response.json() as { success?: boolean; config?: BlogsPageBannerConfig; message?: string };

  if (!response.ok || !result.success || !result.config) {
    throw new Error(result.message || 'Failed to save banner config');
  }

  return result.config;
};
