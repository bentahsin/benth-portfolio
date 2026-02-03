import VisitList from '@/components/admin/VisitList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListUl } from '@fortawesome/free-solid-svg-icons';

export const metadata = {
    title: 'Ziyaretçi Kayıtları',
};

export default function VisitsPage() {
    return (
        <div>
        <div className="admin-page-header" style={{ marginBottom: '1rem' }}>
            <div>
            <h1 className="admin-title">
                <FontAwesomeIcon icon={faListUl} style={{ marginRight: '10px' }} />
                Tüm Ziyaretçi Kayıtları
            </h1>
            <p style={{ color: 'var(--admin-text-secondary)', marginTop: '0.5rem' }}>
                Sitenize yapılan tüm girişlerin ham listesi. Aşağı kaydırdıkça eski kayıtlar yüklenir.
            </p>
            </div>
        </div>

        <VisitList />
        </div>
    );
}