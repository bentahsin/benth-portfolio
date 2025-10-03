// File: app/layout.js

import './globals.css';
import ClientScripts from '@/components/ClientScripts';

const siteUrl = 'https://bentahsin.com';

export const metadata = {
  title: {
    default: 'bentahsin | Backend & Minecraft Eklenti Geliştiricisi',
    template: '%s | bentahsin Portfolio',
  },
  description: 'Yazılımda karmaşık problemlere radikal ve sağlam çözümler üreten bir Backend ve Minecraft Eklenti Geliştiricisi.',
  keywords: ['Backend Developer', 'Minecraft Plugin Developer', 'Java', 'C#', 'C++', 'Node.js', 'Next.js', 'bentahsin', 'Tahsin'],
  authors: [{ name: 'Tahsin', url: siteUrl }],
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  openGraph: {
    title: 'bentahsin | Backend & Minecraft Eklenti Geliştiricisi',
    description: 'Yazılımda karmaşık problemlere radikal ve sağlam çözümler üreten bir Backend ve Minecraft Eklenti Geliştiricisi.',
    url: siteUrl,
    siteName: 'bentahsin Portfolio',
    images: [
      {
        url: `${siteUrl}/social-card.png`,
        width: 1200,
        height: 630,
        alt: 'bentahsin Portfolio Social Card',
      },
    ],
    locale: 'tr_TR',
    type: 'website',
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'bentahsin | Backend & Minecraft Eklenti Geliştiricisi',
    description: 'Yazılımda karmaşık problemlere radikal ve sağlam çözümler üreten bir Backend ve Minecraft Eklenti Geliştiricisi.',
    images: [`${siteUrl}/social-card.png`],
  },
  
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <head>
        {}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link rel="stylesheet" type='text/css' href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@700;800&family=Roboto:wght@400;500&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      </head>
      <body>
        {children}
        <ClientScripts />
      </body>
    </html>
  );
}