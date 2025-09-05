import React, { useState } from 'react';
import FAQ from '../../components/FAQ/FAQ';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const whatsappMessage = `Halo Stride!

Nama: ${formData.name}
Email: ${formData.email}
Subjek: ${formData.subject}

Pesan:
${formData.message}`;

    const whatsappUrl = `https://wa.me/6289506147763?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="contact">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="contact-hero-container">
          <h1>Hubungi Kami</h1>
          <p>Kami siap membantu Anda menemukan sepatu yang sempurna</p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="contact-content">
        <div className="contact-content-container">
          <div className="contact-info-section">
            <h2>Informasi Kontak</h2>
            
            <div className="contact-info-grid">
              <div className="contact-info-card">
                <div className="contact-icon">📞</div>
                <div className="contact-details">
                  <h3>Telepon</h3>
                  <p>+62 895 0614 7763</p>
                  <span>Senin - Minggu, 08:00 - 22:00</span>
                </div>
              </div>

              <div className="contact-info-card">
                <div className="contact-icon">📧</div>
                <div className="contact-details">
                  <h3>Email</h3>
                  <p>info@stride.co.id</p>
                  <span>Respon dalam 24 jam</span>
                </div>
              </div>

              <div className="contact-info-card">
                <div className="contact-icon">📍</div>
                <div className="contact-details">
                  <h3>Alamat</h3>
                  <p>Jl. Raya Cikampak Cicadas, RT.1/RW.1</p>
                  <span>Cicadas, Kec. Ciampea, Kabupaten Bogor, Jawa Barat 16620</span>
                </div>
              </div>

              <div className="contact-info-card">
                <div className="contact-icon">💬</div>
                <div className="contact-details">
                  <h3>WhatsApp</h3>
                  <p>+62 895 0614 7763</p>
                  <span>Chat langsung dengan tim kami</span>
                </div>
              </div>
            </div>

            <div className="social-media">
              <h3>Ikuti Kami</h3>
              <div className="social-links">
                <a href="#" className="social-link">
                  <div className="social-icon">📘</div>
                  <span>Facebook</span>
                </a>
                <a href="#" className="social-link">
                  <div className="social-icon">📷</div>
                  <span>Instagram</span>
                </a>
                <a href="#" className="social-link">
                  <div className="social-icon">🐦</div>
                  <span>Twitter</span>
                </a>
                <a href="#" className="social-link">
                  <div className="social-icon">📺</div>
                  <span>YouTube</span>
                </a>
              </div>
            </div>
          </div>

          <div className="contact-form-section">
            <div className="contact-form-card">
              <h2>Kirim Pesan</h2>
              <p>Isi form di bawah ini dan kami akan menghubungi Anda segera</p>
              
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Nama Lengkap</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Masukkan nama lengkap Anda"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Masukkan email Anda"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subjek</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Pilih subjek</option>
                    <option value="Pertanyaan Produk">Pertanyaan Produk</option>
                    <option value="Keluhan">Keluhan</option>
                    <option value="Saran">Saran</option>
                    <option value="Kerjasama">Kerjasama</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Pesan</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="6"
                    placeholder="Tulis pesan Anda di sini..."
                  ></textarea>
                </div>

                <button type="submit" className="submit-btn">
                  Kirim via WhatsApp
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <div className="map-container">
          <h2>Lokasi Toko</h2>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.2!2d106.7!3d-6.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMzYnMDAuMCJTIDEwNsKwNDInMDAuMCJF!5e0!3m2!1sen!2sid!4v1234567890"
            width="100%"
            height="500"
            style={{ border: 0, borderRadius: '20px' }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Lokasi Stride Store"
          ></iframe>
          <div className="map-info">
            <div className="map-info-item">
              <strong>Jam Operasional:</strong>
              <p>Senin - Minggu: 08:00 - 22:00 WIB</p>
            </div>
            <div className="map-info-item">
              <strong>Fasilitas:</strong>
              <p>Parkir Gratis • WiFi • AC • Ruang Tunggu</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />
    </div>
  );
};

export default Contact;