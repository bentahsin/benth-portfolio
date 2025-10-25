import { MetadataRoute } from 'next';
import { projectsData } from '../data/projectsData';

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
    ].map((route) => ({
        url: `${URL}${route}`,
        lastModified: new Date().toISOString(),
        priority: route === '' ? 1.0 : 0.8,
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

    return [...routes, ...projects, ...hashRoutes];
}