import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Logo from '../common/Logo';
import WhatsAppIcon from '../common/WhatsAppIcon';
import { MapPin, Phone, Mail, ArrowUpRight, ShieldCheck, Clock } from 'lucide-react';

const Footer = () => {
  const settings = useSelector((state) => state.settings.data);

  return (
    <footer className="bg-navy-dark text-slate-300 pt-10 pb-8 border-t border-gold/30 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-navy-light">
          <div className="space-y-4">
            <Logo variant="light" />
            <p className="text-xs sm:text-sm leading-relaxed text-slate-300">
              Mahalaxmi Property is the <strong>best property dealer</strong> and trusted <strong>property advisor in Biharigarh</strong>, Chutmalpur, Gagalheri, Behat & Saharanpur. Delivering 100% verified plots, commercial land, and residential houses along the Dehradun–Saharanpur Highway (NH-307).
            </p>
            <div className="pt-2 flex items-center gap-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-gold bg-navy px-3 py-1.5 rounded-lg border border-gold/20">
                <ShieldCheck className="w-4 h-4 text-gold" />
                Trusted & Local Specialist
              </div>
            </div>
          </div>

          {/* Quick Links & Categories Row on Mobile */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:contents">
            {/* Column 2: Quick Links */}
            <div className="md:ml-20">
              <h4 className="text-xs sm:text-sm font-semibold text-white uppercase tracking-wider mb-3 sm:mb-4 font-body border-b border-gold/30 pb-1.5 sm:pb-2 inline-block">
                Quick Links
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li>
                  <Link to="/" className="hover:text-gold transition-colors">Home</Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-gold transition-colors">About Us</Link>
                </li>
                <li>
                  <Link to="/properties" className="hover:text-gold transition-colors">All Properties</Link>
                </li>
              
                <li>
                  <Link to="/services" className="hover:text-gold transition-colors">Our Services</Link>
                </li>
                <li>
                  <Link to="/blogs" className="hover:text-gold transition-colors">Real Estate Blogs</Link>
                </li>
                <li>
                  <Link to="/gallery" className="hover:text-gold transition-colors">Photo Gallery</Link>
                </li>
                <li>
                  <Link to="/faq" className="hover:text-gold transition-colors">FAQ</Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Property Categories */}
            <div>
              <h4 className="text-xs sm:text-sm font-semibold text-white uppercase tracking-wider mb-3 sm:mb-4 font-body border-b border-gold/30 pb-1.5 sm:pb-2 inline-block">
                Property Categories
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li>
                  <Link to="/residential" className="hover:text-gold transition-colors flex items-center gap-1">
                    <span>Residential</span>
                    <ArrowUpRight className="w-3 h-3 text-gold opacity-60 shrink-0" />
                  </Link>
                </li>
                <li>
                  <Link to="/commercial" className="hover:text-gold transition-colors flex items-center gap-1">
                    <span>Commercial</span>
                    <ArrowUpRight className="w-3 h-3 text-gold opacity-60 shrink-0" />
                  </Link>
                </li>
                <li>
                  <Link to="/plots-land" className="hover:text-gold transition-colors flex items-center gap-1">
                    <span>Plots & Land</span>
                    <ArrowUpRight className="w-3 h-3 text-gold opacity-60 shrink-0" />
                  </Link>
                </li>
                <li>
                  <Link to="/properties?featured=true" className="hover:text-gold transition-colors flex items-center gap-1">
                    <span>Featured</span>
                    <ArrowUpRight className="w-3 h-3 text-gold opacity-60 shrink-0" />
                  </Link>
                </li>
              </ul>

              <div className="mt-6 pt-4 border-t border-navy-light/60">
                <div className="text-[11px] font-semibold text-slate-400 mb-1 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-gold shrink-0" />
                  <span>Business Hours</span>
                </div>
                <p className="text-[11px] text-slate-300">{settings.businessHours}</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 font-body border-b border-gold/30 pb-2 inline-block">
              Get In Touch
            </h4>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span className="text-slate-300 leading-normal">{settings.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold shrink-0" />
                <a href={`tel:${settings.phone.replace(/\s+/g, '')}`} className="hover:text-gold transition-colors">
                  {settings.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <WhatsAppIcon className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={`https://wa.me/919917970750`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors"
                >
                  WhatsApp: +91 9917970750
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-gold shrink-0 mt-1" />
                <div className="flex flex-col gap-1 text-xs">
                  <a href="mailto:Direct@mahalaxmipropertiesindia.com" className="hover:text-gold transition-colors">
                    Direct@mahalaxmipropertiesindia.com
                  </a>
                  <a href="mailto:Manager@mahalaxmipropertiesindia.com" className="hover:text-gold transition-colors">
                    Manager@mahalaxmipropertiesindia.com
                  </a>
                  <a href="mailto:sales@mahalaxmipropertiesindia.com" className="hover:text-gold transition-colors">
                    sales@mahalaxmipropertiesindia.com
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Legal */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex flex-wrap items-center gap-2">
            <span>© 2026 Mahalaxmi Property. All Rights Reserved.</span>
            <span className="text-slate-700">|</span>
            <span>
              Designed by{' '}
              <a
                href="https://erptechpro.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:underline transition-colors"
              >
                ERP TECH PRO
              </a>
            </span>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-gold transition-colors">
              Privacy Policy
            </Link>
            <span className="text-slate-700">|</span>
            <Link to="/terms-conditions" className="hover:text-gold transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
