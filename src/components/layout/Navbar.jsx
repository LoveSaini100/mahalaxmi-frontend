import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMobileMenu } from '../../store/slices/uiSlice';
import Logo from '../common/Logo';
import { Phone, Menu, X, ArrowUpRight, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings.data);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isMobileOpen = useSelector((state) => state.ui.mobileMenuOpen);

  const isHomePage = location.pathname === '/';
  const isAboutActive = ['/about', '/founder-message', '/manager-message'].includes(location.pathname);

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

  // Close dropdown on route change
  useEffect(() => {
    setAboutOpen(false);
  }, [location.pathname]);

  const aboutSubLinks = [
    { name: 'About Us', path: '/about' },
    { name: "Founder's Message", path: '/founder-message' },
    { name: "Manager's Message", path: '/manager-message' },
  ];

  const mainNavLinks = [
    { name: 'Home', path: '/' },
    { name: 'Properties', path: '/properties' },
    { name: 'Services', path: '/services' },
    { name: 'Blogs', path: '/blogs' },
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
            <NavLink
              to="/"
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
                  Home
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold-light via-gold to-gold-dark rounded-full" />
                  )}
                </>
              )}
            </NavLink>

            {/* About Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setAboutOpen(true)}
              onMouseLeave={() => setAboutOpen(false)}
            >
              <button
                type="button"
                onClick={() => setAboutOpen((prev) => !prev)}
                className={`flex items-center gap-1 text-xs sm:text-sm font-bold transition-colors duration-200 py-1 cursor-pointer relative ${
                  isAboutActive
                    ? 'text-gold font-semibold'
                    : !scrolled && isHomePage
                    ? 'text-slate-100 hover:text-gold'
                    : 'text-slate-700 hover:text-navy'
                }`}
              >
                <span>About</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${aboutOpen ? 'rotate-180 text-gold' : ''}`} />
                {isAboutActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold-light via-gold to-gold-dark rounded-full" />
                )}
              </button>

              {/* Dropdown Menu */}
              {aboutOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white/95 backdrop-blur-md rounded-2xl border border-gold/30 shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  {aboutSubLinks.map((sub) => (
                    <NavLink
                      key={sub.name}
                      to={sub.path}
                      className={({ isActive }) =>
                        `block px-4 py-2 text-xs font-semibold transition-colors ${
                          isActive
                            ? 'bg-gold/15 text-gold-dark border-l-4 border-gold font-bold'
                            : 'text-slate-700 hover:bg-slate-50 hover:text-navy'
                        }`
                      }
                    >
                      {sub.name}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>

            {mainNavLinks.slice(1).map((link) => (
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
