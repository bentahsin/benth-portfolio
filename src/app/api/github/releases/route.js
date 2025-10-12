import { NextResponse } from 'next/server';
import { projectsData } from '@/data/projectsData';

async function fetchReleasesForRepo(repoName, token) {
    try {
        const res = await fetch(`https://api.github.com/repos/${repoName}/releases`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'X-GitHub-Api-Version': '2022-11-28',
            },
            next: { revalidate: 3600 }
        });
        if (!res.ok) {
            console.error(`Failed to fetch releases for ${repoName}: ${res.status}`);
            return [];
        }
        return await res.json();
    } catch (error) {
        console.error(`Error fetching releases for ${repoName}:`, error);
        return [];
    }
}

let releaseCache = null;
let cacheTimestamp = 0;

async function getAllReleases(token) {
    const now = Date.now();
    if (releaseCache && (now - cacheTimestamp < 3600 * 1000)) {
        return releaseCache;
    }

    const publicRepos = projectsData
        .filter(p => p.isPublicRepo && Array.isArray(p.projectUrl) && p.projectUrl.some(url => url.includes('github.com')))
        .map(p => {
            const githubUrl = p.projectUrl.find(url => url.includes('github.com'));
            return githubUrl.split('github.com/')[1];
        });

    const allReleasesPromises = publicRepos.map(repoName => fetchReleasesForRepo(repoName, token));
    const releasesByRepo = await Promise.all(allReleasesPromises);

    let combinedReleases = [];
    releasesByRepo.forEach((releases, index) => {
        const repoName = publicRepos[index];
        releases.forEach(release => {
            if (!release.draft) {
                combinedReleases.push({
                    repo: repoName,
                    name: release.name || release.tag_name,
                    version: release.tag_name,
                    published_at: release.published_at,
                    body: release.body,
                    url: release.html_url,
                    projectSlug: projectsData.find(p => Array.isArray(p.projectUrl) && p.projectUrl.some(url => url.includes(repoName)))?.slug
                });
            }
        });
    });

    combinedReleases.sort((a, b) => new Date(b.published_at) - new Date(a.published_at));
    releaseCache = combinedReleases;
    cacheTimestamp = now;

    return releaseCache;
}


export async function GET(request) {
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    if (!GITHUB_TOKEN) {
        return NextResponse.json({ error: 'GitHub credentials not configured.' }, { status: 500 });
    }

    try {
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1', 10);
        const limit = parseInt(searchParams.get('limit') || '10', 10);

        const allReleases = await getAllReleases(GITHUB_TOKEN);

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const paginatedReleases = allReleases.slice(startIndex, endIndex);
        const hasMore = endIndex < allReleases.length;

        return NextResponse.json({
            releases: paginatedReleases,
            hasMore: hasMore,
        });

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}