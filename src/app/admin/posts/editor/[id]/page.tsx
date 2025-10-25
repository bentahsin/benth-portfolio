import React from 'react';
import PostEditor from "@/components/admin/PostEditor";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import type { Post, Tag } from "@prisma/client";

interface EditPostPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditPostPage({ params }: EditPostPageProps): Promise<React.ReactElement> {
    const { id } = await params;

    type PostPromise = Post | null;
    type TagsPromise = Tag[];

    const [post, tags] = await Promise.all([
        prisma.post.findUnique({ where: { id: id } }) as Promise<PostPromise>,
        prisma.tag.findMany({ orderBy: { name: 'asc' } }) as Promise<TagsPromise>
    ]);

    if (!post) {
        notFound();
    }

    return (
        <PostEditor post={post} tags={tags} />
    );
}