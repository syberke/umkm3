import { useEffect, useState } from 'react';
import ProductDetail from '../../components/ProductDetail/ProductDetail';
import { useProducts } from '../../hooks/useProducts';
import './Products.css';

const Products = () => {
  const { products, loading } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    let filtered = products;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by price range
    if (priceRange !== 'all') {
      switch (priceRange) {
        case 'under-500':
          filtered = filtered.filter(product => {
            const productPrice = parseFloat(product.price?.replace(/[^\d]/g, '') || 0);
            return productPrice < 500000;
          });
          break;
        case '500-1000':
          filtered = filtered.filter(product => {
            const productPrice = parseFloat(product.price?.replace(/[^\d]/g, '') || 0);
            return productPrice >= 500000 && productPrice <= 1000000;
          });
          break;
        case 'over-1000':
          filtered = filtered.filter(product => {
            const productPrice = parseFloat(product.price?.replace(/[^\d]/g, '') || 0);
            return productPrice > 1000000;
          });
          break;
        default:
          break;
      }
    }

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory, priceRange]);

const handleWhatsAppOrder = (product) => {
  const orderDetails = product;

  // bikin pesan langsung dengan emoji, jangan encode lagi
  const message = 
    `Halo Stride! ` +
    ` *${orderDetails.name || 'Sepatu Stride'}*%0A` +
    ` Harga: ${orderDetails.price || 'Rp 500.000'}%0A` +
    ` Kategori: ${orderDetails.category || 'Casual'}%0A` +
    (orderDetails.selectedColor ? ` Warna: ${orderDetails.selectedColor}%0A` : '') +
    (orderDetails.selectedSize ? ` Ukuran: ${orderDetails.selectedSize}%0A` : '') +
    (orderDetails.quantity ? ` Jumlah: ${orderDetails.quantity}` : '');

  const whatsappUrl = `https://wa.me/6289506147763?text=${message}`;
  window.open(whatsappUrl, '_blank');
};




  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const categories = ['all', 'running', 'casual', 'formal', 'sport'];
  const priceRanges = [
    { value: 'all', label: 'Semua Harga' },
    { value: 'under-500', label: 'Di bawah Rp 500rb' },
    { value: '500-1000', label: 'Rp 500rb - 1jt' },
    { value: 'over-1000', label: 'Di atas Rp 1jt' }
  ];

  if (loading) {
    return (
      <div className="products-loading">
        <div className="loading-spinner"></div>
        <p>Memuat produk...</p>
      </div>
    );
  }

  return (
    <div className="products">
      {/* Hero Section */}
      <section className="products-hero">
        <div className="products-hero-container">
          <h1>Koleksi Stride</h1>
          <p>Temukan sepatu impian Anda dari koleksi terlengkap kami</p>
        </div>
      </section>

      {/* Filters */}
      <section className="products-filters">
        <div className="filters-container">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Cari produk..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button>🔍</button>
          </div>
          
          <div className="filter-group">
            <label>Kategori:</label>
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">Semua Kategori</option>
              {categories.slice(1).map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Harga:</label>
            <select 
              value={priceRange} 
              onChange={(e) => setPriceRange(e.target.value)}
            >
              {priceRanges.map(range => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="products-grid-section">
        <div className="products-container">
          {filteredProducts.length === 0 ? (
            <div className="no-products">
              <h3>Tidak ada produk ditemukan</h3>
              <p>Coba ubah filter pencarian Anda</p>
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map((product, index) => (
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
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="products-cta">
        <div className="cta-container">
          <h2>Tidak Menemukan yang Anda Cari?</h2>
          <p>Hubungi kami untuk konsultasi produk yang sesuai dengan kebutuhan Anda</p>
          <button 
            className="cta-button"
            onClick={() => handleWhatsAppOrder({ name: 'Konsultasi Produk' })}
          >
            Konsultasi Sekarang
          </button>
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

export default Products;