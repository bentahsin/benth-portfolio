'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

interface UserProfile {
    name?: string | null;
    email?: string | null;
    image?: string | null;
}

export default function AdminHeader() {
    const { data: session, status } = useSession();
    const user: UserProfile | undefined = session?.user;

    if (status === "loading") {
        return (
            <header className="admin-header">
                <div className="header-title">
                    <h2>Yükleniyor...</h2>
                </div>
                <div className="header-user-profile skeleton">
                    <div className="skeleton-text"></div>
                    <div className="skeleton-avatar"></div>
                </div>
            </header>
        );
    }

    return (
        <header className="admin-header">
            <div className="header-title">
                <h2>Dashboard</h2>
            </div>

            {user && (
                <Link href="/profil" className="header-user-profile" title="Profil Ayarları">
                    <span>{user.name || user.email}</span>
                    {user.image && (
                        <Image
                            src={user.image}
                            alt={user.name || 'Profil Fotoğrafı'}
                            width={32}
                            height={32}
                            className="user-avatar"
                        />
                    )}
                </Link>
            )}
        </header>
    );
}