import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function FeatureItem({ icon, children }) {
  return (
    <li className="feature-item">
      <span className="feature-item-icon">
        <FontAwesomeIcon icon={icon} />
      </span>
      <span>{children}</span>
    </li>
  );
}