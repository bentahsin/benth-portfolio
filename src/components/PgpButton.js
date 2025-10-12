'use client';

import { useState } from 'react';

export default function PgpButton({ pgpKey }) {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(pgpKey);
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 2000);
    };

    return (
        <button
            className={`cta-button secondary ${isCopied ? 'copied' : ''}`}
            onClick={handleCopy}
            title="PGP Public Anahtarını Kopyala"
        >
            {isCopied ? 'Kopyalandı!' : 'PGP Anahtarını Kopyala'}
        </button>
    );
}