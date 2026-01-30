import { Variants } from 'framer-motion';

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};

export const cinematicSlideIn: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.4, ease: 'easeInOut' }
  }
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.3 }
  }
};

export const glitchVariants: Variants = {
  initial: { x: 0, opacity: 1 },
  glitch: {
    x: [0, -5, 5, -5, 5, 0],
    opacity: [1, 0.8, 1, 0.8, 1],
    transition: {
      duration: 0.3,
      times: [0, 0.2, 0.4, 0.6, 0.8, 1]
    }
  }
};

export const goldShimmer: Variants = {
  hidden: { opacity: 0, x: '-120%' },
  visible: {
    opacity: [0, 1, 0],
    x: ['-120%', '120%'],
    transition: { duration: 1.6, ease: 'easeInOut' }
  }
};

export const lightSweep: Variants = {
  hidden: { opacity: 0, x: '-140%' },
  visible: {
    opacity: [0, 1, 0],
    x: ['-140%', '140%'],
    transition: { duration: 2, ease: [0.34, 1.56, 0.64, 1] }
  }
};

export const energyBurst: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: {
    opacity: [0, 1, 0],
    scale: [0.6, 1.1, 1.6],
    transition: { duration: 0.8, ease: 'easeOut' }
  }
};

export const scaleIn: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { duration: 0.4, ease: 'easeOut' }
  }
};

export const slideInFromRight: Variants = {
  hidden: { x: 100, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};

export const cinematicSlideInLeft: Variants = {
  hidden: { x: -80, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
  }
};

export const cinematicSlideInRight: Variants = {
  hidden: { x: 80, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
  }
};

export const pulseGlow: Variants = {
  initial: { opacity: 0.6 },
  animate: {
    opacity: [0.6, 1, 0.6],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

export const borderSweep = {
  initial: { pathLength: 0, opacity: 0 },
  animate: { 
    pathLength: 1, 
    opacity: 1,
    transition: { duration: 0.8, ease: 'easeInOut' }
  }
};

export const tealPulse: Variants = {
  initial: { opacity: 0.4 },
  animate: {
    opacity: [0.4, 1, 0.4],
    transition: { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }
  }
};

export const screenShake: Variants = {
  shake: {
    x: [0, -10, 10, -10, 10, -5, 5, 0],
    y: [0, -5, 5, -5, 5, -3, 3, 0],
    transition: {
      duration: 0.5,
      times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 1]
    }
  }
};
