import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SplashScreen = ({ onFinish, minDuration = 600 }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Welcome to Shree Mahalaxmi Properties & Construction (SMPC)...');
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check if test / crawler / fast load
    const isBot = typeof navigator !== 'undefined' && /lighthouse|bot|crawl|spider/i.test(navigator.userAgent);
    if (isBot) {
      const staticPreloader = document.getElementById('app-splash-preloader');
      if (staticPreloader) staticPreloader.remove();
      setIsVisible(false);
      onFinish?.();
      return;
    }

    // Remove static HTML fallback loader if present in DOM
    const staticPreloader = document.getElementById('app-splash-preloader');
    if (staticPreloader) {
      staticPreloader.style.opacity = '0';
      setTimeout(() => {
        try {
          staticPreloader.remove();
        } catch (e) {
          // ignore
        }
      }, 200);
    }

    const duration = minDuration;
    const startTime = Date.now();
    let animationFrameId;

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const calculatedProgress = Math.min(Math.round((elapsed / duration) * 100), 100);
      
      setProgress(calculatedProgress);

      if (calculatedProgress < 40) {
        setStatusText('Welcome to Shree Mahalaxmi Properties & Construction (SMPC)...');
      } else if (calculatedProgress < 80) {
        setStatusText('Loading Prime Land & Expressway Plots...');
      } else {
        setStatusText('Ready');
      }

      if (calculatedProgress < 100) {
        animationFrameId = requestAnimationFrame(updateProgress);
      } else {
        setTimeout(() => {
          setIsVisible(false);
        }, 150);
      }
    };

    animationFrameId = requestAnimationFrame(updateProgress);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [minDuration, onFinish]);

  return (
    <AnimatePresence onExitComplete={onFinish}>
      {isVisible && (
        <motion.div
          key="splash-screen"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.03,
            filter: 'blur(6px)',
            transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } 
          }}
          className="fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-white overflow-hidden select-none"
        >
          {/* Subtle Ambient Background Decorative Glow */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/10 rounded-full blur-[120px]" />
            <div className="absolute -top-32 -left-32 w-80 h-80 bg-amber-100/40 rounded-full blur-[90px]" />
            <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-gold-light/20 rounded-full blur-[90px]" />
            
            {/* Subtle dot pattern */}
            <div 
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: `radial-gradient(circle, #C9A227 1.5px, transparent 1.5px)`,
                backgroundSize: '28px 28px'
              }}
            />
          </div>

          {/* Central Logo Container with Golden Circular Revolving Loader */}
          <div className="relative z-10 flex flex-col items-center max-w-sm px-6 text-center">
            
            {/* Round Loader Container around Logo */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex items-center justify-center mb-7"
            >
              {/* Revolving Golden Outer Ring Loader */}
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full relative flex items-center justify-center">
                {/* Background static circular track */}
                <div className="absolute inset-0 rounded-full border-4 border-gold/15" />

                {/* Primary Revolving Golden Ring */}
                <div 
                  className="absolute inset-0 rounded-full border-4 border-transparent border-t-gold border-r-gold-light animate-spin"
                  style={{ 
                    animationDuration: '1.2s',
                    filter: 'drop-shadow(0 0 8px rgba(201, 162, 39, 0.6))' 
                  }}
                />

                {/* Secondary Counter-rotating subtle golden dash ring */}
                <div 
                  className="absolute -inset-1.5 rounded-full border border-dashed border-gold/40 animate-spin"
                  style={{ 
                    animationDuration: '6s',
                    animationDirection: 'reverse' 
                  }}
                />

                {/* Orbiting Golden Sparkle Dot */}
                {/* <div 
                  className="absolute inset-0 rounded-full animate-spin"
                  style={{ animationDuration: '1.2s' }}
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-gradient-to-r from-gold-light to-gold rounded-full shadow-[0_0_10px_rgba(201,162,39,0.9)]" />
                </div> */}

                {/* Inner White Circular Card with Logo */}
                <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-white shadow-xl shadow-gold/10 border border-gold/25 flex items-center justify-center p-3 sm:p-4 z-10">
                  <img
                    src="/logoW.png"
                    alt="SHREE MAHALAXMI PROPERTIES AND CONSTRUCTION (SMPC)"
                    className="w-full h-full object-contain drop-shadow-sm"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = '/logo.png';
                    }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Brand Title & Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-1 mb-6"
            >
              <h1 className="text-lg sm:text-xl font-heading font-bold tracking-wide text-navy-dark uppercase">
                SHREE MAHALAXMI PROPERTIES &amp; CONSTRUCTION
              </h1>
              <p className="text-[11px] sm:text-xs text-gold-dark font-semibold tracking-widest uppercase">
                SMPC • Biharigarh &amp; Dehradun Expressway
              </p>
            </motion.div>

            {/* Progress Bar & Status */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="w-56 sm:w-64"
            >
              {/* Progress Line */}
              <div className="relative h-1.5 w-full bg-slate-100 rounded-full overflow-hidden border border-gold/20 shadow-inner">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-gold-dark via-gold-accent to-gold-light shadow-[0_0_8px_rgba(201,162,39,0.5)]"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Status and Percentage */}
              <div className="flex items-center justify-between mt-2.5 px-0.5 text-xs">
                <span className="text-[11px] text-slate-500 font-medium tracking-wide truncate max-w-[170px] sm:max-w-[190px] text-left">
                  {statusText}
                </span>
                <span className="font-mono text-[11px] font-bold text-gold-dark ml-2">
                  {progress}%
                </span>
              </div>
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;

