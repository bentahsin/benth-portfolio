'use client';

import dynamic from 'next/dynamic';

const SpotifySkeleton = () => (
    <div className="spotify-skeleton-loader">
        <div className="skeleton-image"></div>
        <div className="skeleton-text-container">
            <div className="skeleton-text title"></div>
            <div className="skeleton-text artist"></div>
        </div>
    </div>
);

const SpotifyActivity = dynamic(
    () => import('@/components/Spotify/SpotifyActivity'),
    { 
        ssr: false,
        loading: () => <SpotifySkeleton />,
    }
);

export default function DynamicSpotifyActivity() {
    return <SpotifyActivity />;
}