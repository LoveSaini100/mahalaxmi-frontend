import React from 'react';
import { useSelector } from 'react-redux';
import SEO from '../components/common/SEO';
import { Quote, CheckCircle2, PhoneCall, ShieldCheck, MapPin, Building, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const ManagerMessage = () => {
  const settings = useSelector((state) => state.settings.data);

  return (
    <>
      <SEO
        title="Manager's Message | Mr. Amrit Singh - Top Property Advisor in Biharigarh"
        description="Read General Manager Mr. Amrit Singh's message on site visits, plot verification, and real estate guidance in Biharigarh, Chutmalpur, Gagalheri & Saharanpur."
        keywords="Mr Amrit Singh, General Manager Mahalaxmi Property, Property dealer in Biharigarh, Property advisor in biharigarh, Property consultant Saharanpur, Chutmalpur land deals"
      />

      {/* Header Banner */}
      <div className="bg-navy-dark text-white pt-32 pb-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <span className="text-xs font-bold text-gold uppercase tracking-widest block mb-2">OPERATIONAL EXCELLENCE & CLIENT ADVISORY</span>
          <h1 className="text-4xl font-bold font-heading">Manager's Message</h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mt-2">
            Delivering dedicated site visits, verified documentation, and transparent property advice across Biharigarh & Saharanpur.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="bg-white rounded-3xl p-4 sm:p-12 border border-gold/30 shadow-2xl space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Manager Image */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border-2 border-gold/40 shadow-xl">
                <img
                  src="/manager.png"
                  onError={(e) => {
                    e.target.src = '/director.png';
                  }}
                  alt="Mr. Amrit Singh - General Manager"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-lg font-bold font-heading text-gold">Mr. Amrit Singh</div>
                  <div className="text-xs text-slate-300">General Manager</div>
                </div>
              </div>
            </div>

            {/* Message Body */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2 text-gold">
                <Quote className="w-8 h-8 fill-gold/20" />
                <span className="text-xs font-bold uppercase tracking-widest">A MESSAGE FROM OUR MANAGER</span>
              </div>

              <h2 className="text-xl sm:text-3xl font-bold font-heading text-navy-dark">
                "Seamless Operations & Dedicated Client Satisfaction Are Our Guiding Principles."
              </h2>

              <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed font-body text-justify">
                <p>
                  Dear Valued Clients & Investors,
                </p>
                <p>
                  At Mahalaxmi Property, operational clarity and customer trust are the heart of everything we do. As General Manager, my primary focus is ensuring that every interaction you have with our team—from your initial query to physical site visits and final property registration—is transparent, efficient, and completely stress-free.
                </p>
                <p>
                  We understand that buying a property along the Dehradun–Saharanpur highway belt is a major financial milestone. Our ground team thoroughly checks land boundaries, road access, title deeds, and legal clearances before listing any property.
                </p>
                <p>
                  Whether you are seeking a residential plot, commercial land, or an independent house, our dedicated team is always ready to assist you on-field with personalized site tours and honest market guidance.
                </p>
              </div>

              {/* Gold Divider Line */}
              <div className="pt-4">
                <div className="h-0.5 w-full bg-gradient-to-r from-gold-light via-gold to-transparent rounded-full mb-4" />
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-base font-bold font-heading text-navy-dark">Mr. Amrit Singh</div>
                    <div className="text-xs text-slate-500">General Manager | Mahalaxmi Property</div>
                  </div>
                  <div className="font-heading italic text-xl text-gold font-bold">
                    ~ Client Service ~
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gold/10 text-gold flex items-center justify-center shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-navy-dark text-base">Guided Site Visits</h3>
              <p className="text-xs text-slate-500 mt-1">
                Personalized physical site tours with detailed boundary verification across Saharanpur & Biharigarh.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gold/10 text-gold flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-navy-dark text-base">Legal Verification</h3>
              <p className="text-xs text-slate-500 mt-1">
                Complete documentation support and clear-title checks for hassle-free property registry.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gold/10 text-gold flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-navy-dark text-base">End-to-End Support</h3>
              <p className="text-xs text-slate-500 mt-1">
                Dedicated post-purchase assistance for peaceful ownership and long-term satisfaction.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManagerMessage;
