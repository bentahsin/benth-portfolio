import { NextResponse } from 'next/server';

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks`;

const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token,
    }),
    cache: 'no-store',
  });

  return response.json();
};

export async function GET() {
  try {
    const { access_token } = await getAccessToken();

    if (!access_token) {
      return NextResponse.json({ error: 'Spotify token alınamadı.' }, { status: 500 });
    }
    
    const url = `${TOP_TRACKS_ENDPOINT}?time_range=short_term&limit=5`;

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${access_token}`,
      },
    });

    if (response.status !== 200) {
      return NextResponse.json({ tracks: [] }, { status: response.status });
    }

    const { items } = await response.json();

    const tracks = items.map((track) => ({
      artist: track.artists.map((_artist) => _artist.name).join(', '),
      songUrl: track.external_urls.spotify,
      title: track.name,
      albumImageUrl: track.album.images[0]?.url,
    }));
    
    const headers = {
      'cache-control': 'public, s-maxage=3600, stale-while-revalidate=1800',
    };

    return NextResponse.json({ tracks }, { headers });

  } catch (error) {
    return NextResponse.json({ error: 'Bir hata oluştu.', details: error.message }, { status: 500 });
  }
}