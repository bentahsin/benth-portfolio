import LoginClient from './LoginClient';

interface LoginPageProps {
  searchParams?: { callbackUrl?: string };
}

const LoginPage = ({ searchParams }: LoginPageProps) => {
  const callbackUrl = searchParams?.callbackUrl || '/admin';

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
        <LoginClient callbackUrl={callbackUrl} />
      </div>
    </main>
  );
};

export default LoginPage;
