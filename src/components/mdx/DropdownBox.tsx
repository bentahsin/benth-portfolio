'use client';

import React, { useState, useRef, useEffect, type ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

interface DropdownBoxProps {
    title: string;
    children: ReactNode;
    startOpen?: boolean;
}

const DropdownBox: React.FC<DropdownBoxProps> = ({ title, children, startOpen = false }) => {
    const [isOpen, setIsOpen] = useState(startOpen);
    const contentRef = useRef<HTMLDivElement>(null);
    const [contentHeight, setContentHeight] = useState('0px');

    useEffect(() => {
        if (contentRef.current) {
            setContentHeight(isOpen ? `${contentRef.current.scrollHeight}px` : '0px');
        }
    }, [isOpen]);

    useEffect(() => {
        const handleResize = () => {
            if (isOpen && contentRef.current) {
                setContentHeight(`${contentRef.current.scrollHeight}px`);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isOpen]);

    const toggleOpen = () => {
        setIsOpen(prev => !prev);
    };

    return (
        <div className={`dropdown-box ${isOpen ? 'open' : ''}`}>
            <button className="dropdown-header" onClick={toggleOpen} aria-expanded={isOpen}>
                <span className="dropdown-title">{title}</span>
                <FontAwesomeIcon icon={faChevronDown} className="dropdown-arrow" />
            </button>
            <div
                className="dropdown-content-wrapper"
                style={{ maxHeight: contentHeight }}
            >
                <div ref={contentRef} className="dropdown-content">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default DropdownBox;