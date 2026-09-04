import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginAdminThunk } from '../../store/slices/authSlice';
import Logo from '../../components/common/Logo';
import SEO from '../../components/common/SEO';
import { Lock, Mail, Key, ShieldCheck, Eye, EyeOff } from 'lucide-react';

const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('admin@mahalaxmiproperty.in');
  const [password, setPassword] = useState('mahalaxmi@123456');
  const [showPassword, setShowPassword] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginAdminThunk({ email, password }));
    if (loginAdminThunk.fulfilled.match(result)) {
      navigate('/admin/dashboard');
    }
  };

  return (
    <>
      <SEO title="Admin Login - Mahalaxmi Property" />
      <div className="min-h-screen bg-navy-dark flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background Lights */}
        <div className="absolute top-10 left-10 w-80 h-80 bg-gold/10 rounded-full filter blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gold/10 rounded-full filter blur-3xl pointer-events-none" />

        <div className="max-w-md w-full bg-navy rounded-3xl p-8 border border-gold/30 shadow-2xl space-y-6 relative z-10">
          <div className="text-center space-y-2">
            <Logo variant="light" className="justify-center" />
            <div className="pt-2 flex items-center justify-center gap-1.5 text-xs text-gold font-semibold uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4" />
              <span>ADMINISTRATOR ACCESS</span>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-950/80 text-red-200 border border-red-800 text-xs text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1 mb-1">
                <Mail className="w-3.5 h-3.5 text-gold" />
                Admin Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-navy-dark border border-slate-700 text-white text-xs font-medium focus:border-gold focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1 mb-1">
                <Key className="w-3.5 h-3.5 text-gold" />
                Admin Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 pr-10 rounded-xl bg-navy-dark border border-slate-700 text-white text-xs font-medium focus:border-gold focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-gold transition-colors focus:outline-none"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-gold via-gold-accent to-gold-dark text-navy-dark font-bold text-xs shadow-gold hover:shadow-glow transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Login to Dashboard</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
