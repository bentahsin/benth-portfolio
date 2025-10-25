'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Diff, Hunk, parseDiff } from 'react-diff-view';
import type { DiffProps, HunkData } from 'react-diff-view';
import { createPatch } from 'diff';
import 'react-diff-view/style/index.css';
import styles from './CodeDiff.module.css';

interface CodeDiffProps {
    oldCode: string;
    newCode: string;
    oldTitle?: string;
    newTitle?: string;
}

const CodeDiff: React.FC<CodeDiffProps> = ({
    oldCode,
    newCode,
    oldTitle = 'Önce',
    newTitle = 'Sonra'
}) => {

    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const hunks = useMemo((): HunkData[] => {
        const oldContent = oldCode?.trimEnd() ?? '';
        const newContent = newCode?.trimEnd() ?? '';

        if (oldContent === newContent) {
            return [];
        }

        try {
            const patch = createPatch(
                oldTitle,
                newTitle,
                oldContent,
                newContent
            );

            const files = parseDiff(patch);

            if (files && files.length > 0 && Array.isArray(files[0]?.hunks)) {

                return files[0].hunks as HunkData[];
            }
        } catch (error) {
            console.error("Diff oluşturulurken veya parse edilirken hata:", error);
        }

        return [];

    }, [oldCode, newCode, oldTitle, newTitle]);

    const viewType: DiffProps['viewType'] = isMobile ? 'unified' : 'split';

    if (!hunks || hunks.length === 0) {

        return (
            <div className={styles.container}>
                <div className={styles.titles}>
                    <h3>{oldTitle}</h3>
                    <h3>{newTitle}</h3>
                </div>
                <pre className={styles.rawCode}>{oldCode}</pre>
                <pre className={styles.rawCode}>{newCode}</pre>
                <p style={{textAlign: 'center', opacity: 0.7}}>(Kodlar arasında değişiklik bulunmuyor)</p>
            </div>
        );

    }

    return (

        <div className={styles.container}>
            {}
            <div className={styles.titles}>
                <h3>{oldTitle}</h3>
                <h3>{newTitle}</h3>
            </div>

            {}
            <Diff
                viewType={viewType}
                diffType={'modify'}
                hunks={hunks}
            >
                {(hunksToRender) =>
                    hunksToRender.map((hunk) => (

                        <Hunk key={hunk.content} hunk={hunk} />
                    ))
                }
            </Diff>
        </div>
    );
};

export default CodeDiff;