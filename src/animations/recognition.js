/**
 * Recognition Page Animations
 * Hardware-accelerated, elegant variants for Recognition / Awards page
 */

import { TIMING, EASING } from './core.js';

export const recognitionPageVariants = {
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

export const recognitionHeaderVariants = {
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

export const recognitionControlsVariants = {
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

export const recognitionSectionVariants = {
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

export const recognitionSectionHeaderVariants = {
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

export const recognitionCardGridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
    },
  },
};

export const recognitionCardItemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: EASING.spring.gentle,
  },
};

export const recognitionCardHover = {
  y: -6,
  scale: 1.01,
  transition: EASING.spring.gentle,
};

export const recognitionCardTap = {
  scale: 0.98,
  transition: { duration: TIMING.instant },
};

export const recognitionNoResultsVariants = {
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
