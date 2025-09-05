import React, { useState, useEffect } from 'react';
import { uploadToCloudinary } from '../../services/cloudinary';
import './ProductForm.css';

const ProductForm = ({ product, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'casual',
    colors: ['#2a5ea9'],
    image: '',
    stock: 0,
    sizes: ['39', '40', '41', '42', '43']
  });
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        category: product.category || 'casual',
        colors: product.colors || ['#2a5ea9'],
        image: product.image || '',
        stock: product.stock || 0,
        sizes: product.sizes || ['39', '40', '41', '42', '43']
      });
    }
  }, [product]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          image: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleColorChange = (index, color) => {
    const newColors = [...formData.colors];
    newColors[index] = color;
    setFormData(prev => ({
      ...prev,
      colors: newColors
    }));
  };

  const addColor = () => {
    setFormData(prev => ({
      ...prev,
      colors: [...prev.colors, '#000000']
    }));
  };

  const removeColor = (index) => {
    if (formData.colors.length > 1) {
      const newColors = formData.colors.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        colors: newColors
      }));
    }
  };

  const handleSizeChange = (size, checked) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        sizes: [...prev.sizes, size]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        sizes: prev.sizes.filter(s => s !== size)
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = formData.image;

      // Upload image to Cloudinary if new image is selected
      if (imageFile) {
        setUploading(true);
        imageUrl = await uploadToCloudinary(imageFile);
        setUploading(false);
      }

      const productData = {
        ...formData,
        image: imageUrl,
        stock: parseInt(formData.stock),
        updatedAt: new Date().toISOString()
      };

      await onSubmit(productData);
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Gagal menyimpan produk');
    } finally {
      setLoading(false);
    }
  };

  const availableSizes = ['35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45'];

  return (
    <div className="product-form">
      <div className="form-header">
        <h2>{product ? 'Edit Produk' : 'Tambah Produk Baru'}</h2>
        <button className="close-btn" onClick={onCancel}>×</button>
      </div>

      <form onSubmit={handleSubmit} className="form-content">
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="name">Nama Produk</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="Masukkan nama produk"
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Kategori</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
            >
              <option value="casual">Casual</option>
              <option value="running">Running</option>
              <option value="formal">Formal</option>
              <option value="sport">Sport</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="price">Harga</label>
            <input
              type="text"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
              placeholder="Rp 500.000"
            />
          </div>

          <div className="form-group">
            <label htmlFor="stock">Stok</label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleInputChange}
              required
              min="0"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description">Deskripsi</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            rows="4"
            placeholder="Masukkan deskripsi produk"
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="image">Gambar Produk</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="file-input"
          />
          {formData.image && (
            <div className="image-preview">
              <img src={formData.image} alt="Preview" />
            </div>
          )}
        </div>

        <div className="form-group">
          <label>Warna Tersedia</label>
          <div className="colors-section">
            {formData.colors.map((color, index) => (
              <div key={index} className="color-input-group">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => handleColorChange(index, e.target.value)}
                  className="color-picker"
                />
                {formData.colors.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeColor(index)}
                    className="remove-color-btn"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={addColor} className="add-color-btn">
              + Tambah Warna
            </button>
          </div>
        </div>

        <div className="form-group">
          <label>Ukuran Tersedia</label>
          <div className="sizes-section">
            {availableSizes.map((size) => (
              <label key={size} className="size-checkbox">
                <input
                  type="checkbox"
                  checked={formData.sizes.includes(size)}
                  onChange={(e) => handleSizeChange(size, e.target.checked)}
                />
                <span>{size}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="form-actions">
          <button type="button" onClick={onCancel} className="cancel-btn">
            Batal
          </button>
          <button type="submit" disabled={loading || uploading} className="submit-btn">
            {loading ? 'Menyimpan...' : uploading ? 'Mengupload...' : product ? 'Update' : 'Tambah'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;