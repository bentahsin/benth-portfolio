'use client';

import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { GoogleAnalytics } from '@next/third-parties/google';

import Providers from '@/components/Providers';
import { ZenModeProvider } from '@/context/ZenModeContext';
import BrowserWarningModal from '@/components/BrowserWarningModal';
import { useBrowser } from '@/hooks/useBrowser';
import ClientScripts from '@/components/ClientScripts';
import AnalyticsTracker from '@/components/AnalyticsTracker';

interface ClientRootLayoutProps {
  children: ReactNode;
}

export default function ClientRootLayout({ children }: ClientRootLayoutProps) {
  const pathname = usePathname();
  const browserName = useBrowser();
  const bodyClassName = pathname.startsWith('/admin') ? 'admin-body' : '';

  useEffect(() => {
    document.body.className = bodyClassName;
    return () => {
      if (document.body.className === bodyClassName) {
        document.body.className = '';
      }
    };
  }, [bodyClassName]);

  return (
    <>
      <Providers>
        <ZenModeProvider>
          <AnalyticsTracker />
          {!pathname.startsWith('/admin') && <BrowserWarningModal browserName={browserName} />}
          {!pathname.startsWith('/admin') && <ClientScripts />}
          {children}
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || 'G-FSZ6LLW6YP'} />
        </ZenModeProvider>
      </Providers>
    </>
  );
}
