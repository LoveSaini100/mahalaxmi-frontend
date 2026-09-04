import React from 'react';
import PropertyCard from './PropertyCard';

const SimilarProperties = ({ properties = [], currentId = '' }) => {
  const filtered = properties
    .filter((item) => item._id !== currentId)
    .slice(0, 3);

  if (filtered.length === 0) return null;

  return (
    <div className="mt-16 pt-10 border-t border-slate-200">
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="text-xs font-bold text-gold uppercase tracking-widest block mb-1">
            RECOMMENDED FOR YOU
          </span>
          <h3 className="text-2xl font-bold font-heading text-navy-dark">Similar Properties</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <PropertyCard key={item._id} property={item} />
        ))}
      </div>
    </div>
  );
};

export default SimilarProperties;
