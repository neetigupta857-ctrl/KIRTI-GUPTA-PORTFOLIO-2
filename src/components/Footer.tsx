import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Clock, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  const [timeString, setTimeString] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { label: 'Work', href: '#work' },
    { label: 'Capabilities', href: '#capabilities' },
    { label: 'Skills', href: '#skills' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'About', href: '#about' },
  ];

  const socialLinks = [
    { label: 'Dribbble', href: 'https://dribbble.com' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/kirti-gupta-45495b1ab?utm_source=share_via&utm_content=profile&utm_medium=member_android' },
    { label: 'Instagram', href: 'https://instagram.com' },
    { label: 'Behance', href: 'https://behance.net' },
  ];

  return (
    <footer className="relative z-10 bg-dark-950 border-t border-white/10 pt-20 pb-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* TOP FOOTER ROW */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16 border-b border-white/5">
          
          {/* BRAND & EMAIL (5 cols) */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold text-sm">
                  KG
                </div>
                <span className="text-lg font-bold text-white tracking-tight">Kirti Gupta</span>
              </div>

              <p className="text-sm text-offwhite-muted max-w-sm mb-6 font-normal">
                Graphic Designer crafting bespoke digital products for modern creative agencies.
              </p>
            </div>

            {/* LIVE LOCAL TIME TICKER */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-xs text-offwhite-muted w-fit">
              <Clock className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>Local time — <strong className="text-white font-mono">{timeString || '12:52 AM'} EST</strong></span>
            </div>
          </div>

          {/* QUICK LINKS (3 cols) */}
          <div className="md:col-span-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-offwhite-subtle block mb-4">
              Navigation
            </span>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-offwhite-muted hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* SOCIAL LINKS (4 cols) */}
          <div className="md:col-span-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-offwhite-subtle block mb-4">
              Connect & Follow
            </span>
            <div className="grid grid-cols-2 gap-3">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-offwhite-muted hover:text-white hover:border-white/15 transition-all group"
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT & LEGAL ROW */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-offwhite-subtle">
          <div>
            © {new Date().getFullYear()} Kirti Gupta. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-offwhite-muted transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-offwhite-muted transition-colors">Terms of Service</a>
            <span className="flex items-center gap-1 text-emerald-400 font-medium">
              <Globe className="w-3.5 h-3.5" /> Crafted with Precision
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
