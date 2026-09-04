import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPropertiesThunk } from '../store/slices/propertySlice';
import SEO from '../components/common/SEO';
import PropertyCard from '../components/property/PropertyCard';
import { PropertyCardSkeleton } from '../components/common/Skeleton';
import { getWhatsAppLink } from '../utils/formatters';
import {
  ShieldCheck,
  TrendingUp,
  MapPin,
  Compass,
  PhoneCall,
  Building2,
  FileCheck,
} from 'lucide-react';

const PlotsLand = () => {
  const dispatch = useDispatch();
  const { list: properties, loading } = useSelector((state) => state.properties);

  useEffect(() => {
    dispatch(fetchPropertiesThunk());
  }, [dispatch]);

  const plotsList = properties.filter((p) =>
    ['Plot', 'Land'].includes(p.propertyType)
  );

  return (
    <>
      <SEO
        title="Plots & Land in Biharigarh Saharanpur | Mahalaxmi"
        description="Buy verified residential and agricultural land near Pencho Restaurant on Dehradun-Saharanpur Highway, Biharigarh, Saharanpur. Call +91 9917970750."
        keywords="Plots in Biharigarh, Land for sale Saharanpur, Dehradun Highway plot deals, Agricultural land 247662, Gated plot Saharanpur"
      />

      {/* Hero / Header Banner */}
      <div className="bg-navy-dark text-white pt-32 pb-16 border-b border-gold/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full filter blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10 space-y-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy border border-gold/40 text-gold text-xs font-bold uppercase tracking-widest backdrop-blur-md">
            <Compass className="w-4 h-4 text-gold" />
            <span>PRIME CORRIDOR LAND DEALS</span>
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold font-heading text-white">
            Plots & Land Deals
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Secure prime residential plots, farm land, and strategic commercial holdings in Biharigarh, Saharanpur & along the Dehradun Highway corridor. Complete legal clearance, clear titles, and immediate registry guaranteed.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-3 text-xs text-gold font-semibold">
            <span className="flex items-center gap-1.5 bg-navy/60 px-3 py-1.5 rounded-full border border-gold/20 backdrop-blur-sm">
              <ShieldCheck className="w-4 h-4 text-gold" /> Verified Legal Titles
            </span>
            <span className="flex items-center gap-1.5 bg-navy/60 px-3 py-1.5 rounded-full border border-gold/20 backdrop-blur-sm">
              <TrendingUp className="w-4 h-4 text-gold" /> Rapid Value Growth
            </span>
            <span className="flex items-center gap-1.5 bg-navy/60 px-3 py-1.5 rounded-full border border-gold/20 backdrop-blur-sm">
              <MapPin className="w-4 h-4 text-gold" /> Highway Connectivity
            </span>
          </div>
        </div>
      </div>

      {/* Main Listings Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-navy-dark">
              Available Land & Plot Listings
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Explore handpicked plot offerings in and around Biharigarh, Saharanpur.
            </p>
          </div>
          <span className="text-xs font-bold px-3.5 py-1.5 rounded-full bg-navy/5 text-navy border border-navy/10 self-start sm:self-auto">
            {loading ? 'Loading...' : `${plotsList.length} Property Listings`}
          </span>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <PropertyCardSkeleton key={i} />
            ))}
          </div>
        ) : plotsList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plotsList.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <Building2 className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-xl font-bold font-heading text-navy">No Plots or Land Listings Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              We update our inventory frequently. Contact us directly for off-market land holdings in Biharigarh.
            </p>
          </div>
        )}
      </div>

      {/* Why Invest in Biharigarh Section */}
      <div className="bg-slate-100/80 border-y border-slate-200/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-gold uppercase tracking-widest">INVESTMENT INSIGHTS</span>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-navy-dark">
              Why Invest in Biharigarh & Saharanpur Plots?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Biharigarh's prime location on the Saharanpur-Dehradun expressway corridor makes it one of the fastest growing investment destinations in Western UP.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 hover:shadow-md transition-shadow">
              <div className="w-11 h-11 rounded-xl bg-gold/10 text-gold flex items-center justify-center font-bold">
                <TrendingUp className="w-6 h-6 text-gold" />
              </div>
              <h3 className="text-base font-bold text-navy-dark">High Capital Appreciation</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Strategic connectivity between Saharanpur and Dehradun has turned Biharigarh into a major real estate growth zone with steady annual appreciation.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 hover:shadow-md transition-shadow">
              <div className="w-11 h-11 rounded-xl bg-gold/10 text-gold flex items-center justify-center font-bold">
                <FileCheck className="w-6 h-6 text-gold" />
              </div>
              <h3 className="text-base font-bold text-navy-dark">Verified Legal Clearances</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every land deal listed by Mahalaxmi Property undergoes complete revenue checks, mutation verification, and seamless registry assistance.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 hover:shadow-md transition-shadow">
              <div className="w-11 h-11 rounded-xl bg-gold/10 text-gold flex items-center justify-center font-bold">
                <MapPin className="w-6 h-6 text-gold" />
              </div>
              <h3 className="text-base font-bold text-navy-dark">Versatile Plot Sizes & Choices</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                From compact colony residential plots to multi-bigha commercial holdings and fertile agricultural farm land near Pencho Restaurant.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Requirement CTA Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gradient-to-r from-navy-dark via-navy to-navy-dark p-8 md:p-6 rounded-3xl text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-gold/30 relative overflow-hidden">
          <div className="space-y-2 text-center md:text-left relative z-10">
            <span className="text-xs font-bold text-gold uppercase tracking-widest">CUSTOM LAND INQUIRY</span>
            <h3 className="text-2xl sm:text-3xl font-bold font-heading">Looking for a Specific Size or Highway Location?</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              We have direct access to exclusive off-market plots and farm holdings. Contact our real estate specialists for personal consultations.
            </p>
          </div>
          <a
            href={getWhatsAppLink('Hello Mahalaxmi Property, I am looking for a specific plot/land deal in Biharigarh.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 md:px-6 py-3.5 rounded-xl bg-gradient-to-r from-gold via-gold-accent to-gold-dark text-navy-dark font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-all shrink-0 relative z-10"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Consult Real Estate Expert</span>
          </a>
        </div>
      </div>
    </>
  );
};

export default PlotsLand;
