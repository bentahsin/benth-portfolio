import { writeFile, mkdir } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import { join, basename } from 'path';

interface SuccessResponse {
    success: true;
    url: string;
}

interface ErrorResponse {
    success: false;
    message: string;
}

const ALLOWED_TARGET_DIRS = ['blog', 'avatars', 'projects'];

export async function POST(request: NextRequest): Promise<NextResponse<SuccessResponse | ErrorResponse>> {
    try {
        const data = await request.formData();
        const fileEntry = data.get('file');
        const targetDirEntry = data.get('targetDir');

        if (!(fileEntry instanceof File)) {
            return NextResponse.json({ success: false, message: 'Yüklenecek dosya geçerli değil.' }, { status: 400 });
        }
        const file: File = fileEntry;

        if (typeof targetDirEntry !== 'string' || !targetDirEntry) {
            return NextResponse.json({ success: false, message: 'Hedef dizin belirtilmedi veya geçersiz.' }, { status: 400 });
        }
        const targetDir: string = targetDirEntry;

        if (!ALLOWED_TARGET_DIRS.includes(targetDir)) {
            return NextResponse.json({ success: false, message: 'İzin verilmeyen bir hedef dizin.' }, { status: 400 });
        }

        const safeOriginalName = basename(file.name).replace(/[^a-zA-Z0-9._-]/g, '_');
        const filename = `${Date.now()}-${safeOriginalName}`;

        const uploadPath = join(process.cwd(), 'public', 'uploads', targetDir);
        const filePath = join(uploadPath, filename);

        await mkdir(uploadPath, { recursive: true });

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        await writeFile(filePath, buffer);
        
        console.log(`Dosya başarıyla kaydedildi: ${filePath}`);

        const publicUrl = `/uploads/${targetDir}/${filename}`;
        return NextResponse.json({ success: true, url: publicUrl });

    } catch (error) {
        console.error("Dosya yükleme hatası:", error);
        const errorMessage = error instanceof Error ? error.message : "Bilinmeyen bir sunucu hatası oluştu.";
        return NextResponse.json({ success: false, message: `Dosya kaydedilemedi: ${errorMessage}` }, { status: 500 });
    }
}