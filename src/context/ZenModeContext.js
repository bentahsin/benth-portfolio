'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const ZenModeContext = createContext(undefined);

export function ZenModeProvider({ children }) {
    const [isZenMode, setIsZenMode] = useState(false);

    useEffect(() => {
        const savedZenMode = localStorage.getItem('zenMode') === 'true';
        setIsZenMode(savedZenMode);
    }, []);

    useEffect(() => {
        if (isZenMode) {
            document.body.setAttribute('data-zen-mode', 'true');
            localStorage.setItem('zenMode', 'true');
        } else {
            document.body.removeAttribute('data-zen-mode');
            localStorage.setItem('zenMode', 'false');
        }
    }, [isZenMode]);

    const toggleZenMode = () => {
        setIsZenMode(prev => !prev);
    };

    return (
        <ZenModeContext.Provider value={{ isZenMode, toggleZenMode }}>
            {children}
        </ZenModeContext.Provider>
    );
}

export const useZenMode = () => {
    const context = useContext(ZenModeContext);
    if (context === undefined) {
        throw new Error('useZenMode must be used within a ZenModeProvider');
    }
    return context;
};