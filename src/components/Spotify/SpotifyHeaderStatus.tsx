'use client';

import React, { useState, useEffect } from 'react';
import styles from './SpotifyHeaderStatus.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';

type PlayingState = {
    isPlaying: true;
    title: string;
    artist: string;
    songUrl: string;
};

type NotPlayingState = {
    isPlaying: false;
};

type SpotifySongData = PlayingState | NotPlayingState | null;

const StatusSkeleton: React.FC = () => (
    <div className={`${styles.badge} ${styles.skeleton}`}>
        <div className={styles.skeletonIcon}></div>
        <div className={styles.skeletonText}></div>
    </div>
);

const SpotifyHeaderStatus: React.FC = () => {
    const [song, setSong] = useState<SpotifySongData>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchNowPlaying = async () => {
            try {
                const res = await fetch('/api/spotify/now-playing');
                if (res.ok) {
                    const data: PlayingState | NotPlayingState = await res.json();
                    setSong(data);
                } else {
                    setSong({ isPlaying: false });
                }
            } catch (error) {
                console.error("Spotify verisi alınamadı:", error);
                setSong({ isPlaying: false });
            } finally {
                if (isLoading) {
                    setIsLoading(false);
                }
            }
        };

        fetchNowPlaying();
        const interval = setInterval(fetchNowPlaying, 30000);
        return () => clearInterval(interval);
    }, [isLoading]);

    if (isLoading) {
        return <StatusSkeleton />;
    }

    if (!song?.isPlaying) {
        return null;
    }

    const fullSongTitle = `${song.title} – ${song.artist}`;

    return (
        <a
            href={song.songUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.badge}
            title={fullSongTitle}
            aria-label={`Şu an dinleniyor: ${fullSongTitle}`}
        >
            <FontAwesomeIcon icon={faSpotify} className={styles.spotifyIcon} />
            <span className={styles.songText}>
                {song.title}
            </span>
        </a>
    );
};

export default SpotifyHeaderStatus;