'use client';

import { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCodePullRequest } from '@fortawesome/free-solid-svg-icons';

const CONTRIBUTIONS_PER_PAGE = 10;

const ContributionSkeleton = () => (
    <div className="contribution-card skeleton">
        <div className="skeleton-line title" style={{ width: '70%' }}></div>
        <div className="skeleton-line text" style={{ width: '40%' }}></div>
    </div>
);

export default function ContributionsPage() {
    const [contributions, setContributions] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [isFetchingMore, setIsFetchingMore] = useState(false);

    const fetchContributions = useCallback(async (pageNum) => {
        if (pageNum === 1) setIsLoading(true);
        else setIsFetchingMore(true);

        try {
            const res = await fetch(`/api/github/contributions?page=${pageNum}&limit=${CONTRIBUTIONS_PER_PAGE}`);
            if (!res.ok) throw new Error('Failed to fetch contributions');
            const data = await res.json();
            
            setContributions(prev => [...prev, ...data.contributions]);
            setHasMore(data.hasMore);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
            setIsFetchingMore(false);
        }
    }, []);

    useEffect(() => {
        fetchContributions(1);
    }, [fetchContributions]);

    const loadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchContributions(nextPage);
    };

    return (
        <>
            <div className="background-effects">
                <div className="background-grid"></div>
            </div>
            <section className="contributions-page-section">
                <div className="contributions-container">
                    <h1 className="contributions-main-title">Açık Kaynak Katkılarım</h1>
                    <p className="contributions-subtitle">
                        Yazılım topluluğuna yaptığım ve birleştirilmiş (merged) Pull Request'lerin bir listesi.
                    </p>
                    <div className="contributions-list">
                        {contributions.map(pr => (
                            <a key={pr.id} href={pr.url} target="_blank" rel="noopener noreferrer" className="contribution-card">
                                <div className="contribution-icon">
                                    <FontAwesomeIcon icon={faCodePullRequest} />
                                </div>
                                <div className="contribution-details">
                                    <span className="contribution-title">{pr.title}</span>
                                    <span className="contribution-repo">
                                        Katkıda bulunuldu: <strong>{pr.repoName}</strong>
                                    </span>
                                </div>
                                <div className="contribution-date">
                                    {new Date(pr.createdAt).toLocaleDateString('tr-TR', { year: 'numeric', month: 'short' })}
                                </div>
                            </a>
                        ))}
                        {isLoading && Array.from({ length: 5 }).map((_, i) => <ContributionSkeleton key={i} />)}
                        {isFetchingMore && <p style={{ textAlign: 'center' }}>Yükleniyor...</p>}
                        {!isLoading && contributions.length === 0 && <p>Gösterilecek bir katkı bulunamadı.</p>}
                    </div>

                    {hasMore && !isLoading && !isFetchingMore && (
                        <div className="load-more-container">
                            <button onClick={loadMore} className="cta-button">
                                Daha Fazla Yükle
                            </button>
                        </div>
                    )}

                    {!hasMore && !isLoading && contributions.length > 0 && (
                        <div className="end-of-feed-message">
                            <p>Tüm katkılarıma göz attınız.</p>
                        </div>
                    )}

                </div>
            </section>
        </>
    );
}