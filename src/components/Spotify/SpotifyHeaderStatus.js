'use client';

import { useState, useEffect } from 'react';
import styles from './SpotifyHeaderStatus.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';

const StatusSkeleton = () => (
    <div className={`${styles.badge} ${styles.skeleton}`}>
        <div className={styles.skeletonIcon}></div>
        <div className={styles.skeletonText}></div>
    </div>
);

export default function SpotifyHeaderStatus() {
    const [song, setSong] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

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
            } finally {
                setIsLoading(false);
            }
        };

        fetchNowPlaying();
        const interval = setInterval(fetchNowPlaying, 30000);
        return () => clearInterval(interval);
    }, []);

    if (isLoading) {
        return <StatusSkeleton />;
    }

    if (!song?.isPlaying) {
        return null;
    }

    const fullSongTitle = `${song.title} – ${song.artist}`;

    return (
        <a href={song.songUrl} target="_blank" rel="noopener noreferrer" className={styles.badge} title={fullSongTitle} aria-label={`Şu an dinleniyor: ${fullSongTitle}`}>
            <FontAwesomeIcon icon={faSpotify} className={styles.spotifyIcon} />
            <span className={styles.songText}>
                {song.title}
            </span>
        </a>
    );
}