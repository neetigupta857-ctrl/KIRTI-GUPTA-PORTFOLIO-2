import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BorderGlow } from './BorderGlow';
import { Phone, Mail, Linkedin, Globe, Sparkles, ExternalLink, Copy, Check } from 'lucide-react';

export const ProjectInquiryForm: React.FC = () => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const contactLinks = [
    {
      id: 'phone',
      heading: 'Phone & WhatsApp',
      label: 'Direct Line / Instant Chat',
      value: '+91 98765 43210',
      href: 'tel:+919876543210',
      icon: <Phone className="w-5 h-5 text-emerald-400" />,
    },
    {
      id: 'email',
      heading: 'Email Address',
      label: 'Inquiries & Proposals',
      value: 'kirtigupta.design@gmail.com',
      href: 'mailto:kirtigupta.design@gmail.com',
      icon: <Mail className="w-5 h-5 text-emerald-400" />,
    },
    {
      id: 'linkedin',
      heading: 'LinkedIn Profile',
      label: 'Professional Network',
      value: 'linkedin.com/in/kirti-gupta-45495b1ab',
      href: 'https://www.linkedin.com/in/kirti-gupta-45495b1ab?utm_source=share_via&utm_content=profile&utm_medium=member_android',
      icon: <Linkedin className="w-5 h-5 text-emerald-400" />,
    },
    {
      id: 'behance',
      heading: 'Behance Portfolio',
      label: 'Curated Design Showcase',
      value: 'behance.net/kirtigupta',
      href: 'https://behance.net',
      icon: <Globe className="w-5 h-5 text-emerald-400" />,
    },
  ];

  return (
    <section id="contact" className="py-24 sm:py-32 px-4 sm:px-6 relative z-10 bg-dark-900/60 border-t border-white/5">
      <div className="max-w-4xl mx-auto">
        
        {/* SECTION HEADER */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Direct Reach</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-4"
          >
            Get In Touch.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-offwhite-muted max-w-xl mx-auto"
          >
            Reach out directly for design inquiries, brand identity projects, or creative collaborations.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-4 flex items-center justify-center gap-2 text-xs font-semibold text-emerald-400 font-mono"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Typically responding within 24 hours</span>
          </motion.div>
        </div>

        {/* DIRECT CONTACT CARDS GRID WITH DISTINCT HEADINGS */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {contactLinks.map((item) => (
            <div key={item.id} className="flex flex-col gap-2.5">
              {/* Headings */}
              <div className="flex items-center gap-2 px-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-400 font-mono">
                  {item.heading}
                </h3>
              </div>

              {/* BorderGlow Card Container */}
              <BorderGlow
                edgeSensitivity={30}
                glowColor="160 84 39"
                backgroundColor="#0B0D0D"
                borderRadius={24}
                glowRadius={35}
                glowIntensity={1.8}
                coneSpread={28}
                animated={false}
                colors={['#10B981', '#05D474', '#34D399']}
                fillOpacity={0.4}
                className="w-full h-full"
              >
                <div className="group relative flex items-center justify-between p-5 sm:p-6 bg-dark-900/90 backdrop-blur-2xl transition-all duration-300 h-full">
                  {/* Main Link (Icon & Details) */}
                  <a
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-4 min-w-0 flex-1 pr-3"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center group-hover:border-emerald-500/40 group-hover:bg-emerald-500/10 transition-all duration-300 shrink-0">
                      {item.icon}
                    </div>

                    <div className="text-left min-w-0">
                      <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-300 transition-colors truncate">
                        {item.value}
                      </h4>
                      <p className="text-xs text-offwhite-muted mt-0.5 truncate">
                        {item.label}
                      </p>
                    </div>
                  </a>

                  {/* Action Buttons Container */}
                  <div className="flex items-center gap-2.5 shrink-0 relative z-10">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        copyToClipboard(item.value, item.id);
                      }}
                      title="Copy to clipboard"
                      className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-offwhite-muted hover:text-emerald-400 hover:border-emerald-500/40 hover:bg-emerald-500/10 active:scale-95 transition-all duration-200"
                    >
                      {copiedField === item.id ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>

                    <a
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      title="Open link"
                      className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white group-hover:bg-emerald-400 group-hover:text-black group-hover:border-emerald-400 hover:scale-105 active:scale-95 transition-all duration-200"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </BorderGlow>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};
