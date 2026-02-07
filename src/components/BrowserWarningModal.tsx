'use client';

import React from 'react';;
import { useState, useEffect } from 'react';
import { useZenMode } from '@/context/ZenModeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTimes } from '@fortawesome/free-solid-svg-icons';
import styles from './BrowserWarningModal.module.css';

interface BrowserWarningModalProps {
    browserName: string;
}

const BrowserWarningModal: React.FC<BrowserWarningModalProps> = ({ browserName }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const { isZenMode, toggleZenMode } = useZenMode();

    useEffect(() => {
        const isMobileDevice = /Mobi|Android/i.test(navigator.userAgent);
        setIsMobile(isMobileDevice);
    }, []);

    useEffect(() => {
        if (isMobile || isZenMode) return;

        const hasBeenClosed = sessionStorage.getItem('browserWarningClosed') === 'true';

        if (['Chrome', 'Edge', 'Opera'].includes(browserName) && !hasBeenClosed) {
            const timer = setTimeout(() => {
                setIsOpen(true);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [browserName, isMobile, isZenMode]);

    const handleClose = () => {
        setIsOpen(false);
        sessionStorage.setItem('browserWarningClosed', 'true');
    };

    const handleSwitchToZen = () => {
        toggleZenMode();
        handleClose();
    };

    if (isMobile || isZenMode || !isOpen) {
        return null;
    }

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <button onClick={handleClose} className={styles.closeButton} aria-label="Kapat">
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                <div className={styles.content}>
                    <h3>Tarayıcı Uyarısı</h3>
                    <p>
                        <strong>{browserName}</strong> kullandığınızı fark ettik. Bu tarayıcıda sitemizin bazı görsel efektleri beklenen akıcılıkta çalışmayabilir.
                    </p>
                    <p>
                        Daha akıcı bir deneyim için, header&apos;da bulunan
                        <span className={styles.iconExample}><FontAwesomeIcon icon={faEye} /></span>
                        butonuna tıklayarak <strong>Odak Modu</strong>&apos;na geçebilirsiniz.
                    </p>
                </div>
                <div className={styles.actions}>
                    <button onClick={handleSwitchToZen} className={styles.actionButtonPrimary}>
                        Odak Moduna Geç
                    </button>
                    <button onClick={handleClose} className={styles.actionButtonSecondary}>
                        Kapat
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BrowserWarningModal;
