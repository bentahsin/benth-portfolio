import { NextResponse } from 'next/server';

const GITHUB_CONTRIBUTIONS_QUERY = `
  query($username: String!) {
    user(login: $username) {
      pullRequests(
        first: 100, 
        states: MERGED, 
        orderBy: { field: CREATED_AT, direction: DESC }
      ) {
        nodes {
          id
          title
          url
          createdAt
          repository {
            nameWithOwner
            owner {
              login
            }
          }
        }
      }
    }
  }
`;

let contributionsCache = null;
let cacheTimestamp = 0;

async function getAllContributions(username, token) {
    const now = Date.now();
    if (contributionsCache && (now - cacheTimestamp < 3600 * 1000)) {
        return contributionsCache;
    }

    const res = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: GITHUB_CONTRIBUTIONS_QUERY, variables: { username } }),
    });

    if (!res.ok) {
        throw new Error(`GitHub GraphQL API responded with ${res.status}`);
    }
    const json = await res.json();

    const contributions = json.data.user.pullRequests.nodes
        .filter(pr => pr.repository.owner.login.toLowerCase() !== username.toLowerCase())
        .map(pr => ({
            id: pr.id,
            title: pr.title,
            url: pr.url,
            repoName: pr.repository.nameWithOwner,
            createdAt: pr.createdAt,
        }));

    contributionsCache = contributions;
    cacheTimestamp = now;

    return contributionsCache;
}


export async function GET(request) {
    const GITHUB_USERNAME = process.env.GITHUB_USERNAME;
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

    if (!GITHUB_USERNAME || !GITHUB_TOKEN) {
        return NextResponse.json({ error: 'GitHub credentials not configured.' }, { status: 500 });
    }

    try {
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1', 10);
        const limit = parseInt(searchParams.get('limit') || '10', 10);

        const allContributions = await getAllContributions(GITHUB_USERNAME, GITHUB_TOKEN);

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const paginatedContributions = allContributions.slice(startIndex, endIndex);
        const hasMore = endIndex < allContributions.length;

        return NextResponse.json({
            contributions: paginatedContributions,
            hasMore: hasMore,
        });

    } catch (error) {
        console.error("GitHub Contributions API Hatası:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}