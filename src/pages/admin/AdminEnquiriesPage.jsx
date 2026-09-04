import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchEnquiriesThunk,
  updateEnquiryStatusThunk,
  deleteEnquiryThunk,
} from '../../store/slices/enquirySlice';
import { showToast } from '../../store/slices/uiSlice';
import SEO from '../../components/common/SEO';
import { formatDate } from '../../utils/formatters';
import { MessageSquare, Phone, Mail, Trash2, CheckCircle2, Eye } from 'lucide-react';
import EnquiryDetailModal from '../../components/admin/EnquiryDetailModal';

const AdminEnquiriesPage = () => {
  const dispatch = useDispatch();
  const { list: enquiries = [], loading, error } = useSelector((state) => state.enquiries);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);

  useEffect(() => {
    dispatch(fetchEnquiriesThunk());
  }, [dispatch]);

  const handleStatusChange = (id, newStatus) => {
    dispatch(updateEnquiryStatusThunk({ id, status: newStatus }));
    dispatch(showToast({ type: 'success', message: 'Enquiry status updated' }));
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this enquiry record?')) {
      dispatch(deleteEnquiryThunk(id));
      dispatch(showToast({ type: 'success', message: 'Enquiry deleted' }));
    }
  };

  return (
    <>
      <SEO title="Customer Enquiries - Mahalaxmi Admin" />

      {selectedEnquiry && (
        <EnquiryDetailModal
          enquiry={selectedEnquiry}
          onClose={() => setSelectedEnquiry(null)}
        />
      )}

      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold font-heading text-navy-dark">Customer Enquiries</h1>
          <p className="text-xs text-slate-500 mt-0.5">Manage customer lead submissions and property requests.</p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-navy-dark text-white uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4">Customer Info</th>
                  <th className="py-3.5 px-4">Property</th>
                  <th className="py-3.5 px-4">Message</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-400">
                      Loading enquiries...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-red-500">
                      Error: {error}.{' '}
                      <button
                        onClick={() => dispatch(fetchEnquiriesThunk())}
                        className="underline font-bold text-navy hover:text-gold ml-2"
                      >
                        Retry
                      </button>
                    </td>
                  </tr>
                ) : (
                  <>
                    {enquiries.map((e) => (
                      <tr key={e._id} className="hover:bg-slate-50/80 transition-colors group">
                        <td className="py-3 px-4 whitespace-nowrap text-slate-400">{formatDate(e.createdAt)}</td>
                        <td className="py-3 px-4">
                          <div className="font-bold text-navy-dark">{e.name}</div>
                          <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                            <a href={`tel:${e.phone}`} className="hover:text-gold flex items-center gap-1">
                              <Phone className="w-3 h-3 text-gold" /> {e.phone}
                            </a>
                            {e.email && <span>| {e.email}</span>}
                          </div>
                        </td>
                        <td className="py-3 px-4 max-w-xs font-semibold text-navy">
                          {e.propertyTitle || 'General Inquiry'}
                        </td>
                        <td className="py-3 px-4 max-w-xs">
                          <div
                            onClick={() => setSelectedEnquiry(e)}
                            className="text-slate-600 line-clamp-2 cursor-pointer hover:text-navy font-normal"
                            title="Click to view full message"
                          >
                            {e.message}
                          </div>
                          <button
                            onClick={() => setSelectedEnquiry(e)}
                            className="text-[10px] text-gold font-bold hover:underline mt-0.5 inline-block"
                          >
                            View Full Message
                          </button>
                        </td>
                        <td className="py-3 px-4">
                          <select
                            value={e.status}
                            onChange={(evt) => handleStatusChange(e._id, evt.target.value)}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold border-0 cursor-pointer ${
                              e.status === 'New'
                                ? 'bg-amber-100 text-amber-800'
                                : e.status === 'Contacted'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Closed">Closed</option>
                          </select>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => setSelectedEnquiry(e)}
                              className="p-1.5 rounded-lg text-slate-500 hover:text-navy hover:bg-slate-100 transition-colors"
                              title="View Full Enquiry Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(e._id)}
                              className="p-1.5 rounded-lg text-red-600 hover:text-red-800 hover:bg-red-50 transition-colors"
                              title="Delete Enquiry"
                            >
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {enquiries.length === 0 && (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-slate-400">
                          No customer enquiries yet.
                        </td>
                      </tr>
                    )}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminEnquiriesPage;
