import { NextResponse } from 'next/server';
import { deleteBlogFromMongo } from '@/lib/blogs-server';

export async function DELETE(_: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json({ success: false, message: 'Blog id is required.' }, { status: 400 });
    }

    await deleteBlogFromMongo(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Blogs DELETE error:', error);
    return NextResponse.json({ success: false, message: 'Failed to delete blog.' }, { status: 500 });
  }
}