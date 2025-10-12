'use client';

import { useState, useEffect, useCallback } from 'react';
import ChangelogItem from '@/components/ChangelogItem';

const RELEASES_PER_PAGE = 10;

const ChangelogSkeleton = () => (
    <div className="changelog-item skeleton">
        <div className="changelog-timeline">
            <div className="timeline-dot"></div>
            <div className="timeline-line"></div>
        </div>
        <div className="changelog-content">
            <div className="skeleton-line title"></div>
            <div className="skeleton-line text"></div>
            <div className="skeleton-line text short"></div>
        </div>
    </div>
);


export default function ChangelogPage() {
    const [releases, setReleases] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [isFetchingMore, setIsFetchingMore] = useState(false);

    const fetchReleases = useCallback(async (pageNum) => {
        if (pageNum === 1) setIsLoading(true);
        else setIsFetchingMore(true);

        try {
            const res = await fetch(`/api/github/releases?page=${pageNum}&limit=${RELEASES_PER_PAGE}`);
            if (!res.ok) throw new Error('Failed to fetch releases');
            const data = await res.json();
            setReleases(prev => [...prev, ...data.releases]);
            setHasMore(data.hasMore);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
            setIsFetchingMore(false);
        }
    }, []);

    useEffect(() => {
        fetchReleases(1);
    }, [fetchReleases]);

    const loadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchReleases(nextPage);
    };

    return (
        <>
            <div className="background-effects">
                <div className="background-grid"></div>
            </div>
            <section className="changelog-page-section">
                <div className="changelog-container">
                    <h1 className="changelog-main-title">Geliştirme Günlüğü</h1>
                    <p className="changelog-subtitle">
                        Tüm public projelerimdeki en son güncellemeler ve yeni sürümler.
                    </p>

                    <div className="changelog-feed">
                        {releases.map(release => (
                            <ChangelogItem key={release.url} release={release} />
                        ))}

                        {isLoading && Array.from({ length: 5 }).map((_, i) => <ChangelogSkeleton key={i} />)}

                        {isFetchingMore && <p style={{ textAlign: 'center' }}>Yükleniyor...</p>}

                        {!isLoading && releases.length === 0 && <p>Gösterilecek bir sürüm bulunamadı.</p>}
                    </div>

                    {hasMore && !isLoading && !isFetchingMore && (
                        <div className="load-more-container">
                            <button onClick={loadMore} className="cta-button">
                                Daha Fazla Yükle
                            </button>
                        </div>
                    )}

                    {!hasMore && !isLoading && (
                        <div className="end-of-feed-message">
                            <p>Tüm güncellemelere göz attınız.</p>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}