import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.glb'],
  resolve: {
    alias: {
      '@': path.resolve('./src'),
      'gsap/ScrollSmoother': path.resolve('./gsap-public/esm/ScrollSmoother.js'),
      'gsap/ScrollTrigger': path.resolve('./gsap-public/esm/ScrollTrigger.js'),
      'gsap/SplitText': path.resolve('./gsap-public/esm/SplitText.js'),
      'gsap/CustomEase': path.resolve('./gsap-public/esm/CustomEase.js'),
      'gsap/ScrambleTextPlugin': path.resolve('./gsap-public/esm/ScrambleTextPlugin.js'),
      'gsap/DrawSVGPlugin': path.resolve('./gsap-public/esm/DrawSVGPlugin.js'),
      'gsap/InertiaPlugin': path.resolve('./gsap-public/esm/InertiaPlugin.js'),
      'gsap/ScrollToPlugin': path.resolve('./gsap-public/esm/ScrollToPlugin.js'),
      'gsap/TextPlugin': path.resolve('./gsap-public/esm/TextPlugin.js'),
      'gsap': path.resolve('./gsap-public/esm/index.js'),
    },
  },
  server: {
    port: 3000,
    open: false,
    watch: {
      ignored: ['**/dist/**'],
    },
  },
});