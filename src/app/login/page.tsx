'use client';

import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

const LoginPage = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/admin';

  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
    }}>
      <div style={{
        maxWidth: '480px',
        width: '100%',
        background: 'var(--card-bg)',
        borderRadius: '16px',
        padding: '2.5rem',
        boxShadow: '0 12px 40px rgba(0,0,0,0.15)'
      }}>
        <h1 style={{ marginTop: 0, marginBottom: '0.75rem' }}>Giriş Yap</h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: 0 }}>
          Admin paneline erişmek için GitHub ile giriş yap.
        </p>
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
      </div>
    </main>
  );
};

export default LoginPage;
