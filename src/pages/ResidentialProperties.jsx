import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPropertiesThunk } from '../store/slices/propertySlice';
import SEO from '../components/common/SEO';
import PropertyCard from '../components/property/PropertyCard';
import { PropertyCardSkeleton } from '../components/common/Skeleton';
import { getWhatsAppLink } from '../utils/formatters';
import {
  Home as HomeIcon,
  ShieldCheck,
  MapPin,
  Compass,
  PhoneCall,
  Sparkles,
  CheckCircle2,
  Building,
} from 'lucide-react';

const ResidentialProperties = () => {
  const dispatch = useDispatch();
  const { list: properties, loading } = useSelector((state) => state.properties);

  useEffect(() => {
    dispatch(fetchPropertiesThunk({ propertyType: 'Residential' }));
  }, [dispatch]);

  const residentialList = properties.filter((p) =>
    ['Residential', 'Villa', 'House', 'Apartment'].includes(p.propertyType)
  );

  return (
    <>
      <SEO
        title="Residential Houses & Villas in Biharigarh | MP UP"
        description="Explore luxury villas and independent houses near Pencho Restaurant on Dehradun-Saharanpur Highway, Biharigarh, Saharanpur. Contact us for site visits."
        keywords="Residential house Biharigarh, Luxury villa Saharanpur, Independent house Dehradun Highway, 2 BHK house 247662, Gated villa Saharanpur"
      />

      {/* Hero / Header Banner */}
      <div className="bg-navy-dark text-white pt-32 pb-16 border-b border-gold/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 rounded-full filter blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10 space-y-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy border border-gold/40 text-gold text-xs font-bold uppercase tracking-widest backdrop-blur-md">
            <Compass className="w-4 h-4 text-gold" />
            <span>FAMILY HOMES & VILLAS</span>
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold font-heading text-white">
            Residential Properties
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Explore premium independent villas, family homes, duplexes, and residential gated properties crafted for comfortable, luxury living in Biharigarh, Saharanpur.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-3 text-xs text-gold font-semibold">
            <span className="flex items-center gap-1.5 bg-navy/60 px-3 py-1.5 rounded-full border border-gold/20 backdrop-blur-sm">
              <HomeIcon className="w-4 h-4 text-gold" /> Peaceful Living
            </span>
            <span className="flex items-center gap-1.5 bg-navy/60 px-3 py-1.5 rounded-full border border-gold/20 backdrop-blur-sm">
              <ShieldCheck className="w-4 h-4 text-gold" /> Gated Security
            </span>
            <span className="flex items-center gap-1.5 bg-navy/60 px-3 py-1.5 rounded-full border border-gold/20 backdrop-blur-sm">
              <MapPin className="w-4 h-4 text-gold" /> Dehradun Highway Access
            </span>
          </div>
        </div>
      </div>

      {/* Main Listings Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-navy-dark">
              Available Residential Houses for Sale
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Handpicked independent houses, duplex villas, and residential plots in Biharigarh.
            </p>
          </div>
          <span className="text-xs font-bold px-3.5 py-1.5 rounded-full bg-navy/5 text-navy border border-navy/10 self-start sm:self-auto">
            {loading ? 'Loading...' : `${residentialList.length} Property Listings`}
          </span>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <PropertyCardSkeleton key={i} />
            ))}
          </div>
        ) : residentialList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {residentialList.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <Building className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-xl font-bold font-heading text-navy">No Residential Properties Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              We update our inventory frequently. Contact us directly for off-market house and villa options in Biharigarh.
            </p>
          </div>
        )}
      </div>

      {/* Residential Lifestyle Advantages Section */}
      <div className="bg-slate-100/80 border-y border-slate-200/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-gold uppercase tracking-widest">LIFESTYLE & COMFORT</span>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-navy-dark">
              Why Buy Your Dream Home in Biharigarh?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Enjoy clean air, mountain-side scenic surroundings, and quick access to Dehradun and Saharanpur city centers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 hover:shadow-md transition-shadow">
              <div className="w-11 h-11 rounded-xl bg-gold/10 text-gold flex items-center justify-center font-bold">
                <Sparkles className="w-6 h-6 text-gold" />
              </div>
              <h3 className="text-base font-bold text-navy-dark">Scenic & Clean Environment</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Nestled near the Shivalik foothill breeze, Biharigarh provides healthy, congestion-free living for families and seniors.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 hover:shadow-md transition-shadow">
              <div className="w-11 h-11 rounded-xl bg-gold/10 text-gold flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6 text-gold" />
              </div>
              <h3 className="text-base font-bold text-navy-dark">Gated Communities & Security</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Choose from secure gated residential colonies featuring internal wide roads, streetlights, and dedicated boundary walls.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3 hover:shadow-md transition-shadow">
              <div className="w-11 h-11 rounded-xl bg-gold/10 text-gold flex items-center justify-center font-bold">
                <CheckCircle2 className="w-6 h-6 text-gold" />
              </div>
              <h3 className="text-base font-bold text-navy-dark">Immediate Possession & Bank Support</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                All listed homes have verified legal title deeds and complete assistance for home loan sanction and smooth registry.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Residential Requirement CTA Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-navy-dark via-navy to-navy-dark p-8 md:p-12 rounded-3xl text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-gold/30 relative overflow-hidden">
          <div className="space-y-2 text-center md:text-left relative z-10">
            <span className="text-xs font-bold text-gold uppercase tracking-widest">PERSONALIZED HOUSE SEARCH</span>
            <h3 className="text-2xl sm:text-3xl font-bold font-heading">Looking for a Specific House or Villa Budget?</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Tell us your requirements, and our team will arrange private site visits to homes matching your family's exact needs.
            </p>
          </div>
          <a
            href={getWhatsAppLink('Hello Mahalaxmi Property, I am looking for a residential house / villa in Biharigarh.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-gold via-gold-accent to-gold-dark text-navy-dark font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-all shrink-0 relative z-10"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Book Private Site Visit</span>
          </a>
        </div>
      </div>
    </>
  );
};

export default ResidentialProperties;
