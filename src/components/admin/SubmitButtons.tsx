'use client';

import React from 'react';
import { useFormStatus } from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

interface SubmitButtonsProps {
    isPublished: boolean;
}

const SubmitButtons: React.FC<SubmitButtonsProps> = ({ isPublished }) => {
    const { pending } = useFormStatus();

    return (
        <div className="editor-actions">
            <button 
                type="submit" 
                name="status" 
                value="DRAFT" 
                className="admin-button"
                disabled={pending}
                aria-disabled={pending} 
            >
                {pending ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Taslak Olarak Kaydet'}
            </button>
            <button 
                type="submit" 
                name="status" 
                value="PUBLISHED" 
                className="admin-button primary"
                disabled={pending}
                aria-disabled={pending}
            >
                {pending ? <FontAwesomeIcon icon={faSpinner} spin /> : (isPublished ? 'Güncelle' : 'Yayınla')}
            </button>
        </div>
    );
};

export default SubmitButtons;