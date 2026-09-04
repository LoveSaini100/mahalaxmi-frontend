import React from 'react';
import { Menu, Bell, User, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminHeader = ({ setMobileOpen }) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setMobileOpen(true)}
          className="lg:hidden p-2 rounded-xl text-navy hover:bg-slate-100 focus:outline-none"
          aria-label="Open sidebar menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h2 className="text-sm sm:text-lg font-bold font-heading text-navy-dark">
          <span className="hidden sm:inline">Mahalaxmi Property Management Panel</span>
          <span className="sm:hidden">Mahalaxmi Admin</span>
        </h2>
      </div>

      <div className="flex items-center gap-3">
        <Link
          to="/admin/properties/new"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-gold via-gold-accent to-gold-dark text-navy-dark font-bold text-xs shadow-sm hover:scale-[1.02] transition-transform"
        >
          <Plus className="w-4 h-4" />
          <span>New Property</span>
        </Link>
      </div>
    </header>
  );
};

export default AdminHeader;
