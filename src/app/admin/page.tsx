import prisma from '@/lib/prisma';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faGlobeEurope, faDesktop, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import AdminChartContainer from '@/components/admin/AdminChartContainer';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const totalVisits = await prisma.visit.count();

  const uniqueVisitors = await prisma.visit.groupBy({
    by: ['ip'],
  }).then(res => res.length);

  const visitsByCountry = await prisma.visit.groupBy({
    by: ['country'],
    _count: { ip: true },
    orderBy: { _count: { ip: 'desc' } },
    take: 5,
  });

  const visitsByCity = await prisma.visit.groupBy({
    by: ['city'],
    _count: { ip: true },
    orderBy: { _count: { ip: 'desc' } },
    take: 10,
  });

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
      <h1 className="admin-title">Panel Özeti</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon info">
            <FontAwesomeIcon icon={faUsers} />
          </div>
          <div className="stat-info">
            <h3>Toplam Görüntülenme</h3>
            <p>{totalVisits}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon success">
            <FontAwesomeIcon icon={faGlobeEurope} />
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
            <h3>En Çok Kullanılan OS</h3>
            <p>Windows 10</p> {/* Burayı da dinamik yapabilirsiniz */}
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
    </div>
  );
}