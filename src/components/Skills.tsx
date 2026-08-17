import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SKILL_CATEGORIES, SKILLS_DATA, SkillItem, SkillCategory } from '../data/skills';
import { TiltedCard } from './TiltedCard';
import { Magnet } from './Magnet';
import {
  Palette,
  Type,
  Share2,
  Layout,
  Image as ImageIcon,
  Sparkles,
  CheckCircle2,
  Wrench,
  Award,
} from 'lucide-react';

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<SkillCategory['id']>('all');

  const filteredSkills = SKILLS_DATA.filter((skill) => {
    if (activeCategory === 'all') return true;
    return skill.category === activeCategory;
  });

  const getSkillIcon = (iconName: SkillItem['iconName']) => {
    switch (iconName) {
      case 'Palette':
        return <Palette className="w-5 h-5 text-emerald-400" />;
      case 'Type':
        return <Type className="w-5 h-5 text-emerald-400" />;
      case 'Share2':
        return <Share2 className="w-5 h-5 text-emerald-400" />;
      case 'Layout':
        return <Layout className="w-5 h-5 text-emerald-400" />;
      case 'Figma':
        return (
          <svg className="w-5 h-5 text-emerald-400 fill-current" viewBox="0 0 38 57" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38H19V28.5Z" />
            <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" />
            <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" />
            <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" />
            <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" />
          </svg>
        );
      case 'Image':
        return <ImageIcon className="w-5 h-5 text-emerald-400" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-emerald-400" />;
      default:
        return <Wrench className="w-5 h-5 text-emerald-400" />;
    }
  };

  const cardBgSvg = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='340' viewBox='0 0 400 340'><rect width='400' height='340' fill='%230D0F0F' rx='16'/><path d='M0 0 L400 340' stroke='rgba(16,185,129,0.05)' stroke-width='1.5'/></svg>";

  return (
    <section id="skills" className="py-24 sm:py-32 px-4 sm:px-6 relative z-10 overflow-hidden bg-[#080909]">
      <div className="max-w-6xl mx-auto">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-widest mb-4"
          >
            <Award className="w-3.5 h-3.5" />
            <span>Expertise & Suite</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4"
          >
            Craft, Vision & Technical Mastery
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base text-offwhite-muted max-w-2xl"
          >
            Specializing in bespoke branding systems, high-impact typography, and scroll-stopping social media graphics — backed by industry-standard software mastery.
          </motion.p>
        </div>

        {/* CATEGORY FILTER TABS */}
        <div className="flex items-center justify-center flex-wrap gap-2.5 mb-12">
          {SKILL_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <Magnet key={cat.id} magnetStrength={4} padding={30}>
                <button
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 backdrop-blur-md ${
                    isActive
                      ? 'text-black bg-emerald-400 font-bold shadow-lg shadow-emerald-500/20'
                      : 'text-offwhite-muted bg-white/[0.03] border border-white/10 hover:bg-white/[0.08] hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              </Magnet>
            );
          })}
        </div>

        {/* SKILLS GRID WITH TILTED CARDS */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.id}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="h-full min-h-[300px]"
              >
                <TiltedCard
                  imageSrc={cardBgSvg}
                  altText={skill.name}
                  captionText={skill.name}
                  containerHeight="100%"
                  containerWidth="100%"
                  imageHeight="100%"
                  imageWidth="100%"
                  rotateAmplitude={12}
                  scaleOnHover={1.04}
                  showMobileWarning={false}
                  showTooltip={false}
                  displayOverlayContent={true}
                  overlayContent={
                    <div className="pointer-events-auto h-full w-full p-6 flex flex-col justify-between rounded-2xl border border-white/10 group-hover:border-emerald-500/40 bg-[#0D0F0F]/80 backdrop-blur-md transition-all duration-300 shadow-xl overflow-hidden relative">
                      {/* Background Subtle Gradient Highlight */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-colors pointer-events-none" />

                      <div>
                        {/* CARD TOP ROW: ICON & EXPERIENCE LABEL */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-12 h-12 rounded-xl bg-dark-900 border border-white/15 flex items-center justify-center group-hover:border-emerald-500/50 group-hover:bg-emerald-500/10 transition-all duration-300 shadow-inner">
                            {getSkillIcon(skill.iconName)}
                          </div>

                          {skill.experienceLabel && (
                            <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-bold text-emerald-300 tracking-wide uppercase font-mono">
                              {skill.experienceLabel}
                            </span>
                          )}
                        </div>

                        {/* SKILL TITLE */}
                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                          {skill.name}
                        </h3>

                        {/* DESCRIPTION */}
                        <p className="text-xs text-offwhite-muted leading-relaxed mb-6">
                          {skill.description}
                        </p>
                      </div>

                      <div>
                        {/* PROFICIENCY PROGRESS BAR */}
                        {typeof skill.levelPercentage === 'number' && (
                          <div className="mb-5">
                            <div className="flex items-center justify-between text-xs mb-1.5 font-mono">
                              <span className="text-offwhite-subtle uppercase text-[10px] tracking-wider">Proficiency</span>
                              <span className="text-emerald-400 font-bold">{skill.levelPercentage}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${skill.levelPercentage}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, ease: 'easeOut', delay: 0.1 }}
                                className="h-full bg-gradient-to-r from-emerald-500 to-emerald-300 rounded-full"
                              />
                            </div>
                          </div>
                        )}

                        {/* HIGHLIGHT TAGS */}
                        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                          {skill.highlights.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/5 text-[10px] text-offwhite-muted font-medium group-hover:border-white/10 transition-colors flex items-center gap-1"
                            >
                              <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  }
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};

export default Skills;
