import './globals.css';
import { Montserrat } from 'next/font/google';
import type { ReactNode } from 'react';

import { isCurrentIpBlocked } from '@/actions/ipActions';
import ClientRootLayout from '@/components/ClientRootLayout';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-montserrat',
});

export const dynamic = 'force-dynamic';

interface RootLayoutProps {
  children: ReactNode;
}

function AccessDenied() {
  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#0f0f0f',
      color: '#fff',
      fontFamily: 'sans-serif'
    }}>
      <h1 style={{ fontSize: '3rem', color: '#ff4444' }}>403</h1>
      <h2>Erişim Reddedildi</h2>
      <p>IP adresiniz güvenlik nedeniyle engellenmiştir.</p>
    </div>
  );
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const isBlocked = await isCurrentIpBlocked();
  if (isBlocked) {
    return (
      <html lang="tr">
        <body>
          <AccessDenied />
        </body>
      </html>
    );
  }

  return (
    <html lang="tr" className={montserrat.variable}>
      <head>
        <link rel="stylesheet" type='text/css' href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      </head>
      <body>
        <ClientRootLayout>
          {children}
        </ClientRootLayout>
      </body>
    </html>
  );
}