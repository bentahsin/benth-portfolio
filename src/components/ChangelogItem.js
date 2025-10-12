import Link from 'next/link';
import { Remarkable } from 'remarkable';

const md = new Remarkable({ html: true });

export default function ChangelogItem({ release }) {
    const formattedDate = new Date(release.published_at).toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const projectName = release.repo.split('/')[1];

    return (
        <div className="changelog-item">
            <div className="changelog-timeline">
                <div className="timeline-dot"></div>
                <div className="timeline-line"></div>
            </div>
            <div className="changelog-content">
                <div className="changelog-header">
                    <div>
                        <span className="changelog-date">{formattedDate}</span>
                        <h3 className="changelog-title">
                            {release.projectSlug ? (
                                <Link href={`/projects/${release.projectSlug}`}>{projectName}</Link>
                            ) : (
                                <span>{projectName}</span>
                            )}
                            <span className="changelog-version">{release.version}</span>
                        </h3>
                    </div>
                    <a href={release.url} target="_blank" rel="noopener noreferrer" className="changelog-link">
                        GitHub'da Görüntüle →
                    </a>
                </div>
                <div 
                    className="changelog-body"
                    dangerouslySetInnerHTML={{ __html: md.render(release.body) }} 
                />
            </div>
        </div>
    );
}