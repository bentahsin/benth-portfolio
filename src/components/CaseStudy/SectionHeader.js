import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function SectionHeader({ icon, children }) {
  return (
    <h3 className="case-section-header">
      <FontAwesomeIcon icon={icon} />
      <span>{children}</span>
    </h3>
  );
}