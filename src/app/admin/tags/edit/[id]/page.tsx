import React from 'react';
import TagForm from '@/components/admin/TagForm';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import type { Tag } from '@prisma/client';

interface EditTagPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditTagPage({ params: paramsPromise }: EditTagPageProps): Promise<React.ReactElement> {
    const params = await paramsPromise;

    const tag: Tag | null = await prisma.tag.findUnique({
        where: { id: params.id }
    });

    if (!tag) {
        notFound();
    }

    return (
        <div>
            <h1>Etiketi Düzenle: {tag.name}</h1>
            <TagForm tag={tag} />
        </div>
    );
}