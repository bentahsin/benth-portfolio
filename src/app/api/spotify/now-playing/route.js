import { NextResponse } from 'next/server';

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;

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

    const response = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        'Authorization': `Bearer ${access_token}`,
      },
    });

    if (response.status === 204 || response.status > 400) {
      return NextResponse.json({ isPlaying: false });
    }

    const song = await response.json();

    const data = {
      isPlaying: song.is_playing,
      title: song.item.name,
      artist: song.item.artists.map((_artist) => _artist.name).join(', '),
      album: song.item.album.name,
      albumImageUrl: song.item.album.images[0].url,
      songUrl: song.item.external_urls.spotify,
    };
    
    const headers = {
        'cache-control': 'no-store, max-age=0',
    };

    return NextResponse.json(data, { headers });

  } catch (error) {
    return NextResponse.json({ error: 'Bir hata oluştu.', details: error.message }, { status: 500 });
  }
}