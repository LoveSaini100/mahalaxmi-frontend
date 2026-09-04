import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearToast } from '../../store/slices/uiSlice';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ToastContainer = () => {
  const dispatch = useDispatch();
  const toast = useSelector((state) => state.ui.toast);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        dispatch(clearToast());
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast, dispatch]);

  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-none">
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`pointer-events-auto flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl border text-sm font-medium ${
              toast.type === 'error'
                ? 'bg-red-950/90 text-red-200 border-red-800 backdrop-blur-md'
                : toast.type === 'success'
                ? 'bg-navy-dark/95 text-white border-gold/40 shadow-gold backdrop-blur-md'
                : 'bg-navy/90 text-slate-100 border-slate-700 backdrop-blur-md'
            }`}
          >
            {toast.type === 'error' ? (
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            ) : toast.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-gold shrink-0" />
            ) : (
              <Info className="w-5 h-5 text-blue-400 shrink-0" />
            )}
            <span>{toast.message}</span>
            <button
              onClick={() => dispatch(clearToast())}
              className="ml-3 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer;
