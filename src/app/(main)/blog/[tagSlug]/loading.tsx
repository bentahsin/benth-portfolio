import SkeletonCard from '@/components/SkeletonCard';

export default function CategoryLoading() {
    return (
        <section className="blog-page-section">
            <div className="blog-container">
                <div className="skeleton-line title" style={{ height: '40px', width: '300px', margin: '2rem auto 4rem auto' }}></div>
                <div className="posts-grid">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <SkeletonCard key={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}