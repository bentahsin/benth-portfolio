'use client';

import { signIn } from 'next-auth/react';

interface LoginClientProps {
  callbackUrl: string;
}

const LoginClient = ({ callbackUrl }: LoginClientProps) => {
  return (
    <button
      type="button"
      onClick={() => signIn('github', { callbackUrl })}
      style={{
        marginTop: '1.5rem',
        width: '100%',
        padding: '0.9rem 1rem',
        borderRadius: '12px',
        border: 'none',
        background: '#24292e',
        color: '#fff',
        fontWeight: 600,
        cursor: 'pointer',
      }}
    >
      GitHub ile Giriş Yap
    </button>
  );
};

export default LoginClient;
