'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { FC } from 'react';

import GitHubHeaderStatus from './GitHub/GitHubHeaderStatus';
import SpotifyHeaderStatus from './Spotify/SpotifyHeaderStatus';
import ZenModeToggle from './ZenModeToggle';

interface NavLink {
    href: string;
    label: string;
}

const primaryLinks: NavLink[] = [
    { href: '/#about', label: 'Hakkımda' },
    { href: '/#skills', label: 'Yeteneklerim' },
    { href: '/#projects', label: 'Projelerim' },
    { href: '/blog', label: 'Blog' },
    { href: '/#contact', label: 'İletişim' },
];

const secondaryLinks: NavLink[] = [
    { href: '/now', label: 'Şimdi' },
    { href: '/changelog', label: 'Güncellemeler' },
    { href: '/contributions', label: 'Katkılar' },
];


const Header: FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const pathname = usePathname();
    const desktopMenuRef = useRef<HTMLLIElement | null>(null);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        setIsMobileMenuOpen(false);
        setIsDesktopMenuOpen(false);
    }, [pathname]);

    useEffect(() => {
        function handleClickOutside(event: globalThis.MouseEvent) {
            if (desktopMenuRef.current && !desktopMenuRef.current.contains(event.target as Node)) {
                setIsDesktopMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [desktopMenuRef]);

    const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);
    const toggleDesktopMenu = () => setIsDesktopMenuOpen(prev => !prev);

    const handleLinkClick = () => {
        setIsMobileMenuOpen(false);
        setIsDesktopMenuOpen(false);
    };

    const NavLinks = ({ links }: { links: NavLink[] }) => (
        <>
            {links.map(link => (
                <li key={link.href}>
                    <Link href={link.href} onClick={handleLinkClick}>
                        {link.label}
                    </Link>
                </li>
            ))}
        </>
    );

    const MobileNavPortal = isClient && (
        createPortal(
            <ul className="mobile-nav" data-visible={isMobileMenuOpen}>
                <NavLinks links={primaryLinks} />
                <hr className="nav-divider" />
                <NavLinks links={secondaryLinks} />
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
                        <NavLinks links={primaryLinks} />
                        <li className="desktop-dropdown-container" ref={desktopMenuRef}>
                            <button onClick={toggleDesktopMenu} aria-expanded={isDesktopMenuOpen}>
                                Daha Fazla
                            </button>
                            <ul className="desktop-dropdown-menu" data-visible={isDesktopMenuOpen}>
                                <NavLinks links={secondaryLinks} />
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

export default Header;