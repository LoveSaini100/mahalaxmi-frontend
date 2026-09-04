import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs, Autoplay } from 'swiper/modules';
import { getImageUrl } from '../../services/api';
import { Maximize, X } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

const PropertyGallery = ({ images = [], title = 'Property Image' }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const galleryImages =
    images && images.length > 0
      ? images.map((img) => getImageUrl(img))
      : ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'];

  return (
    <div className="space-y-3">
      {/* Main Main Image Gallery */}
      <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-slate-900 shadow-xl group border border-slate-200">
        <Swiper
          style={{
            '--swiper-navigation-color': '#C9A227',
            '--swiper-pagination-color': '#C9A227',
          }}
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
          modules={[FreeMode, Navigation, Thumbs, Autoplay]}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          className="w-full h-full"
        >
          {galleryImages.map((imgUrl, idx) => (
            <SwiperSlide key={idx} className="relative cursor-pointer" onClick={() => { setLightboxIndex(idx); setLightboxOpen(true); }}>
              <img
                src={imgUrl}
                alt={`${title} - Photo ${idx + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2.5 rounded-xl bg-navy-dark/80 text-gold backdrop-blur-md hover:bg-navy border border-gold/30">
                  <Maximize className="w-5 h-5" />
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Thumbnails Row */}
      {galleryImages.length > 1 && (
        <div className="py-1">
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={Math.min(galleryImages.length, 5)}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="w-full h-20 sm:h-24"
          >
            {galleryImages.map((imgUrl, idx) => (
              <SwiperSlide key={idx} className="rounded-xl overflow-hidden cursor-pointer border-2 border-transparent opacity-60 [&.swiper-slide-thumb-active]:opacity-100 [&.swiper-slide-thumb-active]:border-gold transition-all">
                <img
                  src={imgUrl}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 z-50 p-3 rounded-full bg-navy/80 text-white hover:text-gold border border-gold/30"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="max-w-5xl w-full max-h-[85vh] relative flex items-center justify-center">
            <img
              src={galleryImages[lightboxIndex]}
              alt={title}
              className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl border border-gold/30"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyGallery;
