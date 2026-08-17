import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const AnimatedBackground: React.FC = () => {
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const blob3Ref = useRef<HTMLDivElement>(null);
  const blob4Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (blob1Ref.current) {
        gsap.to(blob1Ref.current, {
          x: 120,
          y: 80,
          scale: 1.15,
          duration: 16,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      if (blob2Ref.current) {
        gsap.to(blob2Ref.current, {
          x: -140,
          y: -100,
          scale: 0.9,
          duration: 19,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      if (blob3Ref.current) {
        gsap.to(blob3Ref.current, {
          x: 80,
          y: -60,
          scale: 1.1,
          duration: 14,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      if (blob4Ref.current) {
        gsap.to(blob4Ref.current, {
          opacity: 0.08,
          scale: 1.25,
          duration: 12,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Dark Ambient Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.25]" />

      {/* Blob 1: Top-Left to Center floating Emerald Light Leak */}
      <div
        ref={blob1Ref}
        data-speed="0.4"
        className="absolute top-[-10%] left-[-10%] w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] rounded-full opacity-20 filter blur-[100px] bg-gradient-to-br from-emerald-600/40 via-teal-800/20 to-transparent"
        style={{ willChange: 'transform' }}
      />

      {/* Blob 2: Right Center Dark Mint & Slate Aura */}
      <div
        ref={blob2Ref}
        data-speed="0.6"
        className="absolute top-[30%] right-[-15%] w-[600px] sm:w-[800px] h-[600px] sm:h-[800px] rounded-full opacity-15 filter blur-[110px] bg-gradient-to-bl from-emerald-500/30 via-slate-800/40 to-transparent"
        style={{ willChange: 'transform' }}
      />

      {/* Blob 3: Bottom Center Deep Subtle Glow */}
      <div
        ref={blob3Ref}
        data-speed="0.3"
        className="absolute bottom-[-10%] left-[25%] w-[650px] sm:w-[850px] h-[400px] sm:h-[500px] rounded-full opacity-15 filter blur-[120px] bg-gradient-to-tr from-emerald-800/30 via-dark-800 to-transparent"
        style={{ willChange: 'transform' }}
      />

      {/* Subtle White Soft Highlight Specular */}
      <div
        ref={blob4Ref}
        data-speed="0.5"
        className="absolute top-[15%] left-[45%] w-[300px] h-[300px] rounded-full opacity-5 filter blur-[80px] bg-white"
        style={{ willChange: 'transform, opacity' }}
      />
    </div>
  );
};
