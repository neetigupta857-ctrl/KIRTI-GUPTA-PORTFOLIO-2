import React from 'react';
import { motion } from 'framer-motion';
import { SERVICES, Service } from '../data/services';
import ScrollStack, { ScrollStackItem } from './ScrollStack';
import {
  Palette,
  Feather,
  Share2,
  Layout,
  Briefcase,
  FileText,
  Presentation,
  CheckCircle2,
  Zap,
  Sparkles,
} from 'lucide-react';

interface ServicesProps {
  onInquiryClick?: () => void;
}

export const Services: React.FC<ServicesProps> = () => {
  const getIcon = (name: Service['iconName']) => {
    switch (name) {
      case 'Palette':
        return <Palette className="w-7 h-7 text-emerald-400" />;
      case 'Feather':
        return <Feather className="w-7 h-7 text-emerald-400" />;
      case 'Share2':
        return <Share2 className="w-7 h-7 text-emerald-400" />;
      case 'Layout':
        return <Layout className="w-7 h-7 text-emerald-400" />;
      case 'Briefcase':
        return <Briefcase className="w-7 h-7 text-emerald-400" />;
      case 'FileText':
        return <FileText className="w-7 h-7 text-emerald-400" />;
      case 'Presentation':
        return <Presentation className="w-7 h-7 text-emerald-400" />;
      default:
        return <Zap className="w-7 h-7 text-emerald-400" />;
    }
  };

  return (
    <section id="capabilities" className="py-24 sm:py-32 px-4 sm:px-6 relative z-10 bg-[#080909] border-y border-white/5">
      <div className="max-w-6xl mx-auto">
        
        {/* SECTION HEADING */}
        <div className="flex flex-col items-center text-center mb-16 sm:mb-20 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-widest mb-4"
          >
            <Sparkles className="w-4 h-4" />
            <span>Capabilities & Offerings</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight mb-4"
          >
            Crafting Design That Matters
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-offwhite-muted max-w-2xl"
          >
            Scroll through my specialized graphic design services, built to give your brand a competitive visual edge.
          </motion.p>
        </div>

        {/* SCROLL STACK CONTAINER */}
        <ScrollStack
          useWindowScroll={true}
          itemDistance={70}
          itemScale={0.025}
          itemStackDistance={24}
          stackPosition="12%"
          baseScale={0.92}
        >
          {SERVICES.map((service) => (
            <ScrollStackItem key={service.number}>
              <div className="group flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 h-full">
                {/* LEFT CONTENT AREA */}
                <div className="flex-1">
                  {/* TOP ROW: NUMBER & TAG */}
                  <div className="flex items-center gap-3.5 mb-5">
                    <span className="text-3xl font-black text-white/30 group-hover:text-emerald-400 transition-colors font-mono">
                      {service.number}
                    </span>

                    <span className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-bold text-emerald-300 uppercase tracking-wider font-mono">
                      {service.tag}
                    </span>
                  </div>

                  {/* TITLE & SUBTITLE */}
                  <h3 className="text-3xl sm:text-4xl font-bold text-white group-hover:text-emerald-300 transition-colors leading-tight mb-2 tracking-tight">
                    {service.title}
                  </h3>

                  <p className="text-xs sm:text-sm font-semibold text-emerald-400 uppercase tracking-wider mb-5">
                    {service.subtitle}
                  </p>

                  {/* DESCRIPTION */}
                  <p className="text-sm sm:text-base text-offwhite-muted leading-relaxed max-w-2xl mb-8">
                    {service.description}
                  </p>

                  {/* DELIVERABLE BULLETS GRID */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-6 border-t border-white/10">
                    {service.deliverables.map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-xs sm:text-sm text-offwhite-muted group-hover:text-white/90 transition-colors">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* RIGHT SIDE ICON BADGE */}
                <div className="flex items-center justify-end w-full lg:w-auto shrink-0">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-dark-900 border border-white/15 flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/40 transition-all duration-300 shadow-inner">
                    {getIcon(service.iconName)}
                  </div>
                </div>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>

      </div>
    </section>
  );
};

export default Services;
