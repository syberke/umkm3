import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
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
    setLoading(true);

    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (error) {
      setError('Email atau password salah');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Masuk ke Stride</h1>
            <p>Selamat datang kembali! Silakan masuk ke akun Anda</p>
          </div>

          {error && <div className="error-message">{error}</div>}
          

          <form onSubmit={handleSubmit} className="auth-form">
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
                placeholder="Masukkan password Anda"
              />
            </div>

            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? 'Memproses...' : 'Masuk'}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Belum punya akun? 
              <Link to="/register" className="auth-link"> Daftar di sini</Link>
            </p>
            <Link to="/" className="back-home">
              ← Kembali ke Beranda
            </Link>
          </div>

          <div className="admin-note">
            <p>
              <strong>Admin Login:</strong><br />
              Email: admin@stride.com<br />
              Password: admin123
            </p>
          </div>
        </div>

        <div className="auth-visual">
          <img 
            src="https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop" 
            alt="Stride Shoes" 
          />
          <div className="visual-overlay">
            <h2>Stride</h2>
            <p>Melangkah dengan Gaya</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;