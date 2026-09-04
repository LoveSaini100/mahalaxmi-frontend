import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPropertyBySlugThunk, fetchPropertiesThunk } from '../store/slices/propertySlice';
import SEO from '../components/common/SEO';
import PropertyGallery from '../components/property/PropertyGallery';
import PropertyEnquiryModal from '../components/property/PropertyEnquiryModal';
import SimilarProperties from '../components/property/SimilarProperties';
import { PropertyDetailsSkeleton } from '../components/common/Skeleton';
import { formatPrice, getWhatsAppLink } from '../utils/formatters';
import WhatsAppIcon from '../components/common/WhatsAppIcon';

import {
  MapPin,
  Bed,
  Bath,
  Maximize2,
  Phone,
  MessageCircle,
  CheckCircle2,
  Building,
  Calendar,
  Eye,
  Share2,
  ArrowLeft,
  Compass,
} from 'lucide-react';

const PropertyDetails = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { selectedProperty: property, list: allProperties, detailLoading: loading, error } = useSelector(
    (state) => state.properties
  );
  const settings = useSelector((state) => state.settings.data);

  useEffect(() => {
    if (slug) {
      dispatch(fetchPropertyBySlugThunk(slug));
      dispatch(fetchPropertiesThunk({ limit: 6 }));
    }
  }, [dispatch, slug]);

  if (loading || !property) {
    return <PropertyDetailsSkeleton />;
  }

  const whatsappUrl = getWhatsAppLink(property.title);

  // Exact 50-55 char title and 150-155 char meta description
  const pageTitle = (property.title + ' | Mahalaxmi Biharigarh UP').slice(0, 52);
  const pageDesc = (`Explore ${property.title} located near Pencho Restaurant on Dehradun-Saharanpur Highway, Biharigarh, Saharanpur 247662. Contact Mahalaxmi Property.`).slice(0, 153);

  const pageKeywords = `${property.title}, ${property.propertyType} Biharigarh, ${property.location} real estate, Dehradun Saharanpur Highway property, Mahalaxmi Property`;

  return (
    <>
      <SEO
        title={pageTitle}
        description={pageDesc}
        keywords={pageKeywords}
        image={property.images?.[0]}
      />

      {/* Header Banner */}
      <div className="bg-navy-dark text-white pt-28 pb-10 border-b border-gold/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/properties"
            className="inline-flex items-center gap-1.5 text-xs text-gold hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Properties</span>
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-navy border border-gold/40 text-gold">
                  {property.propertyType}
                </span>
                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/90 text-white">
                  {property.propertyStatus}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold font-heading">{property.title}</h1>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <MapPin className="w-4 h-4 text-gold shrink-0" />
                <span>{property.address || property.location}</span>
              </div>
            </div>

            <div className="md:text-right">
              <div className="text-sm text-gold">Asking Price</div>
              <div className="text-3xl font-bold font-sans text-white">
                {property.priceLabel || formatPrice(property.price)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Gallery & Details */}
          <div className="lg:col-span-8 space-y-3">
            {/* Gallery */}
            <PropertyGallery images={property.images} title={property.title} />

            {/* Quick Overview Specs Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm text-center">
              <div>
                <div className="text-xs text-slate-400">Bedrooms</div>
                <div className="text-base font-bold font-sans text-navy flex items-center justify-center gap-1 mt-1">
                  <Bed className="w-4 h-4 text-gold" />
                  <span>{property.bedrooms > 0 ? property.bedrooms : 'N/A'}</span>
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-400">Bathrooms</div>
                <div className="text-base font-bold font-sans text-navy flex items-center justify-center gap-1 mt-1">
                  <Bath className="w-4 h-4 text-gold" />
                  <span>{property.bathrooms > 0 ? property.bathrooms : 'N/A'}</span>
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-400">Property Area</div>
                <div className="text-base font-bold font-sans text-navy flex items-center justify-center gap-1 mt-1">
                  <Maximize2 className="w-4 h-4 text-gold" />
                  <span>{property.area} {property.areaUnit || 'Sq.Ft'}</span>
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-400">Floors / Purpose</div>
                <div className="text-base font-bold font-sans text-navy flex items-center justify-center gap-1 mt-1">
                  <Building className="w-4 h-4 text-gold" />
                  <span>{property.purpose}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-xl font-bold font-heading text-navy-dark border-b pb-3">Property Description</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                {property.description}
              </p>
            </div>

            {/* Amenities Grid */}
            {property.amenities && property.amenities.length > 0 && (
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                <h3 className="text-xl font-bold font-heading text-navy-dark border-b pb-3">Key Amenities & Facilities</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {property.amenities.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-700 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-gold shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Features Grid */}
            {property.features && property.features.length > 0 && (
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                <h4 className="text-xl font-bold font-heading text-navy-dark border-b pb-3">Key Highlights</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {property.features.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-700 p-2.5 rounded-xl bg-amber-50/50 border border-amber-200">
                      <Compass className="w-4 h-4 text-gold shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Google Maps Location Section */}
            <div className="bg-white rounded-2xl p-3 border border-slate-200 shadow-sm space-y-4">
              <h4 className="text-xl font-bold font-heading text-navy-dark border-b pb-3">Location & Google Maps</h4>
              <p className="text-xs text-slate-500">
                {property.address}, {property.city}, {property.state} - {property.pincode}
              </p>
              
              <div className="aspect-[16/5] rounded-xl overflow-hidden border border-slate-200 bg-slate-100 relative">
                <iframe
                  title="Property Location Map"
                  src={`https://maps.google.com/maps?q=${property.latitude || 30.2012},${property.longitude || 77.8384}&z=14&output=embed`}
                  className="w-full h-full border-0"
                  allowFullScreen=""
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Contact & Enquiry Card */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick Action Contact Agent Box */}
            <div className="bg-navy-dark text-white rounded-2xl p-6 border border-gold/40 shadow-xl space-y-4">
              <div className="text-xs font-bold text-gold uppercase tracking-widest">DIRECT CONTACT</div>
              <h4 className="text-lg font-bold font-heading">Mahalaxmi Property Agent</h4>

              <div className="space-y-3 pt-2">
                <a
                  href={`tel:${settings.phone.replace(/\s+/g, '')}`}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-navy hover:bg-navy-light border border-gold/40 text-gold font-bold text-xs transition-colors shadow-sm"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call {settings.phone}</span>
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors shadow-md"
                >
                  <WhatsAppIcon className="w-4 h-4 text-white" />
                  <span>Inquire via WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Sticky Enquiry Form Card */}
            <PropertyEnquiryModal
              propertyId={property._id}
              propertyTitle={property.title}
              isSticky={true}
            />
          </div>
        </div>

        {/* Similar Properties */}
        <SimilarProperties properties={allProperties} currentId={property._id} />
      </div>
    </>
  );
};

export default PropertyDetails;
