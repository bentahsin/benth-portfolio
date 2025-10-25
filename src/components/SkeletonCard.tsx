export default function SkeletonCard() {
    return (
        <div className="post-card skeleton">
            <div className="skeleton-image"></div>
            <div className="post-card-content">
                <div className="skeleton-line date"></div>
                <div className="skeleton-line title"></div>
                <div className="skeleton-line text"></div>
                <div className="skeleton-line text short"></div>
            </div>
        </div>
    );
}