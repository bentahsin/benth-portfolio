'use client';

import { useState, useEffect } from 'react';

const GitHubIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 16 16" 
    width="16" 
    height="16" 
    fill="currentColor"
    className="github-icon"
  >
    <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-2.34 5.67c-.2.38-.38.38-.38.19l-.02-1.84c0-.62-.28-1.17-.79-1.62.18-.02.36-.04.54-.06 2.62-.3 4.8-1.58 4.8-4.54 0-.93-.33-1.78-.88-2.4.09-.23.38-1.13-.09-2.35 0 0-.93-.3-3.05 1.13A10.5 10.5 0 0 0 8 4.48a10.5 10.5 0 0 0-2.8.37C2.18 3.73 1.25 4.03 1.25 4.03c-.47 1.22-.18 2.12-.09 2.35-.55.62-.88 1.47-.88 2.4 0 2.96 2.18 4.24 4.8 4.54.18.02.36.04.54.06-.5.45-.79 1-.79 1.62l-.02 1.84c0 .19-.18.19-.38-.19A8.013 8.013 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
  </svg>
);


function timeAgo(date) {
    if (!date) return null;
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    const hours = Math.floor(seconds / 3600);
    if (hours < 3) return { text: "Şu an aktif", className: "active-now" };
    if (hours < 24) return { text: "Bugün aktifti", className: "active-today" };
    const days = Math.floor(hours / 24);
    if (days === 1) return { text: "Dün aktifti", className: "active-recent" };
    return null;
}

const StatusSkeleton = () => (
    <div className="github-status-badge skeleton">
        <div className="skeleton-icon"></div>
        <div className="skeleton-text"></div>
    </div>
);

export default function GitHubHeaderStatus() {
    const [status, setStatus] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // API isteği bir gecikmeyle gelsin ki skeleton'ı görelim (sadece test için)
         setTimeout(() => {
            fetch('/api/github')
                .then(res => res.ok ? res.json() : Promise.reject('API error'))
                .then(data => {
                    setStatus(timeAgo(data.lastActivityDate));
                })
                .catch(err => {
                    console.error("GitHub status error:", err);
                    setStatus(null); // Hata durumunda durumu temizle
                })
                .finally(() => {
                    setIsLoading(false); // Her durumda yüklenmeyi bitir
                });
         }, 1000); // Test için gecikme
    }, []);

    if (isLoading) {
        return <StatusSkeleton />;
    }

    if (!status) {
        return null; // Eğer aktivite çok eskiyse veya hata varsa hiçbir şey gösterme
    }

    return (
        <a href="https://github.com/bentahsin" target="_blank" rel="noopener noreferrer" className={`github-status-badge ${status.className}`}>
            <GitHubIcon />
            <span className="status-text">{status.text}</span>
        </a>
    );
}