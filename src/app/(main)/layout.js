import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';
import ScrollToTopButton from '@/components/ScrollToTopButton';

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

export default function MainLayout({ children }) {
  return (
    <>
      <div className="cursor-dot"></div>      {}
      <div className="cursor-outline"></div>  {}
      <ParticleBackground />
      <Header />
      {children}
      <Footer />
      <ScrollToTopButton />
    </>
  );
}