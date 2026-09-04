import React, { useState } from 'react';
import SEO from '../components/common/SEO';
import { Building2, TrendingUp, Briefcase, Compass, Home, Store, FileText, Landmark, ArrowRight } from 'lucide-react';
import ServiceModal from '../components/common/ServiceModal';

const ServicesPage = () => {
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      title: 'Property Buying',
      desc: 'Comprehensive assistance finding residential homes, villas, and plots.',
      longDesc: 'Navigating the real estate market requires local expertise and complete legal vigilance. At Mahalaxmi Property, we assist buyers in finding prime residential homes, luxury highway villas, commercial shop units, and plots across Biharigarh, Saharanpur, and the Dehradun corridor. We shortlist verified properties tailored to your exact budget and preference.',
      icon: Building2,
      features: [
        '100% Legal Title & Ownership Checking',
        'Curated site visits with guided local tour',
        'Transparent seller negotiation & zero hidden charges',
        'Home loan & mortgage documentation assistance',
        'Post-purchase registry & mutation support',
      ],
    },
    {
      title: 'Property Selling',
      desc: 'Expert marketing to get top valuation for your home or land asset.',
      longDesc: 'Selling real estate along high-demand highway belts demands maximum visibility and serious buyer targeting. We leverage targeted marketing campaigns, direct investor networks, and local buyer databases to position your property for maximum return.',
      icon: TrendingUp,
      features: [
        'Professional property valuation & pricing strategy',
        'High-visibility digital platform & physical marketing',
        'Verified buyer screening & background check',
        'Seamless sales agreement & payment structuring',
        'Complete legal paperwork & transfer assistance',
      ],
    },
    {
      title: 'Property Consultation',
      desc: 'Strategic investment planning for regional real estate growth.',
      longDesc: 'Whether you are an individual home seeker, commercial business owner, or NRI investor, our real estate advisory provides actionable data-backed guidance. We evaluate land appreciation trends, upcoming infrastructure projects, and legal zoning before you invest.',
      icon: Briefcase,
      features: [
        'Micro-market price trend analysis & appreciation forecasts',
        'Portfolio diversification (Plots, Residential, Commercial)',
        'Land use classification & 143 conversion guidance',
        'Risk evaluation & ROI calculation',
        'One-on-one personal real estate consultation',
      ],
    },
    {
      title: 'Plot & Land Deals',
      desc: 'Verified residential plots and high return agricultural land.',
      longDesc: 'Plots along the Saharanpur–Dehradun highway represent high appreciation potential. We offer direct owner plot deals, commercial highway frontage land for showrooms or petrol pumps, and fertile agricultural farm land with clear title records.',
      icon: Compass,
      features: [
        'Direct owner land deals with zero middleman inflated prices',
        'Clear title, 143/non-agricultural verification',
        'Demarcation, boundary marking & access road check',
        'Scenic mountain backdrop & highway frontage plots',
        'Immediate possession & registry readiness',
      ],
    },
    {
      title: 'Residential Properties',
      desc: 'Independent houses, 2/3/4 BHK villas with modern amenities.',
      longDesc: 'Experience comfortable living in ready-to-move and modern independent houses. We showcase residential properties equipped with modular kitchens, private parking slots, 24/7 water supply, power backup, and gated security entrances.',
      icon: Home,
      features: [
        'Luxury 2, 3 & 4 BHK independent villas',
        'Gated community options with round-the-clock security',
        'Peaceful colonies near schools, markets & main highway',
        'Clear registry & immediate possession',
        'Custom architectural advice & modification guidance',
      ],
    },
    {
      title: 'Commercial Properties',
      desc: 'Highway shops, showroom spaces, and office complexes.',
      longDesc: 'Tap into high footfall corridors with strategic commercial real estate. From highway-facing retail shops and showroom plots to warehouse spaces and hotel locations, we connect businesses with high-yield commercial assets.',
      icon: Store,
      features: [
        'Wide main highway road frontage properties',
        'High footfall commercial zones between Saharanpur & Dehradun',
        'Ideal for dhabas, showrooms, petrol pumps & retail hubs',
        'High rental yield potential & rapid capital growth',
        'Commercial zoning & municipal clearance check',
      ],
    },
    {
      title: 'Investment Guidance',
      desc: 'Data driven guidance for high appreciation highway corridors.',
      longDesc: 'Invest smartly in Uttar Pradesh & Uttarakhand border hubs. Our team identifies upcoming infrastructure developments, bypass road expansions, and commercial node announcements to position your capital in high-appreciation zones.',
      icon: Landmark,
      features: [
        'Data-backed high appreciation area identification',
        'Short-term resale vs. long-term holding strategies',
        'Transparent yield calculations & ROI estimates',
        'Flexible budget options starting from small plots to acres',
        'Complete post-investment portfolio management',
      ],
    },
    {
      title: 'Documentation Assistance',
      desc: 'Complete title verification, registry, and legal paperwork aid.',
      longDesc: 'Property documentation can be complex. Our legal and revenue documentation experts handle title verification, registry drafting, stamp duty guidance, and revenue office mutation (Dakhil Kharij) so your investment is 100% safe.',
      icon: FileText,
      features: [
        'Complete Title Search Report (TSR) & owner check',
        'Sale deed, agreement to sell & legal drafting',
        'Stamp duty calculation & payment guidance',
        'Mutation (Khatauni / Dakhil Kharij) processing',
        'Liaison with Sub-Registrar & Tehsil revenue offices',
      ],
    },
  ];

  return (
    <>
      <SEO
        title="Real Estate Services in Biharigarh | Mahalaxmi UP"
        description="Get expert real estate services, site visits, legal registry, and land valuation near Pencho Restaurant on Dehradun-Saharanpur Highway in Biharigarh."
        keywords="Real estate services Biharigarh, Property registry legal help Saharanpur, Land valuation Dehradun Highway, Site visit assistance 247662"
      />

      {selectedService && (
        <ServiceModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}

      <div className="bg-navy-dark text-white pt-32 pb-14 border-b border-gold/30">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="text-xs font-bold text-gold uppercase tracking-widest block mb-2">SERVICES</span>
          <h1 className="text-4xl font-bold font-heading">Real Estate Services</h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto mt-2 leading-relaxed">
            Comprehensive end-to-end real estate solutions designed to maximize value, ensure 100% legal title safety, and simplify your property journey across Biharigarh and the Dehradun–Saharanpur corridor.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <h3 className="text-xl font-bold font-heading text-navy-dark">Property Buying & Investment Consulting</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Assisting home seekers and investors with handpicked residential and commercial plots.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <h3 className="text-xl font-bold font-heading text-navy-dark">Legal Title Clearance & Sub-Registrar Work</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Complete support for title verification, sale deed drafting, and Tehsil mutation.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                onClick={() => setSelectedService(s)}
                className="p-4 rounded-2xl bg-white border border-slate-200 shadow-md space-y-3 hover:border-gold hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-navy text-gold flex items-center justify-center group-hover:bg-gold group-hover:text-navy transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-xl font-bold text-navy-dark group-hover:text-gold transition-colors">{s.title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
                </div>

                <div className="pt-2 flex items-center text-xs font-bold text-gold group-hover:translate-x-1 transition-transform gap-1">
                  <span>View Service Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ServicesPage;
