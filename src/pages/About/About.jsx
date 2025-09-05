import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-container">
          <h1>Tentang Stride</h1>
          <p>Platform Digitalisasi UMKM Terdepan di Indonesia</p>
        </div>
      </section>

      {/* Vision Mission */}
      <section className="vision-mission">
        <div className="vision-mission-container">
          <div className="vision-mission-grid">
            <div className="vision-card">
              <div className="card-icon">👁️</div>
              <h2>Visi</h2>
              <p>
                Menjadi platform digitalisasi UMKM terdepan di Indonesia yang memberdayakan 
                usaha kecil dan menengah untuk berkembang di era digital, menciptakan 
                ekosistem bisnis yang berkelanjutan dan inklusif.
              </p>
            </div>
            <div className="mission-card">
              <div className="card-icon">🎯</div>
              <h2>Misi</h2>
              <ul>
                <li>Menyediakan platform digital yang mudah digunakan untuk UMKM</li>
                <li>Memberikan pelatihan dan pendampingan digitalisasi bisnis</li>
                <li>Membangun ekosistem marketplace yang mendukung produk lokal</li>
                <li>Menciptakan akses pasar yang lebih luas untuk UMKM Indonesia</li>
                <li>Mengembangkan teknologi yang mendukung pertumbuhan bisnis UMKM</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="history">
        <div className="history-container">
          <h2>Perjalanan Digitalisasi</h2>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-year">2020</div>
              <div className="timeline-content">
                <h3>Ide Digitalisasi</h3>
                <p>
                  Melihat tantangan UMKM di era digital, kami memulai inisiatif untuk 
                  membantu usaha kecil beradaptasi dengan teknologi. Dimulai dengan 
                  membantu 10 UMKM lokal di Bogor.
                </p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2021</div>
              <div className="timeline-content">
                <h3>Platform Digital</h3>
                <p>
                  Meluncurkan platform digital pertama untuk UMKM dengan fitur katalog 
                  produk, manajemen inventori, dan sistem pemesanan terintegrasi WhatsApp. 
                  50+ UMKM bergabung dalam 6 bulan pertama.
                </p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2022</div>
              <div className="timeline-content">
                <h3>Ekspansi & Pelatihan</h3>
                <p>
                  Mengembangkan program pelatihan digital marketing dan e-commerce untuk UMKM. 
                  Berkolaborasi dengan 200+ UMKM di Jabodetabek dan mulai ekspansi ke 
                  kota-kota besar lainnya.
                </p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2023</div>
              <div className="timeline-content">
                <h3>Pengakuan & Penghargaan</h3>
                <p>
                  Meraih penghargaan "Best Digital Platform for SMEs" dari Kementerian 
                  Koperasi dan UKM. Berhasil membantu 500+ UMKM meningkatkan penjualan 
                  hingga 300% melalui digitalisasi.
                </p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2024</div>
              <div className="timeline-content">
                <h3>Inovasi AI & Analytics</h3>
                <p>
                  Mengintegrasikan AI untuk analisis pasar dan rekomendasi bisnis. 
                  Meluncurkan fitur analytics dashboard untuk membantu UMKM memahami 
                  performa bisnis dan tren pasar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values">
        <div className="values-container">
          <h2>Komitmen Kami</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🚀</div>
              <h3>Pemberdayaan</h3>
              <p>Memberdayakan UMKM dengan teknologi digital yang mudah digunakan dan terjangkau</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Kolaborasi</h3>
              <p>Membangun ekosistem yang saling mendukung antara UMKM, konsumen, dan mitra</p>
            </div>
            <div className="value-card">
              <div className="value-icon">⚡</div>
              <h3>Inovasi</h3>
              <p>Menghadirkan solusi teknologi terdepan yang sesuai dengan kebutuhan UMKM</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🌱</div>
              <h3>Berkelanjutan</h3>
              <p>Mendukung pertumbuhan ekonomi lokal yang berkelanjutan dan inklusif</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team">
        <div className="team-container">
          <h2>Tim Digitalisasi</h2>
          <div className="team-grid">
            <div className="team-member">
              <img src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop" alt="CEO" />
              <h3>Qiageng Berke Jaisyurrohman</h3>
              <p>Lead Developer</p>
              <span>Ahli digitalisasi UMKM dengan pengalaman 10+ tahun di bidang teknologi</span>
            </div>
            <div className="team-member">
              <img src="https://images.pexels.com/photos/2182969/pexels-photo-2182969.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop" alt="Designer" />
              <h3>Akram Mujjaman Raton</h3>
              <p>Head of UMKM Relations</p>
              <span>Spesialis pemberdayaan UMKM dan pengembangan komunitas bisnis</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;