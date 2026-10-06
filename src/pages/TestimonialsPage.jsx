import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTestimonialsThunk } from '../store/slices/testimonialSlice';
import SEO from '../components/common/SEO';
import RatingStars from '../components/common/RatingStars';

const TestimonialsPage = () => {
  const dispatch = useDispatch();
  const testimonials = useSelector((state) => state.testimonials?.list) || [];

  useEffect(() => {
    dispatch(fetchTestimonialsThunk());
  }, [dispatch]);

  return (
    <>
      <SEO
        title="Client Reviews | Best Property Dealer in Biharigarh & Best Property Advisor in Dehradun"
        description="Client reviews for Best property Dealer in Biharigarh & Best Property Advisor in Dehradun. Discover experiences for Property In Dehradun Expressway Corridor."
        keywords="Best property Dealer in Biharigarh, Best Property Advisor in Biharigarh, Best Property in Biharigarh, Best Property Dealer in Dehradun, Best Property in Dehradun, Best property advisor in Dehradun, Property In Dehradun Expressway Corridor, Delhi Dehradun Expressway Property, Properties Delhi Dehradun Expressway way"
      />

      <div className="bg-navy-dark text-white pt-32 pb-14 border-b border-gold/30">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="text-xs font-bold text-gold uppercase tracking-widest block mb-2">REVIEWS</span>
          <h1 className="text-4xl font-bold font-heading">Client Testimonials</h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mt-2">
            Hear from buyers who trusted the <strong>Best property Dealer in Biharigarh</strong> & <strong>Best Property Advisor in Dehradun</strong>.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <h3 className="text-xl font-bold font-heading text-navy-dark">Client Reviews & Ratings</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Read authentic feedback from happy clients who bought villas, plots, and commercial land with us.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <h3 className="text-xl font-bold font-heading text-navy-dark">Share Your Real Estate Experience</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We value transparent client relationships and continuous excellence across Saharanpur.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {testimonials.map((t) => (
            <div key={t._id} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-md space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <RatingStars rating={t.rating} />
                <p className="text-xs text-slate-600 leading-relaxed italic">"{t.review}"</p>
              </div>
              <div className="pt-3 border-t border-slate-100">
                <h4 className="text-xs font-bold text-navy-dark">{t.name}</h4>
                <div className="text-[10px] text-slate-400">{t.location}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TestimonialsPage;
