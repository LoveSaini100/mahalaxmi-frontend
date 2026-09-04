import React, { useState } from 'react';
import { X, CheckCircle2, Phone, Send, ArrowRight, MessageSquare } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { submitEnquiryThunk } from '../../store/slices/enquirySlice';
import { showToast } from '../../store/slices/uiSlice';
import confetti from 'canvas-confetti';

const ServiceModal = ({ service, onClose }) => {
  const dispatch = useDispatch();
  const submitting = useSelector((state) => state.enquiries.submitting);
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  if (!service) return null;

  const Icon = service.icon;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitEnquiry = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      dispatch(showToast({ type: 'error', message: 'Name and Phone number are required' }));
      return;
    }

    try {
      await dispatch(
        submitEnquiryThunk({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          message: formData.message || `I am interested in ${service.title} services. Please contact me with more information.`,
          propertyTitle: `Service Request: ${service.title}`,
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
      setFormData({ name: '', phone: '', email: '', message: '' });
      setShowEnquiryForm(false);
      onClose();
    } catch (err) {
      dispatch(
        showToast({
          type: 'error',
          message: err || 'Failed to submit enquiry. Please try again.',
        })
      );
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Mahalaxmi Property, I would like to get more information regarding your "${service.title}" service.`
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh] animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 sm:px-8 py-5 bg-gradient-to-r from-navy-dark via-navy to-navy-light text-white flex items-center justify-between border-b border-gold/20">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gold/20 text-gold flex items-center justify-center font-bold shadow-inner">
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-gold uppercase tracking-widest block">
                OUR SPECIALIZED SERVICE
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">{service.title}</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-slate-700">
          {/* Overview */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-gold uppercase tracking-widest">SERVICE OVERVIEW</h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal text-justify">
              {service.longDesc || service.desc}
            </p>
          </div>

          {/* Key Features & Benefits */}
          {service.features && service.features.length > 0 && (
            <div className="space-y-3 p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
              <h4 className="text-xs font-bold text-navy-dark uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Key Features & Benefits
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm pt-1">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0"></span>
                    <span className="font-medium leading-snug">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Inline Quick Enquiry Form */}
          {showEnquiryForm ? (
            <div className="p-5 rounded-2xl bg-amber-50/50 border border-gold/30 space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-gold/20 pb-2">
                <h4 className="text-xs font-bold text-navy-dark uppercase tracking-wider flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-gold" /> Request Callback for {service.title}
                </h4>
                <button
                  type="button"
                  onClick={() => setShowEnquiryForm(false)}
                  className="text-xs text-slate-500 hover:text-navy font-semibold underline"
                >
                  Cancel
                </button>
              </div>

              <form onSubmit={handleSubmitEnquiry} className="space-y-3 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Your Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-gold bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. 9917970750"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-gold bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Email Address (Optional)</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g. name@example.com"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-gold bg-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Specific Message or Property Goal</label>
                  <textarea
                    name="message"
                    rows={2}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder={`Tell us about your requirements for ${service.title}...`}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-gold bg-white"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-2.5 px-4 rounded-xl bg-navy text-gold font-bold text-xs shadow-md hover:bg-navy-dark transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {submitting ? 'Submitting...' : 'Submit Service Request'}
                </button>
              </form>
            </div>
          ) : (
            <div className="p-5 rounded-2xl bg-navy text-white flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold font-heading text-gold">Need Personalized Guidance?</h4>
                <p className="text-xs text-slate-300 mt-0.5">
                  Speak directly with our regional real estate experts for Biharigarh & Dehradun highway.
                </p>
              </div>
              <button
                onClick={() => setShowEnquiryForm(true)}
                className="shrink-0 px-4 py-2.5 rounded-xl bg-gold text-navy-dark font-bold text-xs hover:bg-gold-accent transition-all shadow-gold flex items-center gap-1.5"
              >
                <span>Request Service Callback</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 sm:px-8 py-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <a
              href="tel:+919917970750"
              className="px-4 py-2.5 rounded-xl bg-navy text-white text-xs font-bold hover:bg-navy-dark transition-all flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-gold" />
              <span>Call Us: +91 9917970750</span>
            </a>

            <a
              href={`https://wa.me/919917970750?text=${whatsappMessage}`}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-all flex items-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>WhatsApp Chat</span>
            </a>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-600 font-bold text-xs hover:bg-slate-100 transition-colors ml-auto"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceModal;
