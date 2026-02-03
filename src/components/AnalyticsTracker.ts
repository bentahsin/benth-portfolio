'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackVisit } from '@/actions/analyticsActions';

export default function AnalyticsTracker() {
    const pathname = usePathname();

    useEffect(() => {
        if (!pathname.startsWith('/admin') && !pathname.startsWith('/api')) {
        const referrer = document.referrer || null;
        trackVisit(pathname, referrer);
        }
    }, [pathname]);

    return null;
}