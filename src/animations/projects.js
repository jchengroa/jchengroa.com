/**
 * Projects Page Animations
 * Hardware-accelerated, elegant variants for Projects page
 */

import { TIMING, EASING } from './core.js';

export const projectsPageVariants = {
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

export const projectsHeaderVariants = {
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

export const projectsControlsVariants = {
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

export const projectSectionVariants = {
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

export const projectSectionHeaderVariants = {
  hidden: { opacity: 0, x: -15 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: TIMING.normal,
      ease: EASING.elegant,
    },
  },
  exit: {
    opacity: 0,
    x: -10,
    transition: { duration: TIMING.fast },
  },
};

export const projectCardGridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
    },
  },
};

export const projectCardItemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: EASING.spring.gentle,
  },
};

export const projectCardHover = {
  y: -6,
  scale: 1.01,
  transition: EASING.spring.gentle,
};

export const projectCardTap = {
  scale: 0.98,
  transition: { duration: TIMING.instant },
};

export const projectTagVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: TIMING.fast, ease: EASING.smooth },
  },
};

export const projectNoResultsVariants = {
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
