import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { SplitText } from 'gsap/SplitText';
import { CustomEase } from 'gsap/CustomEase';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { TextPlugin } from 'gsap/TextPlugin';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { InertiaPlugin } from 'gsap/InertiaPlugin';

// Register all GSAP Bonus & Core Plugins
gsap.registerPlugin(
  ScrollTrigger,
  ScrollSmoother,
  SplitText,
  CustomEase,
  ScrambleTextPlugin,
  ScrollToPlugin,
  TextPlugin,
  DrawSVGPlugin,
  InertiaPlugin
);

export {
  gsap,
  ScrollTrigger,
  ScrollSmoother,
  SplitText,
  CustomEase,
  ScrambleTextPlugin,
  ScrollToPlugin,
  TextPlugin,
  DrawSVGPlugin,
  InertiaPlugin,
};
