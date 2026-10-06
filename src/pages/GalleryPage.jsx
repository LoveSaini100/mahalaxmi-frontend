import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGalleryThunk } from '../store/slices/gallerySlice';
import SEO from '../components/common/SEO';
import { getImageUrl } from '../services/api';
import { Maximize, X, Filter } from 'lucide-react';

// Hardcoded static imports for upload photos to prevent proxy/network errors
import img1 from '../assets/gallery/gallery-1787313855019-26128.webp';
import img2 from '../assets/gallery/gallery-1787313895142-80506.webp';
import img3 from '../assets/gallery/gallery-1787313917585-50302.webp';
import img4 from '../assets/gallery/gallery-1787313936168-23629.webp';
import img5 from '../assets/gallery/gallery-1787314001615-14259.webp';
import img6 from '../assets/gallery/gallery-1787314027711-97877.webp';

// Hardcoded photos from uploads folder
const hardcodedGalleryPhotos = [
  {
    _id: 'upload-gallery-1',
    title: 'Highway Corridor Property View',
    category: 'Commercial',
    url: img1,
    description: 'Prime commercial land facing Saharanpur-Dehradun Highway.'
  },
  {
    _id: 'upload-gallery-2',
    title: 'Fertile Agricultural Land Plot',
    category: 'Plots',
    url: img2,
    description: 'Level agricultural plot with perimeter fencing and clear demarcation.'
  },
  {
    _id: 'upload-gallery-3',
    title: 'Residential Plot Development',
    category: 'Residential',
    url: img3,
    description: 'Ready-to-build clear title residential land near Biharigarh.'
  },
  {
    _id: 'upload-gallery-4',
    title: 'Commercial Showroom Land',
    category: 'Commercial',
    url: img4,
    description: 'High visibility road frontage plot for business & showroom.'
  },
  {
    _id: 'upload-gallery-5',
    title: 'Luxury Farmhouse Land',
    category: 'Villa',
    url: img5,
    description: 'Peaceful green setting ideal for private farmhouse retreat.'
  },
  {
    _id: 'upload-gallery-6',
    title: 'Delhi-Dehradun Expressway Plot',
    category: 'Plots',
    url: img6,
    description: 'Prime connectivity plot close to the upcoming Delhi-Dehradun Expressway.'
  }
];

const GalleryPage = () => {
  const dispatch = useDispatch();
  const { list: galleryItems = [], loading } = useSelector((state) => state.gallery);
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    dispatch(fetchGalleryThunk());
  }, [dispatch]);

  // Use backend images when provided, otherwise fallback to hardcoded photos
  const displayItems =
    Array.isArray(galleryItems) && galleryItems.length > 0
      ? galleryItems
      : hardcodedGalleryPhotos;

  const categories = ['All', 'Villa', 'Residential', 'Commercial', 'Plots', 'General'];

  const filteredItems = activeCategory === 'All'
    ? displayItems
    : displayItems.filter((item) => {
        const itemCat = (item.category || '').toLowerCase();
        const active = activeCategory.toLowerCase();
        if (active === 'plots') return itemCat.includes('plot') || itemCat.includes('land');
        if (active === 'villa') return itemCat.includes('villa') || itemCat.includes('farmhouse') || itemCat.includes('house');
        return itemCat.includes(active);
      });

  return (
    <>
      <SEO
        title="Property Gallery | Best Property in Biharigarh & Best Property in Dehradun"
        description="Visual tour of Best Property in Biharigarh & Best Property in Dehradun. Explore Property In Dehradun Expressway Corridor & Delhi Dehradun Expressway Property."
        keywords="Best property Dealer in Biharigarh, Best Property Advisor in Biharigarh, Best Property in Biharigarh, Best Property Dealer in Dehradun, Best Property in Dehradun, Best property advisor in Dehradun, Property In Dehradun Expressway Corridor, Delhi Dehradun Expressway Property, Properties Delhi Dehradun Expressway way"
      />

      <div className="bg-navy-dark text-white pt-32 pb-14 border-b border-gold/30">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="text-xs font-bold text-gold uppercase tracking-widest block mb-2">VISUAL TOUR</span>
          <h1 className="text-4xl font-bold font-heading">Property Photo Gallery</h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mt-2">
            Explore <strong>Best Property in Biharigarh</strong> & <strong>Best Property in Dehradun</strong> along the <strong>Properties Delhi Dehradun Expressway way</strong>.
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
          {loading && (!displayItems || displayItems.length === 0) ? (
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
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      const fallback = img1;
                      e.currentTarget.src = fallback;
                    }}
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
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = img1;
                }}
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
