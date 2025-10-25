'use client';

import React, { useState, useEffect, useRef, FC, useCallback } from 'react'; 
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';

type LyricLine = { time: number; text: string };

type PlayingState = {
    isPlaying: true;
    title: string;
    artist: string;
    album: string;
    albumImageUrl: string;
    songUrl: string;
    progressMs: number;
    durationMs: number;
    timestamp: number;
};

type NotPlayingState = { isPlaying: false };
type NowPlayingData = PlayingState | NotPlayingState | null;

interface TopTrack {
    artist: string;
    songUrl: string;
    title: string;
    albumImageUrl: string;
}

const SkeletonLoader: FC = () => (
    <div className="spotify-activity-card" style={{backgroundColor: 'var(--card-bg)', padding: '2rem', borderRadius: '15px'}}>
        <div className="spotify-main-content">
            <div className="spotify-player-info">
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: '80px', height: '80px', backgroundColor: 'var(--footer-bg)', borderRadius: '8px' }} className="skeleton-box"></div>
                    <div>
                        <div style={{ width: '150px', height: '20px', backgroundColor: 'var(--footer-bg)', marginBottom: '0.5rem' }} className="skeleton-box"></div>
                        <div style={{ width: '100px', height: '16px', backgroundColor: 'var(--footer-bg)' }} className="skeleton-box"></div>
                    </div>
                </div>
            </div>
            <div className="spotify-secondary-content">
                <div style={{ width: '150px', height: '20px', backgroundColor: 'var(--footer-bg)', marginBottom: '1.5rem' }} className="skeleton-box"></div>
                <div style={{ width: '100%', height: '16px', backgroundColor: 'var(--footer-bg)', marginBottom: '1rem' }} className="skeleton-box"></div>
                <div style={{ width: '100%', height: '16px', backgroundColor: 'var(--footer-bg)', marginBottom: '1rem' }} className="skeleton-box"></div>
                <div style={{ width: '80%', height: '16px', backgroundColor: 'var(--footer-bg)' }} className="skeleton-box"></div>
            </div>
        </div>
    </div>
);

const ProgressBar: FC<{ currentProgress: number; durationMs: number }> = ({ currentProgress, durationMs }) => {
    const progressPercentage = (currentProgress / durationMs) * 100;
    const formatTime = (ms: number): string => {
        if (isNaN(ms) || ms < 0) return '0:00';
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div className="spotify-progress-bar-container">
            <div className="spotify-progress-bar">
                <div
                    className="spotify-progress"
                    style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                />
            </div>
            <div className="spotify-time-stamps">
                <span>{formatTime(currentProgress)}</span>
                <span>{formatTime(durationMs)}</span>
            </div>
        </div>
    );
};

const LyricsViewer: FC<{ lyrics: LyricLine[]; currentProgress: number }> = ({ lyrics, currentProgress }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const activeItemRef = useRef<HTMLLIElement | null>(null);

    useEffect(() => {
        const containerElement = containerRef.current;
        if (!containerElement || lyrics.length === 0) return;

        const newIndex = lyrics.findIndex((line, i) => {
            const nextLine = lyrics[i + 1];
            return currentProgress >= line.time && (!nextLine || currentProgress < nextLine.time);
        });

        if (newIndex === -1) return;

        const activeItem = containerElement.querySelector('ul')?.children[newIndex] as HTMLLIElement | undefined;
        if (activeItem && activeItemRef.current !== activeItem) {
            if (activeItemRef.current) {
                activeItemRef.current.classList.remove('active');
            }
            activeItem.classList.add('active');
            activeItemRef.current = activeItem;
            const containerHeight = containerElement.offsetHeight;
            const itemOffsetTop = activeItem.offsetTop;
            const itemHeight = activeItem.offsetHeight;
            const newScrollTop = itemOffsetTop - (containerHeight / 2) + (itemHeight / 2);
            containerElement.scrollTo({
                top: newScrollTop,
                behavior: 'smooth'
            });
        }
    }, [currentProgress, lyrics]);

    if (!lyrics || lyrics.length === 0) {
        return <div className="lyrics-container empty">Şarkı sözleri bulunamadı.</div>;
    }

    return (
        <div className="lyrics-container" ref={containerRef}>
            <ul>
                {lyrics.map((line, index) => (
                    <li key={index}>
                        {line.text || '♪'}
                    </li>
                ))}
            </ul>
        </div>
    );
};


