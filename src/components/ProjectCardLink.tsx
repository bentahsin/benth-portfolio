'use client';

import { type FC, type ReactNode, type MouseEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface ProjectCardLinkProps {
    href: string;
    children: ReactNode;
}

const ProjectCardLink: FC<ProjectCardLinkProps> = ({ href, children }) => {
    const router = useRouter();

    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
        if (!document.startViewTransition) {
            return;
        }

        e.preventDefault();
        document.startViewTransition(() => {
            router.push(href);
        });
    };

    return (
        <Link href={href} onClick={handleClick}>
            {children}
        </Link>
    );
}

export default ProjectCardLink;