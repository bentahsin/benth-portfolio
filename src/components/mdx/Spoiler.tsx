'use client';
import type { ReactNode } from 'react';

interface SpoilerProps {
    title: string;
    children: ReactNode;
}

export function Spoiler({ title, children }: SpoilerProps) {
    return (
        <details className="spoiler">
            <summary className="spoiler-title">{title}</summary>
            <div className="spoiler-content">
                {children}
            </div>
        </details>
    );
}