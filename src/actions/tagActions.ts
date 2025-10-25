'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { z } from 'zod';
import { auth } from '@/auth';

const TagSchema = z.object({
    name: z.string().min(2, { message: 'İsim en az 2 karakter olmalıdır.' }),
    iconClass: z.string().optional(), 
});

export type TagFormState = {
    success: boolean;
    message: string;
    errors?: {
        name?: string[];
        iconClass?: string[];
    }
}

export async function saveTag(prevState: TagFormState, formData: FormData): Promise<TagFormState> {
    const session = await auth();
    if (session?.user?.role !== 'ADMIN') {
        return { success: false, message: 'Yetkiniz yok.' };
    }

    const id = formData.get('id') as string | null;

    const validatedFields = TagSchema.safeParse({
        name: formData.get('name'),
        iconClass: formData.get('iconClass') || undefined, 
    });

    if (!validatedFields.success) {
        console.error("Zod Doğrulama Hatası (Etiket):", validatedFields.error.flatten());
        return { 
            success: false, 
            message: 'Geçersiz veri. Lütfen alanları kontrol edin.',
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { name, iconClass } = validatedFields.data;
    const slug = name.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');

    try {
        if (id) {

            await prisma.tag.update({ where: { id }, data: { name, slug, iconClass } });
        } else {

            await prisma.tag.create({ data: { name, slug, iconClass } });
        }

    } catch (error) {

        if (error instanceof Error && 'code' in error && (error as any).code === 'P2002') {
             return { success: false, message: 'Bu isimde bir etiket zaten mevcut.' };
        }
        return { success: false, message: 'Veritabanı hatası oluştu.' };
    }

    revalidatePath('/admin/tags');
    revalidatePath('/blog');

    redirect('/admin/tags');
}

export async function updateTagOrder(updateData: { id: string, order: number }[]) {
    const session = await auth();
    if (session?.user?.role !== 'ADMIN') throw new Error('Yetkiniz yok.');

    const transactions = updateData.map(item =>
        prisma.tag.update({
            where: { id: item.id },
            data: { order: item.order },
        })
    );

    await prisma.$transaction(transactions);
    revalidatePath('/admin/tags');
}