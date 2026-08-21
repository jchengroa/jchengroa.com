/**
 * Legal Page Animations
 * Hardware-accelerated, elegant variants for Legal and Documentation page
 */

import { TIMING, EASING } from './core.js';

export const legalPageVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: TIMING.dramatic,
      ease: EASING.elegant,
      staggerChildren: 0.1,
    },
  },
};

export const legalSectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: TIMING.entrance,
      ease: EASING.elegant,
    },
  },
};

export const legalDocButtonHover = {
  scale: 1.02,
  y: -2,
  transition: EASING.spring.gentle,
};

export const legalDocButtonTap = {
  scale: 0.98,
  transition: { duration: TIMING.instant },
};
