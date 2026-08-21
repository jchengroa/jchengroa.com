/**
 * Work Detail Page Animations
 * Hardware-accelerated, elegant variants for Work Detail / Project Showcase page
 */

import { TIMING, EASING } from './core.js';

export const workDetailPageVariants = {
  hidden: { opacity: 0, y: 24 },
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

export const workDetailHeaderVariants = {
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

export const workDetailSectionVariants = {
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

export const workDetailMetricCardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 15 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: EASING.spring.gentle,
  },
};

export const workDetailImageHover = {
  scale: 1.02,
  transition: EASING.spring.gentle,
};

export const workDetailImageTap = {
  scale: 0.99,
  transition: { duration: TIMING.instant },
};

export const workDetailLightboxBackdrop = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: TIMING.normal, ease: EASING.smooth },
  },
  exit: {
    opacity: 0,
    transition: { duration: TIMING.fast, ease: EASING.easeIn },
  },
};

export const workDetailLightboxContent = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: EASING.spring.normal,
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    transition: { duration: TIMING.fast, ease: EASING.easeIn },
  },
};
