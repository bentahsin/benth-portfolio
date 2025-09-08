import './globals.css';
import ClientScripts from '@/components/ClientScripts';

export const metadata = {
  title: 'bentahsin | Backend Developer',
  description: 'Radical Solutions to Complex Problems',
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