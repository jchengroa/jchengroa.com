/**
 * Unified Animation System
 * Elegant, consistent animations across the entire website
 */

import { useEffect, useState } from 'react';

// ============================================
// TIMING CONSTANTS
// ============================================
export const TIMING = {
  // Durations (in seconds)
  instant: 0.15,
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
  entrance: 0.6,
  dramatic: 0.8,
  
  // Stagger delays
  staggerFast: 0.03,
  staggerNormal: 0.05,
  staggerSlow: 0.08,
  staggerDramatic: 0.1,
};

// ============================================
// EASING CURVES
// ============================================
export const EASING = {
  // Standard easings
  easeOut: [0.25, 0.1, 0.25, 1],
  easeIn: [0.42, 0, 1, 1],
  easeInOut: [0.42, 0, 0.58, 1],
  
  // Custom easings
  smooth: [0.4, 0, 0.2, 1],
  bounce: [0.68, -0.55, 0.265, 1.55],
  elegant: [0.22, 1, 0.36, 1],
  snappy: [0.16, 1, 0.3, 1],
  
  // Spring configurations
  spring: {
    gentle: { type: 'spring', stiffness: 120, damping: 14 },
    normal: { type: 'spring', stiffness: 300, damping: 25 },
    snappy: { type: 'spring', stiffness: 400, damping: 30 },
    bouncy: { type: 'spring', stiffness: 400, damping: 10 },
    stiff: { type: 'spring', stiffness: 500, damping: 50 },
  },
};

// ============================================
// FRAMER MOTION VARIANTS
// ============================================

// Fade animations
export const fade = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: TIMING.normal, ease: EASING.smooth }
  },
  exit: { 
    opacity: 0,
    transition: { duration: TIMING.fast, ease: EASING.easeIn }
  },
};

// Fade up (most common entrance)
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: TIMING.entrance, 
      ease: EASING.elegant 
    }
  },
  exit: { 
    opacity: 0, 
    y: -12,
    transition: { duration: TIMING.fast, ease: EASING.easeIn }
  },
};

// Fade down
export const fadeDown = {
  hidden: { opacity: 0, y: -24 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: TIMING.entrance, ease: EASING.elegant }
  },
  exit: { 
    opacity: 0, 
    y: 12,
    transition: { duration: TIMING.fast, ease: EASING.easeIn }
  },
};

// Fade left (for sidebar/nav)
export const fadeLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: TIMING.entrance, ease: EASING.elegant }
  },
  exit: { 
    opacity: 0, 
    x: -20,
    transition: { duration: TIMING.fast, ease: EASING.easeIn }
  },
};

// Fade right
export const fadeRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: TIMING.entrance, ease: EASING.elegant }
  },
  exit: { 
    opacity: 0, 
    x: 20,
    transition: { duration: TIMING.fast, ease: EASING.easeIn }
  },
};

// Scale animations (for modals, cards)
export const scale = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: EASING.spring.normal
  },
  exit: { 
    opacity: 0, 
    scale: 0.95,
    transition: { duration: TIMING.fast, ease: EASING.easeIn }
  },
};

// Scale up with fade (for modals)
export const scaleUp = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: EASING.spring.normal
  },
  exit: { 
    opacity: 0, 
    scale: 0.95, 
    y: 10,
    transition: { duration: TIMING.fast, ease: EASING.easeIn }
  },
};

// Slide up from bottom (for mobile sheets)
export const slideUp = {
  hidden: { y: '100%' },
  visible: { 
    y: 0,
    transition: EASING.spring.normal
  },
  exit: { 
    y: '100%',
    transition: { duration: TIMING.normal, ease: EASING.easeIn }
  },
};

// Container with staggered children
export const staggerContainer = (staggerDelay = TIMING.staggerNormal) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: staggerDelay * 0.5,
      staggerDirection: -1,
    },
  },
});

// Stagger item (for use inside staggerContainer)
export const staggerItem = {
  hidden: { opacity: 0, y: 16 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: TIMING.normal, ease: EASING.smooth }
  },
  exit: { 
    opacity: 0, 
    y: -8,
    transition: { duration: TIMING.instant, ease: EASING.easeIn }
  },
};

// Card hover animation
export const cardHover = {
  rest: { scale: 1, y: 0 },
  hover: { 
    scale: 1.02, 
    y: -4,
    transition: EASING.spring.gentle
  },
};

// Button tap animation
export const buttonTap = {
  scale: 0.97,
  transition: { duration: TIMING.instant },
};

