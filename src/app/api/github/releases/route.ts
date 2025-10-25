import { NextResponse, NextRequest } from 'next/server';
import { projectsData } from '@/data/projectsData';

interface Project {
    slug: string;
    projectUrl: string[];
    isPublicRepo: boolean;
}

interface GitHubRelease {
    name: string | null;
    tag_name: string;
    published_at: string;
    body: string | null;
    html_url: string;
    draft: boolean;
}

interface FormattedRelease {
    repo: string;
    name: string;
    version: string;
    published_at: string;
    body: string | null;
    url: string;
    projectSlug?: string;
}

interface ApiResponse {
    releases: FormattedRelease[];
    hasMore: boolean;
}

let releaseCache: FormattedRelease[] | null = null;
let cacheTimestamp: number = 0;

async function fetchReleasesForRepo(repoName: string, token: string): Promise<GitHubRelease[]> {
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
        const releases: GitHubRelease[] = await res.json();
        return releases;
    } catch (error) {
        console.error(`Error fetching releases for ${repoName}:`, error);
        return [];
    }
}

async function getAllReleases(token: string): Promise<FormattedRelease[]> {
    const now = Date.now();
    if (releaseCache && (now - cacheTimestamp < 3600 * 1000)) {
        return releaseCache;
    }

    const publicRepos = (projectsData as Project[])
        .filter(p => p.isPublicRepo && Array.isArray(p.projectUrl) && p.projectUrl.some(url => url.includes('github.com')))
        .map(p => {
            const githubUrl = p.projectUrl.find(url => url.includes('github.com'));
            return githubUrl ? githubUrl.split('github.com/')[1] : '';
        })
        .filter(Boolean);

    const allReleasesPromises = publicRepos.map(repoName => fetchReleasesForRepo(repoName, token));
    const releasesByRepo = await Promise.all(allReleasesPromises);

    const combinedReleases: FormattedRelease[] = [];
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
                    projectSlug: (projectsData as Project[]).find(p => Array.isArray(p.projectUrl) && p.projectUrl.some(url => url.includes(repoName)))?.slug
                });
            }
        });
    });

    combinedReleases.sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());
    releaseCache = combinedReleases;
    cacheTimestamp = now;

    return releaseCache;
}

export async function GET(request: NextRequest): Promise<NextResponse<ApiResponse | { error: string }>> {
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    if (!GITHUB_TOKEN) {
        return NextResponse.json({ error: 'GitHub credentials not configured.' }, { status: 500 });
    }

    try {
        const searchParams = request.nextUrl.searchParams;
        const page = parseInt(searchParams.get('page') || '1', 10);
        const limit = parseInt(searchParams.get('limit') || '10', 10);

        const allReleases = await getAllReleases(GITHUB_TOKEN);

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const paginatedReleases = allReleases.slice(startIndex, endIndex);
        const hasMore = endIndex < allReleases.length;
        const responseData: ApiResponse = {
            releases: paginatedReleases,
            hasMore: hasMore,
        };

        return NextResponse.json(responseData);

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown server error occurred.";
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}