'use client';

import { useState, useEffect } from 'react';
import { useZenMode } from '@/context/ZenModeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTimes } from '@fortawesome/free-solid-svg-icons';
import styles from './BrowserWarningModal.module.css';

export default function BrowserWarningModal({ browserName }) {
    const [isOpen, setIsOpen] = useState(false);
    const { toggleZenMode } = useZenMode();

    useEffect(() => {
        const hasBeenClosed = sessionStorage.getItem('browserWarningClosed') === 'true';

        if (['Chrome', 'Edge', 'Opera'].includes(browserName) && !hasBeenClosed) {
            const timer = setTimeout(() => {
                setIsOpen(true);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [browserName]);

    const handleClose = () => {
        setIsOpen(false);
        sessionStorage.setItem('browserWarningClosed', 'true');
    };

    const handleSwitchToZen = () => {
        toggleZenMode();
        handleClose();
    };

    if (!isOpen) {
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
                        Daha akıcı bir deneyim için, header'da bulunan
                        <span className={styles.iconExample}><FontAwesomeIcon icon={faEye} /></span>
                        butonuna tıklayarak <strong>Odak Modu</strong>'na geçebilirsiniz.
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
}