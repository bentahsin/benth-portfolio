import Link from 'next/link';
import Image from 'next/image';
import type { FC } from 'react';
import { formatTimeAgo } from '@/lib/timeago';

type Post = {
    slug: string;
    title: string;
    summary: string | null;
    coverImage: string | null;
    publishedAt: Date;
    readingTime: number;
    tag: {
        slug: string;
    };
};

type PostCardProps = {
    post: Post;
};

const PostCard: FC<PostCardProps> = ({ post }) => {
    return (
        <Link href={`/blog/${post.tag.slug}/${post.slug}`} className="post-card">
            <div className="post-card-image">
                <Image 
                    src={post.coverImage || '/assets/blog-placeholder.png'}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }}
                />
            </div>
            <div className="post-card-content">
                <span className="post-card-date">
                    {formatTimeAgo(post.publishedAt)} • {post.readingTime} dk okuma
                </span>
                <h3 className="post-card-title">{post.title}</h3>
                {post.summary && <p className="post-card-summary">{post.summary}</p>}
                <span className="post-card-readmore">Devamını Oku →</span>
            </div>
        </Link>
    );
};

export default PostCard;