import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Code, CheckCircle, Layers } from 'lucide-react';

interface HeroProps {
  onWorkClick: () => void;
  onInquiryClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onWorkClick, onInquiryClick }) => {
  // Overlapping avatar images
  const clientAvatars = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80',
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-center pt-28 pb-16 px-4 sm:px-6 overflow-hidden select-none"
    >
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center z-10">
        
        {/* TOP STATUS PILL TAG */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-md mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
            Graphic Designer
          </span>
        </motion.div>

        {/* MAIN HEADLINE */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-[84px] font-bold tracking-tight text-white leading-tight sm:leading-tighter mb-6 text-balance"
        >
          Strategic Visuals <br />
          <span className="bg-gradient-to-r from-white via-slate-200 to-emerald-400 bg-clip-text text-transparent">
            Delivered Precisely
          </span>
        </motion.h1>

        {/* SUBHEADLINE */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-lg md:text-xl text-offwhite-muted max-w-2xl font-normal leading-relaxed mb-10 text-balance"
        >
          Translating your vision into impactful realities
        </motion.p>

        {/* HERO CTA BUTTONS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-14"
        >
          {/* Primary CTA */}
          <button
            onClick={onInquiryClick}
            className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-full font-semibold text-sm text-black bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-400 hover:from-emerald-300 hover:to-teal-300 shadow-glow-emerald transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0"
          >
            <span>Contact me</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Secondary CTA */}
          <button
            onClick={onWorkClick}
            className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full font-medium text-sm text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25 backdrop-blur-md transition-all duration-300 transform hover:-translate-y-0.5"
          >
            {/* Custom Webflow W icon */}
            <svg
              className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M16.5 4.5l-3.3 9.9L10.2 4.5H6.9l-3.3 9.9L.3 4.5H0l4.2 15h3.3l3.3-9.9 3.3 9.9h3.3l4.2-15h-.6z" />
            </svg>
            <span>Explore my projects</span>
          </button>
        </motion.div>

        {/* HERO TRUST INDICATOR */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-3 px-5 py-2.5 rounded-full bg-white/[0.02] border border-white/10 backdrop-blur-lg"
        >
          {/* Overlapping client avatars */}
          <div className="flex items-center -space-x-2.5">
            {clientAvatars.map((url, i) => (
              <img
                key={i}
                src={url}
                alt={`Client avatar ${i + 1}`}
                className="w-7 h-7 rounded-full object-cover border-2 border-[#080909] shadow-sm"
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-white">
              100+ successful projects
            </span>
            <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5 inline" />
              100% Client Rating
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
