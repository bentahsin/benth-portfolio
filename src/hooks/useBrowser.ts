'use client';

import { useState, useEffect } from 'react';

type BrowserName = "Firefox" | "Opera" | "Internet Explorer" | "Edge" | "Chrome" | "Safari" | "unknown";

export function useBrowser(): BrowserName {
    const [browserName, setBrowserName] = useState<BrowserName>('unknown');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const userAgent = navigator.userAgent;
            let name: BrowserName = 'unknown';

            if (userAgent.indexOf("Firefox") > -1) {
                name = "Firefox";
            } else if (userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1) {
                name = "Opera";
            } else if (userAgent.indexOf("Edg") > -1) {
                name = "Edge";
            } else if (userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Edg") === -1) {
                name = "Chrome";
            } else if (userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") === -1) {
                name = "Safari";
            } else if (userAgent.indexOf("Trident") > -1) {
                name = "Internet Explorer";
            }
            setBrowserName(name);
        }
    }, []);

    return browserName;
}