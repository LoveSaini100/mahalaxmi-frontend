import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { submitEnquiryThunk } from '../../store/slices/enquirySlice';
import { showToast } from '../../store/slices/uiSlice';
import confetti from 'canvas-confetti';
import { Send, Phone, Mail, User, MessageSquare, CheckCircle2 } from 'lucide-react';

const enquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(10, 'Valid 10-digit phone number is required'),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  message: z.string().min(5, 'Message must be at least 5 characters'),
});

const PropertyEnquiryModal = ({ propertyId = null, propertyTitle = 'General Enquiry', isSticky = false }) => {
  const dispatch = useDispatch();
  const submitting = useSelector((state) => state.enquiries.submitting);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      message: propertyTitle !== 'General Enquiry' ? `Hello Mahalaxmi Property, I am interested in "${propertyTitle}". Please contact me with more information.` : '',
    },
  });

  const onSubmit = async (data) => {
    try {
      await dispatch(
        submitEnquiryThunk({
          ...data,
          property: propertyId,
          propertyTitle: propertyTitle,
        })
      ).unwrap();

      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
      });

      dispatch(
        showToast({
          type: 'success',
          message: 'Enquiry submitted successfully! Our team will contact you shortly.',
        })
      );
      reset();
    } catch (err) {
      dispatch(
        showToast({
          type: 'error',
          message: err || 'Failed to submit enquiry. Please try again.',
        })
      );
    }
  };

  return (
    <div className={`bg-white rounded-2xl p-6 border border-gold/30 shadow-xl ${isSticky ? 'sticky top-28' : ''}`}>
      <div className="border-b border-slate-100 pb-4 mb-2">
        <span className="text-[10px] font-bold text-gold uppercase tracking-widest block mb-1">
          EXPERT GUIDANCE
        </span>
        <h3 className="text-xl font-bold text-navy-dark">Enquire About Property</h3>
        <p className="text-sm text-slate-500 mt-1">
          Fill out the form below to receive call back from Mahalaxmi Property.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        {/* Name */}
        <div>
          <label className="text-sm font-semibold text-slate-700 flex items-center gap-1 mb-1">
            <User className="w-3.5 h-3.5 text-gold" />
            Your Full Name *
          </label>
          <input
            type="text"
            {...register('name')}
            placeholder="e.g. Ramesh Kumar"
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-400 text-xs font-medium focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold bg-slate-50/50"
          />
          {errors.name && <p className="text-[11px] text-red-500 mt-1">{errors.name.message}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="text-sm font-semibold text-slate-700 flex items-center gap-1 mb-1">
            <Phone className="w-3.5 h-3.5 text-gold" />
            Phone Number *
          </label>
          <input
            type="tel"
            {...register('phone')}
            placeholder="e.g. 9917970750"
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-400 text-xs font-medium focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold bg-slate-50/50"
          />
          {errors.phone && <p className="text-[11px] text-red-500 mt-1">{errors.phone.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="text-sm font-semibold text-slate-700 flex items-center gap-1 mb-1">
            <Mail className="w-3.5 h-3.5 text-gold" />
            Email Address (Optional)
          </label>
          <input
            type="email"
            {...register('email')}
            placeholder="e.g. name@example.com"
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-400 text-xs font-medium focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold bg-slate-50/50"
          />
          {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email.message}</p>}
        </div>

        {/* Message */}
        <div>
          <label className="text-sm font-semibold text-slate-700 flex items-center gap-1 mb-1">
            <MessageSquare className="w-3.5 h-3.5 text-gold" />
            Your Message *
          </label>
          <textarea
            rows={3}
            {...register('message')}
            placeholder="Write your enquiry details..."
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-400 text-xs font-medium focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold bg-slate-50/50"
          />
          {errors.message && <p className="text-[11px] text-red-500 mt-1">{errors.message.message}</p>}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          className="w-56 py-3 px-4 rounded-xl bg-gradient-to-r from-gold via-gold-accent to-gold-dark text-navy-dark font-bold text-xs shadow-gold hover:shadow-glow hover:scale-[1.01] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {submitting ? (
            <span>Sending...</span>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Submit Property Enquiry</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default PropertyEnquiryModal;
