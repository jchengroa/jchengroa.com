/**
 * Shared Component Animations
 * Hardware-accelerated, elegant variants for universal UI components
 */

import { TIMING, EASING } from './core.js';

// Typography / Title Component
export const titleContainerVariants = {
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

export const titleBadgeVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: TIMING.normal,
      ease: EASING.elegant,
    },
  },
};

export const titleSubtitleVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: 'auto',
    transition: { duration: TIMING.normal, ease: EASING.smooth },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: { duration: TIMING.normal, ease: EASING.smooth },
  },
};

export const filterCollapseVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: TIMING.fast, ease: EASING.smooth },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: TIMING.fast, ease: EASING.easeIn },
  },
};

export const accordionExpandVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: 'auto',
    transition: { duration: TIMING.normal, ease: EASING.smooth },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: { duration: TIMING.normal, ease: EASING.smooth },
  },
};

// Cookie Consent Banner
export const cookieConsentVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: EASING.spring.normal,
  },
  exit: {
    opacity: 0,
    y: 20,
    scale: 0.95,
    transition: { duration: TIMING.fast, ease: EASING.easeIn },
  },
};

// Section Indicator (Fluid Snap Dot)
export const sectionIndicatorDotSpring = {
  type: 'spring',
  stiffness: 350,
  damping: 25,
};

// QuickNav / Document Outline Animations
export const quickNavDesktopBtnVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: EASING.spring.normal,
  },
  exit: {
    opacity: 0,
    x: -50,
    transition: { duration: TIMING.fast },
  },
};

export const quickNavMobileBtnVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: EASING.spring.normal,
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: TIMING.fast },
  },
};

export const quickNavBackdropVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: TIMING.normal },
  },
  exit: {
    opacity: 0,
    transition: { duration: TIMING.fast },
  },
};

export const quickNavMobileSheetVariants = {
  hidden: { y: '100%' },
  visible: {
    y: 0,
    transition: EASING.spring.normal,
  },
  exit: {
    y: '100%',
    transition: { duration: TIMING.normal, ease: EASING.easeIn },
  },
};

export const quickNavTabIndicatorSpring = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
};

// Universal Card Animations
export const universalCardHover = {
  y: -6,
  scale: 1.01,
  transition: EASING.spring.gentle,
};

export const universalCardTap = {
  scale: 0.98,
  transition: { duration: TIMING.instant },
};
