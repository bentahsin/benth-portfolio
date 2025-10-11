import { NextResponse } from 'next/server';
import { projectsData } from '@/data/projectsData';

let repoCache = {
    data: null,
    timestamp: 0,
};

const CACHE_DURATION = 3600 * 1000;

async function fetchRepoLastUpdate(repoName, token) {
    try {
        const res = await fetch(`https://api.github.com/repos/${repoName}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            'X-GitHub-Api-Version': '2022-11-28',
        },
        next: { revalidate: 3600 }
        });
        if (!res.ok) return null;
        const repoData = await res.json();
        return repoData.pushed_at;
    } catch (error) {
        console.error(`Error fetching repo ${repoName}:`, error);
        return null;
    }
    }

    export async function GET() {
    const GITHUB_USERNAME = process.env.GITHUB_USERNAME;
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

    if (!GITHUB_USERNAME || !GITHUB_TOKEN) {
        return NextResponse.json({ error: 'GitHub credentials not configured.' }, { status: 500 });
    }

    const now = Date.now();
    
    if (repoCache.data && (now - repoCache.timestamp < CACHE_DURATION)) {
        return NextResponse.json(repoCache.data);
    }

    try {
        const eventsRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public`, {
        headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
            'X-GitHub-Api-Version': '2022-11-28',
        },
        next: { revalidate: 3600 }
        });
        if (!eventsRes.ok) throw new Error('Could not fetch GitHub events');
        const events = await eventsRes.json();

        const lastPushEvent = events.find(event => event.type === 'PushEvent');
        const lastActivityDate = lastPushEvent ? lastPushEvent.created_at : null;

        const repoUpdatePromises = projectsData
        .filter(p => p.projectUrl && p.projectUrl.some(url => url.includes('github.com')))
        .map(async (p) => {
            const githubUrl = p.projectUrl.find(url => url.includes('github.com'));
            const repoName = githubUrl.split('github.com/')[1];
            if (repoName) {
            const lastUpdate = await fetchRepoLastUpdate(repoName, GITHUB_TOKEN);
            return { slug: p.slug, lastUpdate };
            }
            return null;
        });

        const repoUpdatesArray = (await Promise.all(repoUpdatePromises)).filter(Boolean);

        const repoUpdates = repoUpdatesArray.reduce((acc, { slug, lastUpdate }) => {
        acc[slug] = lastUpdate;
        return acc;
        }, {});

        const responseData = {
        lastActivityDate,
        repoUpdates,
        };

        repoCache = {
        data: responseData,
        timestamp: now,
        };

        return NextResponse.json(responseData);

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}