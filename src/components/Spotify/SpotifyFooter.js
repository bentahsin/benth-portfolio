'use client';

import { useState, useEffect } from 'react';
import styles from './SpotifyFooter.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';

export default function SpotifyFooter() {
  const [song, setSong] = useState(null);

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const res = await fetch('/api/spotify/now-playing');
        if (res.ok) {
          const data = await res.json();
          setSong(data);
        }
      } catch (error) {
        console.error("Spotify verisi alınamadı:", error);
      }
    };

    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      <FontAwesomeIcon icon={faSpotify} className={styles.spotifyIcon} />
      {song?.isPlaying ? (
        <a href={song.songUrl} target="_blank" rel="noopener noreferrer" className={styles.songLink}>
          <div className={styles.songInfo}>
            <span className={styles.title}>{song.title}</span>
            <span className={styles.separator}>–</span>
            <span className={styles.artist}>{song.artist}</span>
          </div>
        </a>
      ) : (
        <div className={styles.songInfo}>
          <span className={styles.artist}>Şu an çalmıyor</span>
          <span className={styles.separator}>–</span>
          <span className={styles.title}>Sessizlik</span>
        </div>
      )}
    </div>
  );
}