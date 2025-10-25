import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import type { Metadata } from 'next';
import type { Post, Tag } from '@prisma/client';

import JsonLd from '@/components/JsonLd';
import { JSX } from 'react';
import { MdxRenderer } from '@/components/MdxRenderer';

type PostPageProps = {
    params: Promise<{
        tagSlug: string;
        postSlug: string;
    }>
};

type PostWithTag = Post & { tag: Tag };

interface BlogPosting {
    '@context': 'https://schema.org';
    '@type': 'BlogPosting';
    headline: string;
    description: string | null;
    image: string;
    author: { '@type': 'Person'; name: string; url: string; };
    publisher: {
        '@type': 'Organization';
        name: string;
        logo: { '@type': 'ImageObject'; url: string; };
    };
    datePublished?: string;
    dateModified: string;
}


export async function generateMetadata({ params: paramsPromise }: PostPageProps): Promise<Metadata> {
    const params = await paramsPromise;
    const post = await prisma.post.findUnique({
        where: { slug: params.postSlug },
        select: {
            title: true,
            summary: true,
            coverImage: true,
            publishedAt: true,
            updatedAt: true,
            slug: true,
            tag: { select: { slug: true } }
        }
    });

    if (!post || post.tag.slug !== params.tagSlug) {
        return { title: 'Yazı Bulunamadı' };
    }
    
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.bentahsin.com';
    const postUrl = `${siteUrl}/blog/${post.tag.slug}/${post.slug}`;
    const imageUrl = `${siteUrl}${post.coverImage || '/assets/blog-placeholder.png'}`;

    return {
        title: post.title,
        description: post.summary,
        alternates: {
            canonical: postUrl,
        },
        openGraph: {
            title: post.title,
            description: post.summary || '',
            url: postUrl,
            siteName: 'bentahsin Blog',
            images: [{ url: imageUrl, width: 1200, height: 630, alt: post.title }],
            locale: 'tr_TR',
            type: 'article',
            publishedTime: post.publishedAt ? post.publishedAt.toISOString() : undefined,
            modifiedTime: post.updatedAt.toISOString(),
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.summary || '',
            images: [imageUrl],
        },
    };
}

export async function generateStaticParams(): Promise<PostPageProps['params'][]> {
    const posts = await prisma.post.findMany({
        where: { status: 'PUBLISHED' },
        select: { slug: true, tag: { select: { slug: true } } },
    });
    
    return posts.map(post => (
        Promise.resolve({
            tagSlug: post.tag.slug,
            postSlug: post.slug,
        })
    ));
}


export default async function PostPage({ params }: PostPageProps): Promise<JSX.Element> {
    const { tagSlug, postSlug } = await params;

    const post: PostWithTag | null = await prisma.post.findUnique({
        where: { slug: postSlug, status: 'PUBLISHED' },
        include: { tag: true },
    });

    if (!post || post.tag.slug !== tagSlug) {
        notFound();
    }
    
    const jsonLd: BlogPosting = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        'headline': post.title,
        'description': post.summary,
        'image': `https://www.bentahsin.com${post.coverImage || '/assets/blog-placeholder.png'}`,
        'author': { '@type': 'Person', 'name': 'Tahsin', 'url': 'https://www.bentahsin.com' },
        'publisher': {
            '@type': 'Organization',
            'name': 'bentahsin',
            'logo': { '@type': 'ImageObject', 'url': 'https://www.bentahsin.com/logo.png' }
        },
        'datePublished': post.publishedAt ? post.publishedAt.toISOString() : undefined,
        'dateModified': post.updatedAt.toISOString(),
    };

    const formattedDate = post.publishedAt ? format(post.publishedAt, "d MMMM yyyy", { locale: tr }) : '';

    return (
        <>
            <JsonLd data={jsonLd} />
            <div className="background-effects">
                <div className="background-grid"></div>
            </div>
            <section className="post-page-section">
                <article className="post-container">
                    <nav className="post-breadcrumb">
                        <Link href="/blog">Blog</Link>
                        <span>/</span>
                        <Link href={`/blog/${post.tag.slug}`}>{post.tag.name}</Link>
                    </nav>

                    <header className="post-header">
                        <h1 className="post-title">{post.title}</h1>
                        <div className="post-meta">
                            <span>{formattedDate}</span>
                            <span className="separator">•</span>
                            <span>{post.readingTime} dk okuma</span>
                        </div>
                    </header>

                    {post.coverImage && (
                        <div className="post-cover-image">
                            <Image
                                src={post.coverImage}
                                alt={post.title}
                                width={1200}
                                height={675}
                                priority
                            />
                        </div>
                    )}

                    <div className="post-content">
                        <MdxRenderer source={post.content} />
                    </div>

                    <footer className="post-footer">
                        <hr />
                        <div className="back-to-category">
                            <Link href={`/blog/${post.tag.slug}`}>
                                ← &quot;{post.tag.name}&quot; kategorisindeki diğer yazılar
                            </Link>
                        </div>
                    </footer>
                </article>
            </section>
        </>
    );
}