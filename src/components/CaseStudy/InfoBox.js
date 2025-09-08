import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function InfoBox({ title, icon, children }) {
  return (
    <div className="info-box">
      <div className="info-box-header">
        <FontAwesomeIcon icon={icon} />
        <h4>{title}</h4>
      </div>
      <div className="info-box-content">
        {children}
      </div>
    </div>
  );
}