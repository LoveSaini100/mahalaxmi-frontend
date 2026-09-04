import React, { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setMobileMenu } from '../../store/slices/uiSlice';
import Logo from '../common/Logo';
import { X, Phone, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MobileDrawer = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isOpen = useSelector((state) => state.ui.mobileMenuOpen);
  const settings = useSelector((state) => state.settings.data);

  const closeMenu = () => {
    dispatch(setMobileMenu(false));
  };

  // Automatically close drawer whenever current route location changes
  useEffect(() => {
    dispatch(setMobileMenu(false));
  }, [location.pathname, location.search, dispatch]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'All Properties', path: '/properties' },
    { name: 'Residential', path: '/residential' },
    { name: 'Commercial', path: '/commercial' },
    { name: 'Plots & Land', path: '/plots-land' },
    { name: 'Our Services', path: '/services' },
    { name: 'Founder Message', path: '/founder-message' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] md:hidden flex justify-end">
          {/* Dark Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeMenu}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm cursor-pointer"
          />

          {/* Sliding Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="relative z-[10000] w-full max-w-xs bg-navy-dark text-white flex flex-col border-l border-gold/30 shadow-2xl h-full overflow-y-auto"
          >
            {/* Drawer Header */}
            <div className="p-5 border-b border-navy-light flex items-center justify-between shrink-0 bg-navy-dark">
              <Logo variant="light" />
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  closeMenu();
                }}
                className="p-2.5 rounded-xl bg-navy hover:bg-navy-light text-slate-200 hover:text-gold transition-colors border border-gold/30 cursor-pointer"
                aria-label="Close Mobile Menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 py-4 px-4 space-y-1.5 overflow-y-auto">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-navy text-gold border-l-4 border-gold shadow-md font-bold'
                        : 'text-slate-200 hover:bg-navy/70 hover:text-gold'
                    }`
                  }
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </NavLink>
              ))}
            </div>

            {/* Contact Footer */}
            <div className="p-5 border-t border-navy-light bg-navy/60 shrink-0">
              <a
                href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                onClick={closeMenu}
                className="flex items-center gap-3 text-xs text-slate-200 hover:text-gold transition-colors"
              >
                <div className="w-9 h-9 rounded-xl bg-navy border border-gold/30 flex items-center justify-center text-gold">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-sm text-white">{settings.phone}</div>
                  <div className="text-[10px] text-slate-400">Call Us Anytime</div>
                </div>
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MobileDrawer;
