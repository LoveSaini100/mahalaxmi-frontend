import React from 'react';
import { useSelector } from 'react-redux';
import SEO from '../components/common/SEO';
import PropertyEnquiryModal from '../components/property/PropertyEnquiryModal';
import { getWhatsAppLink } from '../utils/formatters';
import WhatsAppIcon from '../components/common/WhatsAppIcon';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const ContactUs = () => {
  const settings = useSelector((state) => state.settings.data);
  const whatsappUrl = getWhatsAppLink();

  return (
    <>
      <SEO
        title="Contact Mahalaxmi Property in Biharigarh Saharanpur"
        description="Contact Mahalaxmi Property near Pencho Restaurant on Dehradun-Saharanpur Highway, Biharigarh, 247662, Saharanpur, UP. Call +91 9917970750 for details."
        keywords="Contact Mahalaxmi Property, Biharigarh real estate office, Saharanpur property dealer contact, Pencho Restaurant property office address"
      />

      <div className="bg-navy-dark text-white pt-32 pb-14 border-b border-gold/30">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="text-xs font-bold text-gold uppercase tracking-widest block mb-2">GET IN TOUCH</span>
          <h1 className="text-4xl font-bold font-heading">Contact Mahalaxmi Property</h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mt-2">
            Visit our office in Biharigarh or call/WhatsApp us for immediate property guidance.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-lg space-y-6">
              <h3 className="text-2xl font-bold font-heading text-navy-dark border-b pb-3">Send Us a Message</h3>

              <div className="space-y-5 text-xs sm:text-sm">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-navy text-gold flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-navy-dark">Address</h4>
                    <div className="text-slate-600 leading-relaxed mt-0.5">{settings.address}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-navy text-gold flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-navy-dark">Phone Number</h4>
                    <a href={`tel:${settings.phone.replace(/\s+/g, '')}`} className="text-gold font-semibold hover:underline">
                      {settings.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <WhatsAppIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-navy-dark">WhatsApp Chat</h4>
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-600 font-semibold hover:underline">
                      +91 9917970750
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-navy text-gold flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-navy-dark">Email Address</h4>
                    <a href={`mailto:${settings.email}`} className="text-gold font-semibold hover:underline">
                      {settings.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-navy text-gold flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-navy-dark">Business Hours</h4>
                    <div className="text-slate-600 mt-0.5">{settings.businessHours}</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 grid grid-cols-2 gap-3">
                <a
                  href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                  className="py-3 rounded-xl bg-navy text-gold font-bold text-xs flex items-center justify-center gap-1.5 shadow-md"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Us</span>
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md"
                >
                  <WhatsAppIcon className="w-4 h-4 text-white" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <PropertyEnquiryModal propertyTitle="General Inquiry" />
          </div>
        </div>

        {/* Embedded Google Map */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold font-heading text-navy-dark">Office Location & Google Maps</h3>
          <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-lg h-[400px] w-full">
            <iframe
              title="Mahalaxmi Property Biharigarh Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3451.433568095104!2d77.838782!3d30.110404700000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ecd66a9f19359%3A0x596b0106193d6368!2sMahalaxmi%20Properties!5e0!3m2!1sen!2sin!4v1787290610345!5m2!1sen!2sin"
              className="w-full h-full border-0"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
