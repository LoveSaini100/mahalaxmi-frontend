import React from 'react';
import { useSelector } from 'react-redux';
import SEO from '../components/common/SEO';
import { Quote, ShieldCheck, Award } from 'lucide-react';

const FounderMessage = () => {
  const settings = useSelector((state) => state.settings.data);

  return (
    <>
      <SEO
        title="Director Message | Mahalaxmi Property Biharigarh UP"
        description="Read leadership message from Mahalaxmi Property director, serving land buyers near Pencho Restaurant on Dehradun-Saharanpur Highway in Biharigarh."
        keywords="Mahalaxmi Property Director, Founder message, Real estate vision Biharigarh, Saharanpur land advisory, Dehradun Highway leadership"
      />

      {/* Header Banner */}
      <div className="bg-navy-dark text-white pt-32 pb-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <span className="text-xs font-bold text-gold uppercase tracking-widest block mb-2">LEADERSHIP VISION</span>
          <h1 className="text-4xl font-bold font-heading">Founder's Message</h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mt-2">
            Building long-term relationships through trust, integrity, and reliable real estate guidance.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="bg-white rounded-3xl p-4 sm:p-12 border border-gold/30 shadow-2xl space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Founder Image */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border-2 border-gold/40 shadow-xl">
                <img
                  src={settings?.founderImage || "/director.png"}
                  alt={settings?.founderName || "Founder"}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-lg font-bold font-heading text-gold">{settings?.founderName}</div>
                  <div className="text-xs text-slate-300">{settings?.founderTitle}</div>
                </div>
              </div>
            </div>

            {/* Message Body */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2 text-gold">
                <Quote className="w-8 h-8 fill-gold/20" />
                <span className="text-xs font-bold uppercase tracking-widest">A MESSAGE FROM OUR FOUNDER</span>
              </div>

              <h2 className="text-xl sm:text-3xl font-bold font-heading text-navy-dark">
                "Our Priority Is Your Confident Real Estate Decision."
              </h2>

              <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed font-body text-justify">
                <p>
                  Welcome to Mahalaxmi Property. When we established this firm near Pencho Restaurant in Biharigarh, our goal was simple yet profound: to create a real-estate agency where clients feel completely secure, valued, and well-informed at every stage of their transaction.
                </p>
                <p>
                  Real estate along the Dehradun–Saharanpur corridor is growing at an incredible pace. Whether you are acquiring your family's first residence, securing commercial space on the highway, or making a strategic land investment, we treat your capital with the highest respect.
                </p>
                <p>
                  We are not just selling properties; we are helping you build a legacy. Every plot and building in our portfolio undergoes rigorous legal and title verification so that you can make your property decision with absolute peace of mind.
                </p>
              </div>

              {/* Gold Divider Line */}
              <div className="pt-4">
                <div className="h-0.5 w-full bg-gradient-to-r from-gold-light via-gold to-transparent rounded-full mb-4" />
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-base font-bold font-heading text-navy-dark">{settings?.founderName}</div>
                    <div className="text-xs text-slate-500">{settings?.companyName}</div>
                  </div>
                  <div className="font-heading italic text-xl text-gold font-bold">
                    ~ Mahalaxmi Property ~
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Vision Section */}
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
              <h3 className="text-xl font-bold font-heading text-navy-dark">Our Commitment to Verified Clear Titles</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Every property listed with Mahalaxmi Property undergoes thorough legal scrutiny to safeguard buyer investment.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
              <h3 className="text-xl font-bold font-heading text-navy-dark">Growing Regional Real Estate Value</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                The Dehradun-Saharanpur highway corridor continues to offer outstanding capital growth for homeowners and investors.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FounderMessage;
