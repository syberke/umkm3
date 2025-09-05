import { TruckIcon } from "@heroicons/react/24/outline";
import { useState } from 'react';
import './ProductDetail.css';
const ProductDetail = ({ product, onClose, onOrder }) => {
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '#000');
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '40');
  const [quantity, setQuantity] = useState(1);

  const handleOrder = () => {
    const orderDetails = {
      ...product,
      selectedColor,
      selectedSize,
      quantity
    };
    onOrder(orderDetails);
  };

  return (
    <div className="product-detail-overlay">
      <div className="product-detail-modal">
        <button className="close-btn" onClick={onClose}>×</button>
        
        <div className="product-detail-content">
          <div className="product-detail-image">
            <img src={product.image} alt={product.name} />
            <div className="product-gallery">
              <img src={product.image} alt={product.name} className="active" />
              <img src={product.image} alt={product.name} />
              <img src={product.image} alt={product.name} />
            </div>
          </div>

          <div className="product-detail-info">
            <div className="product-header">
              <span className="product-category">{product.category}</span>
              <h1>{product.name}</h1>
              <div className="product-rating">
                <div className="stars">★★★★★</div>
                <span>(4.8 • 127 reviews)</span>
              </div>
            </div>

            <div className="product-price-section">
              <span className="current-price">{product.price}</span>
              <span className="original-price">Rp 650.000</span>
              <span className="discount">-15%</span>
            </div>

            <div className="product-description">
              <h3>Deskripsi Produk</h3>
              <p>{product.description}</p>
              <p>{product.description}</p>
            </div>

            <div className="product-options">
              <div className="color-selection">
                <h4>Pilih Warna:</h4>
                <div className="color-options">
                  {product.colors?.map((color, index) => (
                    <button
                      key={index}
                      className={`color-option ${selectedColor === color ? 'selected' : ''}`}
                      style={{ backgroundColor: color }}
                      onClick={() => setSelectedColor(color)}
                    />
                  ))}
                </div>
              </div>

              <div className="size-selection">
                <h4>Pilih Ukuran:</h4>
                <div className="size-options">
                  {product.sizes?.map((size) => (
                    <button
                      key={size}
                      className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="quantity-selection">
                <h4>Jumlah:</h4>
                <div className="quantity-controls">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span>{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={quantity >= (product.stock || 10)}
                  >
                    +
                  </button>
                </div>
                <span className="stock-info">Stok tersedia: {product.stock || 10}</span>
              </div>
            </div>

            <div className="product-actions">
              <button className="order-btn-primary" onClick={handleOrder}>
            
                Pesan via WhatsApp
              </button>
            
            </div>

            <div className="product-features">
              <div className="feature-item">
                <TruckIcon style={{ width: "24px", height: "24px", color: "black" }} />

                <div>
                  <strong>Gratis Ongkir</strong>
                  <p>Untuk pembelian di atas Rp 500.000</p>
                </div>
              </div>
              <div className="feature-item">
               <svg xmlns="http://www.w3.org/2000/svg" style={{width: "24px", height: "24px",color: "#097bf4ff"}} viewBox="0 0 20 20" fill="currentColor" className="size-5">
  <path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 0 1-9.201 2.466l-.312-.311h2.433a.75.75 0 0 0 0-1.5H3.989a.75.75 0 0 0-.75.75v4.242a.75.75 0 0 0 1.5 0v-2.43l.31.31a7 7 0 0 0 11.712-3.138.75.75 0 0 0-1.449-.39Zm1.23-3.723a.75.75 0 0 0 .219-.53V2.929a.75.75 0 0 0-1.5 0V5.36l-.31-.31A7 7 0 0 0 3.239 8.188a.75.75 0 1 0 1.448.389A5.5 5.5 0 0 1 13.89 6.11l.311.31h-2.432a.75.75 0 0 0 0 1.5h4.243a.75.75 0 0 0 .53-.219Z" clipRule="evenodd" />
</svg>

                <div>
                  <strong>Tukar Ukuran</strong>
                  <p>7 hari garansi tukar ukuran</p>
                </div>
              </div>
              <div className="feature-item">
                <svg xmlns="http://www.w3.org/2000/svg" style={{width: "24px", height: "24px", color: "#3ecc40ff"}} viewBox="0 0 20 20" fill="currentColor" className="size-5">
  <path fillRule="evenodd" d="M16.403 12.652a3 3 0 0 0 0-5.304 3 3 0 0 0-3.75-3.751 3 3 0 0 0-5.305 0 3 3 0 0 0-3.751 3.75 3 3 0 0 0 0 5.305 3 3 0 0 0 3.75 3.751 3 3 0 0 0 5.305 0 3 3 0 0 0 3.751-3.75Zm-2.546-4.46a.75.75 0 0 0-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
</svg>

                <div>
                  <strong>Kualitas Terjamin</strong>
                  <p>Garansi 6 bulan untuk cacat produksi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;