import prisma from '@/lib/prisma';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers, faGlobeEurope, faDesktop, faMapMarkerAlt, faEye,
  faCompass, faFileAlt, faClock, faRobot, faLink, faUser, faChartArea
} from '@fortawesome/free-solid-svg-icons';
import AdminChartContainer from '@/components/admin/AdminChartContainer';
import AnalyticsAreaChart from '@/components/admin/AnalyticsAreaChart';
import DashboardDateFilter from '@/components/admin/DashboardDateFilter';
import { formatDistanceToNow, subDays, subHours, format } from 'date-fns';
import { tr } from 'date-fns/locale';

export const dynamic = 'force-dynamic';

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

function getDateRange(range: string) {
  const now = new Date();
  switch (range) {
    case '24h': return subHours(now, 24);
    case '7d': return subDays(now, 7);
    case '90d': return subDays(now, 90);
    case 'all': return new Date(0);
    case '30d':
    default: return subDays(now, 30);
  }
}

function getLoopCount(range: string) {
  switch (range) {
    case '24h': return 1;
    case '7d': return 7;
    case '90d': return 90;
    case 'all': return 365;
    case '30d':
    default: return 30;
  }
}

export default async function AdminDashboardPage(props: Props) {
  const searchParams = await props.searchParams;
  const range = (searchParams.range as string) || '30d';
  const startDate = getDateRange(range);
  const loopCount = getLoopCount(range);
  const today = new Date();

  const dateFilter = { createdAt: { gte: startDate } };

  const [
    totalVisits,
    uniqueVisitorsGroup,
    visitsByCountry,
    visitsByCity,
    topOSGroup,
    topBrowserGroup,
    topPages,
    recentVisits,
    botStats,
    referrerStats,
    chartVisits
  ] = await Promise.all([
    prisma.visit.count({ where: dateFilter }),

    prisma.visit.groupBy({
      by: ['ip'],
      where: dateFilter,
    }),

    prisma.visit.groupBy({
      by: ['country'],
      where: dateFilter,
      _count: { ip: true },
      orderBy: { _count: { ip: 'desc' } },
      take: 5,
    }),

    prisma.visit.groupBy({
      by: ['city'],
      where: dateFilter,
      _count: { ip: true },
      orderBy: { _count: { ip: 'desc' } },
      take: 10,
    }),

    prisma.visit.groupBy({
      by: ['os'],
      where: dateFilter,
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } },
      take: 1,
    }),

    prisma.visit.groupBy({
      by: ['browser'],
      where: dateFilter,
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } },
      take: 1,
    }),

    prisma.visit.groupBy({
      by: ['path'],
      where: dateFilter,
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } },
      take: 5,
    }),

    prisma.visit.findMany({
      where: dateFilter,
      orderBy: { createdAt: 'desc' },
      take: 10,
    }),

    prisma.visit.groupBy({
      by: ['isBot'],
      where: dateFilter,
      _count: { id: true }
    }),

    prisma.visit.groupBy({
      by: ['referrer'],
      where: {
        ...dateFilter,
        referrer: { not: null }
      },
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } },
      take: 5
    }),

    prisma.visit.findMany({
      where: dateFilter,
      select: { createdAt: true, ip: true }
    })
  ]);

  const chartMap = new Map<string, { visits: number; uniqueIps: Set<string>; fullDate: string; date: string }>();

  for (let i = loopCount - 1; i >= 0; i--) {
    const d = subDays(today, i);
    const key = format(d, 'yyyy-MM-dd');
    const label = format(d, 'd MMM', { locale: tr });
    const fullDate = format(d, 'd MMMM yyyy', { locale: tr });
    chartMap.set(key, { visits: 0, uniqueIps: new Set(), fullDate, date: label });
  }

  chartVisits.forEach(v => {
    const key = format(new Date(v.createdAt), 'yyyy-MM-dd');
    if (chartMap.has(key)) {
      const entry = chartMap.get(key)!;
      entry.visits += 1;
      entry.uniqueIps.add(v.ip);
    }
  });

  const timeSeriesData = Array.from(chartMap.values()).map(entry => ({
    date: entry.date,
    fullDate: entry.fullDate,
    visits: entry.visits,
    unique: entry.uniqueIps.size
  }));

  const uniqueVisitors = uniqueVisitorsGroup.length;
  const mostUsedOS = topOSGroup[0]?.os || 'Veri Yok';
  const mostUsedBrowser = topBrowserGroup[0]?.browser || 'Veri Yok';
  const botCount = botStats.find(s => s.isBot === true)?._count.id || 0;
  const humanCount = botStats.find(s => s.isBot === false)?._count.id || 0;

  const botChartData = [
    { name: 'Gerçek Kullanıcı', count: humanCount },
    { name: 'Bot/Örümcek', count: botCount }
  ];

  const referrerData = referrerStats.map(r => {
    let name = r.referrer || 'Bilinmiyor';
    try { if (name.startsWith('http')) name = new URL(name).hostname.replace('www.', ''); } catch { }
    return { name: name, count: r._count.id };
  });

  const countryData = visitsByCountry.map(item => ({ name: item.country || 'Bilinmiyor', count: item._count.ip }));
  const cityData = visitsByCity.map(item => ({ name: item.city || 'Bilinmiyor', count: item._count.ip }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  const BOT_COLORS = ['#00C49F', '#FF8042'];
  const REF_COLOR = '#82ca9d';

  return (
    <div className="admin-dashboard">
      <div className="admin-page-header" style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 className="admin-title" style={{ margin: 0 }}>Panel Özeti</h1>
          <p style={{ color: 'var(--admin-text-secondary)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
            Sitenizin anlık trafik, kaynak ve ziyaretçi analizi.
          </p>
        </div>

        <DashboardDateFilter />
      </div>

      <div className="chart-card full-width" style={{ marginBottom: '1.5rem', minHeight: '350px' }}>
        <h3><FontAwesomeIcon icon={faChartArea} /> Trafik Trendi ({range === 'all' ? 'Tüm Zamanlar' : range})</h3>
        <div style={{ width: '100%', height: 300 }}>
          <AnalyticsAreaChart data={timeSeriesData} />
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon info"><FontAwesomeIcon icon={faEye} /></div>
          <div className="stat-info"><h3>Toplam</h3><p>{totalVisits}</p></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon success"><FontAwesomeIcon icon={faUsers} /></div>
          <div className="stat-info"><h3>Tekil</h3><p>{uniqueVisitors}</p></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon warning"><FontAwesomeIcon icon={faDesktop} /></div>
          <div className="stat-info"><h3>OS</h3><p style={{ fontSize: '1.2rem' }}>{mostUsedOS}</p></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon info" style={{ backgroundColor: 'rgba(136, 132, 216, 0.15)', color: '#8884d8' }}><FontAwesomeIcon icon={faCompass} /></div>
          <div className="stat-info"><h3>Tarayıcı</h3><p style={{ fontSize: '1.2rem' }}>{mostUsedBrowser}</p></div>
        </div>
      </div>

      <div className="charts-grid" style={{ marginBottom: '1.5rem' }}>
        <div className="chart-card">
          <h3><FontAwesomeIcon icon={faLink} /> Trafik Kaynakları</h3>
          <div style={{ width: '100%', height: 300 }}><AdminChartContainer type="bar" data={referrerData} color={REF_COLOR} /></div>
        </div>
        <div className="chart-card">
          <h3><FontAwesomeIcon icon={faRobot} /> Kullanıcı Tipi</h3>
          <div style={{ width: '100%', height: 300 }}><AdminChartContainer type="pie" data={botChartData} colors={BOT_COLORS} /></div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h3><FontAwesomeIcon icon={faGlobeEurope} /> Ülke Dağılımı</h3>
          <div style={{ width: '100%', height: 300 }}><AdminChartContainer type="pie" data={countryData} colors={COLORS} /></div>
        </div>
        <div className="chart-card full-width">
          <h3><FontAwesomeIcon icon={faMapMarkerAlt} /> Şehir Bazlı Ziyaretler</h3>
          <div style={{ width: '100%', height: 400 }}><AdminChartContainer type="bar" data={cityData} color="#8884d8" /></div>
        </div>
      </div>

      <div className="charts-grid" style={{ marginTop: '1.5rem' }}>
        <div className="chart-card">
          <h3><FontAwesomeIcon icon={faFileAlt} /> Popüler Sayfalar</h3>
          <div className="admin-table-container" style={{ padding: 0, boxShadow: 'none', border: 'none' }}>
            <table className="admin-table">
              <thead><tr><th>Sayfa</th><th style={{ textAlign: 'right' }}>Görüntülenme</th></tr></thead>
              <tbody>
                {topPages.length > 0 ? (
                  topPages.map((page) => (
                    <tr key={page.path}><td style={{ wordBreak: 'break-all' }}><span className="path-badge">{page.path}</span></td><td style={{ textAlign: 'right', fontWeight: 'bold' }}>{page._count.id}</td></tr>
                  ))
                ) : (<tr><td colSpan={2} style={{ textAlign: 'center', color: '#666' }}>Veri yok</td></tr>)}
              </tbody>
            </table>
          </div>
        </div>

        <div className="chart-card">
          <h3><FontAwesomeIcon icon={faClock} /> Son Ziyaretler</h3>
          <div className="admin-table-container" style={{ padding: 0, boxShadow: 'none', border: 'none' }}>
            <table className="admin-table">
              <thead><tr><th>Lokasyon</th><th>Kaynak / Tip</th><th style={{ textAlign: 'right' }}>Zaman</th></tr></thead>
              <tbody>
                {recentVisits.map((visit) => (
                    <tr key={visit.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          {visit.flag && <span style={{ fontSize: '1.2em' }} title={visit.country || ''}>{getFlagEmoji(visit.flag)}</span>}
                          <span style={{ fontSize: '0.9rem' }}>{visit.city ? `${visit.city}, ` : ''}{visit.country || 'Bilinmiyor'}</span>
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#666', marginTop: '2px' }}>{visit.ip}</div>
                      </td>
                      <td>
                        <div style={{ fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                            {visit.isBot ? <span style={{color: '#FF8042', fontWeight: 500}}><FontAwesomeIcon icon={faRobot} size="xs"/> Bot</span> : <span style={{color: '#00C49F', fontWeight: 500}}><FontAwesomeIcon icon={faUser} size="xs"/> İnsan</span>}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#666', maxWidth: '120px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                            {visit.referrer ? (<a href={visit.referrer} target="_blank" rel="noopener noreferrer" style={{color: 'inherit', textDecoration: 'none'}}><FontAwesomeIcon icon={faLink} size="xs" style={{marginRight: '3px'}}/>{new URL(visit.referrer).hostname.replace('www.', '')}</a>) : ('Direkt')}
                        </div>
                      </td>
                      <td style={{ textAlign: 'right', fontSize: '0.85rem', whiteSpace: 'nowrap' }}>{formatDistanceToNow(new Date(visit.createdAt), { addSuffix: true, locale: tr })}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style>{`
        .path-badge { background: rgba(255, 255, 255, 0.05); padding: 2px 6px; border-radius: 4px; font-family: monospace; font-size: 0.85em; }
      `}</style>
    </div>
  );
}

function getFlagEmoji(countryCode: string) {
  const codePoints = countryCode.toUpperCase().split('').map(char =>  127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}