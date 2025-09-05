import React, { useState } from 'react';
import './UMKMProfile.css';

const UMKMProfile = ({ umkm, onEdit, onSave, isEditing }) => {
  const [formData, setFormData] = useState({
    businessName: umkm?.businessName || '',
    ownerName: umkm?.ownerName || '',
    description: umkm?.description || '',
    address: umkm?.address || '',
    phone: umkm?.phone || '',
    email: umkm?.email || '',
    category: umkm?.category || '',
    establishedYear: umkm?.establishedYear || '',
    logo: umkm?.logo || '',
    socialMedia: umkm?.socialMedia || {
      instagram: '',
      facebook: '',
      whatsapp: ''
    }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('social.')) {
      const socialField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        socialMedia: {
          ...prev.socialMedia,
          [socialField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isEditing) {
    return (
      <div className="umkm-profile-view">
        <div className="profile-header">
          <div className="profile-logo">
            <img 
              src={umkm?.logo || 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'} 
              alt="Logo UMKM" 
            />
          </div>
          <div className="profile-info">
            <h1>{umkm?.businessName || 'Nama Usaha'}</h1>
            <p className="owner-name">Pemilik: {umkm?.ownerName || 'Nama Pemilik'}</p>
            <p className="established">Didirikan: {umkm?.establishedYear || '2020'}</p>
            <span className="category-badge">{umkm?.category || 'Fashion'}</span>
          </div>
          <button className="edit-btn" onClick={onEdit}>
            ✏️ Edit Profil
          </button>
        </div>

        <div className="profile-content">
          <div className="profile-section">
            <h3>📝 Deskripsi Usaha</h3>
            <p>{umkm?.description || 'Deskripsi usaha akan ditampilkan di sini.'}</p>
          </div>

          <div className="profile-section">
            <h3>📍 Informasi Kontak</h3>
            <div className="contact-grid">
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <div>
                  <strong>Alamat</strong>
                  <p>{umkm?.address || 'Alamat usaha'}</p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <div>
                  <strong>Telepon</strong>
                  <p>{umkm?.phone || '+62 xxx xxxx xxxx'}</p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📧</span>
                <div>
                  <strong>Email</strong>
                  <p>{umkm?.email || 'email@usaha.com'}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="profile-section">
            <h3>🌐 Media Sosial</h3>
            <div className="social-links">
              {umkm?.socialMedia?.instagram && (
                <a href={umkm.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="social-link instagram">
                  <span>📷</span>
                  Instagram
                </a>
              )}
              {umkm?.socialMedia?.facebook && (
                <a href={umkm.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="social-link facebook">
                  <span>📘</span>
                  Facebook
                </a>
              )}
              {umkm?.socialMedia?.whatsapp && (
                <a href={`https://wa.me/${umkm.socialMedia.whatsapp}`} target="_blank" rel="noopener noreferrer" className="social-link whatsapp">
                  <span>💬</span>
                  WhatsApp
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="umkm-profile-edit">
      <div className="edit-header">
        <h2>✏️ Edit Profil UMKM</h2>
        <p>Lengkapi informasi usaha Anda untuk meningkatkan kepercayaan pelanggan</p>
      </div>

      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="businessName">Nama Usaha *</label>
            <input
              type="text"
              id="businessName"
              name="businessName"
              value={formData.businessName}
              onChange={handleInputChange}
              required
              placeholder="Masukkan nama usaha"
            />
          </div>

          <div className="form-group">
            <label htmlFor="ownerName">Nama Pemilik *</label>
            <input
              type="text"
              id="ownerName"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleInputChange}
              required
              placeholder="Masukkan nama pemilik"
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Kategori Usaha *</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
            >
              <option value="">Pilih kategori</option>
              <option value="Fashion">Fashion & Pakaian</option>
              <option value="Food">Makanan & Minuman</option>
              <option value="Craft">Kerajinan Tangan</option>
              <option value="Beauty">Kecantikan & Kesehatan</option>
              <option value="Technology">Teknologi</option>
              <option value="Service">Jasa</option>
              <option value="Other">Lainnya</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="establishedYear">Tahun Berdiri</label>
            <input
              type="number"
              id="establishedYear"
              name="establishedYear"
              value={formData.establishedYear}
              onChange={handleInputChange}
              min="1900"
              max="2025"
              placeholder="2020"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description">Deskripsi Usaha *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            rows="4"
            placeholder="Ceritakan tentang usaha Anda, produk/layanan yang ditawarkan, dan keunggulan yang dimiliki"
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Alamat Lengkap *</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
            rows="3"
            placeholder="Masukkan alamat lengkap usaha"
          />
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="phone">Nomor Telepon *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              placeholder="+62 xxx xxxx xxxx"
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
              placeholder="email@usaha.com"
            />
          </div>
        </div>

        <div className="social-media-section">
          <h3>🌐 Media Sosial (Opsional)</h3>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="social.instagram">Instagram</label>
              <input
                type="url"
                id="social.instagram"
                name="social.instagram"
                value={formData.socialMedia.instagram}
                onChange={handleInputChange}
                placeholder="https://instagram.com/username"
              />
            </div>

            <div className="form-group">
              <label htmlFor="social.facebook">Facebook</label>
              <input
                type="url"
                id="social.facebook"
                name="social.facebook"
                value={formData.socialMedia.facebook}
                onChange={handleInputChange}
                placeholder="https://facebook.com/page"
              />
            </div>

            <div className="form-group">
              <label htmlFor="social.whatsapp">WhatsApp Business</label>
              <input
                type="tel"
                id="social.whatsapp"
                name="social.whatsapp"
                value={formData.socialMedia.whatsapp}
                onChange={handleInputChange}
                placeholder="6289506147763"
              />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => onEdit(false)} className="cancel-btn">
            Batal
          </button>
          <button type="submit" className="save-btn">
            💾 Simpan Profil
          </button>
        </div>
      </form>
    </div>
  );
};

export default UMKMProfile;