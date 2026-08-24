/**
 * Home Page Animation System
 * Elegant, functional, and performant animations tailored for the Home snapping sections
 */

// ============================================================================
// HERO SECTION ANIMATIONS
// ============================================================================

export const heroContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const heroTitleVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 350,
      damping: 28,
    },
  },
};

export const heroTitleIdleFloatVariants = {
  animate: {
    y: [-3, 3, -3],
    rotate: [-0.3, 0.3, -0.3],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const heroGlowPulseVariants = {
  initial: {
    scale: 0.9,
    opacity: 0.45,
  },
  animate: {
    scale: [0.9, 1.15, 0.9],
    opacity: [0.45, 0.85, 0.45],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
  hover: {
    scale: 1.28,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};



export const heroSubtitleVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 320,
      damping: 26,
    },
  },
};

export const heroCtaContainerVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 340,
      damping: 25,
      delayChildren: 0.05,
      staggerChildren: 0.06,
    },
  },
};

export const heroPrimaryCtaVariants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 400, damping: 25 },
  },
};

export const heroSocialButtonVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 400, damping: 25 },
  },
};

export const heroFramesContainerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
      delayChildren: 0.15,
      staggerChildren: 0.08,
    },
  },
};

export const heroFrameCardVariants = {
  hidden: { opacity: 0, y: 25, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 350,
      damping: 24,
    },
  },
};

export const heroBadgeVariants = {
  hidden: { opacity: 0, y: -12, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 380,
      damping: 24,
    },
  },
};

export const heroSecondaryCtaVariants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 400, damping: 25 },
  },
};

export const heroBentoContainerVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
      delayChildren: 0.12,
      staggerChildren: 0.07,
    },
  },
};

export const heroBentoCardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 360,
      damping: 25,
    },
  },
};

export const heroBentoCardHover = {
  scale: 1.03,
  y: -3,
  transition: { type: "spring", stiffness: 400, damping: 25 },
};

export const heroBentoCardTap = { scale: 0.97 };

export const heroSecondaryButtonHover = { scale: 1.04, y: -1 };
export const heroSecondaryButtonTap = { scale: 0.96 };

// Micro-interactions for hero interactive elements
export const heroPrimaryButtonHover = { scale: 1.04, y: -1 };
export const heroPrimaryButtonTap = { scale: 0.96 };
export const heroSocialHover = { scale: 1.08, y: -1 };
export const heroSocialTap = { scale: 0.94 };
export const heroFrameHover = { scale: 1.06, rotate: 0, y: -3, zIndex: 30 };

// ============================================================================
// FEATURED SECTIONS ANIMATIONS (Projects, Research, Recognition)
// ============================================================================

export const featuredSectionContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.05,
    },
  },
};

export const featuredHeaderVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 350,
      damping: 28,
    },
  },
};

export const featuredContentVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 340,
      damping: 26,
    },
  },
};

export const featuredCardVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 350,
      damping: 28,
    },
  },
};

export const featuredTagVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 450, damping: 25 },
  },
};

export const featuredCardHover = {
  scale: 1.015,
  y: -2,
  transition: { type: "spring", stiffness: 400, damping: 25 },
};
export const featuredCardTap = { scale: 0.985 };

// ============================================================================
// CONTACT SECTION ANIMATIONS
// ============================================================================

export const contactContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

export const contactHeaderVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 350,
      damping: 28,
    },
  },
};

export const contactSocialsContainerVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

export const contactSocialPillVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 8 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 400, damping: 25 },
  },
};

export const contactCardContainerVariants = {
  hidden: { opacity: 0, scale: 0.97, y: 14 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 360,
      damping: 28,
    },
  },
};

export const contactSocialPillHover = { scale: 1.05, y: -1 };
export const contactSocialPillTap = { scale: 0.95 };

export const inlineFooterVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};
