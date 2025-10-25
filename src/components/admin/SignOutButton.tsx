'use client';
import { signOut } from 'next-auth/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

const SignOutButton: React.FC = () => {
    return (
        <button 
            onClick={() => signOut({ callbackUrl: '/' })}
            className="sidebar-footer-link sign-out"
        >
            <FontAwesomeIcon icon={faSignOutAlt} />
            <span>Çıkış Yap</span>
        </button>
    );
};

export default SignOutButton;