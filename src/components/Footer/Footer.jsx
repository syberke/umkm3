import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>Stride</h3>
            <p>
              Elevate your step with Stride - where style meets comfort seamlessly. 
              Our meticulously crafted shoes redefine fashion, ensuring each stride is a statement.
            </p>
            <div className="footer-social">
              <a href="#" aria-label="Twitter">
                <div className="social-icon">T</div>
              </a>
              <a href="#" aria-label="Facebook">
                <div className="social-icon">F</div>
              </a>
              <a href="#" aria-label="Instagram">
                <div className="social-icon">I</div>
              </a>
            </div>
          </div>

          <div className="footer-links">
            <div className="footer-column">
              <h4>Company</h4>
              <a href="/about">About us</a>
              <a href="/products">Product</a>
              <a href="/contact">Contact us</a>
              <a href="#faq">FAQ</a>
            </div>
            
            <div className="footer-column">
              <h4>Support</h4>
              <a href="/about">About us</a>
              <a href="/products">Product</a>
              <a href="/contact">Contact us</a>
              <a href="#faq">FAQ</a>
            </div>
          </div>

          <div className="footer-newsletter">
            <h4>Newsletter</h4>
            <div className="newsletter-form">
              <input type="email" placeholder="Your email address" />
              <button type="submit">→</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;