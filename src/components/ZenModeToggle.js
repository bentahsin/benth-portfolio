'use client';

import { useZenMode } from '@/context/ZenModeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default function ZenModeToggle() {
    const { isZenMode, toggleZenMode } = useZenMode();

    return (
        <button 
            className="zen-mode-toggle"
            onClick={toggleZenMode}
            title={isZenMode ? "Odak Modundan Çık" : "Odak Moduna Geç"}
            aria-label={isZenMode ? "Odak Modundan Çık" : "Odak Moduna Geç"}
        >
            <FontAwesomeIcon icon={isZenMode ? faEyeSlash : faEye} />
        </button>
    );
}