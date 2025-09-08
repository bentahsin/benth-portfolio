'use client';

import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer';
import { useState, useEffect } from 'react';
import styles from './CodeDiff.module.css';

const newStyles = {
  variables: {
    dark: {
      color: '#E2E8F0',
      background: '#0a0e16',
      addedBackground: '#044B53',
      addedColor: '#E2E8F0',
      removedBackground: '#632F34',
      removedColor: '#E2E8F0',
      wordAddedBackground: '#055d68',
      wordRemovedBackground: '#7f3a40',
      emptyLineBackground: '#161c29',
      gutterColor: '#A0AEC0', 
      gutterBackground: '#131925'
    },
  },
};

export default function CodeDiff({ oldCode, newCode }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <div className={styles.container}>
      <ReactDiffViewer
        oldValue={oldCode}
        newValue={newCode}
        splitView={!isMobile}
        compareMethod={DiffMethod.WORDS}
        styles={newStyles}
        useDarkTheme={true}
        leftTitle="Önce (Korunmasız Kod)"
        rightTitle="Sonra (BenthPatcher ile Güçlendirildi)"
        hideLineNumbers={true}
      />
    </div>
  );
}