'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBold,
    faItalic,
    faUnderline,
    faStrikethrough,
    faLink,
    faQuoteRight,
    faCode,
    faFileCode,
    faListUl,
    faListOl,
    faMinus,
    faUndo,
    faRedo,
    faColumns,
    faBarsStaggered,
    faInfoCircle,
    faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';

interface EditorToolbarProps {
    onFormat: (start: string, end?: string, placeholder?: string) => void;
    onLink: () => void;
    onCodeBlock: () => void;
    onLinePrefix: (prefix: string) => void;
    undo: () => void;
    redo: () => void;
    canUndo: boolean;
    canRedo: boolean;
    layout: 'side-by-side' | 'stacked';
    setLayout: (layout: 'side-by-side' | 'stacked') => void;
    onCallout: () => void;
    onSpoiler: () => void;
}

export default function EditorToolbar({
    onFormat,
    onLink,
    onCodeBlock,
    onLinePrefix,
    undo,
    redo,
    canUndo,
    canRedo,
    layout,
    setLayout,
    onCallout,
    onSpoiler,
}: EditorToolbarProps) {
    return (
        <div className="editor-toolbar">
            <div>
                <button type="button" onClick={undo} disabled={!canUndo} title="Geri Al (Ctrl+Z)">
                    <FontAwesomeIcon icon={faUndo} />
                </button>
                <button type="button" onClick={redo} disabled={!canRedo} title="Yinele (Ctrl+Y)">
                    <FontAwesomeIcon icon={faRedo} />
                </button>

                <span className="toolbar-divider"></span>

                <button type="button" onClick={() => onFormat('**')} title="Kalın">
                    <FontAwesomeIcon icon={faBold} />
                </button>
                <button type="button" onClick={() => onFormat('*')} title="İtalik">
                    <FontAwesomeIcon icon={faItalic} />
                </button>
                <button type="button" onClick={() => onFormat('<u>', '</u>', 'altı çizili')} title="Altı Çizili (Ctrl+U)">
                    <FontAwesomeIcon icon={faUnderline} />
                </button>
                <button type="button" onClick={() => onFormat('~~')} title="Üstü Çizili">
                    <FontAwesomeIcon icon={faStrikethrough} />
                </button>

                <span className="toolbar-divider"></span>

                <button type="button" onClick={onLink} title="Link Ekle">
                    <FontAwesomeIcon icon={faLink} />
                </button>
                <button type="button" onClick={() => onLinePrefix('> ')} title="Alıntı">
                    <FontAwesomeIcon icon={faQuoteRight} />
                </button>
                <button type="button" onClick={() => onLinePrefix('- ')} title="Sırasız Liste">
                    <FontAwesomeIcon icon={faListUl} />
                </button>
                <button type="button" onClick={() => onLinePrefix('1. ')} title="Sıralı Liste">
                    <FontAwesomeIcon icon={faListOl} />
                </button>
                <button type="button" onClick={() => onFormat('\n---\n', '')} title="Yatay Çizgi">
                    <FontAwesomeIcon icon={faMinus} />
                </button>

                <span className="toolbar-divider"></span>

                <button type="button" onClick={() => onFormat('`')} title="Satır İçi Kod">
                    <FontAwesomeIcon icon={faCode} />
                </button>
                <button type="button" onClick={onCodeBlock} title="Kod Bloğu">
                    <FontAwesomeIcon icon={faFileCode} />
                </button>

                <span className="toolbar-divider"></span>
                <button type="button" onClick={onCallout} title="Bilgi Kutusu Ekle">
                    <FontAwesomeIcon icon={faInfoCircle} />
                </button>
                <button type="button" onClick={onSpoiler} title="Spoiler/Genişletilebilir Kutu Ekle">
                    <FontAwesomeIcon icon={faEyeSlash} />
                </button>
            </div>

            <div className="layout-toggle">
                <button
                    type="button"
                    onClick={() => setLayout('side-by-side')}
                    className={layout === 'side-by-side' ? 'active' : ''}
                    title="Yan Yana Görünüm"
                >
                    <FontAwesomeIcon icon={faColumns} />
                </button>
                <button
                    type="button"
                    onClick={() => setLayout('stacked')}
                    className={layout === 'stacked' ? 'active' : ''}
                    title="Alt Alta Görünüm"
                >
                    <FontAwesomeIcon icon={faBarsStaggered} />
                </button>
            </div>
        </div>
    );
}