'use client';
import { useState, useEffect, useId } from 'react';
import Spinner from './Spinner';
import Image from 'next/image';

interface FileUploadProps {
    targetDir: 'blog' | 'projects' | 'avatars';
    inputName: string;
    label: string;
    initialValue?: string | null;
    onUploadSuccess: (url: string) => void;
}

type UploadApiResponse =
    | { success: true; url: string }
    | { success: false; message: string };

type UploadStatus = 'idle' | 'loading' | 'success' | 'error';

const isSuccessResponse = (response: any): response is { success: true; url: string } => {
    return response?.success === true && typeof response.url === 'string';
}

export default function FileUpload({ targetDir, inputName, label, initialValue, onUploadSuccess }: FileUploadProps) {
    const [file, setFile] = useState<File | null>(null);
    const [status, setStatus] = useState<UploadStatus>('idle');
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [previewUrl, setPreviewUrl] = useState(initialValue || '');
    const fileInputId = useId(); 

    useEffect(() => {
        if (status === 'success' && previewUrl && !previewUrl.startsWith('blob:')) {
            onUploadSuccess(previewUrl);
        }
    }, [status, previewUrl, onUploadSuccess]);

    useEffect(() => {
        return () => {
            if (previewUrl && previewUrl.startsWith('blob:')) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            setStatus('idle');
            setFeedbackMessage('');

            if (previewUrl && previewUrl.startsWith('blob:')) {
                URL.revokeObjectURL(previewUrl);
            }
            setPreviewUrl(URL.createObjectURL(selectedFile));
        }
    };

    const handleUpload = async () => {
        if (!file) {
            setStatus('error');
            setFeedbackMessage('Lütfen bir dosya seçin.');
            return;
        }

        setStatus('loading');
        setFeedbackMessage('Yükleniyor...');

        const formData = new FormData();
        formData.append('file', file);
        formData.append('targetDir', targetDir);

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            const data: UploadApiResponse = await response.json();

            if (isSuccessResponse(data)) {
                setPreviewUrl(data.url);
                setStatus('success');
                setFeedbackMessage('Dosya başarıyla yüklendi!');
            } else {
                setStatus('error');
                setFeedbackMessage(data.message || 'Yükleme başarısız oldu.');
            }
        } catch (error) {
            setStatus('error');
            setFeedbackMessage('Bir ağ hatası veya sunucu sorunu oluştu.');
        }
    };

    return (
        <div className="form-group file-upload-container">
            <label htmlFor={fileInputId}>{label}</label>
            <div className="file-input-wrapper">
                <input
                    id={fileInputId}
                    type="file"
                    onChange={handleFileChange}
                    disabled={status === 'loading'}
                    accept="image/png, image/jpeg, image/webp, image/gif"
                />
                <button
                    type="button"
                    onClick={handleUpload}
                    disabled={status === 'loading' || !file}
                    className="admin-button"
                >
                    {status === 'loading' ? <Spinner /> : 'Yükle'}
                </button>
            </div>

            {feedbackMessage && <p className={`upload-message ${status}`}>{feedbackMessage}</p>}

            {previewUrl && (
                <div className="image-preview">
                    <p>Önizleme:</p>
                    <div style={{ position: 'relative', width: '200px', height: '120px' }}>
                        <Image
                            src={previewUrl}
                            alt="Yüklenen resim önizlemesi"
                            fill
                            style={{ objectFit: 'cover' }}
                            sizes="(max-width: 768px) 100vw, 200px"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}