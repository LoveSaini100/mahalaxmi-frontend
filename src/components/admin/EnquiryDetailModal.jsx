import React from 'react';
import { useDispatch } from 'react-redux';
import { updateEnquiryStatusThunk, deleteEnquiryThunk } from '../../store/slices/enquirySlice';
import { showToast } from '../../store/slices/uiSlice';
import { formatDate } from '../../utils/formatters';
import { X, Phone, Mail, User, Building2, Calendar, MessageSquare, Trash2, Send } from 'lucide-react';

const EnquiryDetailModal = ({ enquiry, onClose }) => {
  const dispatch = useDispatch();

  if (!enquiry) return null;

  const handleStatusChange = (newStatus) => {
    dispatch(updateEnquiryStatusThunk({ id: enquiry._id, status: newStatus }));
    dispatch(showToast({ type: 'success', message: `Status updated to ${newStatus}` }));
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this enquiry?')) {
      dispatch(deleteEnquiryThunk(enquiry._id));
      dispatch(showToast({ type: 'success', message: 'Enquiry deleted' }));
      onClose();
    }
  };

  const cleanPhone = enquiry.phone ? enquiry.phone.replace(/[^0-9]/g, '') : '';
  const whatsappNumber = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div
        className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-navy text-white flex items-center justify-between border-b border-navy-light">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gold/20 text-gold flex items-center justify-center font-bold">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold font-heading">Enquiry Details</h2>
              <p className="text-[11px] text-slate-300">Submitted {formatDate(enquiry.createdAt)}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1 text-xs text-slate-700">
          {/* Status & Date bar */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="font-semibold text-slate-500">Current Lead Status:</span>
            <select
              value={enquiry.status || 'New'}
              onChange={(e) => handleStatusChange(e.target.value)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold border-0 cursor-pointer shadow-sm ${
                enquiry.status === 'New'
                  ? 'bg-amber-100 text-amber-800'
                  : enquiry.status === 'Contacted'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-emerald-100 text-emerald-800'
              }`}
            >
              <option value="New">New Lead</option>
              <option value="Contacted">Contacted</option>
              <option value="Closed">Closed / Deal Done</option>
            </select>
          </div>

          {/* Customer Info Card */}
          <div className="space-y-3 p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
            <h3 className="text-xs font-bold text-navy-dark uppercase tracking-wider border-b pb-2 flex items-center gap-1.5">
              <User className="w-4 h-4 text-gold" /> Customer Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Name</span>
                <span className="font-bold text-navy-dark text-sm">{enquiry.name}</span>
              </div>

              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Phone</span>
                <a href={`tel:${enquiry.phone}`} className="font-bold text-gold hover:underline flex items-center gap-1">
                  <Phone className="w-3 h-3" /> {enquiry.phone}
                </a>
              </div>

              {enquiry.email && (
                <div className="sm:col-span-2">
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Email</span>
                  <a href={`mailto:${enquiry.email}`} className="font-medium text-slate-700 hover:text-gold flex items-center gap-1">
                    <Mail className="w-3 h-3 text-slate-400" /> {enquiry.email}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Property Info */}
          <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs space-y-1.5">
            <span className="text-slate-400 block text-[10px] uppercase font-semibold flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5 text-navy" /> Related Property
            </span>
            <div className="font-bold text-navy-dark text-sm">
              {enquiry.propertyTitle || 'General Website Enquiry'}
            </div>
          </div>

          {/* Message Box */}
          <div className="p-4 rounded-xl border border-gold/30 bg-amber-50/30 space-y-2">
            <span className="text-gold-dark font-bold text-[11px] uppercase tracking-wider block flex items-center gap-1">
              <MessageSquare className="w-3.5 h-3.5 text-gold" /> Full Customer Message
            </span>
            <div className="p-3 bg-white rounded-lg border border-slate-200/60 text-slate-800 leading-relaxed font-medium whitespace-pre-wrap">
              {enquiry.message}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <a
              href={`tel:${enquiry.phone}`}
              className="px-3.5 py-2 rounded-xl bg-navy text-white text-xs font-bold hover:bg-navy-dark transition-all flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-gold" />
              <span>Call</span>
            </a>

            {cleanPhone && (
              <a
                href={`https://wa.me/${whatsappNumber}?text=Hello%20${encodeURIComponent(enquiry.name)},%20thank%20you%20for%20contacting%20Mahalaxmi%20Property.`}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-all flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDelete}
              className="p-2 rounded-xl text-red-600 hover:bg-red-50 transition-colors"
              title="Delete Enquiry"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-300 text-slate-600 font-bold text-xs hover:bg-slate-100 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnquiryDetailModal;
