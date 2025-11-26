import prisma from '@/lib/prisma';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUsers,
    faGlobeEurope,
    faDesktop,
    faMapMarkerAlt,
    faEye,
    faCompass,
    faFileAlt,
    faClock
} from '@fortawesome/free-solid-svg-icons';
import AdminChartContainer from '@/components/admin/AdminChartContainer';
import { formatDistanceToNow } from 'date-fns';
import { tr } from 'date-fns/locale';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
    const [
        totalVisits,
        uniqueVisitorsGroup,
        visitsByCountry,
        visitsByCity,
        topOSGroup,
        topBrowserGroup,
        topPages,
        recentVisits
    ] = await Promise.all([
        prisma.visit.count(),

        prisma.visit.groupBy({
        by: ['ip'],
        }),

        prisma.visit.groupBy({
        by: ['country'],
        _count: { ip: true },
        orderBy: { _count: { ip: 'desc' } },
        take: 5,
        }),

        prisma.visit.groupBy({
        by: ['city'],
        _count: { ip: true },
        orderBy: { _count: { ip: 'desc' } },
        take: 10,
        }),

        prisma.visit.groupBy({
        by: ['os'],
        _count: { id: true },
        orderBy: { _count: { id: 'desc' } },
        take: 1,
        }),

        prisma.visit.groupBy({
        by: ['browser'],
        _count: { id: true },
        orderBy: { _count: { id: 'desc' } },
        take: 1,
        }),

        prisma.visit.groupBy({
        by: ['path'],
        _count: { id: true },
        orderBy: { _count: { id: 'desc' } },
        take: 5,
        }),

        prisma.visit.findMany({
        orderBy: { createdAt: 'desc' },
        take: 10,
        }),
    ]);

    const uniqueVisitors = uniqueVisitorsGroup.length;
    const mostUsedOS = topOSGroup[0]?.os || 'Veri Yok';
    const mostUsedBrowser = topBrowserGroup[0]?.browser || 'Veri Yok';

    const countryData = visitsByCountry.map(item => ({
        name: item.country || 'Bilinmiyor',
        count: item._count.ip
    }));

    const cityData = visitsByCity.map(item => ({
        name: item.city || 'Bilinmiyor',
        count: item._count.ip
    }));

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

    return (
        <div className="admin-dashboard">
        <div className="admin-page-header" style={{ marginBottom: '2rem' }}>
            <div>
            <h1 className="admin-title" style={{ margin: 0 }}>Panel Özeti</h1>
            <p style={{ color: 'var(--admin-text-secondary)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                Sitenizin anlık trafik ve ziyaretçi analizi.
            </p>
            </div>
        </div>
        
        <div className="stats-grid">
            <div className="stat-card">
            <div className="stat-icon info">
                <FontAwesomeIcon icon={faEye} />
            </div>
            <div className="stat-info">
                <h3>Toplam Görüntülenme</h3>
                <p>{totalVisits}</p>
            </div>
            </div>

            <div className="stat-card">
            <div className="stat-icon success">
                <FontAwesomeIcon icon={faUsers} />
            </div>
            <div className="stat-info">
                <h3>Tekil Ziyaretçi</h3>
                <p>{uniqueVisitors}</p>
            </div>
            </div>
            <div className="stat-card">
            <div className="stat-icon warning">
                <FontAwesomeIcon icon={faDesktop} />
            </div>
            <div className="stat-info">
                <h3>Popüler OS</h3>
                <p style={{ fontSize: '1.2rem' }}>{mostUsedOS}</p>
            </div>
            </div>

            <div className="stat-card">
            <div className="stat-icon info" style={{ backgroundColor: 'rgba(136, 132, 216, 0.15)', color: '#8884d8' }}>
                <FontAwesomeIcon icon={faCompass} />
            </div>
            <div className="stat-info">
                <h3>Popüler Tarayıcı</h3>
                <p style={{ fontSize: '1.2rem' }}>{mostUsedBrowser}</p>
            </div>
            </div>
        </div>

        <div className="charts-grid">
            <div className="chart-card">
            <h3><FontAwesomeIcon icon={faGlobeEurope} /> Ülke Dağılımı</h3>
            <div style={{ width: '100%', height: 300 }}>
                <AdminChartContainer type="pie" data={countryData} colors={COLORS} />
            </div>
            </div>

            <div className="chart-card full-width">
            <h3><FontAwesomeIcon icon={faMapMarkerAlt} /> Şehir Bazlı Ziyaretler</h3>
            <div style={{ width: '100%', height: 400 }}>
                <AdminChartContainer type="bar" data={cityData} color="#8884d8" />
            </div>
            </div>
        </div>

        <div className="charts-grid" style={{ marginTop: '1.5rem' }}>
            <div className="chart-card">
            <h3><FontAwesomeIcon icon={faFileAlt} /> Popüler Sayfalar</h3>
            <div className="admin-table-container" style={{ padding: 0, boxShadow: 'none', border: 'none' }}>
                <table className="admin-table">
                <thead>
                    <tr>
                    <th>Sayfa Yolu</th>
                    <th style={{ textAlign: 'right' }}>Görüntülenme</th>
                    </tr>
                </thead>
                <tbody>
                    {topPages.length > 0 ? (
                    topPages.map((page) => (
                        <tr key={page.path}>
                        <td style={{ wordBreak: 'break-all' }}>{page.path}</td>
                        <td style={{ textAlign: 'right', fontWeight: 'bold' }}>{page._count.id}</td>
                        </tr>
                    ))
                    ) : (
                    <tr><td colSpan={2} style={{ textAlign: 'center', color: '#666' }}>Veri yok</td></tr>
                    )}
                </tbody>
                </table>
            </div>
            </div>

            <div className="chart-card">
            <h3><FontAwesomeIcon icon={faClock} /> Son Ziyaretler</h3>
            <div className="admin-table-container" style={{ padding: 0, boxShadow: 'none', border: 'none' }}>
                <table className="admin-table">
                <thead>
                    <tr>
                    <th>Lokasyon</th>
                    <th>Cihaz</th>
                    <th style={{ textAlign: 'right' }}>Zaman</th>
                    </tr>
                </thead>
                <tbody>
                    {recentVisits.length > 0 ? (
                    recentVisits.map((visit) => (
                        <tr key={visit.id}>
                        <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            {visit.flag && <span style={{ fontSize: '1.2em' }} title={visit.country || ''}>{getFlagEmoji(visit.flag)}</span>}
                            <span style={{ fontSize: '0.9rem' }}>
                                {visit.city ? `${visit.city}, ` : ''}{visit.country || 'Bilinmiyor'}
                            </span>
                            </div>
                            <div style={{ fontSize: '0.75rem', color: '#666', marginTop: '2px' }}>
                            {visit.ip}
                            </div>
                        </td>
                        <td>
                            <div style={{ fontSize: '0.9rem' }}>{visit.os}</div>
                            <div style={{ fontSize: '0.75rem', color: '#666' }}>{visit.browser}</div>
                        </td>
                        <td style={{ textAlign: 'right', fontSize: '0.85rem', whiteSpace: 'nowrap' }}>
                            {formatDistanceToNow(new Date(visit.createdAt), { addSuffix: true, locale: tr })}
                        </td>
                        </tr>
                    ))
                    ) : (
                    <tr><td colSpan={3} style={{ textAlign: 'center', color: '#666' }}>Henüz ziyaret yok</td></tr>
                    )}
                </tbody>
                </table>
            </div>
            </div>

        </div>
        </div>
    );
}

function getFlagEmoji(countryCode: string) {
    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map(char =>  127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
}