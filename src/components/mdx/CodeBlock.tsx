'use client';

import { useRef, useState } from 'react';
import type { ReactNode } from 'react';

export function CodeBlock({ children, ...props }: { children: ReactNode, [key: string]: any }) {
    const preRef = useRef<HTMLPreElement>(null);
    const [isCopied, setIsCopied] = useState(false);

    const lang = props['data-language'];
    const title = props['data-title'];

    const handleCopy = () => {
        if (preRef.current) {
            const code = preRef.current.querySelector('code');
            if (code) {
                navigator.clipboard.writeText(code.innerText);
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 2000);
            }
        }
    };

    return (
        <div className="code-block-wrapper">
            <div className="code-block-header">
                <span>{title || lang}</span>
                <button onClick={handleCopy} className="copy-button">
                    {isCopied ? '✓ Kopyalandı!' : '❐ Kopyala'}
                </button>
            </div>
            <pre {...props} ref={preRef}>
                {children}
            </pre>
        </div>
    );
}