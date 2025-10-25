import Link from 'next/link';
import type { FC } from 'react';
import SpotifyFooter from './Spotify/SpotifyFooter';
import GitHubIcon from '@/components/Icons/GithubIcon';

interface NavLink {
  href: string;
  label: string;
}

const quickLinks: NavLink[] = [
  { href: '/#about', label: 'Hakkımda' },
  { href: '/#skills', label: 'Yeteneklerim' },
  { href: '/#projects', label: 'Projelerim' },
  { href: '/#contact', label: 'İletişim' },
];

const otherPages: NavLink[] = [
  { href: '/now', label: 'Şimdi' },
  { href: '/changelog', label: 'Güncellemeler' },
  { href: '/contributions', label: 'Katkılar' },
];

const socialLinks = [
    {
        href: "https://github.com/bentahsin",
        label: "GitHub",
        icon: <GitHubIcon />
    },
];

const Footer: FC = () => {
  return (
    <footer className="main-footer">
      <div className="footer-content">
        <div className="footer-col about-col">
          <Link href="/" className="footer-logo">bentahsin</Link>
          <p>Karmaşık problemlere radikal ve sağlam çözümler üreten bir yazılım geliştiricisi.</p>
        </div>
        <div className="footer-col links-col">
          <h4>Hızlı Linkler</h4>
          <ul>
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-col links-col">
            <h4>Diğer Sayfalar</h4>
            <ul>
                {otherPages.map((link) => (
                    <li key={link.href}>
                        <Link href={link.href}>{link.label}</Link>
                    </li>
                ))}
            </ul>
        </div>
        <div className="footer-col social-col">
          <h4>Sosyal Medya</h4>
          <div className="footer-social-links">
            {socialLinks.map((social) => (
                <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                >
                    {social.icon}
                </a>
            ))}
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Ben Tahsin. Tüm hakları saklıdır.</p>
        <SpotifyFooter />
      </div>
    </footer>
  );
}

export default Footer;