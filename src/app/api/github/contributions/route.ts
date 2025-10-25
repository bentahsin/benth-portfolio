import { NextResponse, NextRequest } from 'next/server';

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

interface PullRequestNode {
    id: string;
    title: string;
    url: string;
    createdAt: string;
    repository: {
        nameWithOwner: string;
        owner: {
            login: string;
        };
    };
}

interface GraphQLResponse {
    data: {
        user: {
            pullRequests: {
                nodes: PullRequestNode[];
            };
        };
    };
    errors?: any[];
}

interface FormattedContribution {
    id: string;
    title: string;
    url: string;
    repoName: string;
    createdAt: string;
}

interface ApiResponse {
    contributions: FormattedContribution[];
    hasMore: boolean;
}

let contributionsCache: FormattedContribution[] | null = null;
let cacheTimestamp: number = 0;

async function getAllContributions(username: string, token: string): Promise<FormattedContribution[]> {
    const now = Date.now();
    if (contributionsCache && (now - cacheTimestamp < 3600 * 1000)) {
        return contributionsCache;
    }

    const res = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: GITHUB_CONTRIBUTIONS_QUERY,
            variables: { username }
        }),
    });

    if (!res.ok) {
        throw new Error(`GitHub GraphQL API responded with ${res.status}`);
    }

    const json: GraphQLResponse = await res.json();

    if (json.errors) {
        throw new Error(`GitHub GraphQL API errors: ${JSON.stringify(json.errors)}`);
    }

    const contributions = json.data.user.pullRequests.nodes
        .filter(pr => pr.repository.owner.login.toLowerCase() !== username.toLowerCase())
        .map((pr): FormattedContribution => ({
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

export async function GET(request: NextRequest): Promise<NextResponse<ApiResponse | { error: string }>> {
    const GITHUB_USERNAME = process.env.GITHUB_USERNAME;
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

    if (!GITHUB_USERNAME || !GITHUB_TOKEN) {
        return NextResponse.json({ error: 'GitHub credentials not configured.' }, { status: 500 });
    }

    try {
        const searchParams = request.nextUrl.searchParams;
        const page = parseInt(searchParams.get('page') || '1', 10);
        const limit = parseInt(searchParams.get('limit') || '10', 10);

        const allContributions = await getAllContributions(GITHUB_USERNAME, GITHUB_TOKEN);

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const paginatedContributions = allContributions.slice(startIndex, endIndex);
        const hasMore = endIndex < allContributions.length;
        
        const responseData: ApiResponse = {
            contributions: paginatedContributions,
            hasMore: hasMore,
        };

        return NextResponse.json(responseData);

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown server error occurred.";
        console.error("GitHub Contributions API Hatası:", errorMessage);
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}