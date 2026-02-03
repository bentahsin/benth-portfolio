'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

export default function DashboardDateFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentRange = searchParams.get('range') || '30d';

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const range = e.target.value;
    router.push(`/admin?range=${range}`);
  };

  return (
    <div className="date-filter">
      <div className="filter-icon">
        <FontAwesomeIcon icon={faCalendarAlt} />
      </div>
      <select
        value={currentRange}
        onChange={handleChange}
        className="filter-select"
      >
        <option value="24h">Son 24 Saat</option>
        <option value="7d">Son 7 Gün</option>
        <option value="30d">Son 30 Gün</option>
        <option value="90d">Son 90 Gün</option>
        <option value="all">Tüm Zamanlar</option>
      </select>

      <style jsx>{`
        .date-filter {
          display: flex;
          align-items: center;
          background: var(--admin-card-bg);
          border: 1px solid var(--admin-border);
          border-radius: 8px;
          padding: 5px 10px;
        }
        .filter-icon {
          color: var(--admin-text-secondary);
          margin-right: 8px;
        }
        .filter-select {
          background: transparent;
          border: none;
          color: var(--admin-text);
          font-family: var(--font-montserrat);
          font-size: 0.9rem;
          cursor: pointer;
          outline: none;
        }
        .filter-select option {
          background-color: var(--admin-card-bg);
        }
      `}</style>
    </div>
  );
}