const SpotifyActivity: FC = () => {
    const [nowPlaying, setNowPlaying] = useState<NowPlayingData>(null);
    const [topTracks, setTopTracks] = useState<TopTrack[]>([]);
    const [lyrics, setLyrics] = useState<LyricLine[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [currentProgress, setCurrentProgress] = useState(0);

    const fetchData = useCallback(async (isInitialLoad: boolean) => {
        try {
            if (isInitialLoad) {
                const [nowPlayingRes, topTracksRes] = await Promise.all([
                    fetch('/api/spotify/now-playing'),
                    fetch('/api/spotify/top-tracks'),
                ]);
                if (!nowPlayingRes.ok || !topTracksRes.ok) throw new Error('Spotify API yanıtı başarısız oldu');
                
                const nowPlayingData: NowPlayingData = await nowPlayingRes.json();
                const topTracksData = await topTracksRes.json();
                
                setNowPlaying(nowPlayingData);
                setTopTracks(topTracksData.tracks || []);
            } else {
                const nowPlayingRes = await fetch('/api/spotify/now-playing');
                if (!nowPlayingRes.ok) throw new Error('Spotify API yanıtı başarısız oldu');
                const nowPlayingData: NowPlayingData = await nowPlayingRes.json();
                setNowPlaying(nowPlayingData);
            }
        } catch (error) {
            console.error("Spotify verisi alınamadı:", error);
            setNowPlaying({ isPlaying: false });
        } finally {
            if (isLoading) setIsLoading(false);
        }
    }, [isLoading]);
    
    useEffect(() => {
        fetchData(true);
        const interval = setInterval(() => fetchData(false), 10000);
        return () => clearInterval(interval);
    }, [fetchData]);

    const songUrlForLyrics = nowPlaying?.isPlaying ? nowPlaying.songUrl : null;
    useEffect(() => {
        const fetchLyrics = async () => {
            if (nowPlaying && nowPlaying.isPlaying) {
                try {
                    const res = await fetch(`/api/spotify/lyrics?artist=${encodeURIComponent(nowPlaying.artist)}&title=${encodeURIComponent(nowPlaying.title)}`);
                    if(!res.ok) { setLyrics([]); return; }
                    const data = await res.json();
                    setLyrics(data.found ? data.lyrics : []);
                } catch (error) {
                    console.error("Lirik verisi çekilemedi:", error);
                    setLyrics([]);
                }
            } else {
                setLyrics([]);
            }
        };
        
        if (songUrlForLyrics) {
            fetchLyrics();
        } else {
            setLyrics([]);
        }
    }, [ /* eslint-disable-line react-hooks/exhaustive-deps */ songUrlForLyrics]);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (nowPlaying?.isPlaying) {
            const timeSinceFetch = Date.now() - nowPlaying.timestamp;
            const initialProgress = nowPlaying.progressMs + timeSinceFetch;
            setCurrentProgress(initialProgress);
            
            timer = setInterval(() => {
                setCurrentProgress(prev => (nowPlaying.durationMs && prev < nowPlaying.durationMs ? prev + 1000 : prev));
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [nowPlaying]);

    if (isLoading) {
        return <SkeletonLoader />;
    }

    return (
        <div className="spotify-activity-card">
             <div className="spotify-main-content">
                <div className="spotify-player-info">
                    <h3 style={{marginBottom: '1.5rem', color: 'var(--spotify-color)', display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
                        <FontAwesomeIcon icon={faSpotify} size="lg" />
                        Şu An Dinliyorum
                    </h3>
                    {nowPlaying?.isPlaying ? (
                        <div>
                            <a href={nowPlaying.songUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none', color: 'inherit' }}>
                                <Image src={nowPlaying.albumImageUrl} alt={nowPlaying.album} width={80} height={80} style={{ borderRadius: '8px' }} unoptimized />
                                <div>
                                    <p style={{ fontWeight: '700', color: 'var(--text-primary)', margin: 0, fontSize: '1.1rem' }}>{nowPlaying.title}</p>
                                    <p style={{ color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>{nowPlaying.artist}</p>
                                </div>
                            </a>
                            <ProgressBar
                                currentProgress={currentProgress}
                                durationMs={nowPlaying.durationMs}
                            />
                        </div>
                    ) : (
                        <p style={{ color: 'var(--text-secondary)' }}>Sessizlik... Şu an bir şey çalmıyor.</p>
                    )}
                </div>
                <div className="spotify-secondary-content">
                    {nowPlaying?.isPlaying && lyrics.length > 0 ? (
                        <LyricsViewer 
                            lyrics={lyrics} 
                            currentProgress={currentProgress} 
                        />
                    ) : (
                        <div>
                            <h3 style={{marginTop: 0, marginBottom: '1.5rem', color: 'var(--spotify-color)'}}>Bu Ayın Favorileri</h3>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {topTracks.length > 0 ? topTracks.map((track, index) => (
                                    <li key={track.songUrl + index}>
                                        <a href={track.songUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none', color: 'inherit' }}>
                                            <span style={{color: 'var(--text-secondary)', width: '20px', textAlign: 'center'}}>{index + 1}.</span>
                                            <Image src={track.albumImageUrl} alt={track.title} width={50} height={50} style={{ borderRadius: '6px' }} unoptimized />
                                            <div>
                                                <p style={{ fontWeight: '500', color: 'var(--text-primary)', margin: 0, fontSize: '0.9rem' }}>{track.title}</p>
                                                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>{track.artist}</p>
                                            </div>
                                        </a>
                                    </li>
                                )) : <p style={{ color: 'var(--text-secondary)' }}>Veri alınamadı.</p>}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SpotifyActivity;