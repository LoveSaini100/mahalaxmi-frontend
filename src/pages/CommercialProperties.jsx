import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPropertiesThunk } from '../store/slices/propertySlice';
import SEO from '../components/common/SEO';
import PropertyCard from '../components/property/PropertyCard';
import { PropertyCardSkeleton } from '../components/common/Skeleton';
import { getWhatsAppLink } from '../utils/formatters';
import {
  Building2,
  TrendingUp,
  Store,
  Compass,
  PhoneCall,
  ShieldCheck,
  Zap,
} from 'lucide-react';

const CommercialProperties = () => {
  const dispatch = useDispatch();
  const { list: properties, loading } = useSelector((state) => state.properties);

  useEffect(() => {
    dispatch(fetchPropertiesThunk({ propertyType: 'Commercial' }));
  }, [dispatch]);

  const commercialList = properties.filter((p) =>
    ['Commercial', 'Shop', 'Office'].includes(p.propertyType)
  );

  return (
    <>
      <SEO
        title="Commercial Land & Shops in Biharigarh | Mahalaxmi"
        description="Find high ROI commercial plots and shops near Pencho Restaurant on Dehradun-Saharanpur Highway corridor, Biharigarh, Saharanpur. Call +91 9917970750."
        keywords="Commercial land Biharigarh, Highway shops Saharanpur, Showroom plots Dehradun Highway, Commercial property 247662, Retail space Saharanpur"
      />

      {/* Hero / Header Banner */}
      <div className="bg-navy-dark text-white pt-32 pb-16 border-b border-gold/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full filter blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10 space-y-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy border border-gold/40 text-gold text-xs font-bold uppercase tracking-widest backdrop-blur-md">
            <Compass className="w-4 h-4 text-gold" />
            <span>BUSINESS & RETAIL HUB</span>
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold font-heading text-white">
            Commercial Properties
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Discover prime retail shops, highway frontage plots, showroom spaces, and high-yielding commercial assets along the Dehradun-Saharanpur Highway corridor in Biharigarh.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-3 text-xs text-gold font-semibold">
            <span className="flex items-center gap-1.5 bg-navy/60 px-3 py-1.5 rounded-full border border-gold/20 backdrop-blur-sm">
              <Zap className="w-4 h-4 text-gold" /> High Footfall Corridor
            </span>
            <span className="flex items-center gap-1.5 bg-navy/60 px-3 py-1.5 rounded-full border border-gold/20 backdrop-blur-sm">
              <TrendingUp className="w-4 h-4 text-gold" /> Superior Rental ROI
            </span>
            <span className="flex items-center gap-1.5 bg-navy/60 px-3 py-1.5 rounded-full border border-gold/20 backdrop-blur-sm">
              <ShieldCheck className="w-4 h-4 text-gold" /> Verified Commercial Titles
            </span>
          </div>
        </div>
      </div>

      {/* Main Listings Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-navy-dark">
              Prime Highway Commercial Listings
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Explore high-growth commercial spaces and retail plots in Biharigarh, Saharanpur.
            </p>
          </div>
          <span className="text-xs font-bold px-3.5 py-1.5 rounded-full bg-navy/5 text-navy border border-navy/10 self-start sm:self-auto">
            {loading ? 'Loading...' : `${commercialList.length} Property Listings`}
          </span>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <PropertyCardSkeleton key={i} />
            ))}
          </div>
        ) : commercialList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {commercialList.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <Building2 className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-xl font-bold font-heading text-navy">No Commercial Properties Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              We update our inventory frequently. Contact us directly for off-market commercial listings in Biharigarh.
            </p>
          </div>
        )}
      </div>

      {/* Commercial Advantages Section */}
      <div className="bg-slate-100/80 border-y border-slate-200/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-gold uppercase tracking-widest">BUSINESS ADVANTAGE</span>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-navy-dark">
              Why Invest in Commercial Real Estate Here?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              With rapid infrastructure expansion on the Saharanpur–Dehradun highway, commercial real estate in Biharigarh offers unmatched growth potential.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 hover:shadow-md transition-shadow">
              <div className="w-11 h-11 rounded-xl bg-gold/10 text-gold flex items-center justify-center font-bold">
                <Store className="w-6 h-6 text-gold" />
              </div>
              <h3 className="text-base font-bold text-navy-dark">Highway Frontage & Visibility</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Position your retail store or showroom along heavy traffic routes for maximum brand visibility and customer footfall.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 hover:shadow-md transition-shadow">
              <div className="w-11 h-11 rounded-xl bg-gold/10 text-gold flex items-center justify-center font-bold">
                <TrendingUp className="w-6 h-6 text-gold" />
              </div>
              <h3 className="text-base font-bold text-navy-dark">High Rental Yields</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                High commercial demand from local businesses, restaurants, and logistics providers ensures strong passive rental income.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 hover:shadow-md transition-shadow">
              <div className="w-11 h-11 rounded-xl bg-gold/10 text-gold flex items-center justify-center font-bold">
                <Building2 className="w-6 h-6 text-gold" />
              </div>
              <h3 className="text-base font-bold text-navy-dark">Diverse Commercial Formats</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Whether you need small retail shops, office spaces, roadside land for restaurants, or warehousing spaces, we have tailored deals.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Commercial Requirement CTA Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-navy-dark via-navy to-navy-dark p-8 md:p-12 rounded-3xl text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-gold/30 relative overflow-hidden">
          <div className="space-y-2 text-center md:text-left relative z-10">
            <span className="text-xs font-bold text-gold uppercase tracking-widest">COMMERCIAL CONSULTATION</span>
            <h3 className="text-2xl sm:text-3xl font-bold font-heading">Need Commercial Land or Highway Showroom Space?</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              We assist investors and business owners in finding prime highway commercial properties in Biharigarh.
            </p>
          </div>
          <a
            href={getWhatsAppLink('Hello Mahalaxmi Property, I am interested in commercial properties / land in Biharigarh.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-gold via-gold-accent to-gold-dark text-navy-dark font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-all shrink-0 relative z-10"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Speak With Commercial Advisor</span>
          </a>
        </div>
      </div>
    </>
  );
};

export default CommercialProperties;
