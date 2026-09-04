import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchTestimonialsThunk,
  createTestimonialThunk,
  updateTestimonialThunk,
  deleteTestimonialThunk,
} from '../../store/slices/testimonialSlice';
import { showToast } from '../../store/slices/uiSlice';
import SEO from '../../components/common/SEO';
import RatingStars from '../../components/common/RatingStars';
import { Star, Plus, Edit3, Trash2, X, Check } from 'lucide-react';

const AdminTestimonialsPage = () => {
  const dispatch = useDispatch();
  const testimonials = useSelector((state) => state.testimonials?.list) || [];

  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: '', location: '', review: '', rating: 5 });

  useEffect(() => {
    dispatch(fetchTestimonialsThunk());
  }, [dispatch]);

  const handleEditClick = (testimonial) => {
    setEditingId(testimonial._id);
    setForm({
      name: testimonial.name || '',
      location: testimonial.location || '',
      review: testimonial.review || '',
      rating: testimonial.rating || 5,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setForm({ name: '', location: '', review: '', rating: 5 });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.review) return;

    if (editingId) {
      await dispatch(updateTestimonialThunk({ id: editingId, testimonialData: form }));
      dispatch(showToast({ type: 'success', message: 'Testimonial updated successfully!' }));
      setEditingId(null);
    } else {
      await dispatch(createTestimonialThunk(form));
      dispatch(showToast({ type: 'success', message: 'Testimonial added successfully!' }));
    }

    setForm({ name: '', location: '', review: '', rating: 5 });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      dispatch(deleteTestimonialThunk(id));
      dispatch(showToast({ type: 'success', message: 'Testimonial deleted' }));
      if (editingId === id) handleCancelEdit();
    }
  };

  return (
    <>
      <SEO title="Testimonials Admin - Mahalaxmi Property" />

      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold font-heading text-navy-dark">Customer Testimonials</h1>
            <p className="text-xs text-slate-500 mt-0.5">Manage and edit client reviews displayed on public home page slider.</p>
          </div>
        </div>

        {/* Add / Edit Testimonial Form */}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 max-w-2xl">
          <div className="flex items-center justify-between border-b pb-3">
            <h3 className="text-sm font-bold font-heading text-navy uppercase tracking-wider flex items-center gap-2">
              {editingId ? (
                <>
                  <Edit3 className="w-4 h-4 text-gold" />
                  <span>Edit Testimonial</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 text-gold" />
                  <span>Add New Testimonial</span>
                </>
              )}
            </h3>

            {editingId && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="text-xs font-semibold text-slate-500 hover:text-navy flex items-center gap-1"
              >
                <X className="w-3.5 h-3.5" />
                <span>Cancel Edit</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="text-slate-500 text-[11px] block mb-1 font-semibold">Client Name *</label>
              <input
                type="text"
                placeholder="e.g. Amit Verma"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-navy"
              />
            </div>
            <div>
              <label className="text-slate-500 text-[11px] block mb-1 font-semibold">Client Location *</label>
              <input
                type="text"
                placeholder="e.g. Saharanpur"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                required
                className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-navy"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-slate-500 text-[11px] block mb-1 font-semibold">Review Text *</label>
              <textarea
                placeholder="Write customer review..."
                rows={3}
                value={form.review}
                onChange={(e) => setForm({ ...form, review: e.target.value })}
                required
                className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-navy"
              />
            </div>
            <div>
              <label className="text-slate-500 text-[11px] block mb-1 font-semibold">Rating (1-5)</label>
              <select
                value={form.rating}
                onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
                className="p-2.5 rounded-xl border border-slate-200 w-full focus:outline-none focus:border-navy font-semibold"
              >
                <option value={5}>5 Stars ⭐⭐⭐⭐⭐</option>
                <option value={4}>4 Stars ⭐⭐⭐⭐</option>
                <option value={3}>3 Stars ⭐⭐⭐</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                className={`w-full py-2.5 px-4 font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 ${
                  editingId
                    ? 'bg-gold text-navy-dark hover:bg-gold-accent'
                    : 'bg-navy text-gold hover:bg-navy-dark'
                }`}
              >
                {editingId ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                <span>{editingId ? 'Update Testimonial' : 'Add Testimonial'}</span>
              </button>
            </div>
          </div>
        </form>

        {/* Existing Testimonials List */}
        <div>
          <h2 className="text-base font-bold font-heading text-navy mb-4">All Published Testimonials ({testimonials.length})</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t._id}
                className={`bg-white p-5 rounded-2xl border shadow-sm space-y-3 relative transition-all ${
                  editingId === t._id ? 'border-2 border-gold ring-2 ring-gold/20' : 'border-slate-200'
                }`}
              >
                {/* Actions: Edit & Delete */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5">
                  <button
                    onClick={() => handleEditClick(t)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-navy hover:bg-slate-100 transition-colors"
                    title="Edit Testimonial"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(t._id)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                    title="Delete Testimonial"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <RatingStars rating={t.rating} />
                <p className="text-xs text-slate-600 italic leading-relaxed pr-12">"{t.review}"</p>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-navy-dark">{t.name}</div>
                    <div className="text-[10px] text-slate-400">{t.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminTestimonialsPage;
