import { projectsData } from '@/data/projectsData';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

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
  return {
    title: `${project.title} | bentahsin Proje Detayları`,
    description: project.description,
  };
}

export default function ProjectCaseStudyPage({ params }) {
  const { slug } = params;
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <>
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