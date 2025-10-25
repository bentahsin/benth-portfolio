import React, { JSX } from 'react';
import { projectsData } from '@/data/projectsData';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import JsonLd from '@/components/JsonLd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import type { Metadata } from 'next';

config.autoAddCss = false;

interface ProjectData {
    slug: string;
    title: string;
    subtitle: string;
    description: string;
    image: string;
    projectUrl?: string[] | null;
    seoTitle?: string | null;
    caseStudyTitle: React.ReactNode;
    tagIcons: React.ReactNode;
    caseStudyContent: React.ReactNode;
    isPublicRepo: boolean;
}

interface PageParams {
    slug: string;
}

interface ProjectPageProps {
    params: Promise<PageParams>;
}

interface SoftwareAppSchema {
    "@context": "https://schema.org";
    "@type": "SoftwareApplication";
    name: string;
    url: string;
    sameAs: string[];
    image: string;
    description: string;
    applicationCategory: string;
    operatingSystem: string;
    author: { "@type": "Person"; name: string; url: string };
}

interface ArticleSchema {
    "@context": "https://schema.org";
    "@type": "Article";
    headline: string;
    description: string;
    image: string;
    author: { "@type": "Person"; name: string; url: string };
    mainEntity: SoftwareAppSchema;
}

export async function generateStaticParams(): Promise<PageParams[]> {
    return (projectsData as ProjectData[]).map((project) => ({
        slug: project.slug,
    }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
    const { slug } = await params;
    const project = (projectsData as ProjectData[]).find((p) => p.slug === slug);

    if (!project) {
        return {
            title: 'Proje Bulunamadı',
        };
    }

    const siteUrl = 'https://bentahsin.com';
    const projectUrl = `${siteUrl}/projects/${project.slug}`;
    const imageUrl = `${siteUrl}${project.image}`;
    const pageTitle = `${project.title} - ${project.subtitle}`;

    return {
        title: pageTitle,
        description: project.description,
        openGraph: {
            title: pageTitle,
            description: project.description,
            url: projectUrl,
            images: [{ url: imageUrl, width: 1200, height: 675, alt: `${project.title} Proje Görseli` }],
            type: 'article',
        },
        twitter: {
            card: 'summary_large_image',
            title: pageTitle,
            description: project.description,
            images: [imageUrl],
        },
        alternates: {
            canonical: projectUrl,
        },
    };
}

export default async function ProjectCaseStudyPage({ params }: ProjectPageProps): Promise<JSX.Element> {
    const { slug } = await params;
    const project = (projectsData as ProjectData[]).find((p) => p.slug === slug);

    if (!project) {
        notFound();
    }

    const siteUrl = 'https://bentahsin.com';
    const pageUrl = `${siteUrl}/projects/${slug}`;

    const softwareAppSchema: SoftwareAppSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": `${project.title} - ${project.subtitle}`,
        "url": pageUrl,
        "sameAs": project.projectUrl || [],
        "image": `${siteUrl}${project.image}`,
        "description": project.description,
        "applicationCategory": "Game",
        "operatingSystem": "Java Virtual Machine",
        "author": { "@type": "Person", "name": "Tahsin", "url": siteUrl }
    };

    const articleSchema: ArticleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": project.seoTitle || project.title,
        "description": project.description,
        "image": `${siteUrl}${project.image}`,
        "author": { "@type": "Person", "name": "Tahsin", "url": siteUrl },
        "mainEntity": softwareAppSchema
    };

    const githubLink = project.projectUrl?.find(url => url.includes('github.com'));
    const otherLinks = project.projectUrl?.filter(url => !url.includes('github.com')) || [];

    return (
        <>
            <JsonLd data={articleSchema} />
            <div className="cursor-dot"></div>
            <div className="cursor-outline"></div>
            <div className="background-effects">
                <div className="background-grid"></div>
            </div>
            <section className="case-study-page">
                <div className="case-study">
                    <Link href="/#projects" className="back-button" style={{ marginBottom: '2rem', display: 'inline-block' }}>
                        <i className="fa-solid fa-arrow-left"></i> Projelere Geri Dön
                    </Link>
                    <article>
                        <div className="case-study-hero-image">
                            <Image
                                src={project.image}
                                alt={`${project.title} Proje Görseli`}
                                width={1200}
                                height={675}
                                priority
                                style={{
                                    viewTransitionName: `project-image-${project.slug}`
                                }}
                            />
                        </div>
                        <h1 className="case-title">
                            <span className="sr-only">
                                {project.seoTitle || project.title}
                            </span>
                            <span aria-hidden="true">
                                {project.caseStudyTitle}
                            </span>
                        </h1>
                        <div className="project-tags">
                            {Array.isArray(project.tagIcons) ? project.tagIcons : project.tagIcons}
                        </div>
                        <div className="markdown-content">
                            {project.caseStudyContent}
                        </div>
                        {(project.projectUrl && project.projectUrl.length > 0) && (
                            <div className="related-links-section">
                                <hr />
                                <h3>İlgili Linkler</h3>
                                <div className="links-container">
                                    {project.isPublicRepo && githubLink && (
                                        <a href={githubLink} target="_blank" rel="noopener noreferrer" className="related-link">
                                            <FontAwesomeIcon icon={faGithub} />
                                            <span>GitHub Reposu</span>
                                        </a>
                                    )}
                                    {Array.isArray(otherLinks) && otherLinks.map(link => (
                                        <a href={link} key={link} target="_blank" rel="noopener noreferrer" className="related-link">
                                            <FontAwesomeIcon icon={faExternalLinkAlt} />
                                            <span>{link ? new URL(link).hostname.replace('www.', '') : 'Geçersiz Link'}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </article>
                </div>
            </section>
        </>
    );
}