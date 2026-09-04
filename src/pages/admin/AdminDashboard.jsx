import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPropertiesThunk } from '../../store/slices/propertySlice';
import { fetchEnquiriesThunk } from '../../store/slices/enquirySlice';
import { Link } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import {
  Building2,
  Star,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  TrendingUp,
  Plus,
  ArrowUpRight,
  Eye,
} from 'lucide-react';
import EnquiryDetailModal from '../../components/admin/EnquiryDetailModal';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const properties = useSelector((state) => state.properties.list || []);
  const totalProperties = useSelector((state) => state.properties.total);
  const enquiries = useSelector((state) => state.enquiries.list || []);
  const enquiriesLoading = useSelector((state) => state.enquiries.loading);
  const enquiriesError = useSelector((state) => state.enquiries.error);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);

  useEffect(() => {
    dispatch(fetchPropertiesThunk());
    dispatch(fetchEnquiriesThunk());
  }, [dispatch]);

  const featuredCount = properties.filter((p) => p.featured).length;
  const availableCount = properties.filter((p) => p.propertyStatus === 'Available').length;
  const soldCount = properties.filter((p) => p.propertyStatus === 'Sold').length;
  const newEnquiriesCount = enquiries.filter((e) => e.status === 'New').length;

  return (
    <>
      <SEO title="Admin Dashboard - Mahalaxmi Property" />

      {selectedEnquiry && (
        <EnquiryDetailModal
          enquiry={selectedEnquiry}
          onClose={() => setSelectedEnquiry(null)}
        />
      )}

      <div className="space-y-8">
        <div className="flex flex-row sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold font-heading text-navy-dark">Dashboard Overview</h1>
            <p className="text-xs text-slate-500 mt-1">Real-time stats and performance for Mahalaxmi Property.</p>
          </div>
          <Link
            to="/admin/properties/new"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-navy text-gold font-bold text-xs shadow-md hover:bg-navy-dark transition-all shrink-0 whitespace-nowrap self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Property</span>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-5">
          <div className="p-2 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Total Properties</span>
              <div className="w-9 h-9 rounded-xl bg-navy/10 text-navy flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-bold font-heading text-navy-dark">{totalProperties || properties.length}</div>
            <div className="text-[12px] text-slate-400">Listings on platform</div>
          </div>

          <div className="p-2 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Featured Properties</span>
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-gold flex items-center justify-center">
                <Star className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-bold font-heading text-gold">{featuredCount}</div>
            <div className="text-[12px] text-slate-400">Home page carousel</div>
          </div>

          <div className="p-2 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Available Listings</span>
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-bold font-heading text-emerald-600">{availableCount}</div>
            <div className="text-[12px] text-slate-400">{soldCount} Sold</div>
          </div>

          <Link
            to="/admin/enquiries"
            className="p-2 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2 hover:border-gold/50 transition-all cursor-pointer block"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">Customer Enquiries</span>
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <MessageSquare className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-bold font-heading text-navy-dark">{enquiries.length}</div>
            <div className="text-[12px] text-amber-400 font-semibold">{newEnquiriesCount} New Unread</div>
          </Link>
        </div>

        {/* Recent Enquiries & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-12 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-bold font-heading text-navy-dark">Recent Customer Enquiries</h3>
              <Link to="/admin/enquiries" className="text-xs font-bold text-gold hover:underline flex items-center gap-1">
                <span>View All</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {enquiriesLoading ? (
                <div className="text-xs text-slate-400 py-4 text-center">Loading enquiries...</div>
              ) : enquiriesError ? (
                <div className="text-xs text-red-500 py-4 text-center flex flex-col items-center gap-2">
                  <span>Failed to load enquiries ({enquiriesError})</span>
                  <button
                    onClick={() => dispatch(fetchEnquiriesThunk())}
                    className="px-3 py-1 bg-navy text-white text-[11px] rounded-lg font-semibold hover:bg-navy-dark transition-all"
                  >
                    Retry
                  </button>
                </div>
              ) : (
                <>
                  {enquiries.slice(0, 5).map((e) => (
                    <div
                      key={e._id}
                      onClick={() => setSelectedEnquiry(e)}
                      className="p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-100 flex items-center justify-between text-xs cursor-pointer transition-all group"
                    >
                      <div className="flex-1 min-w-0 pr-4">
                        <div className="font-bold text-navy-dark group-hover:text-gold transition-colors">
                          {e.name} ({e.phone})
                        </div>
                        <div className="text-slate-500 text-[11px] mt-0.5 truncate">{e.propertyTitle}</div>
                        <div className="text-slate-400 text-[10px] line-clamp-1 mt-1 font-normal">
                          "{e.message}"
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          e.status === 'New' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {e.status}
                        </span>
                        <div className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-400 group-hover:text-navy group-hover:border-navy transition-all">
                          <Eye className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  ))}
                  {enquiries.length === 0 && <div className="text-xs text-slate-400 py-4 text-center">No enquiries yet.</div>}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
