import React, { Suspense } from 'react';
import { Preloader } from './components/Preloader';
import { AnimatedBackground } from './components/AnimatedBackground';
import { SplashCursor } from './components/SplashCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WorkSection } from './components/WorkSection';
import { Services } from './components/Services';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { ProjectInquiryForm } from './components/ProjectInquiryForm';
import { Footer } from './components/Footer';
import { GSAPScrollSmoother } from './components/GSAPScrollSmoother';

class GlobalErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error('Portfolio App error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#080909] text-white flex flex-col items-center justify-center p-6 text-center">
          <h1 className="text-3xl font-bold mb-4">Kirti Gupta — Creative Portfolio</h1>
          <p className="text-slate-400 mb-6 font-medium">Please refresh the page to reload the interactive experience.</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold transition-colors"
          >
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export function App() {
  const scrollToSection = (id: string) => {
    const target = `#${id}`;
    if (window.smoothScrollTo) {
      window.smoothScrollTo(target, true);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <GlobalErrorBoundary>
      {/* Initial Monospace Emerald Animated Preloader */}
      <Preloader />

      <div className="relative min-h-screen bg-[#080909] text-[#F3F5F5] font-sans selection:bg-emerald-500 selection:text-black overflow-x-hidden">
        {/* Lightweight Fluid Splash Cursor (Optimized for 60fps) */}
        <Suspense fallback={null}>
          <SplashCursor
            SIM_RESOLUTION={32}
            DYE_RESOLUTION={256}
            PRESSURE_ITERATIONS={2}
            SPLAT_RADIUS={0.12}
            COLOR="#10B981"
          />
        </Suspense>

        {/* Sticky Glass Navbar (Fixed Overlay) */}
        <Navbar onOpenInquiry={() => scrollToSection('contact')} />

        {/* GSAP Smooth Scroll Wrapper */}
        <GSAPScrollSmoother>
          {/* Floating Animated Background Blobs */}
          <AnimatedBackground />

          {/* Main Page Layout Flow */}
          <main className="relative z-10">
            <Hero
              onWorkClick={() => scrollToSection('work')}
              onInquiryClick={() => scrollToSection('contact')}
            />

            <WorkSection onInquiryClick={() => scrollToSection('contact')} />

            <Services onInquiryClick={() => scrollToSection('contact')} />

            <Suspense fallback={<div className="min-h-[400px]" />}>
              <About onInquiryClick={() => scrollToSection('contact')} />
            </Suspense>

            <Skills />

            <ProjectInquiryForm />
          </main>

          {/* Minimalist Footer */}
          <Footer />
        </GSAPScrollSmoother>
      </div>
    </GlobalErrorBoundary>
  );
}

export default App;
