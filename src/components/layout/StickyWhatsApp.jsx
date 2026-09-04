import React from 'react';
import { useSelector } from 'react-redux';
import { getWhatsAppLink } from '../../utils/formatters';
import WhatsAppIcon from '../common/WhatsAppIcon';
import { Phone } from 'lucide-react';

const StickyWhatsApp = () => {
  const settings = useSelector((state) => state.settings.data);
  const whatsappUrl = getWhatsAppLink();
  const phone = settings?.phone ? settings.phone.replace(/\s+/g, '') : '+919917970750';

  return (
    <div className="fixed bottom-6 right-4 sm:right-4 z-40 flex flex-col gap-3 items-center">
      {/* Floating Call Button */}
      <a
        href={`tel:${phone}`}
        className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-navy hover:bg-navy-dark text-white shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 border-2 border-gold/60"
        aria-label="Call Us Now"
        title={`Call ${settings?.phone || '+91 9917970750'}`}
      >
        <Phone className="w-5 h-5 text-white group-hover:rotate-12 transition-transform" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-gold rounded-full animate-ping" />
       
      </a>

      {/* Floating WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 border-2 border-emerald-400/60"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
      >
        <WhatsAppIcon className="w-6 h-6 text-white" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-300 rounded-full animate-ping" />
        
      </a>
    </div>
  );
};

export default StickyWhatsApp;
