import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Password tidak cocok');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password minimal 6 karakter');
      return;
    }

    setLoading(true);

    try {
      await signup(formData.email, formData.password, formData.displayName);
      navigate('/dashboard');
    } catch (error) {
      setError('Gagal membuat akun. Email mungkin sudah terdaftar.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Daftar ke Stride</h1>
            <p>Bergabunglah dengan komunitas Stride dan nikmati pengalaman berbelanja yang luar biasa</p>
          </div>

          {error && <div className="error-message">{error}</div>}
          

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="displayName">Nama Lengkap</label>
              <input
                type="text"
                id="displayName"
                name="displayName"
                value={formData.displayName}
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
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                placeholder="Masukkan password (minimal 6 karakter)"
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Konfirmasi Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                placeholder="Konfirmasi password Anda"
              />
            </div>

            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? 'Memproses...' : 'Daftar'}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Sudah punya akun? 
              <Link to="/login" className="auth-link"> Masuk di sini</Link>
            </p>
            <Link to="/" className="back-home">
              ← Kembali ke Beranda
            </Link>
          </div>
        </div>

        <div className="auth-visual">
          <img 
            src="https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop" 
            alt="Stride Collection" 
          />
          <div className="visual-overlay">
            <h2>Bergabung dengan Stride</h2>
            <p>Dapatkan akses eksklusif ke koleksi terbaru</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;