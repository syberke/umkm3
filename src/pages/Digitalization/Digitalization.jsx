import React from 'react';
import { Link } from 'react-router-dom';
import './Digitalization.css';

const Digitalization = () => {
  const digitalFeatures = [
    {
      icon: '🏪',
      title: 'Toko Online Profesional',
      description: 'Buat toko online yang menarik dengan katalog produk lengkap dan sistem pembayaran terintegrasi'
    },
    {
      icon: '📱',
      title: 'Aplikasi Mobile',
      description: 'Kelola bisnis dari mana saja dengan aplikasi mobile yang user-friendly'
    },
    {
      icon: '📊',
      title: 'Analytics & Reporting',
      description: 'Pantau performa bisnis dengan dashboard analytics yang komprehensif'
    },
    {
      icon: '💬',
      title: 'Customer Support',
      description: 'Sistem chat terintegrasi untuk komunikasi langsung dengan pelanggan'
    },
    {
      icon: '📦',
      title: 'Inventory Management',
      description: 'Kelola stok produk dengan sistem inventory yang akurat dan real-time'
    },
    {
      icon: '🚀',
      title: 'Digital Marketing',
      description: 'Tools marketing digital untuk meningkatkan reach dan engagement'
    }
  ];

  const successStories = [
    {
      name: 'Toko Sepatu Makmur',
      owner: 'Budi Santoso',
      location: 'Jakarta',
      growth: '300%',
      story: 'Dari toko offline kecil menjadi brand sepatu terkemuka dengan penjualan online yang fantastis',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    },
    {
      name: 'Fashion Nusantara',
      owner: 'Sari Dewi',
      location: 'Bandung',
      growth: '250%',
      story: 'Mengangkat fashion tradisional Indonesia ke pasar global melalui platform digital',
      image: 'https://images.pexels.com/photos/2182969/pexels-photo-2182969.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    },
    {
      name: 'Kerajinan Bambu Lestari',
      owner: 'Ahmad Rahman',
      location: 'Yogyakarta',
      growth: '400%',
      story: 'Produk kerajinan bambu tradisional kini dikenal hingga mancanegara',
      image: 'https://images.pexels.com/photos/2182968/pexels-photo-2182968.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    }
  ];

  const digitalSteps = [
    {
      step: '01',
      title: 'Konsultasi Gratis',
      description: 'Tim ahli kami akan menganalisis kebutuhan bisnis Anda dan memberikan rekomendasi terbaik'
    },
    {
      step: '02',
      title: 'Setup Platform',
      description: 'Kami akan membantu setup platform digital yang sesuai dengan karakteristik bisnis Anda'
    },
    {
      step: '03',
      title: 'Training & Support',
      description: 'Pelatihan komprehensif untuk memastikan Anda dapat mengoperasikan platform dengan optimal'
    },
    {
      step: '04',
      title: 'Go Live & Monitoring',
      description: 'Launch bisnis digital Anda dengan dukungan monitoring dan maintenance berkelanjutan'
    }
  ];

  return (
    <div className="digitalization">
      {/* Hero Section */}
      <section className="digitalization-hero">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-text">
              <h1>Transformasi Digital untuk UMKM Indonesia</h1>
              <p>
                Bergabunglah dengan revolusi digital dan tingkatkan bisnis UMKM Anda 
                dengan teknologi terdepan yang mudah digunakan dan terjangkau.
              </p>
              <div className="hero-stats">
                <div className="stat">
                  <span className="stat-number">500+</span>
                  <span className="stat-label">UMKM Sukses</span>
                </div>
                <div className="stat">
                  <span className="stat-number">300%</span>
                  <span className="stat-label">Rata-rata Peningkatan</span>
                </div>
                <div className="stat">
                  <span className="stat-number">24/7</span>
                  <span className="stat-label">Support</span>
                </div>
              </div>
              <Link to="/register" className="cta-button">
                Mulai Transformasi Digital
              </Link>
            </div>
            <div className="hero-visual">
              <div className="digital-illustration">
                <div className="floating-card card-1">
                  <span className="card-icon">📱</span>
                  <span className="card-text">Mobile App</span>
                </div>
                <div className="floating-card card-2">
                  <span className="card-icon">🛒</span>
                  <span className="card-text">E-Commerce</span>
                </div>
                <div className="floating-card card-3">
                  <span className="card-icon">📊</span>
                  <span className="card-text">Analytics</span>
                </div>
                <div className="central-device">
                  <img src="https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop" alt="Digital Platform" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="digital-features">
        <div className="features-container">
          <div className="section-header">
            <h2>Fitur Digitalisasi Lengkap</h2>
            <p>Semua yang Anda butuhkan untuk mengembangkan bisnis UMKM di era digital</p>
          </div>
          <div className="features-grid">
            {digitalFeatures.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="success-stories">
        <div className="stories-container">
          <div className="section-header">
            <h2>Kisah Sukses UMKM Digital</h2>
            <p>Inspirasi dari para UMKM yang telah berhasil bertransformasi digital</p>
          </div>
          <div className="stories-grid">
            {successStories.map((story, index) => (
              <div key={index} className="story-card">
                <div className="story-image">
                  <img src={story.image} alt={story.name} />
                  <div className="growth-badge">+{story.growth}</div>
                </div>
                <div className="story-content">
                  <h3>{story.name}</h3>
                  <div className="story-meta">
                    <span className="owner">👤 {story.owner}</span>
                    <span className="location">📍 {story.location}</span>
                  </div>
                  <p>{story.story}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Digital Process */}
      <section className="digital-process">
        <div className="process-container">
          <div className="section-header">
            <h2>Proses Digitalisasi yang Mudah</h2>
            <p>4 langkah sederhana menuju kesuksesan digital</p>
          </div>
          <div className="process-steps">
            {digitalSteps.map((step, index) => (
              <div key={index} className="process-step">
                <div className="step-number">{step.step}</div>
                <div className="step-content">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
                {index < digitalSteps.length - 1 && <div className="step-connector"></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="digital-benefits">
        <div className="benefits-container">
          <div className="benefits-content">
            <h2>Mengapa Memilih Digitalisasi?</h2>
            <div className="benefits-list">
              <div className="benefit-item">
                <div className="benefit-icon">🎯</div>
                <div className="benefit-text">
                  <h4>Jangkauan Pasar Lebih Luas</h4>
                  <p>Akses ke jutaan pelanggan potensial di seluruh Indonesia bahkan dunia</p>
                </div>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">💰</div>
                <div className="benefit-text">
                  <h4>Peningkatan Pendapatan</h4>
                  <p>Rata-rata UMKM mengalami peningkatan pendapatan 200-400% setelah go-digital</p>
                </div>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">⚡</div>
                <div className="benefit-text">
                  <h4>Operasional Lebih Efisien</h4>
                  <p>Otomatisasi proses bisnis menghemat waktu dan mengurangi kesalahan manual</p>
                </div>
              </div>
              <div className="benefit-item">
                <div className="benefit-icon">📈</div>
                <div className="benefit-text">
                  <h4>Data-Driven Decision</h4>
                  <p>Keputusan bisnis berdasarkan data akurat untuk pertumbuhan yang berkelanjutan</p>
                </div>
              </div>
            </div>
          </div>
          <div className="benefits-visual">
            <div className="chart-container">
              <div className="chart-bar" style={{height: '60%'}}>
                <span className="chart-label">Sebelum</span>
                <span className="chart-value">100%</span>
              </div>
              <div className="chart-bar active" style={{height: '100%'}}>
                <span className="chart-label">Sesudah</span>
                <span className="chart-value">300%</span>
              </div>
            </div>
            <p className="chart-caption">Rata-rata peningkatan penjualan UMKM setelah digitalisasi</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="digitalization-cta">
        <div className="cta-container">
          <div className="cta-content">
            <h2>Siap Memulai Transformasi Digital?</h2>
            <p>
              Bergabunglah dengan ribuan UMKM yang telah merasakan manfaat digitalisasi. 
              Konsultasi gratis dengan tim ahli kami sekarang juga!
            </p>
            <div className="cta-buttons">
              <Link to="/register" className="cta-primary">
                Daftar Sekarang
              </Link>
              <Link to="/success-stories" className="cta-secondary">
                Lihat Kisah Sukses
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Digitalization;