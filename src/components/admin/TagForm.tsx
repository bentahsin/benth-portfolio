'use client';
import { useFormState, useFormStatus } from 'react-dom';
import type { Tag } from '@prisma/client';
import { saveTag, type TagFormState } from '@/actions/tagActions';

function SubmitButton({ text }: { text: string }) {
    const { pending } = useFormStatus();
    return <button type="submit" className="admin-button primary" disabled={pending}>{pending ? 'Kaydediliyor...' : text}</button>;
}

interface TagFormProps {
    tag?: Tag;
}

export default function TagForm({ tag }: TagFormProps) {
    const initialState: TagFormState = { success: false, message: '' };
    const [state, dispatch] = useFormState(saveTag, initialState);

    return (
        <form action={dispatch} className="admin-form">
            {tag && <input type="hidden" name="id" value={tag.id} />}

            {state.message && !state.success && (
                <p className="error-message" style={{ marginBottom: '1rem' }}>
                    {state.message}
                </p>
            )}

            <div className="form-group">
                <label htmlFor="name">Etiket Adı</label>
                <input type="text" id="name" name="name" defaultValue={tag?.name} required />
                {state.errors?.name && <p className="error-message">{state.errors.name.join(', ')}</p>}
            </div>

            <div className="form-group">
                <label htmlFor="iconClass">İkon Sınıfı (Font Awesome)</label>
                <input type="text" id="iconClass" name="iconClass" defaultValue={tag?.iconClass || ''} />
                <small>Örn: fas fa-code</small>
                {state.errors?.iconClass && <p className="error-message">{state.errors.iconClass.join(', ')}</p>}
            </div>

            <div className="form-actions">
                <SubmitButton text={tag ? 'Güncelle' : 'Oluştur'} />
            </div>
        </form>
    );
    }