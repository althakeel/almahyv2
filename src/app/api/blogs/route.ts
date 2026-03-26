import { NextResponse } from 'next/server';
import { BlogPost } from '@/lib/blogs';
import { listBlogsFromMongo, saveBlogToMongo } from '@/lib/blogs-server';

export async function GET() {
  try {
    const blogs = await listBlogsFromMongo();
    return NextResponse.json({ success: true, blogs });
  } catch (error) {
    console.error('Blogs GET error:', error);
    return NextResponse.json({ success: false, message: 'Failed to load blogs.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const payload = await request.json() as { blog?: BlogPost; updatedBy?: string };

    if (!payload.blog) {
      return NextResponse.json({ success: false, message: 'Blog payload is required.' }, { status: 400 });
    }

    const blog = await saveBlogToMongo(payload.blog, payload.updatedBy);
    return NextResponse.json({ success: true, blog });
  } catch (error) {
    console.error('Blogs POST error:', error);
    return NextResponse.json({ success: false, message: 'Failed to save blog.' }, { status: 500 });
  }
}