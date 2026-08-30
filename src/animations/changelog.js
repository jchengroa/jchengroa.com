/**
 * Changelog Page Animations
 * Hardware-accelerated, elegant variants for Changelog page and popup
 */

import { TIMING, EASING } from './core.js';

export const changelogPageVariants = {
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

export const changelogHeaderVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: TIMING.normal,
      ease: EASING.elegant,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: TIMING.fast },
  },
};

export const changelogControlsVariants = {
  hidden: { opacity: 0, y: 20 },
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

export const changelogTimelineItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: TIMING.normal,
      ease: EASING.elegant,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: TIMING.fast },
  },
};
