/**
 * Contact Page Animations
 * Hardware-accelerated, elegant variants for Contact & Socials page
 */

import { TIMING, EASING } from './core.js';

export const contactPageVariants = {
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

export const contactPageHeaderVariants = {
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

export const contactFormCardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.99 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: TIMING.entrance,
      ease: EASING.elegant,
    },
  },
};

export const contactCategoryHeaderVariants = {
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

export const contactCardGridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
    },
  },
};

export const contactCardItemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: EASING.spring.gentle,
  },
};

export const contactCardHover = {
  y: -6,
  scale: 1.01,
  transition: EASING.spring.gentle,
};

export const contactCardTap = {
  scale: 0.98,
  transition: { duration: TIMING.instant },
};

export const contactStatusNoticeVariants = {
  hidden: { opacity: 0, y: -8, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: TIMING.fast, ease: EASING.smooth },
  },
  exit: {
    opacity: 0,
    y: -8,
    scale: 0.95,
    transition: { duration: TIMING.instant },
  },
};
