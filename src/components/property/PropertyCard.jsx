import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../../store/slices/uiSlice';
import { formatPrice, getWhatsAppLink } from '../../utils/formatters';
import { getImageUrl } from '../../services/api';
import WhatsAppIcon from '../common/WhatsAppIcon';
import { MapPin, Bed, Bath, Maximize2, Heart, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const PropertyCard = ({ property }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.ui.favorites);
  const isFavorite = favorites.includes(property._id);

  const mainImage =
    property.images && property.images.length > 0
      ? getImageUrl(property.images[0])
      : 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80';

  const whatsappUrl = getWhatsAppLink(property.title);

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-2xl hover:border-gold/50 group flex flex-col h-full relative"
    >
      {/* Property Image & Overlays */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={mainImage}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/70 via-transparent to-transparent opacity-80" />

        {/* Top Badges */}
        <div className="absolute top-1 left-2 right-2 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-navy/90 text-gold border border-gold/30 backdrop-blur-md">
              {property.propertyType}
            </span>
            {property.featured && (
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r from-gold via-gold-accent to-gold-dark text-navy-dark shadow-sm">
                ★ Featured
              </span>
            )}
          </div>

          {/* Favorite Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              dispatch(toggleFavorite(property._id));
            }}
            className={`p-2 rounded-full backdrop-blur-md transition-all duration-300 ${
              isFavorite
                ? 'bg-red-500 text-white shadow-lg scale-110'
                : 'bg-navy-dark/60 text-white/90 hover:bg-navy hover:text-gold'
            }`}
            aria-label="Add to favorites"
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Bottom Image Overlay Status & Price */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between z-10">
          <span
            className={`px-2.5 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider ${
              property.propertyStatus === 'Available'
                ? 'bg-emerald-500/90 text-white'
                : property.propertyStatus === 'Sold'
                ? 'bg-red-500/90 text-white'
                : 'bg-amber-500/90 text-white'
            }`}
          >
            {property.propertyStatus}
          </span>

          <div className="text-right">
            <div className="text-xs text-gold-light font-medium">Price</div>
            <div className="text-lg font-bold font-sans text-white tracking-wide">
              {property.priceLabel || formatPrice(property.price)}
            </div>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
        <div>
          <Link to={`/properties/${property.slug}`}>
            <h3 className="text-lg font-bold font-sans text-navy-dark hover:text-gold transition-colors line-clamp-1">
              {property.title}
            </h3>
          </Link>

          <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
            <MapPin className="w-3.5 h-3.5 text-gold shrink-0" />
            <span className="line-clamp-1">{property.location}</span>
          </div>

          <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
            {property.shortDescription}
          </p>
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-3 gap-1 py-2 px-2.5 rounded-xl bg-brand-offwhite border border-slate-200/60 text-[11px] sm:text-xs font-medium text-slate-700">
          <div className="flex items-center gap-1 justify-center min-w-0">
            <Bed className="w-3.5 h-3.5 text-gold shrink-0" />
            <span className="truncate">{property.bedrooms > 0 ? `${property.bedrooms} Beds` : 'N/A'}</span>
          </div>
          <div className="flex items-center gap-1 justify-center border-x border-slate-200 min-w-0 px-1">
            <Bath className="w-3.5 h-3.5 text-gold shrink-0" />
            <span className="truncate">{property.bathrooms > 0 ? `${property.bathrooms} Baths` : 'N/A'}</span>
          </div>
          <div className="flex items-center gap-1 justify-center min-w-0">
            <Maximize2 className="w-3.5 h-3.5 text-gold shrink-0" />
            <span className="truncate">{property.area} {property.areaUnit || 'Sq.Ft'}</span>
          </div>
        </div>

        {/* Card Actions */}
        <div className="pt-2 flex items-center gap-2">
          <Link
            to={`/properties/${property.slug}`}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-navy text-white text-xs font-semibold hover:bg-navy-dark hover:text-gold transition-all duration-300 shadow-sm"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white border border-emerald-200 transition-colors flex items-center justify-center"
            title="Inquire on WhatsApp"
          >
            <WhatsAppIcon className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;
