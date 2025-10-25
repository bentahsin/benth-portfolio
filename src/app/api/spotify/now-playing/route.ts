import { NextResponse } from 'next/server';

interface SpotifyTokenResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
    scope: string;
}

interface SpotifyArtist {
    name: string;
}

interface SpotifyAlbumImage {
    url: string;
    height: number;
    width: number;
}

interface SpotifyTrackItem {
    name: string;
    artists: SpotifyArtist[];
    album: {
        name: string;
        images: SpotifyAlbumImage[];
    };
    external_urls: {
        spotify: string;
    };
    duration_ms: number;
}

interface SpotifyNowPlayingResponse {
    is_playing: boolean;
    progress_ms: number;
    item: SpotifyTrackItem;
}

interface ApiResponseData {
    isPlaying: boolean;
    title: string;
    artist: string;
    album: string;
    albumImageUrl: string;
    songUrl: string;
    progressMs: number;
    durationMs: number;
    timestamp: number;
}


const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;

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

export async function GET(): Promise<NextResponse<ApiResponseData | { isPlaying: false } | { error: string; details?: string }>> {
    const client_id = process.env.SPOTIFY_CLIENT_ID;
    const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
    const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

    if (!client_id || !client_secret || !refresh_token) {
        console.error("Spotify environment variables are not set.");
        return NextResponse.json({ error: 'Authentication credentials are not configured.' }, { status: 500 });
    }

    try {
        const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
        const tokenResponse = await getAccessToken(refresh_token, basic);
        const { access_token } = tokenResponse;

        if (!access_token) {
            return NextResponse.json({ error: 'Could not retrieve Spotify access token.' }, { status: 500 });
        }

        const response = await fetch(NOW_PLAYING_ENDPOINT, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            },
            cache: 'no-store',
        });

        if (response.status === 204 || response.status > 400) {
            return NextResponse.json({ isPlaying: false });
        }

        const song: SpotifyNowPlayingResponse = await response.json();

        if (!song || !song.item) {
            return NextResponse.json({ isPlaying: false });
        }

        const data: ApiResponseData = {
            isPlaying: song.is_playing,
            title: song.item.name,
            artist: song.item.artists.map((_artist) => _artist.name).join(', '),
            album: song.item.album.name,
            albumImageUrl: song.item.album.images[0]?.url,
            songUrl: song.item.external_urls.spotify,
            progressMs: song.progress_ms,
            durationMs: song.item.duration_ms,
            timestamp: Date.now(),
        };

        const headers = {
            'cache-control': 'public, s-maxage=60, stale-while-revalidate=30',
        };

        return NextResponse.json(data, { headers });

    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
        return NextResponse.json({ error: 'An internal error occurred.', details: errorMessage }, { status: 500 });
    }
}