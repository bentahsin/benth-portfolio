import prisma from '@/lib/prisma';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRss } from '@fortawesome/free-solid-svg-icons';
import type { Metadata } from 'next';
import { Prisma } from '@prisma/client';
import type { JSX } from 'react';

import BlogSearch from '@/components/BlogSearch';
import PostCard from '@/components/PostCard';
import type { PostForCard } from '@/lib/types';

interface TagWithPostCount {
    id: string;
    slug: string;
    name: string;
    iconClass: string | null;
    order: number;
    _count: { posts: number; };
}

type BlogHomePageProps = {
    searchParams: Promise<{
        q?: string;
    }>;
};

export const metadata: Metadata = {
    title: 'Blog',
    description: 'Yazılım geliştirme, teknoloji ve kişisel deneyimlerim üzerine kategorilere ayrılmış yazılar.',
};

export const dynamic = 'force-dynamic';

export default async function BlogHomePage({ searchParams: searchParamsPromise }: BlogHomePageProps): Promise<JSX.Element> {
    const searchParams = await searchParamsPromise;
    const query = searchParams.q || '';

    if (query) {
        const posts: PostForCard[] = await prisma.post.findMany({
            where: {
                status: 'PUBLISHED',
                OR: [
                    { title: { contains: query, mode: 'insensitive' } },
                    { content: { contains: query, mode: 'insensitive' } },
                ]
            },
            orderBy: { publishedAt: 'desc' },
            select: {
                slug: true, title: true, summary: true, coverImage: true,
                publishedAt: true, readingTime: true,
                tag: { select: { slug: true } }
            }
        });

        return (
            <section className="blog-home-section">
                <div className="blog-hero">
                    <BlogSearch placeholder="Yeni bir arama yap..." />
                </div>
                <div className="search-results-container">
                    <h2>&quot;{query}&quot; için arama sonuçları ({posts.length})</h2>
                    {posts.length > 0 ? (
                        <div className="posts-grid">
                            {posts.map(post => (
                                <PostCard key={post.slug} post={post} />
                            ))}
                        </div>
                    ) : (
                        <p style={{ textAlign: 'center' }}>Arama kriterlerinize uygun bir yazı bulunamadı.</p>
                    )}
                </div>
            </section>
        );
    }

    const tags: TagWithPostCount[] = await prisma.tag.findMany({
        include: { _count: { select: { posts: { where: { status: 'PUBLISHED' } } } } },
        orderBy: { order: 'asc' }
    });

    return (
        <section className="blog-home-section">
            <div className="blog-hero">
                <h1 className="blog-main-title">
                    <FontAwesomeIcon icon={faRss} size="2x" /><br/>Blog
                </h1>
                <p className="blog-subtitle">
                    Sunucu yönetimi, eklenti geliştirme ve teknoloji dünyasına dair en son ipuçları ve rehberler.
                </p>
                <BlogSearch placeholder="Tüm yazılarda ara..." />
            </div>
            <div className="category-grid">
                {tags.map(tag => (
                    <Link key={tag.id} href={`/blog/${tag.slug}`} className="category-card">
                        <div className="category-icon">
                            {tag.iconClass && <i className={tag.iconClass}></i>}
                        </div>
                        <div className="card-content">
                            <h3>{tag.name}</h3>
                            <p>{tag._count.posts} yazı</p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}