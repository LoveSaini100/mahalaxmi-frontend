import React from 'react';
import { Link } from 'react-router-dom';

const Logo = ({ variant = 'default', isScrolled = false, className = '' }) => {
  const useBgLogo = isScrolled || variant === 'scrolled' || variant === 'bg' || variant === 'dark';
  const logoSrc = useBgLogo ? '/logo_bg.png' : '/logo.png';

  return (
    <Link to="/" className={`inline-flex items-center group transition-transform duration-300 ${className}`}>
      <img
        src={logoSrc}
        alt="MAHALAXMI PROPERTY"
        className={`h-10 sm:h-16 w-auto object-contain group-hover:scale-105 transition-all duration-300 drop-shadow-sm ${
          !useBgLogo ? 'rounded-lg overflow-hidden' : ''
        }`}
      />
    </Link>
  );
};

export default Logo;
