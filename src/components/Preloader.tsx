import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Preloader: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Keep preloader visible for at least 3 seconds so full blinking animation completes
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-[#080909] text-emerald-400 select-none pointer-events-auto"
        >
          {/* Custom Emerald Text Shadow Monospace Loader */}
          <div className="loader" />
          
          <div className="mt-8 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-emerald-400/70">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Kirti Gupta Portfolio</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
