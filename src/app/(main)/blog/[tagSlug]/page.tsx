import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import PostCard from '@/components/PostCard';
import BlogSearch from '@/components/BlogSearch';
import type { Metadata } from 'next';
import { Prisma, Tag } from '@prisma/client';
import type { JSX } from 'react';

type TagBlogPageProps = {
    params: Promise<{
        tagSlug: string;
    }>;
    searchParams: Promise<{
        q?: string;
    }>;
};

type PostForCard = {
    slug: string;
    title: string;
    summary: string | null;
    coverImage: string | null;
    publishedAt: Date | null;
    readingTime: number;
    tag: {
        slug: string;
    };
};

export async function generateMetadata({ params: paramsPromise }: TagBlogPageProps): Promise<Metadata> {
    const params = await paramsPromise;
    const tag = await prisma.tag.findUnique({
        where: { slug: params.tagSlug },
    });

    if (!tag) {
        return { title: 'Kategori Bulunamadı' };
    }

    return {
        title: `Kategori: ${tag.name}`,
        description: `${tag.name} kategorisindeki yazılar.`,
        alternates: {
            canonical: `/blog/${params.tagSlug}`,
        },
    };
}

export async function generateStaticParams(): Promise<{ tagSlug: string }[]> {
    const tags = await prisma.tag.findMany({
        select: { slug: true },
    });
    
    return tags.map(tag => ({
        tagSlug: tag.slug,
    }));
}

export default async function TagBlogPage({ params: paramsPromise, searchParams: searchParamsPromise }: TagBlogPageProps): Promise<JSX.Element> {
    const { tagSlug } = await paramsPromise;
    const searchParams = await searchParamsPromise;
    const query = searchParams.q || '';

    const whereClause: Prisma.PostWhereInput = {
        status: 'PUBLISHED',
        tag: { slug: tagSlug }
    };
    if (query) {
        whereClause.OR = [
            { title: { contains: query, mode: 'insensitive' } },
            { content: { contains: query, mode: 'insensitive' } },
        ];
    }

    const tag = await prisma.tag.findUnique({ where: { slug: tagSlug } });
    if (!tag) notFound();

    const posts = await prisma.post.findMany({
        where: whereClause,
        orderBy: { publishedAt: 'desc' },
        select: {
            slug: true,
            title: true,
            summary: true,
            coverImage: true,

            publishedAt: true,
            readingTime: true,
            tag: { select: { slug: true } }
        }
    }) as PostForCard[];


    return (
        <>
            <div className="background-effects">
                <div className="background-grid"></div>
            </div>
            <section className="blog-page-section">
                <div className="blog-container">
                    <div style={{ marginBottom: '2rem' }}>
                        <Link href="/blog" className="back-button">
                            <i className="fa-solid fa-arrow-left"></i> Tüm Kategoriler
                        </Link>
                    </div>

                    <header className="category-header">
                        <h1 className="blog-main-title">
                            {tag.iconClass && <i className={`${tag.iconClass} category-header-icon`}></i>}
                            <br/>
                            {tag.name}
                        </h1>
                        <p className="blog-subtitle">
                            {query ? `"${query}" araması için ${posts.length} sonuç bulundu.` : `Bu kategoride toplam ${posts.length} yazı bulundu.`}
                        </p>
                        <div style={{ marginTop: '2rem' }}>
                            <BlogSearch placeholder={`${tag.name} kategorisinde ara...`} />
                        </div>
                    </header>
                    {posts.length > 0 ? (
                        <div className="posts-grid">
                            {posts.map(post => (
                                <PostCard key={post.slug} post={post} />
                            ))}
                        </div>
                    ) : (
                        <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                            Aradığınız kriterlere uygun bir yazı bulunamadı.
                        </p>
                    )}
                </div>
            </section>
        </>
    );
}