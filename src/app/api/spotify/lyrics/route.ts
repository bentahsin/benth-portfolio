import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const parseLrcLine = (line: string) => {
    const match = line.match(/\[(\d{2}):(\d{2})\.(\d{2,3})\](.*)/);
    if (!match) return null;

    const [, min, sec, ms, text] = match;
    const time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(ms.padEnd(3, '0'));
    
    return { time, text: text.trim() };
};

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const artist = searchParams.get('artist');
    const title = searchParams.get('title');

    if (!artist || !title) {
        return NextResponse.json({ error: 'Artist and title are required' }, { status: 400 });
    }

    console.log("--- Lirik API İsteği Geldi ---");
    console.log("Gelen Sanatçı:", artist);
    console.log("Gelen Şarkı Adı:", title);

    const formatFileName = (str: string) =>
        str
            .toLowerCase()
            .replace(/\(.*?\)/g, '')
            .replace(/\[.*?\]/g, '')
            .replace(/[^a-z0-9]/g, '_')
            .replace(/_+/g, '_')
            .trim( );

    const formattedArtist = formatFileName(artist);
    const formattedTitle = formatFileName(title);

    const fileName = `${formattedArtist}-${formattedTitle}.lrc`;
    const filePath = path.join(process.cwd(), 'data', 'lyrics', fileName);

    console.log("Oluşturulan Dosya Adı:", fileName);
    console.log("Aranan Tam Dosya Yolu:", filePath);

    try {
        const lrcContent = await fs.readFile(filePath, 'utf8');
        console.log("✓ Dosya başarıyla bulundu ve okundu.");
        const lines = lrcContent.split('\n').map(parseLrcLine).filter(Boolean);
        return NextResponse.json({ found: true, lyrics: lines });
    } catch (error) {
        console.log("✗ HATA: Dosya bulunamadı veya okunamadı.");
        if (process.env.NODE_ENV === 'development') {
            console.error(error);
        }
        return NextResponse.json({ found: false, lyrics: [] });
    }
}