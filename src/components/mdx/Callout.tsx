import type { ReactNode } from 'react';
import { faInfoCircle, faExclamationTriangle, faCheckCircle, faFire } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const calloutTypes = {
    info: { icon: faInfoCircle, className: 'callout-info' },
    warning: { icon: faExclamationTriangle, className: 'callout-warning' },
    success: { icon: faCheckCircle, className: 'callout-success' },
    danger: { icon: faFire, className: 'callout-danger' },
};

interface CalloutProps {
    type?: keyof typeof calloutTypes;
    title?: string;
    children: ReactNode;
}

export function Callout({ type = 'info', title, children }: CalloutProps) {
    const { icon, className } = calloutTypes[type] || calloutTypes.info;

    return (
        <div className={`callout ${className}`}>
            <div className="callout-header">
                <FontAwesomeIcon icon={icon} className="callout-icon" />
                {title && <h4 className="callout-title">{title}</h4>}
            </div>
            <div className="callout-content">
                {children}
            </div>
        </div>
    );
}