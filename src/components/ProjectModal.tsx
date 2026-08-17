import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';
import { Project } from '../data/projects';
import { Magnet } from './Magnet';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onInquiryClick?: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-8 overflow-hidden">
        {/* Backdrop Blur Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/90 backdrop-blur-2xl cursor-pointer"
        />

        {/* Centered Magnified Photo Card - 3D Page Unfolding Animation */}
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.3,
            rotateX: 60,
            transformPerspective: 1200,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            rotateX: 0,
            transformPerspective: 1200,
          }}
          exit={{
            opacity: 0,
            scale: 0.3,
            rotateX: -40,
            transformPerspective: 1200,
          }}
          transition={{
            type: 'spring',
            damping: 22,
            stiffness: 250,
            mass: 0.7,
          }}
          className="relative max-w-4xl w-auto max-h-[92vh] bg-dark-950/95 border border-emerald-500/50 rounded-3xl overflow-hidden shadow-[0_30px_100px_-15px_rgba(16,185,129,0.3)] z-10 flex flex-col items-center justify-center origin-center p-3 sm:p-4"
        >
          {/* Close Button */}
          <Magnet magnetStrength={3} padding={30} wrapperClassName="absolute top-4 right-4 z-40">
            <button
              onClick={onClose}
              className="p-3 rounded-full bg-dark-950/90 border border-white/20 text-white hover:bg-emerald-500 hover:text-black transition-all shadow-2xl cursor-pointer"
              aria-label="Close photo preview"
            >
              <X className="w-5 h-5" />
            </button>
          </Magnet>

          {/* Full Portrait High-Res Photo Container */}
          <div className="relative flex flex-col items-center justify-center max-h-[85vh] w-full overflow-hidden rounded-2xl bg-dark-900 group">
            <img
              src={project.previewImage}
              alt={project.title}
              className="max-h-[80vh] w-auto max-w-full object-contain rounded-xl select-none transition-transform duration-500 group-hover:scale-[1.02]"
            />

            {/* Ambient Dark Gradient Overlay at Bottom */}
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-dark-950/95 via-dark-950/60 to-transparent pointer-events-none" />

            {/* Bottom Title & Metrics Badge */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none z-20">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-xs font-semibold text-emerald-300 backdrop-blur-md">
                  {project.category}
                </span>
                <h3 className="text-lg sm:text-2xl font-bold text-white tracking-tight drop-shadow-md">
                  {project.title}
                </h3>
              </div>

              {project.metrics && (
                <div className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-dark-950/90 border border-emerald-500/40 text-xs font-semibold text-emerald-300 backdrop-blur-md">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  {project.metrics}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectModal;
