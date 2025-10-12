'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import GitHubHeaderStatus from './GitHub/GitHubHeaderStatus';
import SpotifyHeaderStatus from './Spotify/SpotifyHeaderStatus';
import ZenModeToggle from './ZenModeToggle';

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const pathname = usePathname();
    const desktopMenuRef = useRef(null);


    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        setIsMobileMenuOpen(false);
        setIsDesktopMenuOpen(false);
    }, [pathname]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (desktopMenuRef.current && !desktopMenuRef.current.contains(event.target)) {
                setIsDesktopMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [desktopMenuRef]);

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const toggleDesktopMenu = () => setIsDesktopMenuOpen(!isDesktopMenuOpen);
    
    const handleLinkClick = () => {
        setIsMobileMenuOpen(false);
        setIsDesktopMenuOpen(false);
    };

    const secondaryLinks = (
        <>
            <li><Link href="/now" onClick={handleLinkClick}>Şimdi</Link></li>
            <li><Link href="/changelog" onClick={handleLinkClick}>Güncellemeler</Link></li>
            <li><Link href="/contributions" onClick={handleLinkClick}>Katkılar</Link></li>
        </>
    );

    const MobileNavPortal = isClient && (
        createPortal(
            <ul className="mobile-nav" data-visible={isMobileMenuOpen}>
                <li><a href="/#about" onClick={handleLinkClick}>Hakkımda</a></li>
                <li><a href="/#skills" onClick={handleLinkClick}>Yeteneklerim</a></li>
                <li><a href="/#projects" onClick={handleLinkClick}>Projelerim</a></li>
                <li><a href="/#contact" onClick={handleLinkClick}>İletişim</a></li>
                <hr className="nav-divider" />
                {secondaryLinks}
            </ul>,
            document.body
        )
    );

    return (
        <header className="navbar">
            <nav>
                <div className="logo-container">
                    <Link href="/" className="logo">bentahsin</Link>
                    <GitHubHeaderStatus />
                    <SpotifyHeaderStatus />
                    <ZenModeToggle />
                </div>
                
                <div className="nav-actions">

                    <ul className="desktop-nav">
                        <li><a href="/#about">Hakkımda</a></li>
                        <li><a href="/#skills">Yeteneklerim</a></li>
                        <li><a href="/#projects">Projelerim</a></li>
                        <li><a href="/#contact">İletişim</a></li>
                        <li className="desktop-dropdown-container" ref={desktopMenuRef}>
                            <button onClick={toggleDesktopMenu} aria-expanded={isDesktopMenuOpen}>
                                Daha Fazla
                            </button>
                            <ul className="desktop-dropdown-menu" data-visible={isDesktopMenuOpen}>
                                {secondaryLinks}
                            </ul>
                        </li>
                    </ul>

                    <button
                        className="mobile-nav-toggle"
                        aria-expanded={isMobileMenuOpen}
                        onClick={toggleMobileMenu}
                    >
                        <span className="sr-only">Menu</span>
                    </button>
                </div>
            </nav>
            {MobileNavPortal}
        </header>
    );
}