'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

interface ZenModeContextType {
    isZenMode: boolean;
    toggleZenMode: () => void;
}

const ZenModeContext = createContext<ZenModeContextType | undefined>(undefined);

interface ZenModeProviderProps {
    children: ReactNode;
}

export const ZenModeProvider: React.FC<ZenModeProviderProps> = ({ children }) => {
    const [isZenMode, setIsZenMode] = useState<boolean>(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedZenMode = localStorage.getItem('zenMode') === 'true';
            setIsZenMode(savedZenMode);
        }
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (isZenMode) {
                document.body.setAttribute('data-zen-mode', 'true');
                localStorage.setItem('zenMode', 'true');
            } else {
                document.body.removeAttribute('data-zen-mode');
                localStorage.setItem('zenMode', 'false');
            }
        }
    }, [isZenMode]);

    const toggleZenMode = useCallback(() => {
        setIsZenMode(prev => !prev);
    }, []);

    const contextValue: ZenModeContextType = {
        isZenMode,
        toggleZenMode,
    };

    return (
        <ZenModeContext.Provider value={contextValue}>
            {children}
        </ZenModeContext.Provider>
    );
}

export const useZenMode = (): ZenModeContextType => {
    const context = useContext(ZenModeContext);
    if (context === undefined) {
        throw new Error('useZenMode must be used within a ZenModeProvider');
    }
    return context;
};