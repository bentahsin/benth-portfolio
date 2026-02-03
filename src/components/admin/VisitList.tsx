'use client';

import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { getPaginatedVisits } from '@/actions/analyticsActions';
import { formatDistanceToNow } from 'date-fns';
import { tr } from 'date-fns/locale';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDesktop, faMobileAlt, faSpinner, faGlobe, faRobot, faUser } from '@fortawesome/free-solid-svg-icons';
import VisitDetailModal from './VisitDetailModal';

interface Visit {
  id: string;
  ip: string;
  country: string | null;
  city: string | null;
  flag: string | null;
  browser: string | null;
  os: string | null;
  device: string | null;
  path: string;
  referrer: string | null;
  isBot: boolean;
  createdAt: Date;
}

function getFlagEmoji(countryCode: string | null) {
  if (!countryCode) return <FontAwesomeIcon icon={faGlobe} />;
  const codePoints = countryCode.toUpperCase().split('').map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

export default function VisitList() {
  const [visits, setVisits] = useState<Visit[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedVisit, setSelectedVisit] = useState<Visit | null>(null);

  const { ref, inView } = useInView();

  useEffect(() => { loadVisits(1); }, []);

  useEffect(() => {
    if (inView && hasMore && !isLoading) loadVisits(page + 1);
  }, [inView, hasMore, isLoading, page]);

  const loadVisits = async (pageNum: number) => {
    setIsLoading(true);
    const response = await getPaginatedVisits(pageNum);
    if (response.success) {
      setVisits(prev => pageNum === 1 ? response.data : [...prev, ...response.data]);
      setHasMore(response.hasMore);
      setPage(pageNum);
    }
    setIsLoading(false);
  };

  return (
    <div className="visit-list-container">
      <div className="admin-table-container">
        <table className="admin-table interactive">
          <thead>
            <tr>
              <th>Tip</th>
              <th>Lokasyon</th>
              <th>IP Adresi</th>
              <th>Cihaz / OS</th>
              <th>Gezilen Sayfa</th>
              <th>Zaman</th>
            </tr>
          </thead>
          <tbody>
            {visits.map((visit) => (
              <tr 
                key={visit.id} 
                onClick={() => setSelectedVisit(visit)}
                style={{ cursor: 'pointer' }}
                className="hover-row"
              >
                {/* Tip İkonu */}
                <td style={{textAlign: 'center'}}>
                    <FontAwesomeIcon 
                        icon={visit.isBot ? faRobot : faUser} 
                        style={{ color: visit.isBot ? '#FF8042' : '#00C49F' }} 
                        title={visit.isBot ? 'Bot' : 'İnsan'}
                    />
                </td>

                <td>
                  <span style={{ fontSize: '1.2em', marginRight: '8px' }}>{getFlagEmoji(visit.flag)}</span>
                  {visit.city ? `${visit.city}, ` : ''}{visit.country || 'Bilinmiyor'}
                </td>

                <td style={{ fontFamily: 'monospace', color: 'var(--text-secondary)' }}>{visit.ip}</td>

                <td>
                  <FontAwesomeIcon icon={visit.device === 'Mobile' ? faMobileAlt : faDesktop} style={{ marginRight: '6px', color: '#888' }} />
                  {visit.os} / {visit.browser}
                </td>

                <td style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  <span className="path-badge">{visit.path}</span>
                </td>

                <td style={{ minWidth: '120px' }}>
                  {formatDistanceToNow(new Date(visit.createdAt), { addSuffix: true, locale: tr })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div ref={ref} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)', minHeight: '50px' }}>
        {isLoading && <FontAwesomeIcon icon={faSpinner} spin size="2x" />}
        {!isLoading && !hasMore && <p>Tüm kayıtlar görüntülendi.</p>}
      </div>

      {selectedVisit && (
        <VisitDetailModal
            visit={selectedVisit}
            onClose={() => setSelectedVisit(null)}
        />
      )}

      <style jsx>{`
        .path-badge { background: rgba(255, 255, 255, 0.05); padding: 4px 8px; border-radius: 4px; font-family: monospace; font-size: 0.85em; }
        .hover-row:hover { background-color: rgba(255,255,255,0.03); transition: background 0.2s; }
      `}</style>
    </div>
  );
}