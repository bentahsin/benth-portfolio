'use client';

import { useState } from 'react';
import type { FC } from 'react';

interface PgpButtonProps {
    pgpKey: string;
}

const PgpButton: FC<PgpButtonProps> = ({ pgpKey }) => {
    const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'error'>('idle');

    const handleCopy = () => {
        navigator.clipboard.writeText(pgpKey)
            .then(() => {
                setCopyStatus('copied');
                setTimeout(() => setCopyStatus('idle'), 2000);
            })
            .catch(err => {
                console.error('PGP anahtarı kopyalanamadı:', err);
                setCopyStatus('error');
                setTimeout(() => setCopyStatus('idle'), 3000);
            });
    };

    const buttonStates = {
        idle: { text: 'PGP Anahtarını Kopyala', className: '' },
        copied: { text: 'Kopyalandı!', className: 'copied' },
        error: { text: 'Hata Oluştu!', className: 'error' },
    };

    const currentStatus = buttonStates[copyStatus];

    return (
        <button
            className={`cta-button secondary ${currentStatus.className}`}
            onClick={handleCopy}
            title="PGP Public Anahtarını Kopyala"
            disabled={copyStatus !== 'idle'}
        >
            {currentStatus.text}
        </button>
    );
}

export default PgpButton;