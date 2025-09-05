import React from 'react';
import { Link } from 'react-router-dom';
import './SuccessStories.css';

const SuccessStories = () => {
  const successStories = [
    {
      id: 1,
      businessName: 'Toko Sepatu Makmur',
      ownerName: 'Budi Santoso',
      location: 'Jakarta',
      category: 'Fashion & Footwear',
      avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      growth: '+300%',
      description: 'Dari toko offline kecil dengan 2 karyawan, kini menjadi brand sepatu terkemuka dengan penjualan online yang fantastis dan jangkauan nasional.',
      metrics: {
        revenue: '300%',
        customers: '1500+',
        products: '200+'
      },
      quote: 'Stride benar-benar mengubah hidup saya. Dari yang awalnya hanya bisa melayani pelanggan lokal, sekarang produk saya sampai ke seluruh Indonesia. Platform digitalisasi mereka sangat mudah digunakan!',
      beforeAfter: {
        before: 'Penjualan Rp 5 juta/bulan',
        after: 'Penjualan Rp 20 juta/bulan'
      }
    },
    {
      id: 2,
      businessName: 'Fashion Nusantara',
      ownerName: 'Sari Dewi',
      location: 'Bandung',
      category: 'Fashion Traditional',
      avatar: 'https://images.pexels.com/photos/2182969/pexels-photo-2182969.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      image: 'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      growth: '+250%',
      description: 'Mengangkat fashion tradisional Indonesia ke pasar global melalui platform digital, dengan fokus pada kualitas dan keaslian budaya lokal.',
      metrics: {
        revenue: '250%',
        customers: '800+',
        products: '150+'
      },
      quote: 'Berkat Stride, fashion tradisional Indonesia yang saya buat kini dikenal hingga mancanegara. Saya bangga bisa memperkenalkan budaya Indonesia ke dunia.',
      beforeAfter: {
        before: 'Hanya pasar lokal',
        after: 'Ekspor ke 5 negara'
      }
    },
    {
      id: 3,
      businessName: 'Kerajinan Bambu Lestari',
      ownerName: 'Ahmad Rahman',
      location: 'Yogyakarta',
      category: 'Handicraft',
      avatar: 'https://images.pexels.com/photos/2182968/pexels-photo-2182968.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      image: 'https://images.pexels.com/photos/1464624/pexels-photo-1464624.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      growth: '+400%',
      description: 'Produk kerajinan bambu tradisional yang ramah lingkungan kini dikenal hingga mancanegara berkat digitalisasi yang tepat.',
      metrics: {
        revenue: '400%',
        customers: '2000+',
        products: '100+'
      },
      quote: 'Digitalisasi membuka mata saya bahwa kerajinan tradisional punya pasar yang sangat besar. Sekarang saya bisa hidup layak dari warisan nenek moyang.',
      beforeAfter: {
        before: 'Penghasilan tidak menentu',
        after: 'Penghasilan stabil Rp 15 juta/bulan'
      }
    },
    {
      id: 4,
      businessName: 'Kopi Nusantara Premium',
      ownerName: 'Indra Wijaya',
      location: 'Medan',
      category: 'Food & Beverage',
      avatar: 'https://images.pexels.com/photos/2182967/pexels-photo-2182967.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      image: 'https://images.pexels.com/photos/1464623/pexels-photo-1464623.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      growth: '+350%',
      description: 'Dari petani kopi lokal menjadi brand kopi premium dengan distribusi nasional dan sistem roasting modern.',
      metrics: {
        revenue: '350%',
        customers: '1200+',
        products: '50+'
      },
      quote: 'Stride membantu saya memahami bahwa kopi lokal Indonesia tidak kalah dengan kopi import. Sekarang brand saya ada di 20 kota!',
      beforeAfter: {
        before: 'Jual ke tengkulak',
        after: 'Brand sendiri dengan 20 outlet'
      }
    },
    {
      id: 5,
      businessName: 'Batik Modern Cantik',
      ownerName: 'Ratna Sari',
      location: 'Solo',
      category: 'Fashion & Culture',
      avatar: 'https://images.pexels.com/photos/2182966/pexels-photo-2182966.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      image: 'https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      growth: '+280%',
      description: 'Memadukan batik tradisional dengan desain modern untuk generasi muda, menciptakan tren fashion batik kontemporer.',
      metrics: {
        revenue: '280%',
        customers: '900+',
        products: '120+'
      },
      quote: 'Saya berhasil membuat batik jadi trendy lagi di kalangan anak muda. Platform digital Stride sangat membantu marketing saya.',
      beforeAfter: {
        before: 'Target pasar terbatas',
        after: 'Viral di media sosial'
      }
    },
    {
      id: 6,
      businessName: 'Furniture Kayu Jati',
      ownerName: 'Bambang Sutrisno',
      location: 'Jepara',
      category: 'Furniture & Craft',
      avatar: 'https://images.pexels.com/photos/2182965/pexels-photo-2182965.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      image: 'https://images.pexels.com/photos/1598509/pexels-photo-1598509.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop',
      growth: '+320%',
      description: 'Furniture kayu jati berkualitas tinggi dengan desain custom, melayani pasar domestik dan ekspor dengan standar internasional.',
      metrics: {
        revenue: '320%',
        customers: '600+',
        products: '80+'
      },
      quote: 'Digitalisasi membuat saya bisa menerima pesanan custom dari seluruh dunia. Kualitas Jepara kini dikenal internasional.',
      beforeAfter: {
        before: 'Pesanan lokal saja',
        after: 'Ekspor ke 8 negara'
      }
    }
  ];

  const testimonials = [
    {
      name: 'Dr. Soekarno Hatta',
      role: 'Direktur UMKM Kementerian Koperasi',
      avatar: 'https://images.pexels.com/photos/2182964/pexels-photo-2182964.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      text: 'Stride telah membuktikan komitmennya dalam memajukan UMKM Indonesia. Program digitalisasi mereka sangat efektif dan terukur.'
    },
    {
      name: 'Prof. Ani Widiastuti',
      role: 'Ekonom Senior Universitas Indonesia',
      avatar: 'https://images.pexels.com/photos/2182963/pexels-photo-2182963.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      text: 'Data menunjukkan UMKM yang menggunakan platform Stride mengalami pertumbuhan signifikan. Ini adalah model yang patut dicontoh.'
    },
    {
      name: 'Ir. Budi Karya',
      role: 'Ketua Asosiasi UMKM Indonesia',
      avatar: 'https://images.pexels.com/photos/2182962/pexels-photo-2182962.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      text: 'Stride tidak hanya memberikan platform, tapi juga pendampingan yang komprehensif. Ini yang membedakan mereka dengan yang lain.'
    }
  ];

  return (
    <div className="success-stories-page">
      {/* Hero Section */}
      <section className="success-hero">
        <div className="success-hero-container">
          <h1>Kisah Sukses UMKM</h1>
          <p>Inspirasi dari para UMKM yang telah berhasil bertransformasi digital</p>
        </div>
      </section>

      {/* Success Stats */}
      <section className="success-stats">
        <div className="stats-container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">500+</div>
              <div className="stat-label">UMKM Berhasil</div>
              <div className="stat-description">UMKM yang telah sukses go-digital dengan bantuan platform Stride</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">300%</div>
              <div className="stat-label">Rata-rata Pertumbuhan</div>
              <div className="stat-description">Peningkatan penjualan rata-rata setelah digitalisasi</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">50+</div>
              <div className="stat-label">Kota Terjangkau</div>
              <div className="stat-description">Kota di Indonesia yang telah terjangkau program digitalisasi</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">95%</div>
              <div className="stat-label">Tingkat Kepuasan</div>
              <div className="stat-description">UMKM yang puas dengan layanan dan hasil digitalisasi</div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="stories-section">
        <div className="stories-container">
          <div className="section-header">
            <h2>Kisah Transformasi Digital</h2>
            <p>Setiap UMKM memiliki cerita unik tentang perjalanan digitalisasi mereka</p>
          </div>

          <div className="stories-grid">
            {successStories.map((story) => (
              <div key={story.id} className="story-card">
                <div className="story-image">
                  <img src={story.image} alt={story.businessName} />
                  <div className="growth-badge">{story.growth}</div>
                </div>
                
                <div className="story-content">
                  <div className="story-meta">
                    <img src={story.avatar} alt={story.ownerName} className="story-avatar" />
                    <div className="story-info">
                      <h3>{story.businessName}</h3>
                      <p>{story.ownerName} • {story.location}</p>
                    </div>
                  </div>
                  
                  <p className="story-description">{story.description}</p>
                  
                  <div className="story-metrics">
                    <div className="metric">
                      <div className="metric-value">{story.metrics.revenue}</div>
                      <div className="metric-label">Revenue Growth</div>
                    </div>
                    <div className="metric">
                      <div className="metric-value">{story.metrics.customers}</div>
                      <div className="metric-label">Customers</div>
                    </div>
                    <div className="metric">
                      <div className="metric-value">{story.metrics.products}</div>
                      <div className="metric-label">Products</div>
                    </div>
                  </div>
                  
                  <blockquote className="story-quote">
                    "{story.quote}"
                  </blockquote>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expert Testimonials */}
      <section className="testimonials-section">
        <div className="testimonials-container">
          <div className="section-header">
            <h2>Pengakuan Para Ahli</h2>
            <p>Testimoni dari para ahli dan pemimpin industri tentang dampak digitalisasi UMKM</p>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <img src={testimonial.avatar} alt={testimonial.name} className="testimonial-avatar" />
                <div className="testimonial-content">
                  <h4>{testimonial.name}</h4>
                  <p className="testimonial-role">{testimonial.role}</p>
                  <div className="rating">★★★★★</div>
                  <p className="testimonial-text">"{testimonial.text}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="cta-container">
          <h2>Siap Menjadi Kisah Sukses Berikutnya?</h2>
          <p>
            Bergabunglah dengan ribuan UMKM yang telah merasakan manfaat digitalisasi. 
            Mulai transformasi digital Anda hari ini!
          </p>
          <div className="cta-buttons">
            <Link to="/register" className="cta-button">
              Mulai Digitalisasi
            </Link>
            <Link to="/contact" className="cta-button secondary">
              Konsultasi Gratis
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SuccessStories;