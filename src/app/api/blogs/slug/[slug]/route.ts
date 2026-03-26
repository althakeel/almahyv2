import { NextResponse } from 'next/server';
import { getBlogBySlugFromMongo } from '@/lib/blogs-server';

export async function GET(_: Request, context: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await context.params;
    const blog = await getBlogBySlugFromMongo(decodeURIComponent(slug));

    if (!blog) {
      return NextResponse.json({ success: false, message: 'Blog not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, blog });
  } catch (error) {
    console.error('Blog by slug GET error:', error);
    return NextResponse.json({ success: false, message: 'Failed to load blog.' }, { status: 500 });
  }
}