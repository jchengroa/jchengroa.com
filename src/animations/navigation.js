/**
 * Navigation Animation System
 * Reusable animation definitions for the Navigation Bar, Dock, Pills, Explorer Submenus, and Mobile Transitions
 */

// Submenu dropdown animation generator for desktop and mobile flyouts
export const getSubmenuVariants = (isDesktop = true) => ({
  hidden: { 
    opacity: 0, 
    y: isDesktop ? -12 : 12, 
    scale: 0.96,
    filter: "blur(4px)"
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    filter: "blur(0px)",
    transition: { 
      type: "spring", 
      stiffness: 380, 
      damping: 28,
      staggerChildren: 0.035,
      delayChildren: 0.04
    }
  },
  exit: { 
    opacity: 0, 
    y: isDesktop ? -10 : 10, 
    scale: 0.96, 
    filter: "blur(4px)",
    transition: { duration: 0.15, ease: "easeIn" }
  }
});

// Explorer item cards animation inside the submenu grid
export const explorerItemVariants = {
  hidden: { opacity: 0, y: 8, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", stiffness: 400, damping: 26 }
  }
};

// Mobile sub-navigation pill dock container transition
export const mobileSubnavContainerVariants = {
  initial: { opacity: 0, x: 20, scale: 0.96, filter: "blur(4px)" },
  animate: { opacity: 1, x: 0, scale: 1, filter: "blur(0px)" },
  exit: { opacity: 0, x: 20, scale: 0.96, filter: "blur(4px)" },
  transition: { type: "spring", stiffness: 380, damping: 28 }
};

// Mobile sub-navigation individual pill item animation generator
export const getMobileSubnavItemVariants = (index = 0) => ({
  initial: { opacity: 0, y: 4, scale: 0.92 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: { delay: index * 0.025, type: "spring", stiffness: 420, damping: 26 }
});

// Main navigation dock container transition on mobile view switch
export const mainNavContainerVariants = {
  initial: { opacity: 0, x: -20, scale: 0.96, filter: "blur(4px)" },
  animate: { opacity: 1, x: 0, scale: 1, filter: "blur(0px)" },
  exit: { opacity: 0, x: -20, scale: 0.96, filter: "blur(4px)" },
  transition: { type: "spring", stiffness: 380, damping: 28 }
};

// Dock layout morphing transition (when container expands/resizes)
export const dockContainerTransition = {
  type: "spring",
  stiffness: 350,
  damping: 30
};

// Active pill indicator capsule sliding transition
export const activeDockIndicatorTransition = {
  type: "spring",
  stiffness: 420,
  damping: 30
};

// Tactile press & hover interactions
export const navPillTap = { scale: 0.92 };
export const navPillHover = { scale: 1.04, y: -1 };
export const brandLogoHover = { scale: 1.03, y: -1 };
export const brandLogoTap = { scale: 0.96 };
export const explorerCardHover = { scale: 1.02, x: 2 };
export const explorerCardTap = { scale: 0.98 };

// Initial page navbar entrance
export const navbarEntranceVariants = {
  hidden: { opacity: 0, y: -20, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 350,
      damping: 28,
    }
  }
};
