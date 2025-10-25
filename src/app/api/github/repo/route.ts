import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const repoName = searchParams.get('repo');
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

    if (!repoName) {
        return NextResponse.json({ error: 'Repo adı belirtilmedi.' }, { status: 400 });
    }
    if (!GITHUB_TOKEN) {
        return NextResponse.json({ error: 'GitHub token ayarlanmamış.' }, { status: 500 });
    }

    try {
        const res = await fetch(`https://api.github.com/repos/${repoName}`, {
            headers: {
                Authorization: `Bearer ${GITHUB_TOKEN}`,
                'X-GitHub-Api-Version': '2022-11-28',
            },
            next: { revalidate: 3600 }
        });

        if (!res.ok) {
            return NextResponse.json({ error: `Repo bulunamadı veya API hatası: ${res.status}` }, { status: res.status });
        }

        const data = await res.json();

        const repoDetails = {
            name: data.name,
            description: data.description,
            stars: data.stargazers_count,
            forks: data.forks_count,
            language: data.language,
            url: data.html_url,
        };

        return NextResponse.json(repoDetails);
    } catch (error) {
        return NextResponse.json({ error: 'Sunucu hatası.' }, { status: 500 });
    }
}