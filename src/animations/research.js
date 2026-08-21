/**
 * Research Page Animations
 * Hardware-accelerated, elegant variants for Research page
 */

import { TIMING, EASING } from './core.js';

export const researchPageVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: TIMING.normal,
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

export const researchHeaderVariants = {
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

export const researchControlsVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: TIMING.entrance,
      ease: EASING.elegant,
      delay: 0.1,
    },
  },
};

export const researchSectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: TIMING.entrance,
      ease: EASING.elegant,
    },
  },
};

export const researchSectionHeaderVariants = {
  hidden: { opacity: 0, x: -15 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: TIMING.normal,
      ease: EASING.elegant,
    },
  },
};

export const researchCardGridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
    },
  },
};

export const researchCardItemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: EASING.spring.gentle,
  },
};

export const researchCardHover = {
  y: -6,
  scale: 1.01,
  transition: EASING.spring.gentle,
};

export const researchCardTap = {
  scale: 0.98,
  transition: { duration: TIMING.instant },
};

export const researchNoResultsVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: TIMING.normal,
      ease: EASING.elegant,
    },
  },
};
