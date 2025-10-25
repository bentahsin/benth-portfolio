'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCodeBranch, faCircle } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

interface GitHubCardProps {
    repo: string;
}

interface RepoData {
    name: string;
    description: string;
    stars: number;
    forks: number;
    language: string;
    url: string;
}

const languageColors: { [key: string]: string } = {
    'TypeScript': '#3178c6',
    'JavaScript': '#f1e05a',
    'Java': '#b07219',
    'C++': '#f34b7d',
    'C#': '#178600',
    'Python': '#3572A5',
};

const Skeleton = () => (
    <div className="github-card skeleton">
        <div className="skeleton-line title" style={{ width: '50%' }}></div>
        <div className="skeleton-line text"></div>
        <div className="skeleton-line text short"></div>
    </div>
);


export function GitHubCard({ repo }: GitHubCardProps) {
    const [data, setData] = useState<RepoData | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchRepoData() {
            try {
                const response = await fetch(`/api/github/repo?repo=${repo}`);
                if (!response.ok) {
                    throw new Error('Repo verisi alınamadı.');
                }
                const repoData = await response.json();
                setData(repoData);
            } catch (err) {
                setError((err as Error).message);
            }
        }
        fetchRepoData();
    }, [repo]);

    if (error) {
        return <div className="github-card error">Hata: {repo} reposu yüklenemedi.</div>;
    }

    if (!data) {
        return <Skeleton />;
    }

    const langColor = languageColors[data.language] || '#c2c2c2';

    return (
        <a href={data.url} target="_blank" rel="noopener noreferrer" className="github-card">
            <div className="card-header">
                <FontAwesomeIcon icon={faGithub} />
                <span className="repo-name">{data.name}</span>
            </div>
            <p className="repo-description">{data.description}</p>
            <div className="card-footer">
                <div className="repo-stats">
                    {data.language && (
                        <span className="stat-item">
                            <FontAwesomeIcon icon={faCircle} style={{ color: langColor }} className="lang-icon" />
                            {data.language}
                        </span>
                    )}
                    <span className="stat-item">
                        <FontAwesomeIcon icon={faStar} />
                        {data.stars}
                    </span>
                    <span className="stat-item">
                        <FontAwesomeIcon icon={faCodeBranch} />
                        {data.forks}
                    </span>
                </div>
            </div>
        </a>
    );
}