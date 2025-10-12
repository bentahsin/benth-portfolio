'use client';

import { unstable_ViewTransition as ViewTransition } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ProjectCardLink({ href, children }) {
    const router = useRouter();

    const handleClick = (e) => {
        e.preventDefault();
        
        ViewTransition(() => {
            router.push(href);
        });
    };

    return (
        <Link href={href} onClick={handleClick}>
            {children}
        </Link>
    );
}