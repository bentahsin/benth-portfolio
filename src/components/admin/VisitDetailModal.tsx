'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faRobot, faUser, faGlobe, faMicrochip } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';

interface VisitDetailModalProps {
  visit: any;
  onClose: () => void;
}

export default function VisitDetailModal({ visit, onClose }: VisitDetailModalProps) {
  if (!visit) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Ziyaret Detayı</h3>
          <button onClick={onClose} className="close-btn"><FontAwesomeIcon icon={faTimes} /></button>
        </div>

        <div className="modal-body">
          <div className="detail-group">
            <label>Ziyaretçi Tipi</label>
            <div className={`badge ${visit.isBot ? 'bot' : 'human'}`}>
              <FontAwesomeIcon icon={visit.isBot ? faRobot : faUser} />
              {visit.isBot ? 'Bot / Örümcek' : 'Gerçek Kullanıcı'}
            </div>
          </div>

          <div className="detail-grid">
            <div className="detail-item">
              <label>IP Adresi</label>
              <p className="mono">{visit.ip}</p>
            </div>
            <div className="detail-item">
              <label>Tarih</label>
              <p>{format(new Date(visit.createdAt), 'dd MMMM yyyy HH:mm:ss', { locale: tr })}</p>
            </div>
            <div className="detail-item">
              <label>Konum</label>
              <p><FontAwesomeIcon icon={faGlobe} /> {visit.city}, {visit.country}</p>
            </div>
            <div className="detail-item">
              <label>Cihaz</label>
              <p><FontAwesomeIcon icon={faMicrochip} /> {visit.os} - {visit.browser}</p>
            </div>
          </div>

          <div className="detail-group">
            <label>Gezilen Sayfa</label>
            <p className="path-box">{visit.path}</p>
          </div>

          <div className="detail-group">
            <label>Referans (Nereden Geldi?)</label>
            <p className="path-box">{visit.referrer || 'Direkt Giriş'}</p>
          </div>

          <div className="detail-group">
            <label>Veritabanı ID</label>
            <small style={{color: '#666'}}>{visit.id}</small>
          </div>
        </div>
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed; top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(5px);
          display: flex; justify-content: center; align-items: center;
          z-index: 1000; animation: fadeIn 0.2s ease;
        }
        .modal-content {
          background: var(--admin-card-bg);
          border: 1px solid var(--admin-border);
          width: 90%; max-width: 500px;
          border-radius: 12px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.5);
          animation: slideUp 0.3s ease;
        }
        .modal-header {
          padding: 1.5rem; border-bottom: 1px solid var(--admin-border);
          display: flex; justify-content: space-between; align-items: center;
        }
        .close-btn { background: none; border: none; color: #fff; cursor: pointer; font-size: 1.2rem; }
        .modal-body { padding: 1.5rem; }
        .detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem; }
        .detail-group { margin-bottom: 1rem; }
        .detail-item label, .detail-group label { display: block; font-size: 0.8rem; color: var(--admin-text-secondary); margin-bottom: 0.3rem; }
        .path-box { background: rgba(255,255,255,0.05); padding: 8px; border-radius: 6px; word-break: break-all; font-family: monospace; font-size: 0.9rem; }
        .mono { font-family: monospace; }
        .badge { display: inline-flex; align-items: center; gap: 8px; padding: 6px 12px; border-radius: 20px; font-weight: 600; font-size: 0.9rem; }
        .badge.bot { background: rgba(255, 128, 66, 0.2); color: #FF8042; }
        .badge.human { background: rgba(0, 196, 159, 0.2); color: #00C49F; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      `}</style>
    </div>
  );
}