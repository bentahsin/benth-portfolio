'use client';

import React, { useState, useEffect } from 'react';
import styles from './SpotifyFooter.module.css';
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

const SpotifyFooter: React.FC = () => {
    const [song, setSong] = useState<SpotifySongData>(null);

    useEffect(() => {
        const fetchNowPlaying = async () => {
            try {
                const res = await fetch('/api/spotify/now-playing');
                if (res.ok) {
                    const data: PlayingState | NotPlayingState = await res.json();
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

    const tooltipText = song?.isPlaying
        ? `${song.title} – ${song.artist}`
        : "Spotify'da şu an bir şey çalmıyor";

    const ariaLabelText = song?.isPlaying
        ? `Şu an dinleniyor: ${tooltipText}`
        : "Spotify'da şu an bir şey çalmıyor";

    return (
        <div className={styles.container} title={tooltipText} aria-label={ariaLabelText}>
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
};

export default SpotifyFooter;