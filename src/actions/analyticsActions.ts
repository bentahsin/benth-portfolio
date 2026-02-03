"use server";

import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { UAParser } from "ua-parser-js";

interface GeoData {
  status: string;
  country: string;
  city: string;
  countryCode: string;
}

const BOT_PATTERNS = [
  "bot",
  "spider",
  "crawl",
  "slurp",
  "bingbot",
  "googlebot",
  "yandex",
  "duckduckgo",
  "baiduspider",
  "facebot",
  "facebookexternalhit",
  "twitterbot",
  "linkedinbot",
  "slackbot",
  "whatsapp",
];

export async function trackVisit(pathname: string, referrer: string | null) {
  try {
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
    const userAgent = headersList.get("user-agent") || "";

    const lowerUA = userAgent.toLowerCase();
    const isBot = BOT_PATTERNS.some((pattern) => lowerUA.includes(pattern));

    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
    const existingVisit = await prisma.visit.findFirst({
      where: {
        ip: ip,
        path: pathname,
        createdAt: {
          gte: tenMinutesAgo,
        },
      },
    });

    if (existingVisit) {
      return { success: true, saved: false };
    }

    let country = "Bilinmiyor";
    let city = "Bilinmiyor";
    let flag = null;

    if (ip !== "127.0.0.1" && ip !== "::1") {
      try {
        const geoRes = await fetch(`http://ip-api.com/json/${ip}`);
        if (geoRes.ok) {
          const geoData: GeoData = await geoRes.json();
          if (geoData.status === "success") {
            country = geoData.country;
            city = geoData.city;
            flag = geoData.countryCode;
          }
        }
      } catch (err) {
        console.error("GeoIP Fetch Error:", err);
      }
    }

    const parser = new UAParser(userAgent);
    const browser = parser.getBrowser().name || "Other";
    const os = parser.getOS().name || "Other";
    const device = parser.getDevice().type || "Desktop";

    let finalReferrer = referrer;
    if (
      finalReferrer &&
      finalReferrer.includes(
        process.env.NEXT_PUBLIC_SITE_URL || "bentahsin.com"
      )
    ) {
      finalReferrer = null;
    }

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
        referrer: finalReferrer,
        isBot,
      },
    });

    return { success: true, saved: true };
  } catch (error) {
    console.error("Analytics Error:", error);
    return { success: false };
  }
}

const PAGE_SIZE = 20;

export async function getPaginatedVisits(page: number) {
  try {
    const visits = await prisma.visit.findMany({
      take: PAGE_SIZE,
      skip: (page - 1) * PAGE_SIZE,
      orderBy: {
        createdAt: "desc",
      },
    });

    const totalCount = await prisma.visit.count();
    const hasMore = page * PAGE_SIZE < totalCount;

    return { success: true, data: visits, hasMore };
  } catch (error) {
    console.error("Ziyaretçi geçmişi alınamadı:", error);
    return { success: false, data: [], hasMore: false };
  }
}

export async function exportVisitsToCSV() {
  try {
    const visits = await prisma.visit.findMany({
      orderBy: { createdAt: "desc" },
      take: 10000,
    });

    if (!visits.length) return { success: false, message: "Veri yok" };

    const headers = [
      "ID",
      "IP",
      "Ulke",
      "Sehir",
      "Cihaz",
      "Tarayici",
      "OS",
      "Yol",
      "Referans",
      "Bot Mu",
      "Tarih",
    ];
    const rows = visits.map((v) => [
      v.id,
      v.ip,
      v.country || "Bilinmiyor",
      v.city || "Bilinmiyor",
      v.device || "Bilinmiyor",
      v.browser || "Bilinmiyor",
      v.os || "Bilinmiyor",
      v.path,
      v.referrer || "Direkt",
      v.isBot ? "Evet" : "Hayir",
      v.createdAt.toISOString(),
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
      ),
    ].join("\n");

    return { success: true, csv: csvContent };
  } catch (error) {
    console.error("CSV Export Hatası:", error);
    return { success: false, message: "Sunucu hatası" };
  }
}
