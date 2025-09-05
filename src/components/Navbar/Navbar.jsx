import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { currentUser, logout, userRole } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setIsMobileMenuOpen(false);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const isActive = (path) => location.pathname === path;

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          <img
            src="https://res.cloudinary.com/dkzklcr1a/image/upload/v1756973096/Untitled_design_3_j9f3tv.png"
            alt="Stride Logo"
          />
          <span>Stride</span>
        </Link>

        {/* Menu Items */}
        <div className={`navbar-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <Link
            to="/"
            className={`navbar-link ${isActive('/') ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            Beranda
          </Link>
          <Link
            to="/about"
            className={`navbar-link ${isActive('/about') ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            Tentang Kami
          </Link>
          <Link
            to="/products"
            className={`navbar-link ${isActive('/products') ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            Produk
          </Link>
          <Link
            to="/digitalization"
            className={`navbar-link ${isActive('/digitalization') ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            Digitalisasi
          </Link>
          <Link
            to="/contact"
            className={`navbar-link ${isActive('/contact') ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            Kontak
          </Link>

          {currentUser ? (
            // Jika user login
            <div className="navbar-user">
              <Link
                to={userRole === 'admin' ? '/admin' : '/dashboard'}
                className="navbar-link"
                onClick={closeMobileMenu}
              >
                Dashboard
              </Link>
              <Link
                to="/profile"
                className="navbar-link"
                onClick={closeMobileMenu}
              >
                Profil
              </Link>
              <button onClick={handleLogout} className="navbar-logout">
                Logout
              </button>
            </div>
          ) : (
            // Jika belum login
            <>
              <Link
                to="/login"
                className="navbar-login"
                onClick={closeMobileMenu}
              >
                Masuk
              </Link>
              <Link
                to="/success-stories"
                className={`navbar-link ${isActive('/success-stories') ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                Kisah Sukses
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={`navbar-toggle ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
