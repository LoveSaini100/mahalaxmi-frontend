import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createPropertyThunk, updatePropertyThunk } from '../../store/slices/propertySlice';
import { showToast } from '../../store/slices/uiSlice';
import { validateImageFile } from '../../utils/formatters';
import { getImageUrl } from '../../services/api';
import { Upload, X, Trash2, CheckCircle2, AlertCircle, Image as ImageIcon, ArrowLeft } from 'lucide-react';

const PropertyForm = ({ initialData = null, isEdit = false }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    shortDescription: initialData?.shortDescription || '',
    description: initialData?.description || '',
    propertyType: initialData?.propertyType || 'Residential',
    purpose: initialData?.purpose || 'Buy',
    location: initialData?.location || 'Biharigarh, Saharanpur',
    address: initialData?.address || '',
    city: initialData?.city || 'Saharanpur',
    state: initialData?.state || 'Uttar Pradesh',
    pincode: initialData?.pincode || '247662',
    price: initialData?.price || '',
    priceLabel: initialData?.priceLabel || '',
    area: initialData?.area || '',
    areaUnit: initialData?.areaUnit || 'Sq.Ft',
    bedrooms: initialData?.bedrooms || 0,
    bathrooms: initialData?.bathrooms || 0,
    floors: initialData?.floors || 1,
    propertyStatus: initialData?.propertyStatus || 'Available',
    amenities: initialData?.amenities?.join(', ') || 'Parking, Security, Power Backup',
    features: initialData?.features?.join(', ') || 'Vaastu Compliant, Clear Title',
    googleMapsUrl: initialData?.googleMapsUrl || '',
    latitude: initialData?.latitude || 30.2012,
    longitude: initialData?.longitude || 77.8384,
    featured: initialData?.featured || false,
    published: initialData?.published !== undefined ? initialData.published : true,
  });

  // Images state: existing URLs (string) or new File objects
  // Maximum 5 slots
  const [existingImages, setExistingImages] = useState(initialData?.images || []);
  const [newImageFiles, setNewImageFiles] = useState([]);
  const [uploadError, setUploadError] = useState('');

  const totalImagesCount = existingImages.length + newImageFiles.length;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Image Selection Handler (Validation: Max 5, Max 500KB each, MIME type)
  const handleFileSelect = (files) => {
    setUploadError('');
    const fileArray = Array.from(files);

    if (totalImagesCount + fileArray.length > 5) {
      setUploadError('Maximum 5 images are allowed.');
      dispatch(showToast({ type: 'error', message: 'Maximum 5 images are allowed.' }));
      return;
    }

    const validFiles = [];
    for (let file of fileArray) {
      const err = validateImageFile(file);
      if (err) {
        setUploadError(err);
        dispatch(showToast({ type: 'error', message: err }));
        return;
      }
      validFiles.push(file);
    }

    setNewImageFiles((prev) => [...prev, ...validFiles]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files);
    }
  };

  const removeExistingImage = (index) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeNewFile = (index) => {
    setNewImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.price || !formData.location) {
      dispatch(showToast({ type: 'error', message: 'Please fill in required fields: Title, Price, Location' }));
      return;
    }

    setLoading(true);

    try {
      const submitData = new FormData();
      Object.keys(formData).forEach((key) => {
        submitData.append(key, formData[key]);
      });

      // Parse amenities & features into arrays
      const amenitiesArr = formData.amenities.split(',').map((s) => s.trim()).filter(Boolean);
      const featuresArr = formData.features.split(',').map((s) => s.trim()).filter(Boolean);

      submitData.set('amenities', JSON.stringify(amenitiesArr));
      submitData.set('features', JSON.stringify(featuresArr));
      submitData.set('images', JSON.stringify(existingImages));

      // Append new file objects
      newImageFiles.forEach((file) => {
        submitData.append('images', file);
      });

      if (isEdit && initialData?._id) {
        await dispatch(updatePropertyThunk({ id: initialData._id, formData: submitData })).unwrap();
        dispatch(showToast({ type: 'success', message: 'Property updated successfully!' }));
      } else {
        await dispatch(createPropertyThunk(submitData)).unwrap();
        dispatch(showToast({ type: 'success', message: 'Property created successfully!' }));
      }

      navigate('/admin/properties');
    } catch (error) {
      dispatch(showToast({ type: 'error', message: error || 'Operation failed' }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto pb-12">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate('/admin/properties')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-navy"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Properties
        </button>
        <h1 className="text-2xl font-bold font-heading text-navy-dark">
          {isEdit ? 'Edit Property' : 'Create New Property'}
        </h1>
      </div>

      {/* Section 1: Basic Information */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-gold border-b pb-2">
          1. Basic Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="text-xs font-semibold text-slate-700">Property Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              placeholder="e.g. Luxury 4 BHK Highway Facing Villa"
              className="w-full mt-1 p-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:ring-1 focus:ring-gold"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700">Property Type *</label>
            <select
              name="propertyType"
              value={formData.propertyType}
              onChange={handleInputChange}
              className="w-full mt-1 p-2.5 rounded-xl border border-slate-200 text-xs font-medium"
            >
              {['Residential', 'Commercial', 'Plot', 'Land', 'Villa', 'Apartment', 'House', 'Shop', 'Office'].map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700">Purpose *</label>
            <select
              name="purpose"
              value={formData.purpose}
              onChange={handleInputChange}
              className="w-full mt-1 p-2.5 rounded-xl border border-slate-200 text-xs font-medium"
            >
              <option value="Buy">Buy</option>
              <option value="Sell">Sell</option>
              <option value="Investment">Investment</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="text-xs font-semibold text-slate-700">Short Description (Summary) *</label>
            <input
              type="text"
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleInputChange}
              maxLength={300}
              required
              placeholder="Brief 1-2 sentence overview for property cards..."
              className="w-full mt-1 p-2.5 rounded-xl border border-slate-200 text-xs font-medium"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="text-xs font-semibold text-slate-700">Full Description *</label>
            <textarea
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleInputChange}
              required
              placeholder="Detailed description of features, construction quality, locality, etc..."
              className="w-full mt-1 p-2.5 rounded-xl border border-slate-200 text-xs font-medium"
            />
          </div>
        </div>
      </div>

      {/* Section 2: Property Specifications & Pricing */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-gold border-b pb-2">
          2. Specifications & Pricing
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-700">Price (Numeric in ₹) *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
              placeholder="e.g. 12500000"
              className="w-full mt-1 p-2.5 rounded-xl border border-slate-200 text-xs font-medium"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700">Price Display Label *</label>
            <input
              type="text"
              name="priceLabel"
              value={formData.priceLabel}
              onChange={handleInputChange}
              required
              placeholder="e.g. ₹ 1.25 Crore"
              className="w-full mt-1 p-2.5 rounded-xl border border-slate-200 text-xs font-medium"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700">Area Value *</label>
            <input
              type="number"
              name="area"
              value={formData.area}
              onChange={handleInputChange}
              required
              placeholder="e.g. 2800"
              className="w-full mt-1 p-2.5 rounded-xl border border-slate-200 text-xs font-medium"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700">Area Unit</label>
            <select
              name="areaUnit"
              value={formData.areaUnit}
              onChange={handleInputChange}
              className="w-full mt-1 p-2.5 rounded-xl border border-slate-200 text-xs font-medium"
            >
              <option value="Sq.Ft">Sq.Ft</option>
              <option value="Sq.Yards">Sq.Yards</option>
              <option value="Acres">Acres</option>
              <option value="Bigha">Bigha</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700">Bedrooms</label>
            <input
              type="number"
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleInputChange}
              className="w-full mt-1 p-2.5 rounded-xl border border-slate-200 text-xs font-medium"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700">Bathrooms</label>
            <input
              type="number"
              name="bathrooms"
              value={formData.bathrooms}
              onChange={handleInputChange}
              className="w-full mt-1 p-2.5 rounded-xl border border-slate-200 text-xs font-medium"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700">Property Status</label>
            <select
              name="propertyStatus"
              value={formData.propertyStatus}
              onChange={handleInputChange}
              className="w-full mt-1 p-2.5 rounded-xl border border-slate-200 text-xs font-medium"
            >
              <option value="Available">Available</option>
              <option value="Sold">Sold</option>
              <option value="Reserved">Reserved</option>
              <option value="Coming Soon">Coming Soon</option>
            </select>
          </div>
        </div>
      </div>

      {/* Section 3: Location Details */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-gold border-b pb-2">
          3. Location Details
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="text-xs font-semibold text-slate-700">Location Heading *</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              required
              placeholder="Dehradun-Saharanpur Highway, Biharigarh"
              className="w-full mt-1 p-2.5 rounded-xl border border-slate-200 text-xs font-medium"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="text-xs font-semibold text-slate-700">Full Address *</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
              placeholder="Near Pencho Restaurant, Dehradun-Saharanpur Highway"
              className="w-full mt-1 p-2.5 rounded-xl border border-slate-200 text-xs font-medium"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="w-full mt-1 p-2.5 rounded-xl border border-slate-200 text-xs font-medium"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700">Pincode</label>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleInputChange}
              className="w-full mt-1 p-2.5 rounded-xl border border-slate-200 text-xs font-medium"
            />
          </div>
        </div>
      </div>

      {/* Section 4: Image Management (5 slots max, 500 KB limit validation) */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b pb-2">
          <h3 className="text-sm font-bold uppercase tracking-wider text-gold">
            4. Property Images (Max 5 Slots | 500 KB Max Per Image)
          </h3>
          <span className="text-xs font-semibold text-slate-500">
            {totalImagesCount} / 5 Images
          </span>
        </div>

        {uploadError && (
          <div className="p-3 rounded-xl bg-red-50 text-red-700 border border-red-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{uploadError}</span>
          </div>
        )}

        {/* Drag & Drop Upload Zone */}
        {totalImagesCount < 5 && (
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="border-2 border-dashed border-gold/40 rounded-2xl p-6 text-center bg-slate-50 hover:bg-amber-50/30 transition-colors cursor-pointer"
          >
            <input
              type="file"
              id="property-image-input"
              multiple
              accept="image/jpeg,image/png,image/webp"
              onChange={(e) => handleFileSelect(e.target.files)}
              className="hidden"
            />
            <label htmlFor="property-image-input" className="cursor-pointer block space-y-2">
              <Upload className="w-8 h-8 text-gold mx-auto" />
              <div className="text-xs font-bold text-navy-dark">
                Drag & Drop images here or <span className="text-gold">Browse Files</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Supports JPG, JPEG, PNG, WEBP (Max 500 KB each, up to 5 total images)
              </p>
            </label>
          </div>
        )}

        {/* 5 Slots Preview Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
          {/* Render Existing Images */}
          {existingImages.map((imgUrl, index) => (
            <div key={`existing-${index}`} className="relative aspect-square rounded-xl overflow-hidden border border-slate-200 bg-slate-100 group">
              <img src={getImageUrl(imgUrl)} alt={`Slot ${index + 1}`} className="w-full h-full object-cover" />
              <div className="absolute top-1.5 left-1.5 bg-navy/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md">
                Slot {index + 1}
              </div>
              <button
                type="button"
                onClick={() => removeExistingImage(index)}
                className="absolute top-1.5 right-1.5 p-1 rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors"
                title="Remove image"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}

          {/* Render New File Objects */}
          {newImageFiles.map((file, index) => (
            <div key={`new-${index}`} className="relative aspect-square rounded-xl overflow-hidden border border-gold bg-slate-100 group">
              <img src={URL.createObjectURL(file)} alt={`New ${index + 1}`} className="w-full h-full object-cover" />
              <div className="absolute top-1.5 left-1.5 bg-gold text-navy-dark text-[10px] font-bold px-1.5 py-0.5 rounded-md">
                New ({(file.size / 1024).toFixed(0)} KB)
              </div>
              <button
                type="button"
                onClick={() => removeNewFile(index)}
                className="absolute top-1.5 right-1.5 p-1 rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}

          {/* Empty Placeholder Slots */}
          {Array.from({ length: Math.max(0, 5 - totalImagesCount) }).map((_, i) => (
            <div
              key={`empty-${i}`}
              className="aspect-square rounded-xl border border-dashed border-slate-300 bg-slate-50 flex flex-col items-center justify-center text-slate-400 text-[11px]"
            >
              <ImageIcon className="w-5 h-5 mb-1 text-slate-300" />
              <span>Slot {totalImagesCount + i + 1}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Section 5: Publishing Options */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleInputChange}
              className="w-4 h-4 text-gold rounded border-slate-300 focus:ring-gold"
            />
            <span className="text-xs font-semibold text-navy-dark">Feature on Home Page Slider</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="published"
              checked={formData.published}
              onChange={handleInputChange}
              className="w-4 h-4 text-gold rounded border-slate-300 focus:ring-gold"
            />
            <span className="text-xs font-semibold text-navy-dark">Publish Live on Website</span>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="py-3 px-8 rounded-xl bg-gradient-to-r from-gold via-gold-accent to-gold-dark text-navy-dark font-bold text-sm shadow-gold hover:shadow-glow transition-all"
        >
          {loading ? 'Saving Property...' : isEdit ? 'Update Property' : 'Publish Property'}
        </button>
      </div>
    </form>
  );
};

export default PropertyForm;
