import React, { ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface InfoBoxProps {
    title: string;
    icon: IconDefinition;
    children: ReactNode;
}

const InfoBox: React.FC<InfoBoxProps> = ({ title, icon, children }) => {
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
};

export default InfoBox;