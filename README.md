# Kişisel Portföy Websitem - bentahsin

![GitHub Dil Sayısı](https://img.shields.io/github/languages/count/bentahsin/benth-portfolio?style=for-the-badge)
![GitHub Top Dil](https://img.shields.io/github/languages/top/bentahsin/benth-portfolio?style=for-the-badge&color=8c469e)
![Lisans](https://img.shields.io/github/license/bentahsin/benth-portfolio?style=for-the-badge)
![Son Commit](https://img.shields.io/github/last-commit/bentahsin/benth-portfolio?style=for-the-badge)

Merhaba! Bu repo, yeteneklerimi, projelerimi ve yazılım felsefemi sergilemek üzere tasarladığım kişisel portföy web sitemin kaynak kodlarını barındırmaktadır. Bu platformu, dijital bir kartvizitten daha fazlası olarak görüyor; teknik yetkinliğimi ve problem çözme yaklaşımımı somut bir şekilde göstermeyi amaçlıyorum.

### ✨ [Sitemi Ziyaret Etmek İçin Tıklayın](https://www.bentahsin.com) ✨ - *Offline*

---

## 🚀 Projeye Dair Vizyonum

Bu projeyi, bir geliştirici olarak sahip olduğum teknik derinliği ve estetik anlayışı bir araya getirme vizyonuyla hayata geçirdim. Amacım, statik bir "hakkında" sayfasının ötesine geçerek, her projenin arkasındaki hikayeyi, karşılaştığım zorlukları ve ürettiğim çözümleri detaylı vaka analizleri ile anlatmaktı. Bu site, benim dijital atölyem ve mühendislik yaklaşımımın bir yansımasıdır.

---

## 🌟 Öne Çıkan Özellikler

Sitemi geliştirirken hem teknik hem de görsel olarak zengin bir deneyim sunmayı hedefledim. İşte öne çıkan bazı özellikler:

- **Modern ve Duyarlı Tasarım:** Her türlü cihazda (mobil, tablet, masaüstü) kusursuz bir kullanıcı deneyimi sunar.
- **Next.js 15 App Router Mimarisi:** Performans, SEO ve geliştirici deneyimini en üst düzeye çıkarmak için en güncel teknolojilerden faydalandım.
- **İnteraktif Arka Plan:** `react-tsparticles` ile siteye derinlik katan, dinamik ve hafif bir partikül animasyonu entegre ettim.
- **Gelişmiş Kaydırma Animasyonları:** `ScrollReveal` kullanarak sayfa elemanlarına akıcı ve dikkat çekici giriş animasyonları ekledim.
- **Özelleştirilmiş İmleç (Cursor):** Kullanıcı etkileşimini artırmak için tasarladığım, standart imlecin yerini alan şık bir "dot" ve "outline" animasyonu.
- **Dinamik Glow Efektleri:** `IntersectionObserver` API'si ile, kullanıcının görüntülediği bölüme göre arka planda beliren estetik "glow" (ışıma) efektleri geliştirdim.
- **3D Tilt Efekti:** `Vanilla-Tilt.js` ile proje kartlarına ve yetenek ikonlarına, fare ile üzerine gelindiğinde hafif bir 3D derinlik hissi kazandırdım.
- **Detaylı Vaka Analizleri:** Her projem için ayrı bir sayfada, projenin amacını, teknik detaylarını ve sonuçlarını anlatan kapsamlı içerikler hazırladım.
- **Kod Farkı Görüntüleyici:** `react-diff-viewer` kullanarak, bir kodun işlemden önceki ve sonraki halini etkili bir şekilde sergiledim.
- **Modüler ve Tekrar Kullanılabilir Bileşenler:** Proje genelinde tutarlılığı sağlamak ve bakımı kolaylaştırmak için `SectionHeader`, `FeatureItem`, `InfoBox` gibi kendi özel bileşenlerimi oluşturdum.

---

## 🛠️ Teknoloji Seçimlerim

Bu projeyi hayata geçirirken, modern web geliştirme standartlarını yansıtan, güvendiğim ve keyifle kullandığım teknolojileri tercih ettim:

| Kategori | Teknoloji | Neden Tercih Ettim? |
| :--- | :--- | :--- |
| **Ana Çatı (Framework)**| `Next.js` | Sunucu Taraflı Oluşturma (SSR) ve Statik Site Üretimi (SSG) yetenekleriyle üst düzey performans ve SEO optimizasyonu sağlıyor. |
| **Kütüphane** | `React` | Bileşen tabanlı mimarisiyle karmaşık arayüzleri yönetilebilir ve modüler bir şekilde inşa etmeme olanak tanıyor. |
| **Stil & Tasarım** | `CSS Modules`, `Global CSS` | Bileşen bazlı stil izolasyonu ve CSS değişkenleri (variables) ile sürdürülebilir bir tema altyapısı kurdum. |
| **Animasyon & Efektler**| `react-tsparticles`| İnteraktif ve performansı etkilemeyen arka planlar oluşturmak için ideal bir seçim. |
| | `ScrollReveal.js` | Kullanıcı deneyimini zenginleştiren, kolay entegre edilebilir kaydırma animasyonları sunuyor. |
| | `Vanilla-Tilt.js` | Dış bağımlılığı olmayan, hafif ve pürüzsüz 3D tilt efektleri için tercih ettim. |
| **İkonlar** | `Font Awesome`, `Devicon`| Geniş ikon setleri ve kolay kullanımları sayesinde projeye görsel zenginlik katıyorlar. |
| **Kod Görüntüleme** | `react-diff-viewer` | Teknik yetkinliğimi sergilemek adına, kod manipülasyonu gibi konuları görselleştirmek için güçlü bir araç. |

---

## 📁 Proje Mimarim

Kodun bakımını kolaylaştırmak ve ölçeklenebilirliği sağlamak adına, projeyi Next.js App Router'ın standartlarına uygun olarak organize ettim:

---

## 🚀 Projeyi Yerel Makinede Çalıştırma

Projeyi kendi bilgisayarınızda kurmak ve çalıştırmak isterseniz aşağıdaki adımları izleyebilirsiniz.

**Gereksinimler:**
* [Node.js](https://nodejs.org/en/) (v18.x veya üstü)
* `npm` veya `yarn`

**Kurulum Adımları:**

1.  **Repoyu klonlayın:**
    ```bash
    git clone [https://github.com/bentahsin/benth-portfolio.git](https://github.com/bentahsin/benth-portfolio.git)
    ```
2.  **Proje dizinine geçin:**
    ```bash
    cd benth-portfolio
    ```
3.  **Gerekli paketleri yükleyin:**
    ```bash
    npm install
    ```
4.  **Geliştirme sunucusunu başlatın:**
    ```bash
    npm run dev
    ```
5.  **Tarayıcıda açın:**
    Uygulama artık [http://localhost:3000](http://localhost:3000) adresinde çalışıyor olacaktır.

---

## 📜 Lisans

Bu proje [MIT Lisansı](./LICENSE) ile lisanslanmıştır. Daha fazla bilgi için `LICENSE` dosyasına göz atabilirsiniz.

---

## 📬 İletişim

- **GitHub:** [@bentahsin](https://github.com/bentahsin)
- **E-posta:** `tahsin@bentahsin.com`

Bu projeye gösterdiğiniz ilgi için teşekkür ederim. Her türlü geri bildirim ve katkıya açığım.