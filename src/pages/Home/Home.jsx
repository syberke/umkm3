import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../../hooks/useProducts';
import ProductDetail from '../../components/ProductDetail/ProductDetail';
import './Home.css';

const Home = () => {
  const { products } = useProducts();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [umkmStats, setUmkmStats] = useState({
    totalUMKM: 150,
    digitalizedUMKM: 89,
    totalProducts: 1200,
    successStories: 45
  });

  useEffect(() => {
    setFeaturedProducts(products.slice(0, 6));
  }, [products]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleWhatsAppOrder = (product) => {
    const orderDetails = product;
    const message = 
      `Halo Stride! Saya tertarik dengan produk:%0A` +
      `📦 *${orderDetails.name || 'Sepatu Stride'}*%0A` +
      `💰 Harga: ${orderDetails.price || 'Rp 500.000'}%0A` +
      `📂 Kategori: ${orderDetails.category || 'Casual'}%0A` +
      (orderDetails.selectedColor ? `🎨 Warna: ${orderDetails.selectedColor}%0A` : '') +
      (orderDetails.selectedSize ? `👟 Ukuran: ${orderDetails.selectedSize}%0A` : '') +
      (orderDetails.quantity ? `🔢 Jumlah: ${orderDetails.quantity}%0A` : '') +
      `%0AMohon informasi lebih lanjut. Terima kasih!`;

    const whatsappUrl = `https://wa.me/6289506147763?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const brandLogos = [
    "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=115&h=77&fit=crop",
    "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    "https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=152&h=115&fit=crop",
    "https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=146&h=40&fit=crop",
    "https://images.pexels.com/photos/1464624/pexels-photo-1464624.jpeg?auto=compress&cs=tinysrgb&w=125&h=102&fit=crop",
    "https://images.pexels.com/photos/1598509/pexels-photo-1598509.jpeg?auto=compress&cs=tinysrgb&w=126&h=73&fit=crop",
    "https://images.pexels.com/photos/1464623/pexels-photo-1464623.jpeg?auto=compress&cs=tinysrgb&w=136&h=100&fit=crop",
    "https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=125&h=41&fit=crop"
  ];

  const testimonials = [
    {
      name: "Budi Santoso",
      position: "Pemilik Toko Sepatu Budi",
      avatar: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=51&h=51&fit=crop",
      review: "Stride membantu toko saya go-digital. Penjualan meningkat 300% dalam 6 bulan!"
    },
    {
      name: "Sari Dewi",
      position: "UMKM Fashion Lokal",
      avatar: "https://images.pexels.com/photos/2182969/pexels-photo-2182969.jpeg?auto=compress&cs=tinysrgb&w=51&h=51&fit=crop",
      review: "Platform yang mudah digunakan. Sekarang produk saya bisa dijangkau lebih banyak customer."
    },
    {
      name: "Ahmad Rahman",
      position: "Pengrajin Sepatu Tradisional",
      avatar: "https://images.pexels.com/photos/2182968/pexels-photo-2182968.jpeg?auto=compress&cs=tinysrgb&w=51&h=51&fit=crop",
      review: "Berkat Stride, kerajinan tradisional saya kini dikenal hingga mancanegara."
    }
  ];

  const advantages = [
    {
      number: "1",
      title: "Platform Terintegrasi",
      description: "Semua kebutuhan digitalisasi UMKM dalam satu platform yang mudah digunakan dan terpercaya."
    },
    {
      number: "2",
      title: "Dukungan Penuh",
      description: "Tim ahli siap membantu proses transformasi digital bisnis Anda dari awal hingga sukses."
    },
    {
      number: "3",
      title: "Teknologi Terdepan",
      description: "Menggunakan teknologi cloud terbaru untuk performa optimal dan keamanan data terjamin."
    }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-text">
              <span className="hero-subtitle">DIGITALISASI UMKM</span>
              <h1 className="hero-title">
                WUJUDKAN IMPIAN<br />
                UMKM DIGITAL<br />
                BERSAMA STRIDE
              </h1>
              <p className="hero-description">
                Platform digital terpercaya untuk membantu UMKM Indonesia go-digital. 
                Dari katalog produk hingga manajemen pelanggan, semua dalam satu platform.
              </p>
              <Link to="/products" className="hero-button">
                Mulai Digitalisasi
              </Link>
              <div className="hero-rating">
                <span className="star">★</span>
                <span>4.8 Rating • 500+ UMKM</span>
              </div>
            </div>
            <div className="hero-image">
              <div className="hero-circle">
                <span className="hero-local">LOCAL</span>
              </div>
              <img 
                src="https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=693&h=684&fit=crop" 
                alt="Stride Shoes" 
                className="hero-shoe"
              />
              <div className="hero-mini-products">
                <div className="mini-product">
                  <img src="https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=115&h=96&fit=crop" alt="Product 1" />
                </div>
                <div className="mini-product">
                  <img src="https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=166&h=166&fit=crop" alt="Product 2" />
                </div>
                <div className="mini-product">
                  <img src="https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=127&h=116&fit=crop" alt="Product 3" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* UMKM Stats Section */}
      <section className="umkm-stats">
        <div className="stats-container">
          <h2>Dampak Digitalisasi UMKM</h2>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">{umkmStats.totalUMKM}+</div>
              <div className="stat-label">UMKM Terdaftar</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{umkmStats.digitalizedUMKM}%</div>
              <div className="stat-label">Berhasil Go-Digital</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{umkmStats.totalProducts}+</div>
              <div className="stat-label">Produk Terjual</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{umkmStats.successStories}+</div>
              <div className="stat-label">Kisah Sukses</div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner UMKM Section */}
      <section className="brands">
        <div className="brands-container">
          <h2>Partner UMKM</h2>
          <p>Bergabung dengan 500+ UMKM yang telah sukses go-digital</p>
          <div className="brands-grid">
            <div className="brands-track">
              {[...brandLogos, ...brandLogos].map((logo, index) => (
                <div key={index} className="brand-logo">
                  <img src={logo} alt={`Brand ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="showcase">
        <div className="showcase-container">
          <div className="showcase-image">
            <img src="https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=766&h=1049&fit=crop" alt="Showcase" />
          </div>
          <div className="showcase-content">
            <div className="showcase-card">
              <h3>Digitalisasi UMKM: Melangkah Menuju Masa Depan</h3>
              <p>
                Di era digital ini, UMKM perlu beradaptasi dengan teknologi untuk tetap kompetitif. 
                Stride hadir sebagai solusi komprehensif yang membantu UMKM Indonesia bertransformasi 
                digital dengan mudah dan efektif. Dari pembuatan katalog online hingga manajemen 
                pelanggan, semua tersedia dalam satu platform.
              </p>
              <Link to="/digitalization" className="showcase-button">
                Pelajari Lebih Lanjut
              </Link>
            </div>
            <div className="showcase-grid">
              <img src="https://images.pexels.com/photos/1464624/pexels-photo-1464624.jpeg?auto=compress&cs=tinysrgb&w=337&h=470&fit=crop" alt="Digital Transformation" />
              <img src="https://images.pexels.com/photos/1464623/pexels-photo-1464623.jpeg?auto=compress&cs=tinysrgb&w=337&h=470&fit=crop" alt="UMKM Success" />
            </div>
          </div>
        </div>
      </section>

      {/* Stride Divider */}
      <section className="stride-divider">
        <div className="stride-text">
          {['STRIDE', 'UMKM', 'DIGITAL', 'INDONESIA', 'MAJU'].map((text, index) => (
            <span key={index}>{text}</span>
          ))}
        </div>
        <div className="stride-dots">
          {[1, 2, 3, 4].map((_, index) => (
            <div key={index} className="dot"></div>
          ))}
        </div>
      </section>

      {/* Advantages Section */}
      <section className="advantages">
        <div className="advantages-container">
          <div className="advantages-content">
            <h2>Platform Stride</h2>
            <h3>Keunggulan Kami:</h3>
            <div className="advantages-list">
              {advantages.map((advantage, index) => (
                <div key={index} className="advantage-item">
                  <div className="advantage-number">{advantage.number}</div>
                  <div className="advantage-text">
                    <h4>{advantage.title}</h4>
                    <p>{advantage.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="advantages-visual">
            <div className="product-detail-card">
              <div className="product-image">
                <img src="https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=339&h=233&fit=crop" alt="Featured Product" />
              </div>
              <h4>Stride - Platform Digitalisasi UMKM</h4>
              <p>Solusi Terpadu | Mudah Digunakan</p>
              <div className="color-options">
                <div className="color-option blue"></div>
                <div className="color-option light-blue"></div>
                <div className="color-option beige"></div>
                <div className="color-option light-beige"></div>
              </div>
              <div className="product-stats">
                <img src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=34&h=34&fit=crop" alt="User" />
                <span>500+ UMKM Bergabung</span>
              </div>
            </div>
            <div className="review-card">
              <img src="https://images.pexels.com/photos/2182969/pexels-photo-2182969.jpeg?auto=compress&cs=tinysrgb&w=67&h=67&fit=crop" alt="Reviewer" />
              <div className="review-content">
                <span className="verified">UMKM Terverifikasi</span>
                <h5>Platform Terbaik!</h5>
                <div className="stars">★★★★★</div>
                <p>Stride benar-benar membantu bisnis saya berkembang pesat di era digital...</p>
                <div className="review-product">
                  <strong>Toko Sepatu Makmur</strong>
                  <span>Penjualan naik 300%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="collection">
        <div className="collection-container">
          <h2>Produk Unggulan UMKM</h2>
          <div className="products-grid">
            {featuredProducts.map((product, index) => (
              <div key={product.id || index} className="product-card">
                <div className="product-image">
                  <img 
                    src={product.image || `https://images.pexels.com/photos/${1598505 + index}/pexels-photo-${1598505 + index}.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop`} 
                    alt={product.name || `Product ${index + 1}`} 
                  />
                  <div className="product-overlay">
                    <button 
                      className="quick-view-btn"
                      onClick={() => handleProductClick(product)}
                    >
                      Lihat Detail
                    </button>
                  </div>
                </div>
                <div className="product-info">
                  <h3 className="product-name">{product.name || `Stride Product ${index + 1}`}</h3>
                  <div className="product-footer">
                    <span className="product-price">{product.price || 'Rp 500.000'}</span>
                  </div>
                  <button 
                    className="order-btn"
                    onClick={() => handleWhatsAppOrder(product)}
                  >
                    Pesan via WhatsApp
                  </button>
                </div>
              </div>
            ))}
          </div>
          <Link to="/products" className="view-more-btn">
            Lihat Semua Produk
          </Link>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="testimonials">
        <div className="testimonials-container">
          <h2>Testimoni UMKM</h2>
          <p>Dengarkan kisah sukses para UMKM yang telah bertransformasi digital bersama Stride</p>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <h4>Sukses Digital</h4>
                <div className="rating">★★★★★</div>
                <p>"{testimonial.review}"</p>
                <div className="testimonial-author">
                  <img src={testimonial.avatar} alt={testimonial.name} />
                  <div>
                    <strong>{testimonial.name}</strong>
                    <span>{testimonial.position}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Link to="/about" className="see-all-reviews">
            Lihat Semua Testimoni
          </Link>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-preview">
        <div className="contact-container">
          <div className="contact-card">
            <h2>Hubungi Kami</h2>
            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon">📞</div>
                <div>
                  <strong>No telepon</strong>
                  <p>+6289506147763</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">📍</div>
                <div>
                  <strong>Address</strong>
                  <p>Jl. Raya Cikampak Cicadas, RT.1/RW.1, Cicadas, Kec. Ciampea, Kabupaten Bogor, Jawa Barat 16620</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">🕒</div>
                <div>
                  <strong>Jam Operasional</strong>
                  <p>Setiap hari, 08:00 - 22:00 WIB</p>
                </div>
              </div>
            </div>
          </div>
          <div className="contact-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.2!2d106.7!3d-6.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMzYnMDAuMCJTIDEwNsKwNDInMDAuMCJF!5e0!3m2!1sen!2sid!4v1234567890"
              width="100%"
              height="500"
              style={{ border: 0, borderRadius: '20px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi Stride"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onOrder={handleWhatsAppOrder}
        />
      )}
    </div>
  );
};

export default Home;