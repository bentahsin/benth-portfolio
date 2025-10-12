'use client';

import { useState, useEffect } from 'react';

export function useBrowser() {
    const [browserName, setBrowserName] = useState('unknown');

    useEffect(() => {
        const userAgent = navigator.userAgent;
        let name = 'unknown';

        if (userAgent.indexOf("Firefox") > -1) {
            name = "Firefox";
        } else if (userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1) {
            name = "Opera";
        } else if (userAgent.indexOf("Trident") > -1) {
            name = "Internet Explorer";
        } else if (userAgent.indexOf("Edge") > -1) {
            name = "Edge";
        } else if (userAgent.indexOf("Chrome") > -1) {
            name = "Chrome";
        } else if (userAgent.indexOf("Safari") > -1) {
            name = "Safari";
        }
        
        setBrowserName(name);
    }, []);

    return browserName;
}