import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <>
      <SEO title="Page Not Found - Mahalaxmi Property" />
      <div className="min-h-[75vh] bg-brand-offwhite flex items-center justify-center pt-24 pb-16 px-4">
        <div className="text-center space-y-6 max-w-md">
          <div className="text-8xl font-bold font-heading text-gold">404</div>
          <h1 className="text-2xl font-bold font-heading text-navy-dark">Page Not Found</h1>
          <p className="text-xs text-slate-500">
            The page you are looking for might have been removed or is temporarily unavailable.
          </p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <Link
              to="/"
              className="px-6 py-3 rounded-xl bg-navy text-gold text-xs font-bold shadow-md hover:bg-navy-dark flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
            <Link
              to="/properties"
              className="px-6 py-3 rounded-xl bg-white border border-slate-300 text-navy text-xs font-bold hover:bg-slate-50 flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Browse Properties</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
