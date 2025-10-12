import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faBookOpen, faLightbulb, faHeart } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

export const metadata = {
    title: 'Şu An Neler Yapıyorum?',
    description: 'Şu an profesyonel olarak nelere odaklandığım, hangi yeni teknolojileri öğrendiğim ve kişisel olarak nelerle ilgilendiğim hakkında bir güncelleme.',
};

const nowData = [
    {
        icon: faBriefcase,
        title: "Profesyonel Odak",
        content: "..."
    },
    {
        icon: faLightbulb,
        title: "Yeni Teknolojiler & Öğrenme",
        content: "..."
    },
    {
        icon: faBookOpen,
        title: "Okuma Listem",
        content: "Şuanlık sadece 3D AYT Matematik okuyorum. :("
    },
    {
        icon: faHeart,
        title: "Hayat",
        content: "Deniyoruz bir şeyler..."
    }
];

export default function NowPage() {
    return (
        <>
        <div className="background-effects">
            <div className="background-grid"></div>
        </div>
        <section className="now-page-section">
            <div className="now-page-container">
            <Link href="/" className="back-button" style={{ marginBottom: '2rem', display: 'inline-block' }}>
                <i className="fa-solid fa-arrow-left"></i> Ana Sayfaya Dön
            </Link>
            
            <h1 className="now-page-title">ŞU AN</h1>
            <p className="now-page-subtitle">
                Bu sayfa, şu anda hayatımda nelere odaklandığıma dair bir güncellemedir. <a href="https://nownownow.com/about" target="_blank" rel="noopener noreferrer">"Now Page"</a> akımından esinlenilmiştir.
                <br />
                Son Güncelleme: <strong>12 Ekim 2025</strong>
            </p>

            <div className="now-items-grid">
                {nowData.map((item, index) => (
                <div key={index} className="now-item-card">
                    <div className="now-item-header">
                    <FontAwesomeIcon icon={item.icon} className="now-item-icon" />
                    <h3>{item.title}</h3>
                    </div>
                    <p>{item.content}</p>
                </div>
                ))}
            </div>
            </div>
        </section>
        </>
    );
}