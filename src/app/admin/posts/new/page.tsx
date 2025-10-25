import PostEditor from "@/components/admin/PostEditor";
import prisma from "@/lib/prisma";

export default async function NewPostPage() {
    const tags = await prisma.tag.findMany({ orderBy: { name: 'asc' } });

    return (
        <div>
            <h1 style={{ marginBottom: '2rem' }}>Yeni Yazı Oluştur</h1>
            <PostEditor tags={tags} />
        </div>
    );
}