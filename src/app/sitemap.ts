import { MetadataRoute } from 'next';
import { projectsData } from '../data/projectsData';
import prisma from '@/lib/prisma';

interface Project {
    slug: string;
}

const URL = 'https://bentahsin.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const projects: MetadataRoute.Sitemap = (projectsData as Project[]).map(({ slug }) => ({
        url: `${URL}/projects/${slug}`,
        lastModified: new Date().toISOString(),
        priority: 0.9,
    }));

    const routes: MetadataRoute.Sitemap = [
        '',
        '/now',
        '/changelog',
        '/contributions',
        '/blog',
    ].map((route) => ({
        url: `${URL}${route}`,
        lastModified: new Date().toISOString(),
        priority: route === '' ? 1.0 : 0.8,
    }));

    const posts = await prisma.post.findMany({
        where: { status: 'PUBLISHED' },
        select: { slug: true, tag: { select: { slug: true } }, updatedAt: true },
    });

    const postRoutes: MetadataRoute.Sitemap = posts.map(post => ({
        url: `${URL}/blog/${post.tag.slug}/${post.slug}`,
        lastModified: post.updatedAt.toISOString(),
        priority: 0.9,
    }));

    const tags = await prisma.tag.findMany({
        select: { slug: true }
    });

    const tagRoutes: MetadataRoute.Sitemap = tags.map(tag => ({
        url: `${URL}/blog/${tag.slug}`,
        lastModified: new Date().toISOString(),
        priority: 0.7,
    }));

    const hashRoutes: MetadataRoute.Sitemap = [
        '/#about',
        '/#skills',
        '/#projects',
        '/#contact'
    ].map((route) => ({
        url: `${URL}${route}`,
        lastModified: new Date().toISOString(),
        priority: 0.7,
    }));

    return [...routes, ...projects, ...hashRoutes, ...postRoutes, ...tagRoutes];
}