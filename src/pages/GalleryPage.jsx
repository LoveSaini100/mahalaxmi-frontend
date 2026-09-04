import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGalleryThunk } from '../store/slices/gallerySlice';
import SEO from '../components/common/SEO';
import { getImageUrl } from '../services/api';
import { Maximize, X, Filter } from 'lucide-react';

const GalleryPage = () => {
  const dispatch = useDispatch();
  const { list: galleryItems = [], loading } = useSelector((state) => state.gallery);
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    dispatch(fetchGalleryThunk());
  }, [dispatch]);

  const categories = ['All', 'Villa', 'Residential', 'Commercial', 'Plots', 'General'];

  const filteredItems = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <>
      <SEO
        title="Property Photo Gallery in Biharigarh | Mahalaxmi UP"
        description="View photos of verified villas, plots, and commercial land near Pencho Restaurant on Dehradun-Saharanpur Highway, Biharigarh, Saharanpur, UP 247662."
        keywords="Property photos Biharigarh, Plot images Saharanpur, Villa photos Dehradun Highway, Real estate gallery 247662"
      />

      <div className="bg-navy-dark text-white pt-32 pb-14 border-b border-gold/30">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="text-xs font-bold text-gold uppercase tracking-widest block mb-2">VISUAL TOUR</span>
          <h1 className="text-4xl font-bold font-heading">Property Photo Gallery</h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mt-2">
            Explore high-resolution captures of our residential, commercial, and land listings across Biharigarh & Dehradun highway.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="space-y-4">

          {/* Category Filters */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 pt-2">
            <Filter className="w-4 h-4 text-gold shrink-0 mr-1" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl font-bold text-xs whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? 'bg-navy text-gold shadow-md border border-gold/40'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-gold'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          {loading ? (
            <div className="text-center py-16 text-slate-400 text-xs">Loading photo gallery...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <div
                  key={item._id}
                  onClick={() => setSelectedImage(item)}
                  className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 shadow-md group cursor-pointer bg-slate-100"
                >
                  <img
                    src={getImageUrl(item.url)}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold bg-navy-dark/90 text-gold shadow-md z-10">
                    {item.category || 'General'}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/90 via-navy-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-5 text-white">
                    <div className="flex items-center justify-between w-full">
                      <div>
                        <h4 className="text-sm font-bold font-heading block">{item.title}</h4>
                        {item.description && (
                          <p className="text-[11px] text-slate-300 line-clamp-1 mt-0.5">{item.description}</p>
                        )}
                      </div>
                      <Maximize className="w-5 h-5 text-gold shrink-0" />
                    </div>
                  </div>
                </div>
              ))}

              {filteredItems.length === 0 && (
                <div className="col-span-full py-16 text-center text-slate-400 text-xs">
                  No photos found in this category.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Lightbox */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 p-3 text-white bg-navy/80 hover:bg-navy rounded-full border border-gold/40"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="max-w-4xl max-h-[90vh] space-y-3" onClick={(e) => e.stopPropagation()}>
              <img
                src={getImageUrl(selectedImage.url)}
                alt={selectedImage.title}
                className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl mx-auto border border-white/20"
              />
              <div className="text-center text-white space-y-1">
                <h4 className="text-xl font-bold font-heading">{selectedImage.title}</h4>
                <span className="text-xs font-semibold text-gold uppercase tracking-wider block">
                  {selectedImage.category}
                </span>
                {selectedImage.description && (
                  <p className="text-xs text-slate-300 max-w-lg mx-auto">{selectedImage.description}</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default GalleryPage;
