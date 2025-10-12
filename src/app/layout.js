'use client';

import './globals.css';
import ClientScripts from '@/components/ClientScripts';
import { ZenModeProvider } from '@/context/ZenModeContext';
import BrowserWarningModal from '@/components/BrowserWarningModal';
import { useBrowser } from '@/hooks/useBrowser';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-montserrat',
});


export default function RootLayout({ children }) {
  const browserName = useBrowser(); 
  return (
    <html lang="tr" className={`${montserrat.variable}`}>
      <head>
        <link rel="stylesheet" type='text/css' href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      </head>
      <body>
        <ZenModeProvider>
          <BrowserWarningModal browserName={browserName} />
          {children}
          <ClientScripts />
        </ZenModeProvider>
      </body>
    </html>
  );
}