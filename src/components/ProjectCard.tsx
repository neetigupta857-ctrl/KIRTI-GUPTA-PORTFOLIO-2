import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { Project } from '../data/projects';
import TiltedCard from './TiltedCard';

interface ProjectCardProps {
  project: Project;
  onSelectProject: (project: Project) => void;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelectProject, index }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      data-cursor="project"
      onClick={() => onSelectProject(project)}
      className="group relative cursor-pointer flex flex-col rounded-3xl bg-surface-card border border-surface-border overflow-visible hover:border-surface-borderHover hover:bg-surface-cardHover transition-all duration-500 shadow-glass-card p-2"
    >
      {/* VISUAL PREVIEW CONTAINER WITH 3D TILTED CARD */}
      <div className="relative w-full aspect-[16/10] overflow-visible rounded-2xl">
        <TiltedCard
          imageSrc={project.previewImage}
          altText={project.title}
          captionText="View project"
          containerHeight="100%"
          containerWidth="100%"
          imageHeight="100%"
          imageWidth="100%"
          rotateAmplitude={22}
          scaleOnHover={1.08}
          showTooltip={true}
          showMobileWarning={false}
        />

        {/* Top Badges (Year & Category) */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-20">
          <span className="px-3 py-1 rounded-full bg-dark-950/90 backdrop-blur-md border border-white/15 text-[11px] font-medium uppercase tracking-wider text-white">
            {project.category}
          </span>
          <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-500/40 text-[11px] font-semibold text-emerald-300">
            {project.year}
          </span>
        </div>

        {/* Floating Metric Pill */}
        {project.metrics && (
          <div className="absolute bottom-4 left-4 z-20 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-dark-950/90 backdrop-blur-md border border-emerald-500/40 text-xs font-semibold text-emerald-300 group-hover:border-emerald-400 transition-colors">
            <Sparkles className="w-3 h-3 text-emerald-400" />
            {project.metrics}
          </div>
        )}

        {/* Floating Diagonal Arrow Icon */}
        <div className="absolute bottom-4 right-4 z-20 w-10 h-10 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-brand-accent group-hover:text-black group-hover:scale-110 transition-all duration-300 shadow-lg">
          <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </div>

      {/* CARD CONTENT INFO */}
      <div className="p-5 sm:p-6 flex flex-col justify-between flex-grow">
        <div>
          {/* Title */}
          <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors duration-300 mb-2">
            {project.title}
          </h3>

          {/* Short description */}
          <p className="text-sm text-offwhite-muted leading-relaxed line-clamp-2 mb-6 font-normal">
            {project.shortDescription}
          </p>
        </div>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
          {project.tags.map((tag, i) => (
            <span
              key={i}
              className="px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/5 text-[11px] font-medium text-offwhite-muted group-hover:text-white group-hover:border-white/15 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
};
