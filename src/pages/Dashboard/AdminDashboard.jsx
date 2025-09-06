import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useProducts } from '../../hooks/useProducts';
import { collection, getDocs, deleteDoc, doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import ProductForm from '../../components/ProductForm/ProductForm';
import ProductStats from '../../components/ProductStats/ProductStats';
import './Dashboard.css';

const AdminDashboard = () => {
  const { currentUser, logout } = useAuth();
  const { products, addProduct, updateProduct, deleteProduct, loading } = useProducts();
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [websiteContent, setWebsiteContent] = useState({
    companyProfile: {
      name: 'Stride',
      tagline: 'Platform Digitalisasi UMKM Terdepan',
      description: 'Memberdayakan UMKM Indonesia untuk go-digital dengan solusi teknologi terpadu',
      vision: 'Menjadi platform digitalisasi UMKM terdepan di Indonesia',
      mission: [
        'Menyediakan platform digital yang mudah digunakan untuk UMKM',
        'Memberikan pelatihan dan pendampingan digitalisasi bisnis',
        'Membangun ekosistem marketplace yang mendukung produk lokal'
      ]
    },
    advantages: [
      {
        title: 'Platform Terintegrasi',
        description: 'Semua kebutuhan digitalisasi UMKM dalam satu platform yang mudah digunakan'
      },
      {
        title: 'Dukungan Penuh',
        description: 'Tim ahli siap membantu proses transformasi digital bisnis Anda'
      },
      {
        title: 'Teknologi Terdepan',
        description: 'Menggunakan teknologi cloud terbaru untuk performa optimal'
      }
    ]
  });
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalUsers: 0,
    totalOrders: 0
  });

  useEffect(() => {
    fetchUsers();
    fetchWebsiteContent();
    updateStats();
  }, [products, users]);

  // Filter and sort products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return (a.name || '').localeCompare(b.name || '');
      case 'price':
        const priceA = parseFloat((a.price || '0').replace(/[^\d]/g, ''));
        const priceB = parseFloat((b.price || '0').replace(/[^\d]/g, ''));
        return priceA - priceB;
      case 'category':
        return (a.category || '').localeCompare(b.category || '');
      case 'stock':
        return (a.stock || 0) - (b.stock || 0);
      default:
        return 0;
    }
  });

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const fetchUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const usersData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUsers(usersData);
    } catch (error) {
      console.error('Error fetching users:', error);
      setUsers([]);
    }
  };

  const fetchWebsiteContent = async () => {
    try {
      const docRef = doc(db, 'website', 'content');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setWebsiteContent(docSnap.data());
      }
    } catch (error) {
      console.error('Error fetching website content:', error);
    }
  };

  const updateWebsiteContent = async () => {
    try {
      await setDoc(doc(db, 'website', 'content'), websiteContent);
      alert('Konten website berhasil diperbarui!');
    } catch (error) {
      console.error('Error updating website content:', error);
      alert('Gagal memperbarui konten website');
    }
  };

  const updateStats = () => {
    setStats({
      totalProducts: products.length,
      totalUsers: users.length,
      totalOrders: Math.floor(Math.random() * 100) + 50 // Simulated orders
    });
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus user ini?')) {
      try {
        await deleteDoc(doc(db, 'users', userId));
        await fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleProductSubmit = async (productData) => {
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, productData);
      } else {
        await addProduct(productData);
      }
      setShowProductForm(false);
      setEditingProduct(null);
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowProductForm(true);
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus produk ini?')) {
      try {
        await deleteProduct(productId);
        // Reset to first page if current page becomes empty
        if (paginatedProducts.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleBulkDelete = async (selectedIds) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus ${selectedIds.length} produk?`)) {
      try {
        await Promise.all(selectedIds.map(id => deleteProduct(id)));
        setSelectedProducts([]);
      } catch (error) {
        console.error('Error bulk deleting products:', error);
      }
    }
  };

  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleSelectProduct = (productId) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSelectAll = () => {
    if (selectedProducts.length === paginatedProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(paginatedProducts.map(p => p.id));
    }
  };

  const handleContentChange = (section, field, value) => {
    setWebsiteContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleAdvantageChange = (index, field, value) => {
    const newAdvantages = [...websiteContent.advantages];
    newAdvantages[index] = { ...newAdvantages[index], [field]: value };
    setWebsiteContent(prev => ({
      ...prev,
      advantages: newAdvantages
    }));
  };

  const addAdvantage = () => {
    setWebsiteContent(prev => ({
      ...prev,
      advantages: [...prev.advantages, { title: '', description: '' }]
    }));
  };

  const removeAdvantage = (index) => {
    setWebsiteContent(prev => ({
      ...prev,
      advantages: prev.advantages.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="dashboard admin-dashboard">
      <div className="dashboard-container">
        {/* Sidebar */}
        <aside className="dashboard-sidebar">
          <div className="sidebar-header">
            <h2>Admin Panel</h2>
            <p>Selamat datang, {currentUser?.displayName}!</p>
          </div>
          
          <nav className="sidebar-nav">
            <button 
              className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <span className="nav-icon">📊</span>
              Overview
            </button>
            <button 
              className={`nav-item ${activeTab === 'products' ? 'active' : ''}`}
              onClick={() => setActiveTab('products')}
            >
              <span className="nav-icon">👟</span>
              Kelola Produk
            </button>
            <button 
              className={`nav-item ${activeTab === 'content' ? 'active' : ''}`}
              onClick={() => setActiveTab('content')}
            >
              <span className="nav-icon">📝</span>
              Kelola Konten
            </button>
            <button 
              className={`nav-item ${activeTab === 'users' ? 'active' : ''}`}
              onClick={() => setActiveTab('users')}
            >
              <span className="nav-icon">👥</span>
              Kelola User
            </button>
          </nav>

          <button onClick={logout} className="logout-btn">
            Logout
          </button>
        </aside>

        {/* Main Content */}
        <main className="dashboard-main">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <section className="dashboard-section">
              <h2>Dashboard Overview</h2>
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon">👟</div>
                  <div className="stat-info">
                    <h3>{stats.totalProducts}</h3>
                    <p>Total Produk</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">👥</div>
                  <div className="stat-info">
                    <h3>{stats.totalUsers}</h3>
                    <p>Total User</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">🏢</div>
                  <div className="stat-info">
                    <h3>150+</h3>
                    <p>UMKM Terdaftar</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">📈</div>
                  <div className="stat-info">
                    <h3>89%</h3>
                    <p>Tingkat Digitalisasi</p>
                  </div>
                </div>
              </div>

              <div className="recent-activity">
                <h3>Aktivitas Terbaru</h3>
                <div className="activity-list">
                  <div className="activity-item">
                    <span className="activity-icon">👟</span>
                    <div className="activity-content">
                      <p>Produk baru ditambahkan</p>
                      <span>2 jam yang lalu</span>
                    </div>
                  </div>
                  <div className="activity-item">
                    <span className="activity-icon">👤</span>
                    <div className="activity-content">
                      <p>UMKM baru mendaftar</p>
                      <span>5 jam yang lalu</span>
                    </div>
                  </div>
                  <div className="activity-item">
                    <span className="activity-icon">📦</span>
                    <div className="activity-content">
                      <p>Inquiry baru diterima</p>
                      <span>1 hari yang lalu</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Products Tab */}
          {activeTab === 'products' && (
            <section className="dashboard-section">
              <div className="section-header">
                <h2>Kelola Produk</h2>
                <div className="header-actions">
                  <button 
                    className="add-btn"
                    onClick={() => {
                      setEditingProduct(null);
                      setShowProductForm(true);
                    }}
                  >
                    + Tambah Produk
                  </button>
                  {selectedProducts.length > 0 && (
                    <button 
                      className="bulk-delete-btn"
                      onClick={() => handleBulkDelete(selectedProducts)}
                    >
                      Hapus Terpilih ({selectedProducts.length})
                    </button>
                  )}
                </div>
              </div>

              {/* Product Statistics */}
              <ProductStats products={products} />

              {/* Product Filters */}
              <div className="products-filters">
                <div className="filter-row">
                  <div className="search-box">
                    <input
                      type="text"
                      placeholder="Cari produk..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="search-input"
                    />
                  </div>
                  <select 
                    value={categoryFilter} 
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="filter-select"
                  >
                    <option value="all">Semua Kategori</option>
                    <option value="casual">Casual</option>
                    <option value="running">Running</option>
                    <option value="formal">Formal</option>
                    <option value="sport">Sport</option>
                  </select>
                  <select 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value)}
                    className="filter-select"
                  >
                    <option value="name">Urutkan: Nama</option>
                    <option value="price">Urutkan: Harga</option>
                    <option value="category">Urutkan: Kategori</option>
                    <option value="stock">Urutkan: Stok</option>
                  </select>
                </div>
              </div>
              {loading ? (
                <div className="loading">Memuat produk...</div>
              ) : (
                <>
                  {/* Products Table */}
                  <div className="products-table-container">
                    <div className="products-table">
                      <div className="table-header">
                        <div className="header-cell">
                          <input
                            type="checkbox"
                            checked={selectedProducts.length === paginatedProducts.length && paginatedProducts.length > 0}
                            onChange={handleSelectAll}
                          />
                        </div>
                        <div className="header-cell">Gambar</div>
                        <div className="header-cell">Nama Produk</div>
                        <div className="header-cell">Kategori</div>
                        <div className="header-cell">Harga</div>
                        <div className="header-cell">Stok</div>
                        <div className="header-cell">Aksi</div>
                      </div>
                      
                      {paginatedProducts.map((product, index) => (
                        <div key={product.id} className="table-row">
                          <div className="table-cell">
                            <input
                              type="checkbox"
                              checked={selectedProducts.includes(product.id)}
                              onChange={() => handleSelectProduct(product.id)}
                            />
                          </div>
                          <div className="table-cell">
                            <img 
                              src={product.image || `https://images.pexels.com/photos/${1598505 + index}/pexels-photo-${1598505 + index}.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop`} 
                              alt={product.name}
                              className="product-thumbnail"
                            />
                          </div>
                          <div className="table-cell">
                            <div className="product-name">{product.name}</div>
                            <div className="product-description">{product.description?.substring(0, 50)}...</div>
                          </div>
                          <div className="table-cell">
                            <span className={`category-badge ${product.category}`}>
                              {product.category}
                            </span>
                          </div>
                          <div className="table-cell">
                            <span className="product-price">{product.price}</span>
                          </div>
                          <div className="table-cell">
                            <span className={`stock-badge ${product.stock < 10 ? 'low' : 'normal'}`}>
                              {product.stock}
                            </span>
                          </div>
                          <div className="table-cell">
                            <div className="action-buttons">
                              <button 
                                className="edit-btn"
                                onClick={() => handleEditProduct(product)}
                                title="Edit Produk"
                              >
                                ✏️
                              </button>
                              <button 
                                className="delete-btn"
                                onClick={() => handleDeleteProduct(product.id)}
                                title="Hapus Produk"
                              >
                                🗑️
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="pagination">
                      <button 
                        className="pagination-btn"
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                      >
                        ← Sebelumnya
                      </button>
                      
                      <div className="pagination-info">
                        Halaman {currentPage} dari {totalPages} 
                        ({filteredProducts.length} produk)
                      </div>
                      
                      <button 
                        className="pagination-btn"
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                      >
                        Selanjutnya →
                      </button>
                    </div>
                  )}

                  {/* Products Grid View (Alternative) */}
                  <div className="view-toggle">
                    <button className="toggle-btn active">📋 Tabel</button>
                    <button className="toggle-btn">🔲 Grid</button>
                  </div>
                </>
              )}
            </section>
          )}

          {/* Content Management Tab */}
          {activeTab === 'content' && (
            <section className="dashboard-section">
              <div className="section-header">
                <h2>Kelola Konten Website</h2>
                <button className="save-btn" onClick={updateWebsiteContent}>
                  💾 Simpan Perubahan
                </button>
              </div>

              <div className="content-management">
                <div className="content-section">
                  <h3>Profil Perusahaan</h3>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Nama Perusahaan</label>
                      <input
                        type="text"
                        value={websiteContent.companyProfile.name}
                        onChange={(e) => handleContentChange('companyProfile', 'name', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Tagline</label>
                      <input
                        type="text"
                        value={websiteContent.companyProfile.tagline}
                        onChange={(e) => handleContentChange('companyProfile', 'tagline', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Deskripsi</label>
                    <textarea
                      rows="3"
                      value={websiteContent.companyProfile.description}
                      onChange={(e) => handleContentChange('companyProfile', 'description', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Visi</label>
                    <textarea
                      rows="2"
                      value={websiteContent.companyProfile.vision}
                      onChange={(e) => handleContentChange('companyProfile', 'vision', e.target.value)}
                    />
                  </div>
                </div>

                <div className="content-section">
                  <div className="section-header">
                    <h3>Keunggulan Platform</h3>
                    <button className="add-btn" onClick={addAdvantage}>
                      + Tambah Keunggulan
                    </button>
                  </div>
                  {websiteContent.advantages.map((advantage, index) => (
                    <div key={index} className="advantage-item">
                      <div className="form-grid">
                        <div className="form-group">
                          <label>Judul</label>
                          <input
                            type="text"
                            value={advantage.title}
                            onChange={(e) => handleAdvantageChange(index, 'title', e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <label>Deskripsi</label>
                          <textarea
                            rows="2"
                            value={advantage.description}
                            onChange={(e) => handleAdvantageChange(index, 'description', e.target.value)}
                          />
                        </div>
                      </div>
                      <button 
                        className="remove-btn"
                        onClick={() => removeAdvantage(index)}
                      >
                        Hapus
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <section className="dashboard-section">
              <h2>Kelola User</h2>
              <div className="users-table">
                <div className="table-header">
                  <span>Nama</span>
                  <span>Email</span>
                  <span>Role</span>
                  <span>Tanggal Daftar</span>
                  <span>Aksi</span>
                </div>
                {users.map((user) => (
                  <div key={user.id} className="table-row">
                    <span>{user.displayName}</span>
                    <span>{user.email}</span>
                    <span className={`role-badge ${user.role}`}>{user.role}</span>
                    <span>{new Date(user.createdAt).toLocaleDateString('id-ID')}</span>
                    <div className="table-actions">
                      {user.role !== 'admin' && (
                        <button 
                          className="delete-btn"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          Hapus
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>

      {/* Product Form Modal */}
      {showProductForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <ProductForm
              product={editingProduct}
              onSubmit={handleProductSubmit}
              onCancel={() => {
                setShowProductForm(false);
                setEditingProduct(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;