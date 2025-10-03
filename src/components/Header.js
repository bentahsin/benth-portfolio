import Link from 'next/link'; 

export default function Header() {
  return (
    <header className="navbar">
      <nav>
        <Link href="/" className="logo">bentahsin</Link>
        <ul>
          <li><a href="/#about">Hakkımda</a></li>
          <li><a href="/#skills">Yeteneklerim</a></li>
          <li><a href="/#projects">Projelerim</a></li>
          <li><a href="/#contact">İletişim</a></li>
        </ul>
        <button className="mobile-nav-toggle" aria-controls="primary-navigation" aria-expanded="false">
          <span className="sr-only">Menu</span>
        </button>
      </nav>
    </header>
  );
}