import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPropertiesThunk,
  deletePropertyThunk,
  togglePropertyStatusThunk,
} from '../../store/slices/propertySlice';
import { showToast } from '../../store/slices/uiSlice';
import { Link } from 'react-router-dom';
import SEO from '../../components/common/SEO';
import ConfirmationModal from '../../components/admin/ConfirmationModal';
import { getImageUrl } from '../../services/api';
import { formatPrice } from '../../utils/formatters';
import { AdminTableSkeleton } from '../../components/common/Skeleton';
import {
  Building2,
  Plus,
  Edit,
  Trash2,
  Eye,
  Star,
  CheckCircle2,
  XCircle,
  MapPin,
  Search,
} from 'lucide-react';

const AdminPropertiesList = () => {
  const dispatch = useDispatch();
  const { list: properties, loading } = useSelector((state) => state.properties);

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchPropertiesThunk({ limit: 100 }));
  }, [dispatch]);

  const filteredProperties = properties.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggle = (id, field) => {
    dispatch(togglePropertyStatusThunk({ id, field }));
    dispatch(showToast({ type: 'success', message: `Property ${field} status toggled.` }));
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await dispatch(deletePropertyThunk(deleteTarget._id)).unwrap();
      dispatch(showToast({ type: 'success', message: 'Property and physical image files deleted.' }));
      setDeleteModalOpen(false);
    } catch (err) {
      dispatch(showToast({ type: 'error', message: err || 'Delete failed' }));
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  return (
    <>
      <SEO title="Properties Admin - Mahalaxmi Property" />

      <div className="space-y-6">
        <div className="flex flex-row sm:flex-row sm:items-center justify-between gap-1 md:gap-4 border-b-2 border-gtay-400 pb-2">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold font-heading text-navy-dark">Property Listings</h1>
            <p className="text-xs text-slate-500 mt-0.5">Manage, edit, publish, or delete properties.</p>
          </div>
          <Link
            to="/admin/properties/new"
            className="inline-flex items-center justify-center gap-2 px-1 py-1 md:px-4 md:py-3  rounded-xl bg-gradient-to-r from-gold via-gold-accent to-gold-dark text-navy-dark font-bold text-xs shadow-gold hover:shadow-glow transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Create Property</span>
          </Link>
        </div>

        {/* Search & Filter bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by property title or location..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:ring-1 focus:ring-gold"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </div>
          <div className="text-xs font-semibold text-slate-500 hidden sm:block">
            Total Listings: <span className="text-navy font-bold">{filteredProperties.length}</span>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <AdminTableSkeleton />
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-navy-dark text-white uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="py-3.5 px-4">Image</th>
                    <th className="py-3.5 px-4">Title & Location</th>
                    <th className="py-3.5 px-4">Type</th>
                    <th className="py-3.5 px-4">Price</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-center">Featured</th>
                    <th className="py-3.5 px-4 text-center">Published</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {filteredProperties.map((p) => (
                    <tr key={p._id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4">
                        <img
                          src={getImageUrl(p.images?.[0])}
                          alt={p.title}
                          className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                        />
                      </td>
                      <td className="py-3 px-4 max-w-xs">
                        <div className="font-bold text-navy-dark truncate">{p.title}</div>
                        <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5 truncate">
                          <MapPin className="w-3 h-3 text-gold shrink-0" />
                          <span>{p.location}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-700">
                          {p.propertyType}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-bold text-navy">
                        {p.priceLabel || formatPrice(p.price)}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            p.propertyStatus === 'Available'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {p.propertyStatus}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => handleToggle(p._id, 'featured')}
                          className={`p-1.5 rounded-lg transition-colors ${
                            p.featured ? 'bg-gold/20 text-gold-dark' : 'text-slate-300 hover:text-gold'
                          }`}
                        >
                          <Star className={`w-4 h-4 ${p.featured ? 'fill-current' : ''}`} />
                        </button>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => handleToggle(p._id, 'published')}
                          className={`p-1.5 rounded-lg transition-colors ${
                            p.published ? 'text-emerald-600' : 'text-slate-300'
                          }`}
                        >
                          {p.published ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                        </button>
                      </td>
                      <td className="py-3 px-4 text-right space-x-1">
                        <Link
                          to={`/properties/${p.slug}`}
                          target="_blank"
                          className="p-1.5 inline-block text-slate-500 hover:text-navy"
                          title="View Live"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          to={`/admin/properties/edit/${p._id}`}
                          className="p-1.5 inline-block text-blue-600 hover:text-blue-800"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => {
                            setDeleteTarget(p);
                            setDeleteModalOpen(true);
                          }}
                          className="p-1.5 text-red-600 hover:text-red-800"
                          title="Delete Property & Images"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredProperties.length === 0 && (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-slate-400">
                        No property listings found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={deleteModalOpen}
        title="Delete Property Listing"
        message={`Are you sure you want to delete "${deleteTarget?.title}"? This will permanently delete the property record and remove all physical image files from backend storage.`}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteModalOpen(false)}
        loading={deleting}
      />
    </>
  );
};

export default AdminPropertiesList;
