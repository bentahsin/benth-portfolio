import React from 'react';

import {
  faShieldAlt,
  faCode,
  faServer,
  faBolt,
  faPlug,
  faPuzzlePiece,
  faCogs,
  faCheckCircle,
  faLock,
  faDesktop,
  faUsers,
  faChartLine,
  faTools,
  faRocket,
  faLink,
  faBrain,
  faBinoculars,
  faMapMarkedAlt,
  faFileSignature,
  faBalanceScale,
  faPiggyBank,
  faTachometerAlt,
  faUserTie,
  faGamepad,
  faSeedling,
  faStar,
  faSyncAlt,
  faCalendarCheck,
  faCoins,
  faStore,
  faGem,
  faGift,
  faSitemap,
  faArrowUp,
  faTicketAlt,
  faUserCheck,
  faFileCode,
  faLayerGroup,
  faSignature,
  faMicrochip,
  faFingerprint,
  faSatelliteDish,
  faMagic
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import SectionHeader from '@/components/CaseStudy/SectionHeader';
import FeatureItem from '@/components/CaseStudy/FeatureItem';
import InfoBox from '@/components/CaseStudy/InfoBox';
import CodeDiff from '@/components/CaseStudy/CodeDiff';

import JavaIcon from '@/components/icons/JavaIcon';
import SQLiteIcon from '@/components/icons/SQLiteIcon';
import MySQLIcon from '@/components/icons/MySQLIcon';
import NodeJSIcon from '@/components/icons/NodeJSIcon';
import FastifyIcon from '@/components/icons/FastifyIcon';
import PostgreSQLIcon from '@/components/icons/PostgreSQLIcon';
import RedisIcon from '@/components/icons/RedisIcon';
import CppIcon from '@/components/icons/CppIcon';

import AntiAfkBlockText from '@/components/Images/AntiAfkBlockText';
import BenthDungeonsBlockText from '@/components/Images/BenthDungeonsBlockText';
import BenthFarmingBlockText from '@/components/Images/BenthFarmingBlockText';
import BenthPatcherBlockText from '@/components/Images/BenthPatcherBlockText';
import LicenseLibBlockText from '@/components/Images/LicenseLibBlockText';
import BenthLicenseAPIBlockText from '@/components/Images/BenthLicenseAPIBlockText';

const beforePatchCode = `
import org.bukkit.plugin.java.JavaPlugin;

public final class AntiAFK extends JavaPlugin {

  public void onEnable() {
      this.getLogger().info("AntiAFK plugini başarıyla başlatıldı!");

  }

  public void onDisable() {
      Bukkit.getScheduler().cancelTasks(this);
      this.getLogger().info("AntiAFK plugini devre dışı bırakıldı.");
  }
}
`;

const afterPatchCode = `
import org.bukkit.plugin.java.JavaPlugin;
import com.bentahsin.license.LicenseManager;
import com.bentahsin.license.Licensable;

public final class AntiAFK extends JavaPlugin implements Licensable {

    private LicenseManager licenseManager;

    @Override
    public void onEnable() {
        this.licenseManager = new LicenseManager(this, );
        this.licenseManager.initialize();
    }

    public void onDisable() {
      Bukkit.getScheduler().cancelTasks(this);
      this.getLogger().info(com.benthlicense.core.ConfigManager.getString("antiafk_plugini_devre_d_brakld_15")); 
    }

    @Override
    public void onLicenseSuccess() {

        this.getLogger().info(com.benthlicense.core.ConfigManager.getString("antiafk_plugini_baaryla_balatl_14")); 
    }
}
`;

const caseStudies = {
  benthpatcher: (
    <>
      <SectionHeader icon={faShieldAlt}>Yazılımınızı Zırhlayın, Gelirinizi Maksimize Edin</SectionHeader>
      <p>Yazılım geliştiricileri için özel olarak tasarlanan BenthPatcher, dijital ürünlerinizi yetkisiz kullanıma ve gelir kaybına karşı korumanın en modern ve en etkili yoludur. Geliştirdiğiniz değerli eklentileri (plugin) ve uygulamaları, kolayca entegre edilebilen, sağlam ve esnek bir lisanslama sistemiyle güçlendirin.</p>

      <hr />

      <h4>Neden BenthPatcher?</h4>
      <ul className="feature-list">
        <FeatureItem icon={faPuzzlePiece}>
          <strong>Zahmetsiz Entegrasyon:</strong> Karmaşık kodlama süreçlerine son! BenthPatcher, komut satırı arayüzü (CLI) sayesinde mevcut <code>.jar</code> dosyalarınıza lisanslama sistemini saniyeler içinde enjekte eder.
        </FeatureItem>
        <FeatureItem icon={faServer}>
          <strong>Dinamik ve Merkezi Kontrol:</strong> Lisansları uzaktan yönetebilir, süreli veya abonelik tabanlı modeller oluşturabilir ve anında erişimi kontrol edebilirsiniz.
        </FeatureItem>
        <FeatureItem icon={faPiggyBank}>
          <strong>Gelir Kaybını Önleyin:</strong> Her bir kullanımı doğrulayarak sadece meşru kullanıcıların yazılımınıza erişmesini sağlar ve potansiyel gelir kaybınızı ortadan kaldırır.
        </FeatureItem>
        <FeatureItem icon={faCode}>
          <strong>Otomatik Kod Analizi ve Dönüşümü:</strong> Akıllı analiz motoru, uygulamanızdaki sabit kodlanmış (hardcoded) değerleri otomatik olarak tespit eder ve lisans sunucunuzdan dinamik olarak çekilecek şekilde dönüştürür.
        </FeatureItem>
        <FeatureItem icon={faLayerGroup}>
          <strong>Esnek ve Ölçeklenebilir:</strong> İster tek bir eklenti geliştirin, ister yüzlerce müşteriye hizmet verin, BenthPatcher ihtiyaçlarınıza uyum sağlar ve farklı lisans türlerini yönetmenize olanak tanır.
        </FeatureItem>
      </ul>

      <hr />

      <SectionHeader icon={faCogs}>BenthPatcher Nasıl Çalışır?</SectionHeader>
      <p>BenthPatcher, Java&apos;nın güçlü <strong>bytecode manipülasyonu</strong> teknolojisini kullanarak çalışır. Geliştirdiğiniz <code>.jar</code> dosyasını analiz eder ve belirlediğiniz ana sınıfa (main class) kancalar atar. <code>onEnable</code> ve <code>onDisable</code> gibi kritik metotlara lisans doğrulama ve sonlandırma kodlarını otomatik olarak ekler. Tüm bu işlemler, orijinal kaynak kodunuzda tek bir satır değişiklik yapmanıza gerek kalmadan gerçekleşir.</p>

      <InfoBox title="Kodun Dönüşümü" icon={faMagic}>
        <p>BenthPatcher&apos;ın sihrini somut bir örnekle görelim. Solda standart bir eklenti sınıfı, sağda ise Patcher&apos;ın aynı sınıfı saniyeler içinde nasıl güvenli hale getirdiğini görüyorsunuz.</p>
      </InfoBox>
      <CodeDiff oldCode={beforePatchCode} newCode={afterPatchCode} />

      <InfoBox title="Kimin İçin İdeal?" icon={faUsers}>
          <ul className="feature-list">
              <FeatureItem icon={faStar}>Minecraft (Spigot/Paper) eklenti geliştiricileri</FeatureItem>
              <FeatureItem icon={faStar}>Masaüstü Java uygulaması üreticileri</FeatureItem>
              <FeatureItem icon={faStar}>SaaS (Yazılım olarak Hizmet) modeliyle çalışan geliştiriciler</FeatureItem>
              <FeatureItem icon={faStar}>Dijital ürünlerini korumak isteyen tüm Java geliştiricileri</FeatureItem>
          </ul>
      </InfoBox>

      <hr />

      <h4>Emeğiniz Değerlidir. Onu BenthPatcher ile Koruyun. <FontAwesomeIcon icon={faRocket} /></h4>
      <p>Yazılımınızı geliştirmek için harcadığınız zamanı ve kaynağı, BenthPatcher&apos;ın sunduğu üstün koruma ile güvence altına alın. Potansiyel müşterilerinize güvenilir ve profesyonel bir çözüm sunarken, korsan kullanımla mücadele etme yükünü ortadan kaldırın.</p>
    </>
  ),
  benthlicenseApi: (
    <>
      <SectionHeader icon={faServer}>Gelişmiş Lisanslama ve Gerçek Zamanlı Yönetim Platformu</SectionHeader>
      <p>Dijital ürünlerinizi korsan kullanıma karşı korumak, gelir akışınızı yönetmek ve kullanıcılarınıza anında müdahale edebilmek mi istiyorsunuz? Benth Lisans API, bu ihtiyaçlar için tasarlanmış, merkezi ve güçlü bir çözümdür. Sadece bir lisans doğrulama sistemi değil, aynı zamanda yazılımınızın bütünlüğünü garanti altına alan, kullanım analizleri sunan ve anlık komutlarla uzaktan yönetim imkanı sağlayan tam donanımlı bir altyapıdır.</p>

      <hr />

      <SectionHeader icon={faStar}>Temel Faydalar</SectionHeader>
      <ul className="feature-list">
        <FeatureItem icon={faShieldAlt}>
          <strong>Kırılmaz Güvenlik ve Bütünlük Koruması:</strong> Benzersiz &quot;Golden Fingerprint&quot; teknolojimiz, her yazılım versiyonunuzun bütünlüğünü sunucu tarafında doğrular. RSA imzaları ve AES-GCM şifrelemesi ile tüm veri akışı askeri düzeyde güvence altına alınır.
        </FeatureItem>
        <FeatureItem icon={faGamepad}>
          <strong>Benzersiz Kontrol ve Esneklik:</strong> Müşterilerinize ihtiyacınız olan lisans modelini sunun. IP bazlı kısıtlamalar, eş zamanlı oturum limitleri ve tek tıkla yönetilebilen süreli/süresiz lisanslar oluşturun.
        </FeatureItem>
        <FeatureItem icon={faBolt}>
          <strong>Gerçek Zamanlı Yönetim (WebSocket API v3):</strong> Sektörde fark yaratan API&apos;miz ile yazılımlarınıza anında komutlar gönderin, aktif kullanıcıları canlı izleyin ve ayarları anında senkronize edin.
        </FeatureItem>
        <FeatureItem icon={faChartLine}>
          <strong>Analiz ve İçgörü:</strong> Gelişmiş analitik panelimiz sayesinde kullanıcı aktivasyon trendlerini takip edin, coğrafi dağılımları görün ve Denetim Kayıtları ile tam şeffaflık elde edin.
        </FeatureItem>
        <FeatureItem icon={faPlug}>
          <strong>Kolay Otomasyon ve Entegrasyon:</strong> Güçlü Yönetim API&apos;si (Manage/v1) sayesinde lisanslama süreçlerinizi e-ticaret siteniz veya otomasyon araçlarınız üzerinden güvenli bir şekilde yönetin.
        </FeatureItem>
      </ul>

      <hr />

      <InfoBox title="Kimler İçin İdeal?" icon={faUsers}>
        <ul className="feature-list">
          <FeatureItem icon={faUserTie}>Minecraft Eklenti Geliştiricileri</FeatureItem>
          <FeatureItem icon={faUserTie}>SaaS (Yazılım olarak Hizmet) Girişimleri</FeatureItem>
          <FeatureItem icon={faUserTie}>Masaüstü Yazılım Üreticileri</FeatureItem>
          <FeatureItem icon={faUserTie}>Discord Bot Geliştiricileri</FeatureItem>
          <FeatureItem icon={faUserTie}>Dijital Varlık (Script, Template vb.) Satanlar</FeatureItem>
        </ul>
      </InfoBox>

      <hr />

      <SectionHeader icon={faCogs}>Öne Çıkan Teknik Özellikler</SectionHeader>
      <ul className="feature-list">
        <FeatureItem icon={faCheckCircle}>
          <strong>İki Farklı API Desteği:</strong> Geleneksel istekler için REST benzeri API (v2) ve anlık iletişim için WebSocket API (v3).
        </FeatureItem>
        <FeatureItem icon={faCheckCircle}>
          <strong>Gelişmiş Rol ve Yetki Yönetimi (RBAC):</strong> Ekip üyelerinize (Destek, Yönetici vb.) farklı yetkilerde erişim imkanı.
        </FeatureItem>
        <FeatureItem icon={faCheckCircle}>
          <strong>Discord Webhook Entegrasyonu:</strong> Sistemdeki kritik olaylar hakkında anında Discord bildirimleri alın.
        </FeatureItem>
        <FeatureItem icon={faCheckCircle}>
          <strong>Modern ve Kullanıcı Dostu Yönetim Paneli:</strong> Karanlık/Aydınlık tema desteği ve mobil uyumlu arayüz.
        </FeatureItem>
        <FeatureItem icon={faCheckCircle}>
          <strong>Sağlam Altyapı:</strong> Node.js, Fastify, PostgreSQL ve Redis ile yüksek performans ve ölçeklenebilirlik.
        </FeatureItem>
      </ul>

      <hr />

      <h4><FontAwesomeIcon icon={faRocket} /> Özetle</h4>
      <p>Benth Lisans API ile yazılımınızın güvenliğini sağlamakla kalmaz, onu dinamik olarak yönetebileceğiniz, veriye dayalı kararlar alabileceğiniz ve iş modelinizi bir üst seviyeye taşıyabileceğiniz bir büyüme motoruna sahip olursunuz. <strong>Yazılımınızın tüm potansiyelini ortaya çıkarın.</strong></p>
    </>
  ),
  benthlicenseLib: (
    <>
      <SectionHeader icon={faRocket}>Eklentilerinizi Geleceğe Taşıyın: Kırılamaz Güvenlik</SectionHeader>
      <p>Geliştirdiğiniz premium Minecraft eklentilerinin kopyalanması ve gelir kaybı yaşatması artık kaderiniz değil. <strong>BenthLicense</strong>, sadece bir lisanslama sisteminden çok daha fazlasını sunar; eklentilerinizi koruma altına alan, onlara değer katan ve size tam kontrol sağlayan yeni nesil bir koruma ve yönetim platformudur.</p>

      <hr />

      <SectionHeader icon={faShieldAlt}>Çünkü Güvenlik Tesadüf Değildir</SectionHeader>
      <p>Piyasadaki basit lisans sistemlerini unutun. BenthLicense, eklentilerinizi kırmaya yönelik her türlü girişimi boşa çıkarmak için tasarlanmış çok katmanlı ve modern bir güvenlik mimarisi kullanır.</p>

      <h4><FontAwesomeIcon icon={faLock} /> Askeri Düzeyde Kriptografi</h4>
      <ul className="feature-list">
        <FeatureItem icon={faLock}>
          <strong>Kırılamaz İletişim:</strong> Eklentiniz ile lisans sunucusu arasındaki tüm iletişim, RSA ve AES-GCM şifreleme standartları ile korunur. Bu, araya girilerek verilerin okunmasını veya değiştirilmesini imkansız hale getirir.
        </FeatureItem>
        <FeatureItem icon={faSignature}>
          <strong>Dijital İmza Doğrulaması:</strong> Sunucudan gelen her mesaj ve komut, sahteciliğe karşı dijital olarak imzalanır. Eklentiniz, sadece sizden gelen meşru komutları işleme alır.
        </FeatureItem>
      </ul>

      <h4><FontAwesomeIcon icon={faMicrochip} /> Native Kod (JNI) ile Aşılamaz Savunma</h4>
      <ul className="feature-list">
        <FeatureItem icon={faMicrochip}>
          <strong>Derin Sistem Analizi:</strong> Java ortamının dışına çıkarak, sunucu üzerinde çalışan <strong>debugger</strong> veya <strong>java agent</strong> gibi tersine mühendislik araçlarını anında tespit eder ve eklentiyi güvenli bir şekilde durdurur.
        </FeatureItem>
        <FeatureItem icon={faFingerprint}>
          <strong>Eşsiz Parmak İzi Teknolojisi:</strong> Eklentinizin kod dosyalarından (<code>.class</code>) oluşturulan SHA-256 parmak izine, sadece native kütüphanenin bildiği gizli bir anahtar eklenir. Eklenti dosyaları üzerinde yapılacak en ufak bir değişiklik bile lisansı geçersiz kılar.
        </FeatureItem>
      </ul>

      <hr />

      <SectionHeader icon={faBolt}>Lisanstan Öte: Dinamik ve Akıllı Yönetim</SectionHeader>
      <p>BenthLicense, eklentinizi statik bir koruma kalkanının arkasına hapsetmez. Modern WebSocket teknolojisi sayesinde size canlı ve esnek bir yönetim deneyimi sunar.</p>
        <ul className="feature-list">
            <FeatureItem icon={faSatelliteDish}>
                <strong>Uzaktan Komut Gönderme:</strong> Web panelinizden eklentilerinize anlık komutlar (<code>force_deactivate</code>, <code>resync_config</code>) göndererek tam kontrol sağlayın.
            </FeatureItem>
            <FeatureItem icon={faSyncAlt}>
                <strong>Merkezi Konfigürasyon Yönetimi:</strong> Eklentinizin ayar dosyalarını (<code>config.yml</code>) lisans sunucunuzda barındırın ve her başlangıçta en güncel ayarları güvenli bir şekilde çektirin.
            </FeatureItem>
      </ul>

      <InfoBox title="Geliştirici Dostu, Korsan Düşmanı" icon={faCode}>
        <p>Karmaşık güvenlik protokollerinin sizi yormasına izin vermeyin. BenthLicense, kolay entegrasyon için tasarlandı.</p>
        <ul className="feature-list">
          <FeatureItem icon={faPuzzlePiece}>
            <strong>Basit Entegrasyon:</strong> <code>Licensable</code> arayüzünü projenize ekleyin ve <code>LicenseManager</code>&apos;ı tek bir satırla başlatın.
          </FeatureItem>
          <FeatureItem icon={faCheckCircle}>
            <strong>Net ve Güvenli Akış:</strong> Eklentinizin ana kodları (<code>onLicenseSuccess</code>), sadece tüm güvenlik kontrolleri başarıyla tamamlandıktan sonra çalışır.
          </FeatureItem>
          <FeatureItem icon={faMagic}>
            <strong>Otomatik Kurulum:</strong> Son kullanıcı için <code>license.yml</code> dosyası otomatik olarak oluşturulur ve kullanıcıya ne yapması gerektiği açıkça belirtilir.
          </FeatureItem>
        </ul>
      </InfoBox>

      <p><strong>Emeğinizin ve gelirinizin korunduğu, eklentileriniz üzerinde tam kontrole sahip olduğunuz bir gelecek için bugün BenthLicense&apos;i seçin.</strong></p>
    </>
  ),
  antiafk: (
    <>
      <SectionHeader icon={faBrain}>Sunucunuzu Akıllıca Koruyun, Oyuncu Deneyimini Zirveye Taşıyın</SectionHeader>
      <p>Sunucu yönetimi karmaşık bir iştir. Oyuncu memnuniyeti, sunucu performansı ve adil bir ekonomi dengesi arasında sürekli bir denge kurmak zorundasınız. Peki ya tüm bu dengeyi bozan sessiz bir tehdit varsa? <strong>AFK (Away From Keyboard) kalan oyuncular.</strong></p>
      <p>Sadece sunucunuzda değerli bir yer işgal etmekle kalmaz, aynı zamanda AFK farmları aracılığıyla ekonominizi alt üst edebilir ve aktif oyuncularınızın hakkını yiyebilirler. Standart AFK eklentileri ise basit botlar tarafından kolayca aşılabilir.</p>
      <p><strong>AntiAFK, bir AFK eklentisinden çok daha fazlasıdır. Sunucunuz için geliştirilmiş akıllı bir koruma kalkanıdır.</strong></p>

      <hr />

      <SectionHeader icon={faCogs}>Sıradan Çözümleri Unutun: AntiAFK&apos;nın Üstün Zekası</SectionHeader>
      <ul className="feature-list">
        <FeatureItem icon={faChartLine}>
          <strong>Gelişmiş Davranış Analizi:</strong> Sürekli aynı daireyi çizen, ileri geri yürüyen veya belirli bir rotayı tekrar eden botlar artık sorun değil. AntiAFK, oyuncuların hareket yörüngelerini analiz eder ve insan eliyle yapılması imkansız olan tekrarlayan kalıpları anında tespit eder.
        </FeatureItem>
        <FeatureItem icon={faBinoculars}>
          <strong>Çok Yönlü Aktivite Tespiti:</strong> Kamera hareketleri, sohbet, envanter kullanımı, saldırı yapma ve blok kırma gibi onlarca farklı aktiviteyi izleyerek &quot;Auto-clicker&quot; kullanan oyuncuları anında yakalar.
        </FeatureItem>
        <FeatureItem icon={faMapMarkedAlt}>
          <strong>Akıllı Bölgesel Yönetim:</strong> WorldGuard entegrasyonu ile sunucunuzun her bölgesi (lobi, pazar, pvp arenası) için farklı AFK kuralları belirleyerek tam kontrol ve esneklik sağlarsınız.
        </FeatureItem>
      </ul>

      <hr />

      <SectionHeader icon={faDesktop}>Yönetimi Karmaşık Değil, Keyifli Hale Getirin</SectionHeader>
      <ul className="feature-list">
          <FeatureItem icon={faDesktop}>
              <strong>Tamamen Oyun İçi Yönetim Paneli (GUI):</strong> FTP&apos;ye bağlanmanıza veya karmaşık config dosyalarıyla boğuşmanıza gerek yok. <code>/antiafk panel</code> komutuyla tüm ayarları anında değiştirin ve zamandan muazzam tasarruf edin.
          </FeatureItem>
          <FeatureItem icon={faFileSignature}>
              <strong>Gelişmiş Komut Düzenleyici:</strong> ProtocolLib entegrasyonu ile bölge aksiyonları için uzun ve karmaşık komutları bile oyun içindeki kitap arayüzü sayesinde rahatça yazıp kaydedin, hata riskini ortadan kaldırın.
          </FeatureItem>
      </ul>

      <InfoBox title="Neden Sunucunuz AntiAFK'ya İhtiyaç Duyuyor?" icon={faRocket}>
        <ul className="feature-list">
            <FeatureItem icon={faBalanceScale}>
                <strong>Adaleti Sağlamak İçin:</strong> Aktif oyuncularınızın, AFK hileleri yapanlar yüzünden geride kalmasını önleyin.
            </FeatureItem>
            <FeatureItem icon={faPiggyBank}>
                <strong>Ekonomiyi Korumak İçin:</strong> AFK Farmların yarattığı enflasyonun ve dengesizliğin önüne geçin.
            </FeatureItem>
             <FeatureItem icon={faTachometerAlt}>
                <strong>Sunucu Performansı İçin:</strong> Gereksiz AFK oyuncularını otomatik olarak uzaklaştırarak sunucunuzda yer açın.
            </FeatureItem>
            <FeatureItem icon={faUserTie}>
                <strong>Profesyonel Bir İmaj İçin:</strong> Oyuncularınıza, sunucunuzun adil ve iyi yönetilen bir yer olduğunu gösterin.
            </FeatureItem>
            <FeatureItem icon={faGamepad}>
                <strong>Tam Kontrol İçin:</strong> Kuralları siz belirleyin. AFK sistemini sunucunuzun her köşesine göre özelleştirin.
            </FeatureItem>
        </ul>
      </InfoBox>

      <p><strong>Sunucunuzu bir üst seviyeye taşımaya hazır mısınız? AntiAFK ile kontrolü elinize alın ve oyuncularınıza hak ettikleri adil ve akıcı deneyimi sunun.</strong></p>
    </>
  ),
  benthfarming: (
    <>
      <SectionHeader icon={faSeedling}>Tarım Deneyimini Baştan Yaratın ve Oyuncularınızı Büyüleyin!</SectionHeader>
      <p>Sıradan ve sıkıcı tarım sistemlerini unutun. <strong>BenthFarming</strong>, sunucunuzdaki tarım mekaniklerini basit bir görev olmaktan çıkarıp, oyuncularınızın tekrar tekrar geri döneceği, <strong>dinamik, ödüllendirici ve tamamen özelleştirilebilir bir maceraya</strong> dönüştürür. Oyuncularınıza gerçek bir ilerleme hissi yaşatın ve sunucu ekonominize yeni bir soluk getirin.</p>

      <hr />

      <SectionHeader icon={faStar}>Neden BenthFarming Sunucunuz İçin Vazgeçilmez?</SectionHeader>

      <h4>1. İki Farklı Oyun Modu: Sonsuz Esneklik</h4>
      <ul className="feature-list">
        <FeatureItem icon={faSyncAlt}>
          <strong>Çiftçilik Modu:</strong> Oyuncularınızın ektiği ve kırdığı her bir ekinin değerli olduğu, kırılan ekinlerin otomatik olarak yeniden büyüdüğü sürekli aktif bir tarım döngüsü yaratın.
        </FeatureItem>
        <FeatureItem icon={faCalendarCheck}>
          <strong>Etkinlik Modu:</strong> Tarımı, zamanlı yenilenme veya tarih bazlı etkinliklerle tüm sunucunun heyecanla beklediği özel anlara dönüştürün ve BossBar ile heyecanı dorukta tutun!
        </FeatureItem>
      </ul>

      <h4>2. Kendi Tarım Ekonominizi Yaratın</h4>
      <ul className="feature-list">
        <FeatureItem icon={faCoins}>
          <strong>Özel Tarım Çapaları:</strong> Farklı materyallerden ve can değerlerinden oluşan çapalar tasarlayarak oyunculara bir ilerleme hedefi sunun.
        </FeatureItem>
        <FeatureItem icon={faStore}>
          <strong>Entegre Dükkan:</strong> <code>/capamarket</code> komutuyla oyuncularınızın bu özel çapaları kolayca satın alabileceği bir arayüz sağlayın.
        </FeatureItem>
        <FeatureItem icon={faGem}>
          <strong>Çapa Bazlı Nadirlik:</strong> Bir ekinin ne kadar nadir bir ödül vereceğini, oyuncunun kullandığı çapanın türüne göre belirleyerek ekonominize derinlik katın.
        </FeatureItem>
      </ul>

      <h4>3. Derinlemesine Özelleştirme ile Tam Kontrol</h4>
      <ul className="feature-list">
        <FeatureItem icon={faMapMarkedAlt}>
          <strong>Çoklu Bölge Desteği:</strong> Sunucunuzda farklı temalara sahip tarım alanları oluşturun. Her bölgenin kendine özgü tohum desenleri, boyutları ve izinleri olsun.
        </FeatureItem>
        <FeatureItem icon={faGift}>
          <strong>Esnek Ödül Havuzları:</strong> Her bir tohum türü için özel komutlar (<code>give</code>, <code>eco give</code> vb.) ve eşyalar içeren, nadirliğe dayalı ödül havuzları oluşturun.
        </FeatureItem>
        <FeatureItem icon={faCogs}>
          <strong>Günlük Limitler:</strong> Oyuncuların günde ne kadar ekin kırabileceğini sınırlayarak ekonomiyi dengede tutun ve adil bir oyun ortamı sağlayın.
        </FeatureItem>
      </ul>

      <InfoBox title="Geliştiriciler İçin Eşsiz Bir Platform" icon={faCode}>
        <p>BenthFarming, sadece bir eklenti değil, bir <strong>API platformudur</strong>. Bu, eklentinin potansiyelinin sınırsız olduğu anlamına gelir.</p>
        <ul className="feature-list">
            <FeatureItem icon={faPuzzlePiece}>
                <strong>Genişletilebilir API:</strong> Kendi ödül sistemlerinizi (RewardAPI), çapa yeteneklerinizi (HoeAPI) ve ekonomi entegrasyonlarınızı (EconomyAPI) kolayca ekleyin.
            </FeatureItem>
            <FeatureItem icon={faLink}>
                <strong>Özel Event&apos;ler:</strong> Tarım döngüsünün her aşaması için (ekin kırma, yeniden ekme, ödül verme) sunulan özel event&apos;leri dinleyerek kendi mantığınızı devreye sokun.
            </FeatureItem>
        </ul>
      </InfoBox>

      <p><strong>BenthFarming ile sunucunuzun potansiyelini ortaya çıkarın ve oyuncularınıza unutulmaz bir tarım macerası yaşatın. Hemen deneyin ve farkı görün!</strong></p>
    </>
  ),
  benthdungeons: (
    <>
      <SectionHeader icon={faTools}>MythicDungeons Sunucunuzu Profesyonel Sistemlerle Güçlendirin</SectionHeader>
      <p><strong>BenthDungeons</strong>, MythicDungeons için geliştirilmiş, sunucu yönetimini ve oyuncu deneyimini bir üst seviyeye taşıyan bir add-on&apos;dur. Sizin özenle yarattığınız zindanları, oyuncular için anlamlı hedeflere ve sunucu sistemlerinize tam entegre, yönetilebilir bir yapıya dönüştürür.</p>

      <hr />

      <SectionHeader icon={faPuzzlePiece}>Ana Özellikler ve Fonksiyonlar</SectionHeader>
      <p>BenthDungeons, mevcut MythicDungeons kurulumunuza iki farklı ve güçlü çalışma modu ekler:</p>

      <h4>1. Kademe Modu: Sıralı Zindan İlerlemesi</h4>
      <ul className="feature-list">
          <FeatureItem icon={faSitemap}>
            <strong>Ne Yapar?</strong> Oyuncuların, zindanları sizin belirlediğiniz sırada (1. kademe, 2. kademe vb.) tamamlayarak ilerlemesini sağlar.
          </FeatureItem>
          <FeatureItem icon={faArrowUp}>
            <strong>Faydası:</strong> Oyunculara net bir ilerleme yolu ve sürekli bir hedef sunarak sunucunuza olan bağlılıklarını artırır. Tamamlanan, mevcut ve kilitli zindanlar şık bir arayüzde gösterilir.
          </FeatureItem>
      </ul>

      <h4>2. Bilet Modu: Ekonomiye Dayalı Zindan Girişi</h4>
      <ul className="feature-list">
          <FeatureItem icon={faTicketAlt}>
            <strong>Ne Yapar?</strong> Oyuncuların, zindanlara girmek için oyun içi para ile bilet satın aldığı bir sistem kurar.
          </FeatureItem>
          <FeatureItem icon={faCoins}>
            <strong>Faydası:</strong> Sunucu ekonominizi canlandırır ve zindan girişlerini, ekonominizin bir parçası olan değerli ve takas edilebilir bir metaya dönüştürür.
          </FeatureItem>
      </ul>

      <hr />

      <SectionHeader icon={faDesktop}>Sadece Bir Eklenti Değil, Bir Yönetim Aracı</SectionHeader>
      <ul className="feature-list">
          <FeatureItem icon={faUserCheck}>
              <strong>Akıllı Parti ve Hazırlık Kontrolü (Ready-Check):</strong> Parti lideri zindana girmeden önce, sistem her üyenin giriş şartlarını (kademe, bilet, para vb.) otomatik olarak kontrol eder. Bu, eksiklikten kaynaklanan sorunları ve şikayetleri tamamen ortadan kaldırır.
          </FeatureItem>
          <FeatureItem icon={faFileCode}>
              <strong>Detaylı ve Merkezi Yapılandırma:</strong> Tüm zindan ayarlarını (giriş ücretleri, parti boyutları, ödüller, bekleme süreleri) tek bir <code>config.yml</code> dosyasından kolayca yönetin.
          </FeatureItem>
          <FeatureItem icon={faLink}>
              <strong>Tam Entegrasyon Desteği:</strong> Vault, PlaceholderAPI, ItemsAdder & MMOItems ile kusursuz çalışarak sunucunuzun mevcut sistemleriyle tam uyum sağlar ve özelleştirilmiş biletler kullanmanıza olanak tanır.
          </FeatureItem>
      </ul>

      <InfoBox title="BenthDungeons ile Ne Kazanırsınız?" icon={faRocket}>
          <ul className="feature-list">
              <FeatureItem icon={faArrowUp}><strong>Artan Oyuncu Etkileşimi:</strong> Net hedefler ve ilerleme sistemleri, oyuncuların sunucunuzda daha uzun süre aktif kalmasını sağlar.</FeatureItem>
              <FeatureItem icon={faCoins}><strong>İşlevsel Sunucu Ekonomisi:</strong> Oyun içi paraya ve eşyalara (biletler) somut bir değer ve kullanım alanı kazandırırsınız.</FeatureItem>
              <FeatureItem icon={faShieldAlt}><strong>Azalan Yönetim Yükü:</strong> Otomatik kontrol sistemleri sayesinde parti ve zindan başlangıçlarıyla ilgili sorunlarla daha az ilgilenirsiniz.</FeatureItem>
              <FeatureItem icon={faStar}><strong>Profesyonel Bir Deneyim:</strong> Oyuncularınıza, iyi düşünülmüş ve sorunsuz çalışan bir sistem sunarak sunucunuzun kalitesini artırırsınız.</FeatureItem>
          </ul>
      </InfoBox>

      <p>MythicDungeons ile yarattığınız harika içerikleri, BenthDungeons&apos;ın sunduğu profesyonel sistemlerle birleştirin. Sunucunuza hak ettiği yapıyı ve derinliği bugün kazandırın.</p>
    </>
  ),
};

export const projectsData = [
  {
    slug: 'benthpatcher',
    title: 'BenthLicense AutoPatcher',
    image: '/assets/benthpatcher-16-9.png',
    tags: [],
    tagIcons: [<JavaIcon key="java" />],
    description: "Bukkit / Spigot / Paper API ile yazılmış eklentilerin lisanslanmasını kolaylaştırır. Birkaç komut satırı, Patcher'a sağlanan Jar dosyasının \"Java ByteCode\"unu analiz eder, gerekli değişiklikleri yapar ve lisanslı Jar dosyasını oluşturur. Ayrıca, BenthLicense API sunucusu için DataBank verilerini içeren bir JSON dosyası da sağlar.",
    caseStudyContent: caseStudies.benthpatcher,
    caseStudyTitle: <>Detaylı Bilgi: <BenthPatcherBlockText /></>
  },
  {
    slug: 'benthlicense-api',
    title: 'BenthLicense API Server',
    image: '/assets/benthlicenseapi-16-9.png',
    tags: [],
    tagIcons: [<NodeJSIcon key="node" />, <FastifyIcon key="fastify" />, <PostgreSQLIcon key="postgres" />, <RedisIcon key="redis" />],
    description: "BenthLicense API lisans kontrol sunucusu, hız, güvenlik ve esneklik arasında hassas bir denge kuran çok katmanlı bir güvenlik zırhı ile şık ve modern paneliyle güzel bir deneyim sunarken, anında iletişim için WebSocket ve evrensel uyumluluk için REST sunar.",
    caseStudyContent: caseStudies.benthlicenseApi,
    caseStudyTitle: <>Detaylı Bilgi: <BenthLicenseAPIBlockText /></>
  },
  {
    slug: 'benthlicense-lib',
    title: 'BenthLicense Library (Java)',
    image: '/assets/LicenseLib-16-9.png',
    tags: ['Java Native Interface', 'Cryptography', 'Parallel Handshake', 'Anti-Tamper', 'Anti Java Agent/Debugger', 'DataBank'],
    tagIcons: [<JavaIcon key="java" />, <CppIcon key="cpp" />],
    description: "Kullanıcı dostu arayüzün arkasında tavizsiz bir güvenlik felsefesini gizleyen, BenthPathcer ile entegrasyonu geliştiriciler için inanılmaz derecede kolaylaştıran, ancak potansiyel saldırganlar için kırılmasını neredeyse imkansız hale getiren bir istemci kütüphanesi.",
    caseStudyContent: caseStudies.benthlicenseLib,
    caseStudyTitle: <>Detaylı Bilgi: <LicenseLibBlockText /></>
  },
  {
    slug: 'antiafk',
    title: 'AntiAFK',
    image: '/assets/AntiAFK.png',
    tags: [],
    tagIcons: [<JavaIcon key="java" />],
    description: "Sunucu performansını (TPS) düşürmeden, akıllı algoritmalarla aktifmiş gibi davranan oyuncuları tespit eden bir Minecraft eklentisi. Eklenti, sıra dışı bir rota tabanlı kontrol sistemi sunuyor.",
    caseStudyContent: caseStudies.antiafk,
    caseStudyTitle: <>Detaylı Bilgi: <AntiAfkBlockText /></>
  },
  {
    slug: 'benthfarming',
    title: 'BenthFarming',
    image: '/assets/BenthFarming_16-9.png',
    tags: [],
    tagIcons: [<JavaIcon key="java" />, <SQLiteIcon key="sqlite" />, <MySQLIcon key="mysql" />],
    description: "Sunucunuzun daha etkileşimli bir hale gelmesi için BenthFarming eklentimiz, ana \"date_based\" ve \"regeneration\" modları altında ayrılmış 3 farklı mod sunar. GUI kontrol paneli sayesinde yapılandırması kolay bir yapıya sahiptir. Geliştiriciler için kapsamlı bir API mevcuttur.",
    caseStudyContent: caseStudies.benthfarming,
    caseStudyTitle: <>Detaylı Bilgi: <BenthFarmingBlockText /></>
  },
  {
    slug: 'benthdungeons',
    title: 'BenthDungeons',
    image: '/assets/BenthDungeons_4-3.png',
    tags: [],
    tagIcons: [<JavaIcon key="java" />, <SQLiteIcon key="sqlite" />, <MySQLIcon key="mysql" />],
    description: "Popüler bir aracın kilitli API'lerinin, Java Reflection gibi ileri düzey teknikler kullanılarak aşıldığı ve topluluk tarafından istenen özelliklerin geliştirildiği uzman bir entegrasyon projesi.",
    caseStudyContent: caseStudies.benthdungeons,
    caseStudyTitle: <>Detaylı Bilgi: <BenthDungeonsBlockText /></>
  }
];