'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import { z } from 'zod';
import { calculateReadingTime } from '@/lib/utils';
import { auth } from '@/auth'; 

const PostSchema = z.object({
    id: z.string().cuid().optional().or(z.literal('')),
    title: z.string().min(3, { message: 'Başlık en az 3 karakter olmalıdır.' }),
    content: z.string().min(10, { message: 'İçerik en az 10 karakter olmalıdır.' }),
    status: z.enum(['DRAFT', 'PUBLISHED']),
    tagId: z.string().cuid({ message: 'Lütfen geçerli bir etiket seçin.' }),
    coverImage: z.string().url({ message: "Geçersiz resim URL'i." }).optional().or(z.literal('')),
});

export type State = {
    errors?: {
        title?: string[];
        content?: string[];
        tagId?: string[]; 
    };
    message?: string | null;
};

export async function savePost(prevState: State, formData: FormData): Promise<State> {
    const session = await auth();
    if (session?.user?.role !== 'ADMIN') {
        return { message: 'Yetkiniz yok.' };
    }

    const id = formData.get('id') as string | null;

    const validatedFields = PostSchema.safeParse({
        id: id || '',
        title: formData.get('title'),
        content: formData.get('content'),
        status: formData.get('status'),
        tagId: formData.get('tagId'),
        coverImage: formData.get('coverImage') || '',
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Formu kaydetme başarısız. Lütfen alanları kontrol edin.',
        };
    }

    const { id: validatedId, title, content, status, tagId, coverImage } = validatedFields.data;

    const readingTime = calculateReadingTime(content);
    const slug = title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').slice(0, 50);

    let updatedPost;

    try {

        if (id) {
            updatedPost = await prisma.post.update({
                where: { id: id },
                data: { title, slug, content, status, readingTime, tagId, coverImage, updatedAt: new Date() },
            });
        } else {
            updatedPost = await prisma.post.create({
                data: { title, slug, content, status, readingTime, tagId, coverImage, publishedAt: status === 'PUBLISHED' ? new Date() : null },
            });
        }
    } catch (error) {
        console.error("Save Post Error:", error);
        return { message: 'Veritabanı Hatası: Yazı kaydedilemedi.' };
    }

    revalidatePath('/admin/posts');
    revalidatePath('/blog');
    if (updatedPost) {
        const tag = await prisma.tag.findUnique({ where: { id: updatedPost.tagId } });
        if (tag) {
            revalidatePath(`/blog/${tag.slug}`);
            revalidatePath(`/blog/${tag.slug}/${updatedPost.slug}`);
        }
        revalidatePath('/');
    }

    redirect('/admin/posts');
}

export async function deletePost(postId: string): Promise<{ success: boolean; message: string; }> {
    const session = await auth();
    if (session?.user?.role !== 'ADMIN') {
        return { success: false, message: 'Yetkiniz yok.' };
    }

    if (!postId) {
        return { success: false, message: 'Geçersiz Post ID.' };
    }

    try {
        const postToDelete = await prisma.post.findUnique({
            where: { id: postId },
            select: { slug: true, tag: { select: { slug: true } } }
        });

        await prisma.post.delete({
            where: { id: postId },
        });

        if (postToDelete) {
            revalidatePath(`/blog/${postToDelete.tag.slug}/${postToDelete.slug}`);
            revalidatePath(`/blog/${postToDelete.tag.slug}`);
        }

        revalidatePath('/admin/posts');
        revalidatePath('/blog');
        revalidatePath('/');

        return { success: true, message: 'Yazı başarıyla silindi.' };

    } catch (error) {
        console.error('Delete Post Error:', error);
        return { success: false, message: 'Veritabanı Hatası: Yazı silinemedi.' };
    }
}