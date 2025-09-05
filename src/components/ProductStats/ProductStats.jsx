import React from 'react';
import './ProductStats.css';

const ProductStats = ({ products }) => {
  // Calculate statistics
  const totalProducts = products.length;
  const totalStock = products.reduce((sum, product) => sum + (product.stock || 0), 0);
  const lowStockProducts = products.filter(product => (product.stock || 0) < 10).length;
  const outOfStockProducts = products.filter(product => (product.stock || 0) === 0).length;
  
  // Category distribution
  const categoryStats = products.reduce((acc, product) => {
    const category = product.category || 'uncategorized';
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  // Price range analysis
  const priceRanges = {
    'under-500k': 0,
    '500k-1m': 0,
    'over-1m': 0
  };

  products.forEach(product => {
    const price = parseFloat((product.price || '0').replace(/[^\d]/g, ''));
    if (price < 500000) {
      priceRanges['under-500k']++;
    } else if (price <= 1000000) {
      priceRanges['500k-1m']++;
    } else {
      priceRanges['over-1m']++;
    }
  });

  const statCards = [
    {
      title: 'Total Produk',
      value: totalProducts,
      icon: '📦',
      color: 'blue',
      description: 'Semua produk aktif'
    },
    {
      title: 'Total Stok',
      value: totalStock,
      icon: '📊',
      color: 'green',
      description: 'Unit tersedia'
    },
    {
      title: 'Stok Rendah',
      value: lowStockProducts,
      icon: '⚠️',
      color: 'orange',
      description: 'Produk < 10 unit'
    },
    {
      title: 'Habis Stok',
      value: outOfStockProducts,
      icon: '🚫',
      color: 'red',
      description: 'Perlu restock'
    }
  ];

  return (
    <div className="product-stats">
      <div className="stats-overview">
        <h3>📈 Statistik Produk</h3>
        <div className="stats-cards">
          {statCards.map((stat, index) => (
            <div key={index} className={`stat-card ${stat.color}`}>
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-content">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-title">{stat.title}</div>
                <div className="stat-description">{stat.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="stats-details">
        <div className="category-stats">
          <h4>📋 Distribusi Kategori</h4>
          <div className="category-chart">
            {Object.entries(categoryStats).map(([category, count]) => (
              <div key={category} className="category-item">
                <div className="category-bar">
                  <div 
                    className="category-fill"
                    style={{ 
                      width: `${(count / totalProducts) * 100}%`,
                      backgroundColor: getCategoryColor(category)
                    }}
                  ></div>
                </div>
                <div className="category-info">
                  <span className="category-name">{category}</span>
                  <span className="category-count">{count} produk</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="price-stats">
          <h4>💰 Distribusi Harga</h4>
          <div className="price-chart">
            <div className="price-item">
              <div className="price-label">< Rp 500rb</div>
              <div className="price-bar">
                <div 
                  className="price-fill"
                  style={{ width: `${(priceRanges['under-500k'] / totalProducts) * 100}%` }}
                ></div>
              </div>
              <div className="price-count">{priceRanges['under-500k']}</div>
            </div>
            <div className="price-item">
              <div className="price-label">Rp 500rb - 1jt</div>
              <div className="price-bar">
                <div 
                  className="price-fill"
                  style={{ width: `${(priceRanges['500k-1m'] / totalProducts) * 100}%` }}
                ></div>
              </div>
              <div className="price-count">{priceRanges['500k-1m']}</div>
            </div>
            <div className="price-item">
              <div className="price-label">> Rp 1jt</div>
              <div className="price-bar">
                <div 
                  className="price-fill"
                  style={{ width: `${(priceRanges['over-1m'] / totalProducts) * 100}%` }}
                ></div>
              </div>
              <div className="price-count">{priceRanges['over-1m']}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const getCategoryColor = (category) => {
  const colors = {
    casual: '#2196F3',
    running: '#9C27B0',
    formal: '#4CAF50',
    sport: '#FF9800',
    uncategorized: '#757575'
  };
  return colors[category] || colors.uncategorized;
};

export default ProductStats;