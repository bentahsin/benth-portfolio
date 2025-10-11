'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const GitHubDataContext = createContext(null);

export function GitHubDataProvider({ children }) {
    const [githubData, setGithubData] = useState(null);

    useEffect(() => {
        fetch('/api/github')
            .then(res => res.json())
            .then(data => setGithubData(data))
            .catch(err => console.error("GitHub data provider error:", err));
    }, []);

    return (
        <GitHubDataContext.Provider value={githubData}>
            {children}
        </GitHubDataContext.Provider>
    );
}

export const useGitHubData = () => useContext(GitHubDataContext);