import { NextResponse } from 'next/server';
import { projectsData } from '@/data/projectsData';

interface Project {
    slug: string;
    projectUrl: string[];
    isPublicRepo: boolean;
}

interface GitHubRepo {
    pushed_at: string;
    html_url: string;
    private: boolean;
}

interface GitHubEvent {
    type: string;
    created_at: string;
}

interface RepoUpdateDetails {
    pushed_at: string;
    html_url: string | null;
}

interface ApiResponseData {
    lastActivityDate: string | null;
    repoUpdates: Record<string, RepoUpdateDetails>;
}

async function fetchRepoLastUpdate(repoName: string, token: string): Promise<{ pushed_at: string; html_url: string; is_private: boolean; } | null> {
    try {
        const res = await fetch(`https://api.github.com/repos/${repoName}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'X-GitHub-Api-Version': '2022-11-28',
            },
            next: { revalidate: 3600 }
        });

        if (!res.ok) return null;
        const repoData: GitHubRepo = await res.json();

        return {
            pushed_at: repoData.pushed_at,
            html_url: repoData.html_url,
            is_private: repoData.private,
        };

    } catch (error) {
        console.error(`Error fetching repo ${repoName}:`, error);
        return null;
    }
}

export async function GET(): Promise<NextResponse<ApiResponseData | { error: string }>> {
    const GITHUB_USERNAME = process.env.GITHUB_USERNAME;
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

    if (!GITHUB_USERNAME || !GITHUB_TOKEN) {
        return NextResponse.json({ error: 'GitHub credentials not configured.' }, { status: 500 });
    }

    try {
        const eventsRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=50`, {
            headers: {
                Authorization: `Bearer ${GITHUB_TOKEN}`,
                'X-GitHub-Api-Version': '2022-11-28',
            },
            cache: 'no-store',
        });

        if (!eventsRes.ok) {
            throw new Error(`Could not fetch GitHub events: ${eventsRes.statusText}`);
        }

        const events: GitHubEvent[] = await eventsRes.json();
        const lastPushEvent = events.find(event => event.type === 'PushEvent');
        const lastActivityDate: string | null = lastPushEvent ? lastPushEvent.created_at : null;

        const repoUpdatePromises = (projectsData as Project[])
            .filter(p => p.projectUrl && p.projectUrl.some(url => url.includes('github.com')))
            .map(async (p) => {
                const githubUrl = p.projectUrl.find(url => url.includes('github.com'));
                if (!githubUrl) return null;

                const repoName = githubUrl.split('github.com/')[1];
                if (repoName) {
                    const repoDetails = await fetchRepoLastUpdate(repoName, GITHUB_TOKEN);
                    if (repoDetails) {
                        const finalDetails: RepoUpdateDetails = {
                            pushed_at: repoDetails.pushed_at,
                            html_url: (p.isPublicRepo && !repoDetails.is_private) ? repoDetails.html_url : null,
                        };
                        return { slug: p.slug, lastUpdate: finalDetails };
                    }
                }
                return null;
            });
        const repoUpdatesArray = (await Promise.all(repoUpdatePromises))
            .filter((item): item is { slug: string; lastUpdate: RepoUpdateDetails } => item !== null);

        const repoUpdates = repoUpdatesArray.reduce((acc: Record<string, RepoUpdateDetails>, { slug, lastUpdate }) => {
            acc[slug] = lastUpdate;
            return acc;
        }, {});
        const responseData: ApiResponseData = {
            lastActivityDate,
            repoUpdates,
        };

        return NextResponse.json(responseData);

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        console.error("GitHub API Hatası:", errorMessage);
        const errorResponse: ApiResponseData = { lastActivityDate: null, repoUpdates: {} };
        return NextResponse.json(errorResponse, { status: 500 });
    }
}