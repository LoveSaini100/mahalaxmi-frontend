import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../store/slices/filterSlice';
import { Search, MapPin, Building, Tag, DollarSign, Bed, CheckCircle2 } from 'lucide-react';

const PropertySearch = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate('/properties');
  };

  return (
    <div className="w-full max-w-5xl mx-auto -mt-16 relative z-20 px-4">
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-2xl border border-gold/30 gold-border-glow">
        <form onSubmit={handleSearchSubmit} className="space-y-5">
          {/* Top Tabs / Purpose Selector */}
          <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
            <span className="text-xs font-bold text-navy uppercase tracking-wider mr-2">Purpose:</span>
            {['All', 'Buy', 'Sell', 'Investment'].map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => dispatch(setFilter({ key: 'purpose', value: p }))}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  filters.purpose === p
                    ? 'bg-navy text-gold shadow-md border border-gold/40'
                    : 'bg-brand-offwhite text-slate-600 hover:bg-slate-200'
                }`}
              >
                {p === 'All' ? 'All Purposes' : p}
              </button>
            ))}
          </div>

          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Location */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-gold" />
                Location
              </label>
              <input
                type="text"
                value={filters.location}
                onChange={(e) => dispatch(setFilter({ key: 'location', value: e.target.value }))}
                placeholder="Biharigarh, Saharanpur Highway..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold bg-slate-50/50"
              />
            </div>

            {/* Property Type */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-gold" />
                Property Type
              </label>
              <select
                value={filters.propertyType}
                onChange={(e) => dispatch(setFilter({ key: 'propertyType', value: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold bg-slate-50/50"
              >
                <option value="All">All Property Types</option>
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
                <option value="Plot">Plot</option>
                <option value="Land">Land</option>
                <option value="Villa">Villa</option>
                <option value="House">House</option>
                <option value="Apartment">Apartment</option>
                <option value="Shop">Shop</option>
              </select>
            </div>

            {/* Budget / Max Price */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-gold" />
                Max Budget
              </label>
              <select
                value={filters.maxPrice}
                onChange={(e) => dispatch(setFilter({ key: 'maxPrice', value: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold bg-slate-50/50"
              >
                <option value="">Any Price Range</option>
                <option value="2500000">Up to ₹ 25 Lakhs</option>
                <option value="5000000">Up to ₹ 50 Lakhs</option>
                <option value="10000000">Up to ₹ 1 Crore</option>
                <option value="25000000">Up to ₹ 2.5 Crore</option>
                <option value="50000000">Up to ₹ 5 Crore+</option>
              </select>
            </div>

            {/* Bedrooms */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <Bed className="w-3.5 h-3.5 text-gold" />
                Bedrooms
              </label>
              <select
                value={filters.bedrooms}
                onChange={(e) => dispatch(setFilter({ key: 'bedrooms', value: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold bg-slate-50/50"
              >
                <option value="Any">Any Bedrooms</option>
                <option value="1">1+ Bedrooms</option>
                <option value="2">2+ Bedrooms</option>
                <option value="3">3+ Bedrooms</option>
                <option value="4">4+ Bedrooms</option>
              </select>
            </div>

            {/* Property Status */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-gold" />
                Status
              </label>
              <select
                value={filters.status}
                onChange={(e) => dispatch(setFilter({ key: 'status', value: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold bg-slate-50/50"
              >
                <option value="All">All Statuses</option>
                <option value="Available">Available</option>
                <option value="Sold">Sold</option>
                <option value="Reserved">Reserved</option>
                <option value="Coming Soon">Coming Soon</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-6 rounded-xl bg-gradient-to-r from-gold via-gold-accent to-gold-dark text-navy-dark font-bold text-sm shadow-gold hover:shadow-glow hover:scale-[1.01] active:scale-95 transition-all duration-300"
              >
                <Search className="w-4 h-4" />
                <span>Search Properties</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PropertySearch;
