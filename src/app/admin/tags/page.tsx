import prisma from '@/lib/prisma';
import SortableTagList from '@/components/admin/SortableTagList';

export default async function AdminTagsPage() {
    const tags = await prisma.tag.findMany({
        include: { _count: { select: { posts: true } } },
        orderBy: { order: 'asc' },
    });
    return <SortableTagList categories={tags} />;
}