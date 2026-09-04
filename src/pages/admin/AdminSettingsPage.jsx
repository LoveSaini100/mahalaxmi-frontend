import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSettingsThunk, updateSettingsThunk } from '../../store/slices/settingsSlice';
import { showToast } from '../../store/slices/uiSlice';
import SEO from '../../components/common/SEO';
import { Save, Building, Phone, MapPin, Mail, User, Clock, Globe } from 'lucide-react';

const AdminSettingsPage = () => {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings.data);

  const [form, setForm] = useState(settings);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchSettingsThunk());
  }, [dispatch]);

  useEffect(() => {
    if (settings) setForm(settings);
  }, [settings]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await dispatch(updateSettingsThunk(form)).unwrap();
      dispatch(showToast({ type: 'success', message: 'Site Settings updated successfully!' }));
    } catch (err) {
      dispatch(showToast({ type: 'error', message: err || 'Update failed' }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO title="Site Settings - Mahalaxmi Admin" />

      <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold font-heading text-navy-dark">Website Settings</h1>
            <p className="text-xs text-slate-500 mt-0.5">Manage global company contact info, founder message, and SEO defaults.</p>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 rounded-xl bg-navy text-gold font-bold text-xs shadow-md hover:bg-navy-dark flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>{loading ? 'Saving...' : 'Save Settings'}</span>
          </button>
        </div>

        {/* Company & Contact */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold font-heading text-navy border-b pb-2 uppercase tracking-wider">
            Company & Contact Info
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Company Name</label>
              <input
                type="text"
                name="companyName"
                value={form.companyName || ''}
                onChange={handleChange}
                className="w-full p-2.5 rounded-xl border border-slate-200"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Tagline</label>
              <input
                type="text"
                name="tagline"
                value={form.tagline || ''}
                onChange={handleChange}
                className="w-full p-2.5 rounded-xl border border-slate-200"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={form.phone || ''}
                onChange={handleChange}
                className="w-full p-2.5 rounded-xl border border-slate-200"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">WhatsApp Number</label>
              <input
                type="text"
                name="whatsApp"
                value={form.whatsApp || ''}
                onChange={handleChange}
                className="w-full p-2.5 rounded-xl border border-slate-200"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="font-semibold text-slate-700 block mb-1">Official Address</label>
              <input
                type="text"
                name="address"
                value={form.address || ''}
                onChange={handleChange}
                className="w-full p-2.5 rounded-xl border border-slate-200"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={form.email || ''}
                onChange={handleChange}
                className="w-full p-2.5 rounded-xl border border-slate-200"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Business Hours</label>
              <input
                type="text"
                name="businessHours"
                value={form.businessHours || ''}
                onChange={handleChange}
                className="w-full p-2.5 rounded-xl border border-slate-200"
              />
            </div>
          </div>
        </div>

        {/* Founder Details */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold font-heading text-navy border-b pb-2 uppercase tracking-wider">
            Founder Message Configuration
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Founder Name</label>
              <input
                type="text"
                name="founderName"
                value={form.founderName || ''}
                onChange={handleChange}
                className="w-full p-2.5 rounded-xl border border-slate-200"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Founder Title</label>
              <input
                type="text"
                name="founderTitle"
                value={form.founderTitle || ''}
                onChange={handleChange}
                className="w-full p-2.5 rounded-xl border border-slate-200"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="font-semibold text-slate-700 block mb-1">Founder Message Text</label>
              <textarea
                name="founderMessage"
                rows={4}
                value={form.founderMessage || ''}
                onChange={handleChange}
                className="w-full p-2.5 rounded-xl border border-slate-200"
              />
            </div>
          </div>
        </div>

        {/* SEO Defaults */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold font-heading text-navy border-b pb-2 uppercase tracking-wider">
            SEO & Metadata Defaults
          </h3>
          <div className="space-y-4 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Default Website SEO Title</label>
              <input
                type="text"
                name="seoTitle"
                value={form.seoTitle || ''}
                onChange={handleChange}
                className="w-full p-2.5 rounded-xl border border-slate-200"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Default Meta Description</label>
              <textarea
                name="seoDescription"
                rows={2}
                value={form.seoDescription || ''}
                onChange={handleChange}
                className="w-full p-2.5 rounded-xl border border-slate-200"
              />
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default AdminSettingsPage;
