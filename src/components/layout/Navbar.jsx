import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMobileMenu } from '../../store/slices/uiSlice';
import Logo from '../common/Logo';
import { Phone, Menu, X, ArrowUpRight, Lock } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings.data);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isMobileOpen = useSelector((state) => state.ui.mobileMenuOpen);

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Properties', path: '/properties' },
    { name: 'Services', path: '/services' },
    { name: 'Founder', path: '/founder-message' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md py-1 border-b border-gold/20'
          : isHomePage
          ? 'bg-gradient-to-b from-navy-dark/90 via-navy-dark/50 to-transparent py-2 text-white'
          : 'bg-white shadow-sm py-2 border-b border-slate-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Logo isScrolled={scrolled || !isHomePage} />

        {/* Right Navigation & CTA Actions */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-8">
          <nav className="flex items-center gap-3 sm:gap-4 lg:gap-5 xl:gap-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-xs sm:text-sm font-bold transition-colors duration-200 relative py-1 ${
                    isActive
                      ? 'text-gold font-semibold'
                      : !scrolled && isHomePage
                      ? 'text-slate-100 hover:text-gold'
                      : 'text-slate-700 hover:text-navy'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold-light via-gold to-gold-dark rounded-full" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3 border-l border-slate-200/50 pl-4 lg:pl-6">
            <a
              href={`tel:${settings.phone.replace(/\s+/g, '')}`}
              className={`flex items-center gap-2 text-sm font-semibold px-2.5 py-2 rounded-lg transition-colors whitespace-nowrap ${
                !scrolled && isHomePage
                  ? 'text-white/90 hover:text-gold'
                  : 'text-slate-700 hover:text-navy'
              }`}
            >
              <Phone className="w-3.5 h-3.5 text-gold shrink-0" />
              <span>{settings.phone}</span>
            </a>

            <Link
              to="/properties"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-gold via-gold-accent to-gold-dark text-navy-dark font-bold text-sm shadow-gold hover:shadow-glow hover:scale-[1.02] active:scale-95 transition-all duration-300 whitespace-nowrap"
            >
              <span>Explore</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => dispatch(toggleMobileMenu())}
          className={`md:hidden p-2 rounded-xl border transition-colors ${
            !scrolled && isHomePage
              ? 'text-white border-white/20 bg-navy/40'
              : 'text-navy border-slate-200 bg-slate-50'
          }`}
          aria-label="Toggle Menu"
        >
          {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
