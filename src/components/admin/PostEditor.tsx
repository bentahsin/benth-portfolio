'use client';

import { useActionState, useState, useEffect, useRef, useCallback } from 'react';
import useUndo from 'use-undo';
import { savePost, type State } from '@/actions/postActions';
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';
import SubmitButtons from './SubmitButtons';
import FileUpload from './FileUpload';
import type { Post, Tag } from '@prisma/client';
import EditorToolbar from './EditorToolbar';
import { applyFormat, applyLink, applyCodeBlock, applyLinePrefix, applyCallout, applySpoiler } from '@/lib/editorUtils';
import MdxPreview from '../MdxPreview';

const initialState: State = { message: null, errors: {} };

interface PostEditorProps {
    post?: Post | null;
    tags: Tag[];
}

export default function PostEditor({ post, tags }: PostEditorProps) {
    const [state, formAction] = useActionState(savePost, initialState);
    const [layout, setLayout] = useState<'side-by-side' | 'stacked'>('side-by-side');
    
    const [contentState, {
        set: setContent,
        undo: undoContent,
        redo: redoContent,
        canUndo,
        canRedo,
    }] = useUndo(post?.content || '');

    const [coverImage, setCoverImage] = useState(post?.coverImage || '');
    const isPublished = post?.status === 'PUBLISHED';
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [serializedResult, setSerializedResult] = useState<MDXRemoteSerializeResult | null>(null);
    const [isLoadingPreview, setIsLoadingPreview] = useState(false);
    const { present: content } = contentState;

    useEffect(() => {
        if (state.message && !state.errors) {
            alert(state.message);
        }
    }, [state]);

    useEffect(() => {
        if (layout === 'stacked' && textareaRef.current) {
            const textarea = textareaRef.current;
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    }, [content, layout]);

    useEffect(() => {
        setIsLoadingPreview(true);
        const timer = setTimeout(() => {
            const fetchPreview = async () => {
                try {
                    const response = await fetch('/api/mdx/preview', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ source: content }),
                    });
                    const result = await response.json();
                    setSerializedResult(result);
                } catch (error) {
                    console.error("Preview API hatası:", error);
                } finally {
                    setIsLoadingPreview(false);
                }
            };
            fetchPreview();
        }, 500);

        return () => clearTimeout(timer);
    }, [content]);

    const handleFormat = useCallback((formatStart: string, formatEnd?: string, placeholder?: string) => {
        const textarea = textareaRef.current;
        if (!textarea) return;
        const update = applyFormat(textarea.value, textarea.selectionStart, textarea.selectionEnd, formatStart, formatEnd, placeholder);
        setContent(update.newText);
        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(update.newSelection.start, update.newSelection.end);
        }, 0);
    }, [setContent]);

    const handleLink = useCallback(() => {
        const textarea = textareaRef.current;
        if (!textarea) return;
        const update = applyLink(textarea.value, textarea.selectionStart, textarea.selectionEnd);
        if(update) {
            setContent(update.newText);
            setTimeout(() => {
                textarea.focus();
                textarea.setSelectionRange(update.newSelection.start, update.newSelection.end);
            }, 0);
        }
    }, [setContent]);

    const handleCallout = useCallback(() => {
        const textarea = textareaRef.current;
        if (!textarea) return;
        const update = applyCallout(textarea.value, textarea.selectionStart, textarea.selectionEnd);
        setContent(update.newText);
        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(update.newSelection.start, update.newSelection.end);
        }, 0);
    }, [setContent]);

    const handleSpoiler = useCallback(() => {
        const textarea = textareaRef.current;
        if (!textarea) return;
        const update = applySpoiler(textarea.value, textarea.selectionStart, textarea.selectionEnd);
        setContent(update.newText);
        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(update.newSelection.start, update.newSelection.end);
        }, 0);
    }, [setContent]);

    const handleCodeBlock = useCallback(() => {
        const textarea = textareaRef.current;
        if (!textarea) return;
        const update = applyCodeBlock(textarea.value, textarea.selectionStart);
        setContent(update.newText);
        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(update.newSelection.start, update.newSelection.end);
        }, 0);
    }, [setContent]);

    const handleLinePrefix = useCallback((prefix: string) => {
        const textarea = textareaRef.current;
        if (!textarea) return;
        const update = applyLinePrefix(textarea.value, textarea.selectionStart, textarea.selectionEnd, prefix);
        setContent(update.newText);
        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(update.newSelection.start, update.newSelection.end);
        }, 0);
    }, [setContent]);

    useEffect(() => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey || e.metaKey) {
                let handled = false;
                switch (e.key.toLowerCase()) {
                    case 'z': if (canUndo) undoContent(); handled = true; break;
                    case 'y': if (canRedo) redoContent(); handled = true; break;
                    case 'b': handleFormat('**'); handled = true; break;
                    case 'i': handleFormat('*'); handled = true; break;
                    case 'u': handleFormat('<u>', '</u>', 'altı çizili'); handled = true; break;
                }
                if (handled) e.preventDefault();
            }
        };

        textarea.addEventListener('keydown', handleKeyDown);
        return () => textarea.removeEventListener('keydown', handleKeyDown);
    }, [canUndo, canRedo, undoContent, redoContent, handleFormat]);

    return (
        <form action={formAction} className="editor-layout">
            {post?.id && <input type="hidden" name="id" value={post.id} />}
            <input type="hidden" name="coverImage" value={coverImage} />

            <div className="editor-header">
                <input
                    id="title"
                    name="title"
                    type="text"
                    placeholder="Yazı Başlığı..."
                    defaultValue={post?.title}
                    required
                    className="editor-title-input"
                    aria-invalid={!!state.errors?.title}
                    aria-describedby="title-error"
                />
                <SubmitButtons isPublished={isPublished} />
            </div>
            {state.errors?.title && <p id="title-error" className="error-message">{state.errors.title.join(', ')}</p>}
            <div className="editor-meta">
                <div className="form-group">
                    <label htmlFor="tagId">Etiket / Kategori</label>
                    <select id="tagId" name="tagId" defaultValue={post?.tagId || ""} required>
                        <option value="" disabled>Bir etiket seçin...</option>
                        {tags.map(tag => (
                            <option key={tag.id} value={tag.id}>{tag.name}</option>
                        ))}
                    </select>
                    {state.errors?.tagId && <p className="error-message">{state.errors.tagId.join(', ')}</p>}
                </div>
                <FileUpload
                    label='Kapak Resmi'
                    targetDir="blog"
                    inputName="coverImage"
                    onUploadSuccess={setCoverImage}
                />
            </div>
            <div className={`editor-main ${layout}`}>
                <div className="editor-panel">
                    <EditorToolbar
                        onFormat={handleFormat}
                        onLink={handleLink}
                        onCodeBlock={handleCodeBlock}
                        onLinePrefix={handleLinePrefix}
                        undo={undoContent}
                        redo={redoContent}
                        canUndo={canUndo}
                        canRedo={canRedo}
                        layout={layout}
                        setLayout={setLayout}
                        onCallout={handleCallout}
                        onSpoiler={handleSpoiler}
                    />
                    <textarea
                        id="content"
                        name="content"
                        ref={textareaRef}
                        placeholder="Markdown formatında içeriğinizi buraya yazın..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        className="editor-textarea"
                        aria-invalid={!!state.errors?.content}
                        aria-describedby="content-error"
                    />
                    {state.errors?.content && <p id="content-error" className="error-message">{state.errors.content.join(', ')}</p>}
                </div>
                <div className="preview-panel">
                    {isLoadingPreview && <div className="preview-loading-overlay">Önizleme Yükleniyor...</div>}
                    <MdxPreview serializedResult={serializedResult} />
                </div>
            </div>
        </form>
    );
}