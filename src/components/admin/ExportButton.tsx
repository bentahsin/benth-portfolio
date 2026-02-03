'use client';

import { useState } from 'react';
import { exportVisitsToCSV } from '@/actions/analyticsActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faSpinner } from '@fortawesome/free-solid-svg-icons';

export default function ExportButton() {
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    setLoading(true);
    const result = await exportVisitsToCSV();

    if (result.success && result.csv) {
      const blob = new Blob([result.csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `ziyaret_raporu_${new Date().toISOString().slice(0,10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert('Dışa aktarma başarısız oldu.');
    }
    setLoading(false);
  };

  return (
    <button
      onClick={handleExport}
      disabled={loading}
      className="admin-button secondary"
      title="Tüm veriyi CSV olarak indir"
    >
      {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : <FontAwesomeIcon icon={faDownload} />}
      <span style={{ marginLeft: '8px' }}>CSV İndir</span>
    </button>
  );
}