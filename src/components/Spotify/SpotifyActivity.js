'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';

const SkeletonLoader = () => (
  <div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <div style={{ width: '80px', height: '80px', backgroundColor: 'var(--card-bg)', borderRadius: '5px' }}></div>
      <div>
        <div style={{ width: '150px', height: '20px', backgroundColor: 'var(--card-bg)', marginBottom: '0.5rem' }}></div>
        <div style={{ width: '100px', height: '16px', backgroundColor: 'var(--card-bg)'}}></div>
      </div>
    </div>
  </div>
);


export default function SpotifyActivity() {
  const [nowPlaying, setNowPlaying] = useState(null);
  const [topTracks, setTopTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [nowPlayingRes, topTracksRes] = await Promise.all([
          fetch('/api/spotify/now-playing'),
          fetch('/api/spotify/top-tracks'),
        ]);
        
        if (!nowPlayingRes.ok || !topTracksRes.ok) {
            throw new Error('Spotify API yanıtı başarısız oldu');
        }
        
        const nowPlayingData = await nowPlayingRes.json();
        const topTracksData = await topTracksRes.json();
        
        setNowPlaying(nowPlayingData);
        setTopTracks(topTracksData.tracks || []);
        
      } catch (error) {
        console.error("Spotify verisi alınamadı:", error);
        setNowPlaying({ isPlaying: false });
        setTopTracks([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();

    const interval = setInterval(() => {
        fetch('/api/spotify/now-playing')
            .then(res => res.json())
            .then(data => setNowPlaying(data));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return <SkeletonLoader />;
  }

  return (
    <div className="spotify-activity-card" style={{backgroundColor: 'var(--card-bg)', padding: '2rem', borderRadius: '15px', border: '1px solid rgba(140, 8, 217, 0.2)'}}>
      <h3 style={{marginBottom: '1.5rem', color: 'var(--accent-color)', display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
        <FontAwesomeIcon icon={faSpotify} size="lg" />
        Şu An Dinliyorum
      </h3>
      {nowPlaying?.isPlaying ? (
        <a href={nowPlaying.songUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none', color: 'inherit' }}>
          <Image src={nowPlaying.albumImageUrl} alt={nowPlaying.album} width={80} height={80} style={{ borderRadius: '8px' }} unoptimized />
          <div>
            <p style={{ fontWeight: '700', color: 'var(--text-primary)', margin: 0, fontSize: '1.1rem' }}>{nowPlaying.title}</p>
            <p style={{ color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>{nowPlaying.artist}</p>
          </div>
        </a>
      ) : (
        <p style={{ color: 'var(--text-secondary)' }}>Sessizlik... Şu an bir şey çalmıyor.</p>
      )}

      <h3 style={{marginTop: '3rem', marginBottom: '1.5rem', color: 'var(--accent-color)'}}>Bu Ayın Favorileri</h3>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {topTracks.length > 0 ? topTracks.map((track, index) => (
          <li key={track.songUrl + index}>
             <a href={track.songUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none', color: 'inherit' }}>
                <span style={{color: 'var(--text-secondary)', width: '20px', textAlign: 'center', fontSize: '1.1rem'}}>{index + 1}.</span>
                <Image src={track.albumImageUrl} alt={track.title} width={50} height={50} style={{ borderRadius: '6px' }} unoptimized />
                <div>
                   <p style={{ fontWeight: '500', color: 'var(--text-primary)', margin: 0 }}>{track.title}</p>
                   <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>{track.artist}</p>
                </div>
            </a>
          </li>
        )) : <p style={{ color: 'var(--text-secondary)' }}>Veri alınamadı.</p>}
      </ul>
    </div>
  );
}