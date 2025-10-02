import { projectsData } from '@/data/projectsData';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import JsonLd from '@/components/JsonLd';

config.autoAddCss = false;

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }) {
  const project = projectsData.find((p) => p.slug === params.slug);
  if (!project) {
    return {
      title: 'Proje Bulunamadı',
    };
  }

  const siteUrl = 'https://bentahsin.com';
  const projectUrl = `${siteUrl}/projects/${project.slug}`;
  const imageUrl = `${siteUrl}${project.image}`;

  return {
    title: project.title,
    description: project.description,
    
    openGraph: {
      title: `${project.title} | bentahsin Projesi`,
      description: project.description,
      url: projectUrl,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 675,
          alt: `${project.title} Proje Görseli`,
        },
      ],
      type: 'article',
    },
    
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} | bentahsin Projesi`,
      description: project.description,
      images: [imageUrl],
    },

    alternates: {
      canonical: projectUrl,
    },
  };
}

export default function ProjectCaseStudyPage({ params }) {
  const { slug } = params;
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": project.caseStudyTitle,
    "description": project.description,
    "image": `https://www.bentahsin.com${project.image}`,
    "author": {
      "@type": "Person",
      "name": "Tahsin",
      "url": "https://www.bentahsin.com"
    }
  };

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
            <h2 className="case-title">{project.caseStudyTitle}</h2>
            <div className="project-tags">
              {project.tagIcons}
            </div>
            <div className="markdown-content">
              {project.caseStudyContent}
            </div>
            </article>
        </div>
      </section>
    </>
  );
}