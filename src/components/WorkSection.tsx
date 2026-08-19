import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS, Project } from '../data/projects';
import CircularGallery from './CircularGallery';
import { ProjectModal } from './ProjectModal';
import { Magnet } from './Magnet';
import { Layers, ArrowUpRight } from 'lucide-react';

interface WorkSectionProps {
  onInquiryClick?: () => void;
}

export const WorkSection: React.FC<WorkSectionProps> = ({ onInquiryClick }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredItem, setHoveredItem] = useState<{
    index: number;
    pos: { xPercent: number; yPercent: number };
  } | null>(null);

  const galleryItems = PROJECTS.map((p) => ({
    image: p.previewImage,
    text: p.title,
  }));

  const handleItemClick = (index: number) => {
    if (PROJECTS[index]) {
      setSelectedProject(PROJECTS[index]);
    }
  };

  const handleHoverItem = (
    index: number | null,
    pos: { xPercent: number; yPercent: number } | null
  ) => {
    if (index !== null && pos !== null) {
      setHoveredItem({ index, pos });
    } else {
      setHoveredItem(null);
    }
  };

  useEffect(() => {
    const handleTrigger = () => {
      const idx = (window as any).__hoveredProjectIndex ?? 0;
      if (PROJECTS[idx]) {
        setSelectedProject(PROJECTS[idx]);
      }
    };
    window.addEventListener('trigger-project-modal-open', handleTrigger);
    return () => window.removeEventListener('trigger-project-modal-open', handleTrigger);
  }, []);

  return (
    <section id="work" className="py-20 sm:py-28 relative z-10 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-8 text-center sm:text-left">
        {/* SECTION BADGE & HEADING */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-4"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Portfolio & Case Studies</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-3"
        >
          Selected work
        </motion.h2>
      </div>

      {/* FULL-SCREEN 3D CIRCULAR GALLERY ONLY */}
      <div className="w-screen relative left-1/2 -translate-x-1/2 h-[75vh] min-h-[550px] max-h-[800px]">
        <CircularGallery
          items={galleryItems}
          bend={3}
          textColor="#ffffff"
          borderRadius={0.05}
          scrollSpeed={2}
          scrollEase={0.05}
          onItemClick={handleItemClick}
          onHoverItem={handleHoverItem}
        />

        {/* Centered Floating VIEW PROJECT Panel on Each Hovered Project Photo */}
        <AnimatePresence>
          {hoveredItem !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              style={{
                left: `${hoveredItem.pos.xPercent}%`,
                top: `${hoveredItem.pos.yPercent}%`,
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none z-40"
            >
              <Magnet magnetStrength={3} padding={40}>
                <button
                  onClick={() => handleItemClick(hoveredItem.index)}
                  className="pointer-events-auto px-5 py-2.5 rounded-full bg-dark-950/95 border border-emerald-500/70 text-white font-bold text-xs uppercase tracking-wider shadow-[0_10px_30px_-5px_rgba(16,185,129,0.5)] backdrop-blur-xl hover:bg-emerald-500 hover:text-black hover:scale-110 active:scale-95 transition-all duration-300 flex items-center gap-2 cursor-pointer"
                >
                  <span>View project</span>
                  <ArrowUpRight className="w-4 h-4 text-emerald-400" />
                </button>
              </Magnet>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 3D PAGE UNFOLDING MAGNIFIED PHOTO LIGHTBOX MODAL */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onInquiryClick={onInquiryClick || (() => {})}
      />
    </section>
  );
};

export default WorkSection;
