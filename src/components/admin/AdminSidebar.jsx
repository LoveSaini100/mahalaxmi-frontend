import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import Logo from '../common/Logo';
import {
  LayoutDashboard,
  Building2,
  MessageSquare,
  Star,
  Settings,
  LogOut,
  Globe,
  PlusCircle,
  X,
  Image as ImageIcon,
} from 'lucide-react';

const AdminSidebar = ({ mobileOpen, setMobileOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'All Properties', path: '/admin/properties', icon: Building2 },
    { name: 'Add Property', path: '/admin/properties/new', icon: PlusCircle },
    { name: 'Customer Enquiries', path: '/admin/enquiries', icon: MessageSquare },
    { name: 'Photo Gallery', path: '/admin/gallery', icon: ImageIcon },
    { name: 'Testimonials', path: '/admin/testimonials', icon: Star },
    { name: 'Site Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-navy-dark/70 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-navy-dark border-r border-gold/30 flex flex-col transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Header */}
        <div className="p-2 border-b border-navy-light flex items-center justify-between">
          <Logo variant="light" />
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-1.5 rounded-lg bg-navy text-slate-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 py-6 px-4 space-y-1.5 overflow-y-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <div className="text-[10px] font-bold uppercase tracking-widest text-gold/80 px-3 mb-2">
            ADMIN MANAGEMENT
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-navy text-gold border-l-4 border-gold shadow-md'
                      : 'text-slate-300 hover:bg-navy/60 hover:text-white'
                  }`
                }
              >
                <Icon className="w-4 h-4 text-gold shrink-0" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </div>

        {/* Footer Admin info & Logout */}
        <div className="p-2 border-t border-navy-light bg-navy/40 space-y-3">
          <div className="flex items-center gap-3 px-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gold to-gold-dark text-navy-dark font-bold flex items-center justify-center text-sm shadow-sm">
              {user?.name?.[0] || 'A'}
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-white truncate">{user?.name || 'Admin'}</div>
              <div className="text-[10px] text-slate-400 truncate">{user?.email || 'admin@mahalaxmiproperty.com'}</div>
            </div>
          </div>

          <div className="pt-2 flex items-center gap-2">
            <Link
              to="/"
              target="_blank"
              className="flex-1 py-2 px-3 rounded-xl bg-navy text-slate-200 text-[11px] font-semibold hover:text-gold flex items-center justify-center gap-1.5 border border-slate-700"
            >
              <Globe className="w-3.5 h-3.5 text-gold" />
              <span>Live Site</span>
            </Link>
            <button
              onClick={handleLogout}
              className="p-2 rounded-xl bg-red-950/60 text-red-300 hover:bg-red-900 hover:text-white border border-red-800 transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
