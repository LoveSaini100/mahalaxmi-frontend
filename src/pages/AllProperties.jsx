import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPropertiesThunk } from '../store/slices/propertySlice';
import { setFilter, setPage, resetFilters } from '../store/slices/filterSlice';
import { toggleFilterDrawer } from '../store/slices/uiSlice';
import SEO from '../components/common/SEO';
import PropertyCard from '../components/property/PropertyCard';
import { PropertyCardSkeleton } from '../components/common/Skeleton';
import PropertyFilterDrawer from '../components/property/PropertyFilterDrawer';
import { Search, Filter, ChevronLeft, ChevronRight, Building } from 'lucide-react';

const AllProperties = () => {
  const dispatch = useDispatch();
  const { list: properties, total, page, pages, loading } = useSelector((state) => state.properties);
  const filters = useSelector((state) => state.filters);

  useEffect(() => {
    dispatch(
      fetchPropertiesThunk({
        search: filters.search,
        propertyType: filters.propertyType,
        purpose: filters.purpose,
        location: filters.location,
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
        bedrooms: filters.bedrooms,
        status: filters.status,
        sort: filters.sort,
        page: filters.page,
        limit: 9,
      })
    );
  }, [dispatch, filters]);

  const quickTypes = ['All', 'Residential', 'Commercial', 'Plot', 'Land', 'Villa', 'House', 'Shop'];

  const isFilterActive =
    filters.propertyType !== 'All' ||
    filters.purpose !== 'All' ||
    filters.bedrooms !== 'Any' ||
    filters.status !== 'All' ||
    Boolean(filters.location) ||
    Boolean(filters.minPrice) ||
    Boolean(filters.maxPrice);

  return (
    <>
      <SEO
        title="Buy Plots & Houses in Biharigarh Saharanpur | MP UP"
        description="Browse verified plots, houses, and land listings near Pencho Restaurant on Dehradun-Saharanpur Highway corridor, Biharigarh. Call +91 9917970750 today."
        keywords="All Property listings Biharigarh, Buy plots Saharanpur, Dehradun Highway houses, Land for sale 247662, Commercial shop Biharigarh, Residential villas Saharanpur"
      />

      {/* Page Banner */}
      <div className="bg-navy-dark text-white pt-32 pb-14 border-b border-gold/30">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="text-xs font-bold text-gold uppercase tracking-widest block mb-2">MARKETPLACE</span>
          <h1 className="text-4xl font-bold font-heading">Explore All Properties</h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto mt-2 leading-relaxed">
            Browse our complete collection of verified residential houses, commercial spaces, gated plots, and agricultural land along the Dehradun–Saharanpur Highway corridor in Biharigarh.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Quick Property Type Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">Types:</span>
          {quickTypes.map((type) => (
            <button
              key={type}
              onClick={() => dispatch(setFilter({ key: 'propertyType', value: type }))}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                filters.propertyType === type
                  ? 'bg-navy text-gold shadow-md border border-gold/40'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-gold hover:text-navy'
              }`}
            >
              {type === 'All' ? 'All Types' : type}
            </button>
          ))}
        </div>

        {/* Filter Controls & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 w-full sm:w-auto flex-1">
            <button
              type="button"
              onClick={() => dispatch(toggleFilterDrawer())}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-navy hover:bg-navy-dark text-gold text-xs font-bold shadow-sm transition-colors shrink-0 cursor-pointer relative"
            >
              <Filter className="w-4 h-4 text-gold" />
              <span>Filters</span>
              {isFilterActive && (
                <span className="w-2.5 h-2.5 rounded-full bg-gold animate-ping absolute -top-1 -right-1" />
              )}
            </button>

            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search location, title, or keyword..."
                value={filters.search}
                onChange={(e) => dispatch(setFilter({ search: e.target.value }))}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-gold"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end shrink-0">
            <span className="text-xs text-slate-500 font-medium">
              Showing <strong>{properties.length}</strong> of <strong>{total}</strong> Properties
            </span>
            <select
              value={filters.sort}
              onChange={(e) => dispatch(setFilter({ sort: e.target.value }))}
              className="px-3 py-2 rounded-xl border border-slate-200 text-xs text-navy font-semibold focus:outline-none focus:border-gold cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Listings Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold font-heading text-navy-dark">Filtered Property Search Results</h3>
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <PropertyCardSkeleton key={i} />
              ))}
            </div>
          ) : properties.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm space-y-4 max-w-md mx-auto">
              <div className="w-16 h-16 rounded-full bg-amber-50 text-gold mx-auto flex items-center justify-center">
                <Building className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold font-heading text-navy-dark">No Properties Found</h3>
              <p className="text-xs text-slate-500">
                Try adjusting your search filters or resetting your parameters to discover available listings.
              </p>
              <button
                onClick={() => dispatch(resetFilters())}
                className="px-6 py-2.5 rounded-xl bg-navy text-gold text-xs font-bold shadow-md hover:bg-navy-dark transition-colors cursor-pointer"
              >
                Reset Search Filters
              </button>
            </div>
          )}

          {/* Pagination Controls */}
          {pages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-6">
              <button
                onClick={() => dispatch(setPage(Math.max(1, page - 1)))}
                disabled={page === 1}
                className="p-2.5 rounded-xl border border-slate-200 bg-white text-navy disabled:opacity-40 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: pages }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => dispatch(setPage(idx + 1))}
                  className={`w-9 h-9 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                    page === idx + 1
                      ? 'bg-navy text-gold shadow-md'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
              <button
                onClick={() => dispatch(setPage(Math.min(pages, page + 1)))}
                disabled={page === pages}
                className="p-2.5 rounded-xl border border-slate-200 bg-white text-navy disabled:opacity-40 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      <PropertyFilterDrawer />
    </>
  );
};

export default AllProperties;
