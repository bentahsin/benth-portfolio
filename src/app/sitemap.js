// File: app/sitemap.js

import { projectsData } from '../data/projectsData';

const URL = 'https://www.bentahsin.com';

export default async function sitemap() {
  const projects = projectsData.map(({ slug }) => ({
    url: `${URL}/projects/${slug}`,
    lastModified: new Date().toISOString(),
  }));

  const routes = ['', '/#about', '/#skills', '/#projects', '/#contact'].map((route) => ({
    url: `${URL}${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes, ...projects];
}