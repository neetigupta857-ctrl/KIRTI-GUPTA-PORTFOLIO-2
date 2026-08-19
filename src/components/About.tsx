import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Quote, Award, Sparkle, Sparkles } from 'lucide-react';
import { LanyardCardFallback } from './LanyardCardFallback';
import { Magnet } from './Magnet';
import kirtiPhoto from '../assets/kirti-gupta.jpg';

const Lanyard = React.lazy(() => import('./Lanyard'));
interface AboutProps {
  onInquiryClick: () => void;
}

export const About: React.FC<AboutProps> = ({ onInquiryClick }) => {
  return (
    <section id="about" className="py-24 sm:py-32 px-4 sm:px-6 relative z-10 bg-[#080909] border-t border-white/5 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT: INTERACTIVE 3D LANYARD BADGE (6 cols - Full Left Side) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            data-speed="0.95"
            className="lg:col-span-6 relative flex flex-col items-center justify-center min-h-[550px] sm:min-h-[650px] lg:min-h-[780px] w-full"
          >
            {/* Background ambient radial glow */}
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-emerald-500/25 via-teal-500/15 to-transparent blur-3xl opacity-80 pointer-events-none" />

            {/* Interactive hint badge */}
            <div className="absolute top-0 z-20 pointer-events-none inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-semibold backdrop-blur-md shadow-xl">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>Drag & swing ID card</span>
            </div>

            {/* 3D Physics Lanyard Component */}
            <div className="w-full h-full flex items-center justify-center relative">
              <React.Suspense fallback={<LanyardCardFallback />}>
                <Lanyard position={[0, 0, 13]} gravity={[0, -40, 0]} frontImage={kirtiPhoto} fov={24} lanyardWidth={1.2} />
              </React.Suspense>
            </div>
          </motion.div>

          {/* RIGHT: ELEGANT TYPOGRAPHY & CREATIVE CARD (6 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            {/* BADGE PILL */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-widest mb-6 w-fit">
              <Sparkle className="w-3.5 h-3.5" />
              <span>About Me</span>
            </div>

            {/* ELEGANT BIO CARD CONTAINER */}
            <div className="relative p-6 sm:p-8 rounded-3xl bg-[#0D0F0F] border border-white/10 shadow-2xl backdrop-blur-xl mb-8 overflow-hidden group hover:border-emerald-500/30 transition-all duration-500">
              
              {/* Background Ambient Glow & Quote Watermark */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-colors pointer-events-none" />
              <Quote className="absolute top-4 right-6 w-20 h-20 text-white/[0.03] group-hover:text-emerald-500/[0.06] transition-colors pointer-events-none" />

              {/* HEADING / STATEMENT WITH ELEGANT SERIF ACCENTS */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white leading-snug tracking-tight mb-6 relative z-10">
                Where <span className="font-serif-elegant italic text-emerald-300 font-normal">modern minimalism</span>, luxury elegance, and creative playfulness meet <span className="font-serif-elegant italic text-emerald-300 font-normal">corporate clarity</span>.
              </h2>

              {/* BODY PARAGRAPHS */}
              <p className="text-base sm:text-lg text-offwhite-muted leading-relaxed mb-5 relative z-10 font-normal">
                I'm a Graphic Designer who loves building brands from the ground up – from logo design to complete visual systems. My pride project: <span className="text-white font-semibold underline decoration-emerald-400/60 underline-offset-4">Meraki Superspeciality Clinic's</span> entire identity.
              </p>

              <p className="text-base text-offwhite-muted leading-relaxed relative z-10">
                With <strong className="text-emerald-300 font-semibold">2 years of experience</strong> and a meticulous approach, I'm here to make your vision a reality. Let's connect.
              </p>

              {/* ELEGANT FOOTNOTE CHIPS */}
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-4 text-xs font-mono text-offwhite-muted">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <Award className="w-3.5 h-3.5" /> 2+ Years Experience
                </span>
                <span className="text-white/20">•</span>
                <span>Full Identity Systems</span>
                <span className="text-white/20">•</span>
                <span>Meticulous Precision</span>
              </div>
            </div>

            {/* CTA BUTTON */}
            <div>
              <Magnet magnetStrength={3} padding={60}>
                <button
                  onClick={onInquiryClick}
                  className="group inline-flex items-center gap-3 px-8 py-4 rounded-full text-xs font-bold text-black bg-brand-accent hover:bg-emerald-400 shadow-lg shadow-emerald-500/20 transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  <span>Let's Connect</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Magnet>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default About;
