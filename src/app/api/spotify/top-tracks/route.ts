import { NextResponse } from 'next/server';

interface SpotifyTokenResponse {
    access_token: string;
}

interface SpotifyArtist {
    name: string;
}

interface SpotifyAlbumImage {
    url: string;
}

interface SpotifyTrackItem {
    artists: SpotifyArtist[];
    external_urls: {
        spotify: string;
    };
    name: string;
    album: {
        images: SpotifyAlbumImage[];
    };
}

interface SpotifyTopTracksResponse {
    items: SpotifyTrackItem[];
}

interface FormattedTrack {
    artist: string;
    songUrl: string;
    title: string;
    albumImageUrl?: string;
}

interface ApiResponse {
    tracks: FormattedTrack[];
}

const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks`;

const getAccessToken = async (refreshToken: string, basicAuth: string): Promise<SpotifyTokenResponse> => {
    const response = await fetch(TOKEN_ENDPOINT, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${basicAuth}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
        }),
        cache: 'no-store',
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch access token: ${response.statusText}`);
    }

    return response.json();
};

export async function GET(): Promise<NextResponse<ApiResponse | { error: string; details?: string }>> {
    const client_id = process.env.SPOTIFY_CLIENT_ID;
    const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
    const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

    if (!client_id || !client_secret || !refresh_token) {
        console.error("Spotify environment variables are not set.");
        return NextResponse.json({ error: 'Authentication credentials are not configured.' }, { status: 500 });
    }

    try {
        const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
        const { access_token } = await getAccessToken(refresh_token, basic);

        if (!access_token) {
            return NextResponse.json({ error: 'Could not retrieve Spotify access token.' }, { status: 500 });
        }

        const url = `${TOP_TRACKS_ENDPOINT}?time_range=short_term&limit=5`;

        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            },
            next: {
                revalidate: 3600,
            }
        });

        if (response.status !== 200) {
            return NextResponse.json({ tracks: [] });
        }

        const { items }: SpotifyTopTracksResponse = await response.json();

        const tracks: FormattedTrack[] = items.map((track) => ({
            artist: track.artists.map((_artist) => _artist.name).join(', '),
            songUrl: track.external_urls.spotify,
            title: track.name,
            albumImageUrl: track.album.images[0]?.url,
        }));
        
        const headers = {
            'cache-control': 'public, s-maxage=3600, stale-while-revalidate=1800',
        };

        return NextResponse.json({ tracks }, { headers });

    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
        return NextResponse.json({ error: 'An internal error occurred.', details: errorMessage }, { status: 500 });
    }
}