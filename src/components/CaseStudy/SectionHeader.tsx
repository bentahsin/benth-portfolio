import React, { ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface SectionHeaderProps {
    icon: IconDefinition;
    children: ReactNode;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ icon, children }) => {
    return (
        <h3 className="case-section-header">
            <FontAwesomeIcon icon={icon} />
            <span>{children}</span>
        </h3>
    );
};

export default SectionHeader;