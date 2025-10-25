export type PostForCard = {
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