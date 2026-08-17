import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Sparkles, Home, Briefcase, Wrench, User, Award, Mail } from 'lucide-react';
import { FloatingDock } from './ui/floating-dock';
import { ProfileAvatar } from './ProfileAvatar';
import { Magnet } from './Magnet';

interface NavbarProps {
  onOpenInquiry: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenInquiry }) => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const dockItems = [
    {
      title: 'Home',
      icon: <Home className="h-full w-full text-emerald-400" />,
      href: '#hero',
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
    },
    {
      title: 'Work',
      icon: <Briefcase className="h-full w-full text-neutral-300 hover:text-emerald-400" />,
      href: '#work',
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        handleLinkClick('#work');
      },
    },
    {
      title: 'Capabilities',
      icon: <Wrench className="h-full w-full text-neutral-300 hover:text-emerald-400" />,
      href: '#capabilities',
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        handleLinkClick('#capabilities');
      },
    },
    {
      title: 'About',
      icon: <User className="h-full w-full text-neutral-300 hover:text-emerald-400" />,
      href: '#about',
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        handleLinkClick('#about');
      },
    },
    {
      title: 'Skills',
      icon: <Award className="h-full w-full text-neutral-300 hover:text-emerald-400" />,
      href: '#skills',
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        handleLinkClick('#skills');
      },
    },
    {
      title: 'Contact',
      icon: <Mail className="h-full w-full text-neutral-300 hover:text-emerald-400" />,
      href: '#contact',
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        onOpenInquiry();
      },
    },
  ];

  const mobileNavLinks = [
    { label: 'Work', href: '#work' },
    { label: 'Capabilities', href: '#capabilities' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-6 py-4 transition-all duration-300 pointer-events-none">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        
        {/* BRAND / LOGO ITEM (Left) */}
        <motion.a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className={`pointer-events-auto flex items-center gap-3 px-3.5 py-2 rounded-full border transition-all duration-300 backdrop-blur-md ${
            scrolled
              ? 'bg-[#0B0D0D]/90 border-white/10 shadow-xl'
              : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06]'
          }`}
        >
          {/* Avatar Thumbnail */}
          <div className="relative w-8 h-8 rounded-full border border-emerald-500/40 p-0.5 shrink-0 flex items-center justify-center">
            <ProfileAvatar size="sm" className="w-full h-full rounded-full" />
            {/* Status dot */}
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-brand-accent rounded-full border-2 border-[#0B0D0D] z-10" />
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-semibold text-white tracking-tight leading-none flex items-center gap-1.5">
              Kirti Gupta
              <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
            </span>
            <span className="text-[10px] text-offwhite-muted tracking-wider uppercase">
              Graphic Wizard
            </span>
          </div>
        </motion.a>

        {/* CENTER LINKS (Floating Dock Menu) */}
        <div className="pointer-events-auto">
          <FloatingDock items={dockItems} tooltipPosition="bottom" />
        </div>

        {/* RIGHT CONTROLS */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="pointer-events-auto flex items-center gap-2"
        >
          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </motion.div>

      </div>

      {/* MOBILE NAV DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden pointer-events-auto max-w-6xl mx-auto mt-3 rounded-2xl bg-[#0B0D0D]/95 border border-white/10 backdrop-blur-2xl p-5 overflow-hidden shadow-2xl"
          >
            <div className="flex flex-col gap-3">
              {mobileNavLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className="px-4 py-2.5 text-sm font-medium text-offwhite-muted hover:text-white hover:bg-white/5 rounded-xl transition-all flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-4 h-4 text-emerald-400 opacity-60" />
                </a>
              ))}
              
              <div className="pt-2 border-t border-white/10 mt-1">
                <Magnet magnetStrength={3} padding={40} wrapperClassName="w-full">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenInquiry();
                    }}
                    className="w-full py-3 rounded-xl text-center text-xs font-semibold uppercase tracking-wider text-black bg-brand-accent hover:bg-emerald-400 transition-colors flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    Start a Project
                  </button>
                </Magnet>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
