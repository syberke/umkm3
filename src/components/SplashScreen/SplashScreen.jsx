import React, { useState, useEffect } from 'react';
import './SplashScreen.css';

const SplashScreen = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onComplete();
      }, 500); // Wait for fade out animation
    }, 4000); // Show splash for 4 seconds

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`splash-screen ${!isVisible ? 'fade-out' : ''}`}>
      <div className="splash-logo">
        <img 
          src="https://res.cloudinary.com/dkzklcr1a/image/upload/v1756973096/Untitled_design_3_j9f3tv.png" 
          alt="Stride Logo" 
        />
      </div>
      
      <div className="splash-text">
        <span className="splash-letter">S</span>
        <span className="splash-letter">T</span>
        <span className="splash-letter">R</span>
        <span className="splash-letter">I</span>
        <span className="splash-letter">D</span>
        <span className="splash-letter">E</span>
      </div>
      
      <div className="splash-tagline">
        Platform Digitalisasi UMKM Terdepan
      </div>
      
      <div className="loading-dots">
        <div className="loading-dot"></div>
        <div className="loading-dot"></div>
        <div className="loading-dot"></div>
      </div>
    </div>
  );
};

export default SplashScreen;