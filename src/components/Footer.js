import Link from 'next/link';
import SpotifyFooter from './Spotify/SpotifyFooter';

export default function Footer() {
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
            <li><a href="/#about">Hakkımda</a></li>
            <li><a href="/#skills">Yeteneklerim</a></li>
            <li><a href="/#projects">Projelerim</a></li>
            <li><a href="/#contact">İletişim</a></li>
          </ul>
        </div>
        
        <div className="footer-col social-col">
          <h4>Sosyal Medya</h4>
          <div className="footer-social-links">
            <a href="https://github.com/bentahsin" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            </a>
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