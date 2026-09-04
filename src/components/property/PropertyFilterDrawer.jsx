import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, resetFilters } from '../../store/slices/filterSlice';
import { setFilterDrawer } from '../../store/slices/uiSlice';
import { X, RotateCcw, Filter, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PropertyFilterDrawer = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.ui.filterDrawerOpen);
  const filters = useSelector((state) => state.filters);

  const closeDrawer = () => dispatch(setFilterDrawer(false));

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm cursor-pointer"
          />

          {/* Sliding Drawer Container */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="relative z-[10001] w-full max-w-sm bg-white flex flex-col shadow-2xl h-full overflow-y-auto"
          >
            {/* Drawer Header */}
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-navy-dark text-white shrink-0">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gold" />
                <span className="font-bold text-sm font-heading">Filter Properties</span>
              </div>
              <button
                type="button"
                onClick={closeDrawer}
                className="p-2 rounded-xl text-slate-300 hover:text-gold hover:bg-navy transition-colors cursor-pointer"
                aria-label="Close Filter Drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter Form Controls */}
            <div className="p-5 flex-1 space-y-5 text-xs overflow-y-auto">
              {/* Property Type */}
              <div className="space-y-1.5">
                <label className="font-bold text-navy-dark uppercase tracking-wider block text-[11px]">
                  Property Type
                </label>
                <select
                  value={filters.propertyType}
                  onChange={(e) => dispatch(setFilter({ key: 'propertyType', value: e.target.value }))}
                  className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 font-semibold text-navy focus:outline-none focus:border-gold"
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

              {/* Purpose */}
              <div className="space-y-1.5">
                <label className="font-bold text-navy-dark uppercase tracking-wider block text-[11px]">
                  Listing Purpose
                </label>
                <select
                  value={filters.purpose}
                  onChange={(e) => dispatch(setFilter({ key: 'purpose', value: e.target.value }))}
                  className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 font-semibold text-navy focus:outline-none focus:border-gold"
                >
                  <option value="All">All Purposes</option>
                  <option value="Buy">Buy</option>
                  <option value="Sell">Sell</option>
                  <option value="Investment">Investment</option>
                </select>
              </div>

              {/* Location Input */}
              <div className="space-y-1.5">
                <label className="font-bold text-navy-dark uppercase tracking-wider block text-[11px]">
                  Location / Highway Corridor
                </label>
                <input
                  type="text"
                  value={filters.location}
                  onChange={(e) => dispatch(setFilter({ key: 'location', value: e.target.value }))}
                  placeholder="e.g. Biharigarh, Highway, Saharanpur..."
                  className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 font-medium text-navy focus:outline-none focus:border-gold"
                />
              </div>

              {/* Price Range */}
              <div className="space-y-1.5">
                <label className="font-bold text-navy-dark uppercase tracking-wider block text-[11px]">
                  Price Range (₹ Lakhs)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="Min Price (₹)"
                    value={filters.minPrice}
                    onChange={(e) => dispatch(setFilter({ key: 'minPrice', value: e.target.value }))}
                    className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 font-medium text-navy focus:outline-none focus:border-gold"
                  />
                  <input
                    type="number"
                    placeholder="Max Price (₹)"
                    value={filters.maxPrice}
                    onChange={(e) => dispatch(setFilter({ key: 'maxPrice', value: e.target.value }))}
                    className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 font-medium text-navy focus:outline-none focus:border-gold"
                  />
                </div>
              </div>

              {/* Bedrooms */}
              <div className="space-y-1.5">
                <label className="font-bold text-navy-dark uppercase tracking-wider block text-[11px]">
                  Minimum Bedrooms
                </label>
                <select
                  value={filters.bedrooms}
                  onChange={(e) => dispatch(setFilter({ key: 'bedrooms', value: e.target.value }))}
                  className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 font-semibold text-navy focus:outline-none focus:border-gold"
                >
                  <option value="Any">Any Bedrooms</option>
                  <option value="1">1+ Bedrooms</option>
                  <option value="2">2+ Bedrooms</option>
                  <option value="3">3+ Bedrooms</option>
                  <option value="4">4+ Bedrooms</option>
                </select>
              </div>

              {/* Status */}
              <div className="space-y-1.5">
                <label className="font-bold text-navy-dark uppercase tracking-wider block text-[11px]">
                  Property Status
                </label>
                <select
                  value={filters.status}
                  onChange={(e) => dispatch(setFilter({ key: 'status', value: e.target.value }))}
                  className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 font-semibold text-navy focus:outline-none focus:border-gold"
                >
                  <option value="All">All Statuses</option>
                  <option value="Available">Available</option>
                  <option value="Sold">Sold</option>
                  <option value="Reserved">Reserved</option>
                </select>
              </div>
            </div>

            {/* Actions Footer */}
            <div className="p-4 border-t border-slate-200 flex gap-3 bg-slate-50 shrink-0">
              <button
                type="button"
                onClick={() => dispatch(resetFilters())}
                className="flex-1 py-3 px-4 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 hover:bg-slate-100 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </button>
              <button
                type="button"
                onClick={closeDrawer}
                className="flex-1 py-3 px-4 rounded-xl bg-navy hover:bg-navy-dark text-gold font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-colors"
              >
                <Check className="w-4 h-4 text-gold" />
                Apply Filters
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PropertyFilterDrawer;
