'use server';

import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export async function uploadMedia(formData: FormData) {
  try {
    const file = formData.get('file') as File;
    const targetId = formData.get('targetId') as string;

    if (!file || !targetId) {
      throw new Error('Missing file or targetId');
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save to public/uploads/ so Next.js serves it as a static file
    const uploadDir = join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadDir, { recursive: true });

    const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
    const filePath = join(uploadDir, filename);
    const publicUrl = `/uploads/${filename}`;

    await writeFile(filePath, buffer);

    return { success: true, url: publicUrl };
  } catch (error) {
    console.error('Upload error:', error);
    return { success: false, error: (error as Error).message };
  }
}
