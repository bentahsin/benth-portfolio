import React, { ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface FeatureItemProps {
    icon: IconDefinition;
    children: ReactNode;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon, children }) => {
    return (
        <li className="feature-item">
            <span className="feature-item-icon">
                <FontAwesomeIcon icon={icon} />
            </span>
            <span>{children}</span>
        </li>
    );
};

export default FeatureItem;