// ============================================
// VIEWPORT ANIMATIONS (scroll-triggered)
// ============================================
export const viewportFadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: TIMING.entrance, ease: EASING.elegant },
};

export const viewportFadeIn = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: TIMING.slow, ease: EASING.smooth },
};

// ============================================
// PAGE TRANSITIONS
// ============================================
export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: TIMING.entrance, ease: EASING.elegant }
  },
  exit: { 
    opacity: 0, 
    y: -10,
    transition: { duration: TIMING.fast, ease: EASING.easeIn }
  },
};

// ============================================
// UTILITY HOOKS
// ============================================

// Hook for reduced motion preference
export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);
  
  return prefersReducedMotion;
}

const ANIMATION_STORAGE_KEY = 'jchengroa_animation_level';
const SPEED_STORAGE_KEY = 'jchengroa_animation_speed';

export function useAnimationLevel() {
  const [level, setLevel] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(ANIMATION_STORAGE_KEY) || 'full';
    }
    return 'full';
  });

  const [speed, setSpeed] = useState(() => {
    if (typeof window !== 'undefined') {
      return parseFloat(localStorage.getItem(SPEED_STORAGE_KEY)) || 1;
    }
    return 1;
  });

  const setAnimationLevel = (newLevel) => {
    setLevel(newLevel);
    localStorage.setItem(ANIMATION_STORAGE_KEY, newLevel);
  };

  const setAnimationSpeed = (newSpeed) => {
    setSpeed(newSpeed);
    localStorage.setItem(SPEED_STORAGE_KEY, newSpeed.toString());
    if (typeof document !== 'undefined') {
      document.documentElement.style.setProperty('--animation-speed', newSpeed.toString());
    }
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.style.setProperty('--animation-speed', speed.toString());
    }
  }, [speed]);

  return { level, speed, setAnimationLevel, setAnimationSpeed, isReduced: level === 'reduced', isNone: level === 'none' };
}

// Get animation props with reduced motion support
export function withReducedMotion(animationProps, reducedMotion) {
  if (reducedMotion) {
    return {
      ...animationProps,
      transition: { duration: 0 },
    };
  }
  return animationProps;
}

// ============================================
// TAILWIND ANIMATION CLASSES
// ============================================
export const tailwindAnimations = {
  // Hover transitions
  hover: {
    scale: 'transition-transform duration-200 ease-out hover:scale-105',
    lift: 'transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl',
    glow: 'transition-all duration-300 ease-out hover:shadow-lg hover:shadow-blue-500/20',
    color: 'transition-colors duration-200 ease-out',
    opacity: 'transition-opacity duration-200 ease-out hover:opacity-80',
  },
  
  // Focus states
  focus: {
    ring: 'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
    scale: 'focus:scale-105 transition-transform',
  },
  
  // Active states
  active: {
    scale: 'active:scale-95 transition-transform duration-100',
    press: 'active:scale-[0.98] transition-transform duration-75',
  },
  
  // Group hover
  group: {
    lift: 'group-hover:-translate-y-1 transition-transform duration-300',
    scale: 'group-hover:scale-105 transition-transform duration-300',
    opacity: 'group-hover:opacity-100 transition-opacity duration-300',
  },
};

// ============================================
// PRESET COMBINATIONS
// ============================================

// Hero section entrance
export const heroEntrance = {
  container: staggerContainer(TIMING.staggerSlow),
  item: {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: TIMING.dramatic, ease: EASING.elegant }
    },
  },
};

// Card grid entrance
export const cardGridEntrance = {
  container: staggerContainer(TIMING.staggerNormal),
  item: {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: EASING.spring.gentle
    },
  },
};

// Modal entrance
export const modalEntrance = {
  backdrop: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: TIMING.normal } },
    exit: { opacity: 0, transition: { duration: TIMING.fast } },
  },
  content: scaleUp,
};

// Menu panel entrance
export const menuEntrance = {
  panel: {
    hidden: { opacity: 0, x: '100%', scale: 0.95 },
    visible: { 
      opacity: 1, 
      x: 0, 
      scale: 1,
      transition: EASING.spring.normal
    },
    exit: { 
      opacity: 0, 
      x: '20%', 
      scale: 0.95,
      transition: { duration: TIMING.normal, ease: EASING.easeIn }
    },
  },
  item: staggerItem,
};

// Accordion animation
export const accordion = {
  collapsed: { height: 0, opacity: 0 },
  expanded: { 
    height: 'auto', 
    opacity: 1,
    transition: { duration: TIMING.normal, ease: EASING.smooth }
  },
};
