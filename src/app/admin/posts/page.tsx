import prisma from '@/lib/prisma';
import Link from 'next/link';
import DeletePostButton from '@/components/admin/DeletePostButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { formatTimeAgo } from '@/lib/timeago';
import { Prisma } from '@prisma/client';

const postWithDetails = Prisma.validator<Prisma.PostDefaultArgs>()({
    select: {
        id: true,
        title: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        tag: {
        select: {
            name: true,
            slug: true,
        }
        },
        _count: {
        select: { comments: true },
        }
    }
});

type PostWithDetails = Prisma.PostGetPayload<typeof postWithDetails>;

export default async function AdminPostsPage(): Promise<React.ReactElement> {
    
    const posts: PostWithDetails[] = await prisma.post.findMany({
        orderBy: {
            createdAt: 'desc',
        },
        select: {
            id: true,
            title: true,
            status: true,
            createdAt: true,
            updatedAt: true,
            tag: {
                select: {
                    name: true,
                    slug: true
                }
            },
            _count: {
                select: { comments: true },
            }
        }
    });

    return (
        <div>
            <div className="admin-page-header">
                <h1>Yazı Yönetimi</h1>
                <Link href="/admin/posts/new" className="admin-button primary">
                    <FontAwesomeIcon icon={faPlus} />
                    Yeni Yazı Oluştur
                </Link>
            </div>
            
            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Başlık</th>
                            <th>Etiket</th>
                            <th>Durum</th>
                            <th>Yorumlar</th>
                            <th>Oluşturulma</th>
                            <th>İşlemler</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.length > 0 ? (
                            posts.map(post => (
                                <tr key={post.id}>
                                    <td data-label="Başlık">
                                        <Link href={`/admin/posts/editor/${post.id}`} className="table-link">
                                            {post.title}
                                        </Link>
                                    </td>
                                    <td data-label="Etiket">
                                        {post.tag ? (
                                            <Link href={`/blog/${post.tag.slug}`} className="table-link subtle" target="_blank">
                                                {post.tag.name}
                                            </Link>
                                        ) : (
                                            <span style={{ color: 'var(--admin-text-secondary)', fontStyle: 'italic' }}>
                                                Atanmamış
                                            </span>
                                        )}
                                    </td>
                                    <td data-label="Durum">
                                        <span className={`status-badge status-${post.status.toLowerCase()}`}>
                                            {post.status === 'PUBLISHED' ? 'Yayınlandı' : 'Taslak'}
                                        </span>
                                    </td>
                                    <td data-label="Yorumlar">{post._count.comments}</td>
                                    <td data-label="Oluşturulma">{formatTimeAgo(post.createdAt)}</td>
                                    <td data-label="İşlemler" className="actions-cell">
                                        <Link href={`/admin/posts/editor/${post.id}`} className="admin-button small">
                                            Düzenle
                                        </Link>
                                        <DeletePostButton postId={post.id} />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} style={{ textAlign: 'center' }}>
                                    Henüz hiç yazı oluşturulmamış.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}