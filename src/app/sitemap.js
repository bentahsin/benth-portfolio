import { projectsData } from '../data/projectsData';

const URL = 'https://bentahsin.com';

export default async function sitemap() {
  const projects = projectsData.map(({ slug }) => ({
    url: `${URL}/projects/${slug}`,
    lastModified: new Date().toISOString(),
    priority: 0.9,
  }));

  const routes = [
    '',
    '/now',
    '/changelog',
    '/contributions',
  ].map((route) => ({
    url: `${URL}${route}`,
    lastModified: new Date().toISOString(),
    priority: route === '' ? 1.0 : 0.8,
  }));

  const hashRoutes = [
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