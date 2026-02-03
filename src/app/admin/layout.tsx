import '@/styles/admin.css';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTachometerAlt,
    faPen,
    faTags,
    faListUl,
    faHome,
    type IconDefinition
} from '@fortawesome/free-solid-svg-icons';

import SignOutButton from '@/components/admin/SignOutButton';
import AdminHeader from '@/components/admin/AdminHeader';

interface AdminLayoutProps {
    children: React.ReactNode;
}

interface NavItem {
    href: string;
    icon: IconDefinition;
    label: string;
}

const navItems: NavItem[] = [
    { href: '/admin', icon: faTachometerAlt, label: 'Dashboard' },
    { href: '/admin/posts', icon: faPen, label: 'Yazılar' },
    { href: '/admin/tags', icon: faTags, label: 'Etiketler' },
    { href: '/admin/visits', icon: faListUl, label: 'Ziyaretçiler' },
];

export const metadata = {
    title: {
        default: 'Dashboard',
        template: '%s | Admin Panel',
    },
    description: 'bentahsin Portfolyo CMS Yönetim Paneli',
    robots: {
        index: false,
        follow: false,
    },
};


export default async function AdminLayout({ children }: AdminLayoutProps): Promise<React.ReactElement> {
    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <div className="sidebar-header">
                    <Link href="/" className="sidebar-logo">bentahsin</Link>
                </div>
                <nav className="sidebar-nav">
                    <ul>
                        {navItems.map(item => (
                            <li key={item.href}>
                                <Link href={item.href}>
                                    <FontAwesomeIcon icon={item.icon} />
                                    <span>{item.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="sidebar-footer">
                    <Link href="/" className="sidebar-footer-link">
                        <FontAwesomeIcon icon={faHome} />
                        <span>Siteye Dön</span>
                    </Link>
                    <SignOutButton />
                </div>
            </aside>
            <div className="admin-main-content">
                <AdminHeader />
                <main className="admin-page-content">
                    {children}
                </main>
            </div>
        </div>
    );
}