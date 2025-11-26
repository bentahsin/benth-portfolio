'use server';

import prisma from '@/lib/prisma';
import { headers } from 'next/headers';
import { UAParser } from 'ua-parser-js';

interface GeoData {
    status: string;
    country: string;
    city: string;
    countryCode: string;
}

export async function trackVisit(pathname: string) {
    try {
        const headersList = await headers();
        const ip = headersList.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1';
        const userAgent = headersList.get('user-agent') || '';

        const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
        const existingVisit = await prisma.visit.findFirst({
        where: {
            ip: ip,
            path: pathname,
            createdAt: {
            gte: fiveMinutesAgo,
            },
        },
        });

        if (existingVisit) {
        return { success: true, saved: false };
        }

        let country = 'Bilinmiyor';
        let city = 'Bilinmiyor';
        let flag = null;

        if (ip !== '127.0.0.1' && ip !== '::1') {
        try {
            const geoRes = await fetch(`http://ip-api.com/json/${ip}`);
            if (geoRes.ok) {
            const geoData: GeoData = await geoRes.json();
            if (geoData.status === 'success') {
                country = geoData.country;
                city = geoData.city;
                flag = geoData.countryCode;
            }
            }
        } catch (err) {
            console.error('GeoIP Fetch Error:', err);
        }
        }

        const parser = new UAParser(userAgent);
        const browser = parser.getBrowser().name || 'Other';
        const os = parser.getOS().name || 'Other';
        const device = parser.getDevice().type || 'Desktop';

        await prisma.visit.create({
        data: {
            ip,
            path: pathname,
            country,
            city,
            flag,
            browser,
            os,
            device,
        },
        });

        return { success: true, saved: true };
    } catch (error) {
        console.error('Analytics Error:', error);
        return { success: false };
    }
}