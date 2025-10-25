'use client';

import { useState, useEffect } from 'react';

export const useMediaQuery = (query: string): boolean => {
    const getInitialState = (): boolean => {
        if (typeof window === 'undefined') {
            return false;
        }
        return window.matchMedia(query).matches;
    };

    const [matches, setMatches] = useState<boolean>(getInitialState);

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }

        const mediaQueryList = window.matchMedia(query);

        const listener = (event: MediaQueryListEvent) => {
            setMatches(event.matches);
        };

        mediaQueryList.addEventListener('change', listener);

        const currentMatches = mediaQueryList.matches;
        if (currentMatches !== matches) {
            setMatches(currentMatches);
        }

        return () => {
            mediaQueryList.removeEventListener('change', listener);
        };
    }, [query, matches]);

    return matches;
};