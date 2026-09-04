import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPropertiesThunk } from '../store/slices/propertySlice';
import SEO from '../components/common/SEO';
import PropertyCard from '../components/property/PropertyCard';
import { PropertyCardSkeleton } from '../components/common/Skeleton';

const FeaturedPropertiesPage = () => {
  const dispatch = useDispatch();
  const { list: properties, loading } = useSelector((state) => state.properties);

  useEffect(() => {
    dispatch(fetchPropertiesThunk({ featured: 'true' }));
  }, [dispatch]);

  const featuredList = properties.filter((p) => p.featured);

  return (
    <>
      <SEO
        title="Featured Real Estate Listings in Biharigarh | MP UP"
        description="Discover top featured plots and villas near Pencho Restaurant on Dehradun-Saharanpur Highway, Biharigarh, Saharanpur 247662. Schedule site visit today."
        keywords="Featured properties Biharigarh, Top luxury villas Saharanpur, High ROI land Dehradun Highway, Premium real estate 247662"
      />

      <div className="bg-navy-dark text-white pt-32 pb-14 border-b border-gold/30">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="text-xs font-bold text-gold uppercase tracking-widest block mb-2">HANDPICKED</span>
          <h1 className="text-4xl font-bold font-heading">Featured Real Estate Properties</h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mt-2">
            Explore our premier luxury real estate selections with high appreciation potential.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-bold font-heading text-navy-dark">Top Premium Property Listings</h3>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <PropertyCardSkeleton key={i} />
              ))}
            </div>
          ) : featuredList.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredList.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200">
              <h3 className="text-xl font-bold font-heading text-navy">No Featured Properties Available</h3>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FeaturedPropertiesPage;
