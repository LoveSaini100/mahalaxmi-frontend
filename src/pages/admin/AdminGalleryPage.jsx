import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchGalleryThunk,
  createGalleryItemThunk,
  updateGalleryItemThunk,
  deleteGalleryItemThunk,
} from '../../store/slices/gallerySlice';
import { showToast } from '../../store/slices/uiSlice';
import SEO from '../../components/common/SEO';
import { getImageUrl } from '../../services/api';
import { formatDate } from '../../utils/formatters';
import {
  Plus,
  Edit2,
  Trash2,
  Eye,
  X,
  Upload,
  Image as ImageIcon,
  Search,
  Filter,
  AlertCircle,
} from 'lucide-react';

const AdminGalleryPage = () => {
  const dispatch = useDispatch();
  const { list: galleryItems = [], loading, error } = useSelector((state) => state.gallery);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);

  // Form State (Local file upload only)
  const [formData, setFormData] = useState({
    title: '',
    category: 'Villa',
    description: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [fileWarning, setFileWarning] = useState('');

  useEffect(() => {
    dispatch(fetchGalleryThunk());
  }, [dispatch]);

  const categories = ['All', 'Villa', 'Residential', 'Commercial', 'Plots', 'General'];

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      category: 'Villa',
      description: '',
    });
    setImageFile(null);
    setImagePreview('');
    setFileWarning('');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title || '',
      category: item.category || 'General',
      description: item.description || '',
    });
    setImageFile(null);
    setImagePreview(getImageUrl(item.url));
    setFileWarning('');
    setIsModalOpen(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileWarning('');

    if (file) {
      const fileSizeKB = (file.size / 1024).toFixed(1);
      if (file.size > 500 * 1024) {
        const warnMsg = `⚠️ File size warning: Selected photo is ${fileSizeKB} KB. Maximum allowed size is 500 KB!`;
        setFileWarning(warnMsg);
        dispatch(showToast({ type: 'error', message: `Photo size (${fileSizeKB} KB) exceeds 500 KB limit!` }));
        e.target.value = null;
        setImageFile(null);
        setImagePreview('');
        return;
      }

      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      dispatch(showToast({ type: 'success', message: `Photo selected (${fileSizeKB} KB) - Ready!` }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      dispatch(showToast({ type: 'error', message: 'Photo title is required' }));
      return;
    }

    if (!editingItem && !imageFile) {
      dispatch(showToast({ type: 'error', message: 'Please select an image file from your device' }));
      return;
    }

    if (imageFile && imageFile.size > 500 * 1024) {
      dispatch(showToast({ type: 'error', message: 'Selected photo exceeds 500 KB limit. Please choose a smaller photo.' }));
      return;
    }

    try {
      let payload;
      if (imageFile) {
        payload = new FormData();
        payload.append('title', formData.title);
        payload.append('category', formData.category);
        payload.append('description', formData.description);
        payload.append('image', imageFile);
      } else {
        payload = {
          title: formData.title,
          category: formData.category,
          description: formData.description,
        };
      }

      if (editingItem) {
        await dispatch(updateGalleryItemThunk({ id: editingItem._id, galleryData: payload })).unwrap();
        dispatch(showToast({ type: 'success', message: 'Gallery photo updated successfully' }));
      } else {
        await dispatch(createGalleryItemThunk(payload)).unwrap();
        dispatch(showToast({ type: 'success', message: 'Photo uploaded to gallery successfully' }));
      }

      setIsModalOpen(false);
    } catch (err) {
      dispatch(showToast({ type: 'error', message: err || 'Failed to save gallery photo' }));
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this gallery photo?')) {
      dispatch(deleteGalleryItemThunk(id));
      dispatch(showToast({ type: 'success', message: 'Gallery photo deleted' }));
    }
  };

  // Filter items
  const filteredItems = galleryItems.filter((item) => {
    const matchesSearch =
      item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <SEO title="Manage Gallery - Mahalaxmi Admin" />

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="max-w-4xl max-h-[85vh] space-y-3" onClick={(e) => e.stopPropagation()}>
            <img
              src={getImageUrl(lightboxImage.url)}
              alt={lightboxImage.title}
              className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl mx-auto border border-white/20"
            />
            <div className="text-center text-white space-y-1">
              <h3 className="text-lg font-bold">{lightboxImage.title}</h3>
              <p className="text-xs text-gold font-semibold uppercase">{lightboxImage.category}</p>
              {lightboxImage.description && (
                <p className="text-xs text-slate-300 max-w-md mx-auto">{lightboxImage.description}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 bg-navy text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-gold" />
                <h2 className="text-base font-bold font-heading">
                  {editingItem ? 'Edit Gallery Photo' : 'Add New Gallery Photo'}
                </h2>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs text-slate-700">
              {/* Title */}
              <div>
                <label className="block font-bold text-navy-dark mb-1">Photo Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Luxury Highway Villa Frontage"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-gold"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block font-bold text-navy-dark mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-gold bg-white"
                >
                  <option value="Villa">Villa</option>
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Plots">Plots & Land</option>
                  <option value="General">General</option>
                </select>
              </div>

              {/* Device Image File Upload */}
              <div className="space-y-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <label className="block font-bold text-navy-dark">
                  Upload Photo from Device * {editingItem && '(Leave blank to keep existing photo)'}
                </label>

                {fileWarning && (
                  <div className="p-3 rounded-xl bg-red-50 text-red-700 border border-red-200 text-xs flex items-center gap-2 animate-fadeIn">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                    <span className="font-semibold">{fileWarning}</span>
                  </div>
                )}

                <div>
                  <label className="flex flex-col items-center justify-center gap-2 p-5 rounded-xl border-2 border-dashed border-slate-300 hover:border-gold bg-white cursor-pointer transition-colors text-slate-600 font-semibold text-center">
                    <Upload className="w-6 h-6 text-gold" />
                    <span>Choose Image File from Computer / Mobile</span>
                    <span className="text-[10px] text-slate-400 font-normal">Supports JPG, JPEG, PNG, WEBP (Max 500 KB)</span>
                    <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                  </label>
                </div>

                {/* Preview */}
                {imagePreview && (
                  <div className="mt-2 text-center space-y-1">
                    <span className="text-[10px] text-slate-400 font-semibold block">Image Preview</span>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-44 object-cover rounded-xl border border-slate-200 shadow-xs"
                    />
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block font-bold text-navy-dark mb-1">Short Description (Optional)</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="e.g. Front view of 4 BHK villa near Biharigarh Highway..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-gold"
                />
              </div>

              {/* Buttons */}
              <div className="pt-3 flex items-center justify-end gap-3 border-t">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-600 font-bold hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-navy text-gold font-bold hover:bg-navy-dark shadow-md"
                >
                  {editingItem ? 'Update Photo' : 'Upload & Add Photo'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Main Page Layout */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold font-heading text-navy-dark">Property Gallery Management</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Upload from device, view, edit, and organize showcase images for Mahalaxmi Property.
            </p>
          </div>
          <button
            onClick={handleOpenAddModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-navy text-gold font-bold text-xs shadow-md hover:bg-navy-dark transition-all shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Upload New Photo</span>
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm text-xs">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title or category..."
              className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-gold"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            <Filter className="w-4 h-4 text-gold shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl font-bold text-[11px] whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-navy text-gold shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center text-slate-400 text-xs">
            Loading gallery photos...
          </div>
        ) : error ? (
          <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center text-red-500 text-xs flex flex-col items-center gap-2">
            <span>Failed to load gallery ({error})</span>
            <button
              onClick={() => dispatch(fetchGalleryThunk())}
              className="px-3 py-1 bg-navy text-white text-[11px] rounded-lg font-semibold"
            >
              Retry
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredItems.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                  <img
                    src={getImageUrl(item.url)}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-navy-dark/90 text-gold shadow-md">
                    {item.category || 'General'}
                  </span>
                </div>

                <div className="p-2 md:p-4 md:space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-navy-dark text-xs line-clamp-1">{item.title}</h3>
                    {item.description && (
                      <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">{item.description}</p>
                    )}
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                    <span>{formatDate(item.createdAt)}</span>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setLightboxImage(item)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-navy hover:bg-slate-100"
                        title="View Photo"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleOpenEditModal(item)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-gold hover:bg-slate-100"
                        title="Edit Photo"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="p-1.5 rounded-lg text-red-600 hover:text-red-800 hover:bg-red-50"
                        title="Delete Photo"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {filteredItems.length === 0 && (
              <div className="col-span-full bg-white p-12 rounded-2xl border border-slate-200 text-center text-slate-400 text-xs">
                No gallery photos found. Click "Upload New Photo" to choose an image from your device.
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default AdminGalleryPage;
