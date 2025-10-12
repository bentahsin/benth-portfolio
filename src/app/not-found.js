import Link from 'next/link';
import { projectsData } from '@/data/projectsData';
import Header from '@/components/Header';

export default function NotFound() {
    const popularProjects = projectsData.slice(0, 3);

    return (
        <>
        <Header />
        <main>
            <section id="not-found" style={{ textAlign: 'center', minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h1 style={{ fontSize: 'clamp(3rem, 10vw, 6rem)', color: 'var(--accent-color)', marginBottom: '1rem' }}>404</h1>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Sayfa Bulunamadı</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto 2rem auto' }}>
                Aradığınız sayfa galaksiler arası bir yolculuğa çıkmış veya hiç var olmamış olabilir.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <Link href="/" className="cta-button">
                Ana Sayfaya Dön
                </Link>
            </div>
            <div style={{ marginTop: '4rem' }}>
                <h4 style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Belki bunlara göz atmak istersin:</h4>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                {popularProjects.map(project => (
                    <Link key={project.slug} href={`/projects/${project.slug}`} className="cta-button secondary">
                    {project.title}
                    </Link>
                ))}
                </div>
            </div>
            </section>
        </main>
        </>
    );
}