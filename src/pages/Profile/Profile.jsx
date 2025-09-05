import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useProducts } from '../../hooks/useProducts';
import './Profile.css';

const Profile = () => {
  const { currentUser } = useAuth();
  const { products } = useProducts();
  const [activeTab, setActiveTab] = useState('activity');
  const [userProfile, setUserProfile] = useState({
    displayName: currentUser?.displayName || '',
    email: currentUser?.email || '',
    phone: '',
    location: '',
    bio: '',
    website: '',
    joinDate: currentUser?.metadata?.creationTime || new Date().toISOString()
  });
  const [favorites, setFavorites] = useState([]);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    // Load user data from localStorage
    const savedProfile = JSON.parse(localStorage.getItem(`profile_${currentUser?.uid}`) || '{}');
    const savedFavorites = JSON.parse(localStorage.getItem(`favorites_${currentUser?.uid}`) || '[]');
    const savedActivities = JSON.parse(localStorage.getItem(`activities_${currentUser?.uid}`) || '[]');

    setUserProfile(prev => ({ ...prev, ...savedProfile }));
    setFavorites(savedFavorites);
    setActivities(savedActivities.length > 0 ? savedActivities : getDefaultActivities());
  }, [currentUser]);

  const getDefaultActivities = () => [
    {
      id: 1,
      type: 'join',
      title: 'Bergabung dengan Stride',
      description: 'Selamat datang di komunitas UMKM digital Indonesia!',
      time: new Date().toISOString(),
      icon: '🎉'
    },
    {
      id: 2,
      type: 'profile',
      title: 'Profil Dibuat',
      description: 'Profil pengguna berhasil dibuat dan siap untuk digitalisasi.',
      time: new Date().toISOString(),
      icon: '👤'
    }
  ];

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    localStorage.setItem(`profile_${currentUser.uid}`, JSON.stringify(userProfile));
    
    // Add activity
    const newActivity = {
      id: Date.now(),
      type: 'update',
      title: 'Profil Diperbarui',
      description: 'Informasi profil berhasil diperbarui.',
      time: new Date().toISOString(),
      icon: '✏️'
    };
    
    const updatedActivities = [newActivity, ...activities];
    setActivities(updatedActivities);
    localStorage.setItem(`activities_${currentUser.uid}`, JSON.stringify(updatedActivities));
    
    alert('Profil berhasil diperbarui!');
  };

  const favoriteProducts = products.filter(product => favorites.includes(product.id));

  const userStats = {
    favorites: favorites.length,
    activities: activities.length,
    joinDays: Math.floor((new Date() - new Date(userProfile.joinDate)) / (1000 * 60 * 60 * 24)),
    profileComplete: Object.values(userProfile).filter(value => value && value.trim() !== '').length
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-header-content">
            <img 
              src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop" 
              alt="Profile" 
              className="profile-avatar"
            />
            <h1>{userProfile.displayName || 'Pengguna Stride'}</h1>
            <p>{userProfile.email}</p>
            <span>Member sejak {new Date(userProfile.joinDate).toLocaleDateString('id-ID')}</span>
          </div>
        </div>

        <div className="profile-content">
          {/* Sidebar */}
          <div className="profile-sidebar">
            {/* User Stats */}
            <div className="profile-card">
              <h3>📊 Statistik</h3>
              <div className="profile-stats">
                <div className="stat-item">
                  <div className="stat-number">{userStats.favorites}</div>
                  <div className="stat-label">Favorit</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">{userStats.activities}</div>
                  <div className="stat-label">Aktivitas</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">{userStats.joinDays}</div>
                  <div className="stat-label">Hari Bergabung</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">{Math.round((userStats.profileComplete / 7) * 100)}%</div>
                  <div className="stat-label">Profil Lengkap</div>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="profile-card">
              <h3>📞 Informasi Kontak</h3>
              <div className="profile-info-list">
                <div className="info-item">
                  <div className="info-icon">📧</div>
                  <div className="info-content">
                    <strong>Email</strong>
                    <span>{userProfile.email}</span>
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-icon">📱</div>
                  <div className="info-content">
                    <strong>Telepon</strong>
                    <span>{userProfile.phone || 'Belum diisi'}</span>
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-icon">📍</div>
                  <div className="info-content">
                    <strong>Lokasi</strong>
                    <span>{userProfile.location || 'Belum diisi'}</span>
                  </div>
                </div>
                <div className="info-item">
                  <div className="info-icon">🌐</div>
                  <div className="info-content">
                    <strong>Website</strong>
                    <span>{userProfile.website || 'Belum diisi'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="profile-main">
            {/* Tabs */}
            <div className="profile-tabs">
              <button 
                className={`tab-button ${activeTab === 'activity' ? 'active' : ''}`}
                onClick={() => setActiveTab('activity')}
              >
                📈 Aktivitas
              </button>
              <button 
                className={`tab-button ${activeTab === 'favorites' ? 'active' : ''}`}
                onClick={() => setActiveTab('favorites')}
              >
                ❤️ Favorit
              </button>
              <button 
                className={`tab-button ${activeTab === 'settings' ? 'active' : ''}`}
                onClick={() => setActiveTab('settings')}
              >
                ⚙️ Pengaturan
              </button>
            </div>

            {/* Tab Content */}
            <div className="tab-content">
              {/* Activity Tab */}
              {activeTab === 'activity' && (
                <div>
                  <h3>Aktivitas Terbaru</h3>
                  {activities.length > 0 ? (
                    <div className="activity-list">
                      {activities.map((activity) => (
                        <div key={activity.id} className="activity-item">
                          <div className="activity-icon">{activity.icon}</div>
                          <div className="activity-content">
                            <h4>{activity.title}</h4>
                            <p>{activity.description}</p>
                            <span className="activity-time">
                              {new Date(activity.time).toLocaleDateString('id-ID', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="empty-state">
                      <h4>Belum Ada Aktivitas</h4>
                      <p>Mulai jelajahi produk dan layanan kami untuk melihat aktivitas di sini.</p>
                    </div>
                  )}
                </div>
              )}

              {/* Favorites Tab */}
              {activeTab === 'favorites' && (
                <div>
                  <h3>Produk Favorit</h3>
                  {favoriteProducts.length > 0 ? (
                    <div className="favorites-grid">
                      {favoriteProducts.map((product, index) => (
                        <div key={product.id} className="favorite-item">
                          <div className="favorite-image">
                            <img 
                              src={product.image || `https://images.pexels.com/photos/${1598505 + index}/pexels-photo-${1598505 + index}.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop`} 
                              alt={product.name} 
                            />
                          </div>
                          <div className="favorite-info">
                            <h4>{product.name}</h4>
                            <p>{product.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="empty-state">
                      <h4>Belum Ada Produk Favorit</h4>
                      <p>Jelajahi koleksi produk kami dan tambahkan ke favorit untuk melihatnya di sini.</p>
                    </div>
                  )}
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div>
                  <h3>Pengaturan Profil</h3>
                  <form onSubmit={handleProfileUpdate} className="settings-form">
                    <div className="form-group">
                      <label htmlFor="displayName">Nama Lengkap</label>
                      <input
                        type="text"
                        id="displayName"
                        value={userProfile.displayName}
                        onChange={(e) => setUserProfile(prev => ({ ...prev, displayName: e.target.value }))}
                        placeholder="Masukkan nama lengkap"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        value={userProfile.email}
                        disabled
                        style={{ opacity: 0.7, cursor: 'not-allowed' }}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone">Nomor Telepon</label>
                      <input
                        type="tel"
                        id="phone"
                        value={userProfile.phone}
                        onChange={(e) => setUserProfile(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="Masukkan nomor telepon"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="location">Lokasi</label>
                      <input
                        type="text"
                        id="location"
                        value={userProfile.location}
                        onChange={(e) => setUserProfile(prev => ({ ...prev, location: e.target.value }))}
                        placeholder="Kota, Provinsi"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="website">Website</label>
                      <input
                        type="url"
                        id="website"
                        value={userProfile.website}
                        onChange={(e) => setUserProfile(prev => ({ ...prev, website: e.target.value }))}
                        placeholder="https://website-anda.com"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="bio">Bio</label>
                      <textarea
                        id="bio"
                        rows="4"
                        value={userProfile.bio}
                        onChange={(e) => setUserProfile(prev => ({ ...prev, bio: e.target.value }))}
                        placeholder="Ceritakan tentang diri Anda atau bisnis Anda"
                      />
                    </div>

                    <div className="form-actions">
                      <button type="button" className="cancel-btn">
                        Batal
                      </button>
                      <button type="submit" className="save-btn">
                        Simpan Perubahan
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;