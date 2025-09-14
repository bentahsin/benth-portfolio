import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { projectsData } from '@/data/projectsData';

export default function Home() {
    return (
        <>
        <div className="background-effects">
            <div className="background-grid"></div>
            <div id="glow-hero" className="glow"></div>
            <div id="glow-skills" className="glow"></div>
            <div id="glow-projects" className="glow"></div>
            <div id="glow-contact" className="glow"></div>
        </div>
        <main>
            <section id="hero">
                <div className="hero-content">
                    <h1>Selam! Ben Tahsin.</h1>
                    <h4>Backend Geliştirici • Minecraft Eklenti Geliştiricisi • C#/C++ Geliştirici</h4>
                    <p className="hero-intro">
                        Yazılım geliştirme, yalnızca bir soruna çözüm bulmaktan çok daha fazlasıdır; geleceği öngörme ve en zorlu koşullara bile dayanacak yapılar tasarlama sanatıdır. Felsefem de bu temel üzerine kuruludur.
                    </p>
                    <a href="#projects" className="cta-button">Projelerime Göz Atın</a>
                </div>
            </section>
            <section id="about">
                <h2 className="section-title">Hakkımda</h2>
                <div className="about-content">
                    <div className="about-text">
                        <h3>Kimim Ben?</h3>
                        <p>
                            Merhaba, adım Tahsin. 2014 yılında başlayan yazılım yolculuğumda kendimi sadece kod yazan bir geliştirici olarak değil, aynı zamanda dijital fikirleri hayata geçiren sağlam, güvenli ve ölçeklenebilir sistemlerin mimarı olarak konumlandırdım.
                        </p>
                        <h3>Yazılım Felsefem</h3>
                        <p>
                            Benim için yazılım geliştirme sadece kod yazmaktan ibaret değil; en zorlu koşullara bile dayanacak öngörülü ve sağlam sistemler kurmakla ilgilidir. Bu yaklaşım, çocukluktan kalma bir teknoloji tutkusuyla şekillendi ve tek bir mesleki ilkeye dayanıyor: Teslim ettiğim hiçbir iş &apos;tam kıvamında&apos; veya &apos;neredeyse bitmiş&apos; değildir.
                        </p>
                        <p>
                            Her projeye bir mimar titizliğiyle yaklaşıyorum; sadece bugünün sorunlarını çözmekle kalmıyor, aynı zamanda yarının potansiyel zorluklarını da öngörüyorum.
                        </p>
                    </div>
                    <div className="about-image">
                        <Image
                            src="https://avatars.githubusercontent.com/u/75451952?v=4"
                            alt="Ben Tahsin Portre Fotoğrafı"
                            width={300}
                            height={300}
                            style={{
                                maxWidth: '100%',
                                height: 'auto',
                                borderRadius: '10px',
                                boxShadow: '0 15px 30px rgba(0, 0,0, 0.4)',
                                border: '3px solid var(--card-bg)'
                            }}
                        />
                    </div>
                </div>
            </section>
            <section id="skills">
                <h2 className="section-title">Yeteneklerim</h2>
                <div className="skills-container">
                    <div className="skill-category">
                        <h3>Kullandığım Teknolojiler</h3>
                        <div className="skill-items-grid">
                            <div className="skill-item" data-tilt><i className="devicon-java-plain"></i><span>Java</span></div>
                            <div className="skill-item" data-tilt><i className="devicon-csharp-plain"></i><span>C#</span></div>
                            <div className="skill-item" data-tilt><i className="devicon-cplusplus-plain"></i><span>C++</span></div>
                            <div className="skill-item" data-tilt><i className="devicon-arduino-plain"></i><span>Arduino</span>
                            </div>
                            <div className="skill-item" data-tilt><i className="devicon-javascript-plain"></i><span>JavaScript</span></div>
                            <div className="skill-item" data-tilt><i className="devicon-nodejs-plain"></i><span>Node.js</span></div>
                            <div className="skill-item" data-tilt><i className="devicon-python-plain"></i><span>Python</span></div>
                            <div className="skill-item" data-tilt><i className="devicon-dot-net-plain"></i><span>.NET</span></div>
                            <div className="skill-item" data-tilt><i className="devicon-postgresql-plain"></i><span>PostgreSQL</span></div>
                            <div className="skill-item" data-tilt><i className="devicon-mysql-plain"></i><span>MySQL</span></div>
                            <div className="skill-item" data-tilt><i className="devicon-redis-plain"></i><span>Redis</span></div>
                            <div className="skill-item" data-tilt><i className="devicon-git-plain"></i><span>Git</span></div>
                            <div className="skill-item" data-tilt><i className="devicon-nginx-original"></i><span>NGINX</span></div>
                            <div className="skill-item" data-tilt><i className="devicon-express-original"></i><span>Express.js</span></div>
                            <div className="skill-item" data-tilt><i className="devicon-fastify-plain"></i><span>Fastify</span></div>
                            <div className="skill-item" data-tilt><i className="devicon-react-original"></i><span>React.js</span></div>
                            <div className="skill-item" data-tilt><i className="devicon-nextjs-plain"></i><span>Next.js</span></div>
                            <div className="skill-item" data-tilt><i className="devicon-vuejs-plain"></i><span>Vue.js</span></div>
                            <div className="skill-item" data-tilt><i className="devicon-nuxtjs-plain"></i><span>Nuxt.js</span></div>
                            <div className="skill-item" data-tilt><i className="devicon-html5-plain"></i><span>HTML</span></div>
                            <div className="skill-item" data-tilt><i className="devicon-css3-plain"></i><span>CSS</span></div>
                            <div className="skill-item" data-tilt><i className="devicon-handlebars-original"></i><span>Handlebars</span></div>
                        </div>
                    </div>

                    <div className="skill-category expertise-category">
                        <h3><i className="fa-solid fa-star"></i> Uzmanlık Alanım &nbsp;&nbsp;<i className="fa-solid fa-star"></i></h3>
                        <div className="expertise-grid">

                            <div className="expertise-item">
                                <div className="expertise-icon-container">
                                    <i className="fa-solid fa-code"></i>
                                    <i className="fa-solid fa-link"></i>
                                </div>
                                <h4>Bytecode & Java Native Interface (JNI)</h4>
                                <p>Derlenmiş Java kodunun (Bytecode) kalbine inerek analiz edip işleyebiliyorum, JNI ile Java&apos;nın sınırlarını aşarak işletim sistemi seviyesinde yüksek performanslı native çözümler üretebiliyorum.</p>
                            </div>

                            <div className="expertise-item">
                                <div className="expertise-icon-container">
                                    <i className="fa-solid fa-key"></i>
                                </div>
                                <h4>Gelişmiş Kriptografi</h4>
                                <p>Güvenli iletişim için paralel el sıkışma algoritmaları tasarlıyorum ve RSA ve AES-GCM gibi endüstri standardı şifreleme yöntemlerini kullanarak en yüksek düzeyde veri bütünlüğü ve gizliliğini sağlıyorum.</p>
                            </div>

                            <div className="expertise-item wide-item accordion">
                                <div className="accordion-header">
                                    <div className="expertise-icon-container">
                                        <i className="fa-solid fa-shield-virus"></i>
                                    </div>
                                    <h4>Tavizsiz Kurcalamaya Karşı Koruma Sistemleri</h4>
                                    <i className="fa-solid fa-chevron-down accordion-arrow"></i>
                                </div>
                                <div className="accordion-content-wrapper">
                                    <div className="accordion-content">
                                        <p>Yazılım bütünlüğünü korumak için geliştirdiğim savunma stratejisi 5 temel katmandan oluşuyor:</p>
                                        <ul className="tamper-features">
                                            <li><i className="fa-solid fa-check"></i> Java Native Interface (JNI) ile derin sistem kontrolü</li>
                                            <li><i className="fa-solid fa-check"></i> JNI tabanlı bir bytecode parmak izi oluşturma</li>
                                            <li><i className="fa-solid fa-check"></i> Sunucu merkezli, manipüle edilemeyen DataBank mimarisi</li>
                                            <li><i className="fa-solid fa-check"></i> Güvenli Oturum Başlatma için Paralel El Sıkışma Algoritması</li>
                                            <li><i className="fa-solid fa-check"></i> Anında bağlantı izleme sağlayan Heartbeat sistemi</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="skill-category">
                        <h3>Minecraft Ekosistemi Deneyimi</h3>
                        <div className="skill-items-grid large-grid">
                            <div className="skill-item" data-tilt>
                                <Image width={100} height={50} style={{ objectFit: 'contain' }} src="/assets/spigot.png" alt="spigot" />
                                <span>Spigot API</span>
                            </div>
                            <div className="skill-item" data-tilt>
                                <Image width={100} height={50} style={{ objectFit: 'contain' }} src="/assets/papermc.png" alt="papermc" />
                                <span>Paper API</span>
                            </div>
                            <div className="skill-item" data-tilt>
                                <Image width={100} height={50} style={{ objectFit: 'contain' }} src="/assets/bungee.png" alt="bungee" />
                                <span>BungeeCord</span>
                            </div>
                            <div className="skill-item" data-tilt>
                                <Image width={100} height={50} style={{ objectFit: 'contain' }} src="/assets/velocity.png" alt="velocity" />
                                <span>Velocity</span>
                            </div>
                            <div className="skill-item" data-tilt>
                                <Image width={100} height={50} style={{ objectFit: 'contain' }} src="/assets/worldedit.png" alt="worldedit" />
                                <span>WorldEdit API</span>
                            </div>
                            <div className="skill-item" data-tilt>
                                <Image width={100} height={50} style={{ objectFit: 'contain' }} src="/assets/worldguard.png" alt="worldguard" />
                                <span>WorldGuard API</span>
                            </div>
                            <div className="skill-item" data-tilt>
                                <Image width={100} height={50} style={{ objectFit: 'contain' }} src="/assets/luckperms.png" alt="luckperms" />
                                <span>LuckPerms API</span>
                            </div>
                            <div className="skill-item" data-tilt>
                                <Image width={100} height={50} style={{ objectFit: 'contain' }} src="/assets/itemsadder.webp" alt="itemsadder" />
                                <span>ItemsAdder</span>
                            </div>
                            <div className="skill-item" data-tilt>
                                <Image width={100} height={50} style={{ objectFit: 'contain' }} src="/assets/oraxen.png" alt="oraxen" />
                                <span>Oraxen</span>
                            </div>
                            <div className="skill-item" data-tilt>
                                <Image width={100} height={50} style={{ objectFit: 'contain' }} src="/assets/MMOItems.png" alt="mmoitems" />
                                <span>MMOItems</span>
                            </div>
                            <div className="skill-item" data-tilt>
                                <i className="fa-solid fa-book-skull"></i>
                                <span>ProtocolLib API</span>
                            </div>
                            <div className="skill-item" data-tilt>
                                <i className="fa-solid fa-coins"></i>
                                <span>Vault API</span>
                            </div>
                            <div className="skill-item" data-tilt>
                                <i className="fa-solid fa-dragon"></i>
                                <span>Mythic Mobs/Dungeons</span>
                            </div>
                            <div className="skill-item" data-tilt>
                                <i className="fa-solid fa-sitemap"></i>
                                <span>Plugin API Tasarımı</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="projects">
                <h2 className="section-title">Projelerim</h2>
                <div className="projects-container">
                    {projectsData.map((project, index) => (
                        <article
                            key={project.slug}
                            className={`project-card ${index % 2 !== 0 ? 'reverse' : ''}`}
                        >
                            <div className="project-image">
                                <Image src={project.image} alt={`${project.title} Proje Görseli`} width={600} height={400} style={{ objectFit: 'cover' }} />
                            </div>
                            <div className="project-info">
                                <h3 className="project-title">{project.title}</h3>
                                <div className="project-tags">
                                    {project.tagIcons}
                                    {project.tags.map(tag => (
                                        <span key={tag}>{tag}</span>
                                    ))}
                                </div>
                                <p>{project.description}</p>
                                <Link href={`/projects/${project.slug}`} className="project-button">
                                    <i className="fa-solid fa-arrow-right"></i> &nbsp;&nbsp;&nbsp;&nbsp; Detaylı Bilgi
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
            <section id="contact">
                <h2 className="section-title">İletişime Geç</h2>
                <div className="contact-content">
                    <h3>Birlikte Harika Bir Şeyler İnşa Edelim</h3>
                    <p>
                        Okuduğunuz bu projeler sadece tamamlanmış işler değil, aynı zamanda çözmekten keyif aldığım türden zorlukların bir yansımasıdır.
                        <br/><br/>
                        Benzer şekilde karmaşık bir projeniz mi var? Mevcut sistemlerinizi sadece &quot;çalışır&quot; durumdan &quot;bozulmaz&quot; ve &quot;ölçeklenebilir&quot; hale getirmek mi istiyorsunuz?
                        <br/><br/>
                        Gelin bir kahve eşliğinde buluşalım ve teknolojiyi kullanarak neler başarabileceğimizi birlikte keşfedelim.
                    </p>
                    <a href="mailto:tahsin@bentahsin.com" className="cta-button">E-Posta Gönder</a>
                    <div className="social-links">
                        <a href="https://github.com/bentahsin" target="_blank" aria-label="GitHub Profilim">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                className="feather feather-github">
                                <path
                                    d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22">
                                </path>
                            </svg>
                        </a>
                    </div>
                </div>
            </section>
        </main>
        </>
    );
}