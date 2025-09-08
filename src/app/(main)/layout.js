import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ParticleBackground from '@/components/ParticleBackground';

export default function MainLayout({ children }) {
  return (
    <>
      <div className="cursor-dot"></div>      {}
      <div className="cursor-outline"></div>  {}
      <ParticleBackground />
      <Header />
      {children}
      <Footer />
    </>
  );
}