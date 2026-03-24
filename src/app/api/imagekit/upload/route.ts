import { NextResponse } from 'next/server';
import { ImageKit, toFile } from '@imagekit/nodejs';

const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;

const imagekit = privateKey
  ? new ImageKit({ privateKey })
  : null;

export async function POST(request: Request) {
  if (!imagekit) {
    return NextResponse.json(
      { success: false, message: 'ImageKit is not configured. Please set IMAGEKIT_PRIVATE_KEY.' },
      { status: 500 }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ success: false, message: 'No file uploaded.' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
    const uploadable = await toFile(buffer, fileName, { type: file.type });

    const uploaded = await imagekit.files.upload({
      file: uploadable,
      fileName,
      folder: '/almahy/blogs',
      useUniqueFileName: true,
    });

    return NextResponse.json({
      success: true,
      url: uploaded.url,
      fileId: uploaded.fileId,
      name: uploaded.name,
    });
  } catch (error) {
    console.error('ImageKit upload error:', error);
    const message = error instanceof Error ? error.message : 'Failed to upload image.';
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
