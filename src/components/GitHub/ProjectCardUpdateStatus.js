'use client';

import { useGitHubData } from './GitHubDataProvider';
import Link from 'next/link';

function timeAgo(date) {
    if (!date) return null;
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    const days = Math.floor(seconds / (3600 * 24));
    if (days < 1) return "Bugün güncellendi";
    if (days === 1) return "Dün güncellendi";
    if (days < 30) return `${days} gün önce güncellendi`;
    const months = Math.floor(days / 30);
    if (months === 1) return `1 ay önce güncellendi`;
    return `${months} ay önce güncellendi`;
}

export default function ProjectCardUpdateStatus({ slug }) {
    const githubData = useGitHubData();
    const repoDetails = githubData?.repoUpdates?.[slug];

    if (!repoDetails) return null;

    const timeAgoText = timeAgo(repoDetails.pushed_at);

    if (repoDetails.html_url) {
        return (
            <Link
                href={repoDetails.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="project-update-status"
                title={`En son commit'i görüntüle`}
            >
                {timeAgoText}
            </Link>
        );
    }

    return (
        <span className="project-update-status no-link">
            {timeAgoText}
        </span>
    );
}