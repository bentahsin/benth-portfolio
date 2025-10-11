'use client';

import { useGitHubData } from './GitHubDataProvider';

function timeAgo(date) {
    if (!date) return null;
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    const days = Math.floor(seconds / (3600 * 24));
    if (days < 1) return "Bugün güncellendi - GitHub";
    if (days === 1) return "Dün güncellendi - GitHub";
    if (days < 30) return `${days} gün önce güncellendi - GitHub`;
    const months = Math.floor(days / 30);
    if (months === 1) return `1 ay önce güncellendi - GitHub`;
    return `${months} ay önce güncellendi - GitHub`;
}

export default function ProjectCardUpdateStatus({ slug }) {
    const githubData = useGitHubData();
    const lastUpdate = githubData?.repoUpdates?.[slug];

    if (!lastUpdate) return null;

    return (
        <div className="project-update-status">
            {timeAgo(lastUpdate)}
        </div>
    );
}