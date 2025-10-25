'use client';

import './globals.css';
import { usePathname } from 'next/navigation';
import { Montserrat } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import type { ReactNode } from 'react';

import Providers from '@/components/Providers';
import { ZenModeProvider } from '@/context/ZenModeContext';
import BrowserWarningModal from '@/components/BrowserWarningModal';
import { useBrowser } from '@/hooks/useBrowser';
import ClientScripts from '@/components/ClientScripts';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-montserrat',
});

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const pathname = usePathname();
  const browserName = useBrowser(); 

  const bodyClassName = pathname.startsWith('/admin') ? 'admin-body' : '';

  return (
    <html lang="tr" className={montserrat.variable}>
      <head>
        <link rel="stylesheet" type='text/css' href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      </head>
      <body className={bodyClassName}>
        <Providers>
          <ZenModeProvider>
            {!pathname.startsWith('/admin') && <BrowserWarningModal browserName={browserName} />}
            {!pathname.startsWith('/admin') && <ClientScripts />}
            {children}
            <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || "G-FSZ6LLW6YP"} />
          </ZenModeProvider>
        </Providers>
      </body>
    </html>
  );
}