'use client';

import { deletePost } from '@/actions/postActions';
import { useTransition } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faSpinner } from '@fortawesome/free-solid-svg-icons';

interface DeletePostButtonProps {
    postId: string;
}

export default function DeletePostButton({ postId }: DeletePostButtonProps) {
    const [isPending, startTransition] = useTransition();

    const handleDelete = () => {
        if (window.confirm('Bu yazıyı kalıcı olarak silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.')) {

            startTransition(async () => {

                const result = await deletePost(postId);
                if (result && !result.success) {
                    alert(result.message); 
                }

            });
        }
    };

    return (
        <button 
            onClick={handleDelete} 
            disabled={isPending}
            className="admin-button small danger"
            aria-label="Yazıyı Sil"
        >
            {isPending ? <FontAwesomeIcon icon={faSpinner} spin /> : <FontAwesomeIcon icon={faTrash} />}
        </button>
    );
}