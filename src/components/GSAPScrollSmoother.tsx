import React, { useLayoutEffect, useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, ScrollSmoother } from '../lib/gsap';

interface GSAPScrollSmootherProps {
  children: React.ReactNode;
}

declare global {
  interface Window {
    smootherInstance?: any;
    smoothScrollTo?: (target: string | HTMLElement, smooth?: boolean) => void;
  }
}

export const GSAPScrollSmoother: React.FC<GSAPScrollSmootherProps> = ({ children }) => {
  const progressRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // Enable GSAP ScrollSmoother
    let smoother: any = null;

    try {
      smoother = ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
<<<<<<< HEAD
        smooth: 0.8,
        effects: true,
        smoothTouch: false,
=======
        smooth: 1.4,
        effects: true,
        smoothTouch: 0.1,
>>>>>>> f4f723a5b490c19d70546f7355917f4bae26902f
        normalizeScroll: false,
        ignoreMobileResize: true,
      });

      window.smootherInstance = smoother;

      // Provide global helper function for scrolling to target
      window.smoothScrollTo = (target: string | HTMLElement, smooth = true) => {
        if (smoother) {
          smoother.scrollTo(target, smooth, 'top top');
        } else {
          const el = typeof target === 'string' ? document.querySelector(target) : target;
          if (el) {
            el.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' });
          }
        }
      };

      // Top scroll progress bar animation
      if (progressRef.current) {
        gsap.to(progressRef.current, {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.2,
            invalidateOnRefresh: true,
          },
        });
      }

      // Refresh ScrollTrigger after layout stabilizes
      const refreshTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500);

      return () => {
        clearTimeout(refreshTimeout);
        if (smoother) {
          smoother.kill();
        }
        window.smootherInstance = undefined;
        window.smoothScrollTo = undefined;
      };
    } catch (err) {
      console.warn('ScrollSmoother initialization warning:', err);
    }
  }, []);

  return (
    <>
      {/* Top Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-emerald-500/20 z-[100] pointer-events-none">
        <div
          ref={progressRef}
          className="h-full w-full bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 origin-left scale-x-0 shadow-[0_0_10px_#10B981]"
        />
      </div>

      {/* Smooth Wrapper & Content Structure Required by GSAP ScrollSmoother */}
      <div id="smooth-wrapper" className="w-full overflow-hidden min-h-screen">
<<<<<<< HEAD
        <div id="smooth-content" className="w-full min-h-screen">
=======
        <div id="smooth-content" className="w-full min-h-screen will-change-transform">
>>>>>>> f4f723a5b490c19d70546f7355917f4bae26902f
          {children}
        </div>
      </div>
    </>
  );
};

export default GSAPScrollSmoother;
