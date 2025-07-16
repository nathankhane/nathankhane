import { Variants } from 'framer-motion'

// Retro Animation Variants for Framer Motion
export const retroAnimations = {
  // Vintage Pop Animation
  vintagePop: {
    initial: { scale: 1 },
    animate: { 
      scale: [1, 1.05, 1],
      transition: {
        duration: 0.6,
        ease: [0.68, -0.55, 0.265, 1.55] // Bounce easing
      }
    },
    whileHover: {
      scale: [1, 1.02, 1],
      transition: {
        duration: 0.3,
        ease: [0.68, -0.55, 0.265, 1.55]
      }
    }
  } as Variants,

  // Retro Slide Animation
  retroSlide: {
    initial: { 
      opacity: 0,
      x: -30
    },
    animate: { 
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    exit: {
      opacity: 0,
      x: -30,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  } as Variants,

  // Vintage Fade In
  vintageFadeIn: {
    initial: { 
      opacity: 0,
      y: 20
    },
    animate: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    exit: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  } as Variants,

  // Retro Bounce
  retroBounce: {
    animate: {
      y: [0, -8, 0],
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  } as Variants,

  // Vintage Pulse
  vintagePulse: {
    animate: {
      opacity: [1, 0.7, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  } as Variants,

  // Retro Typewriter Effect
  retroTypewriter: {
    initial: { width: 0 },
    animate: { 
      width: "100%",
      transition: {
        duration: 3,
        ease: "easeInOut"
      }
    }
  } as Variants,

  // Vintage Scale In
  vintageScaleIn: {
    initial: { 
      scale: 0.8,
      opacity: 0
    },
    animate: { 
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.68, -0.55, 0.265, 1.55]
      }
    },
    exit: {
      scale: 0.8,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  } as Variants,

  // Retro Button Hover
  retroButtonHover: {
    initial: { 
      scale: 1,
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.12)"
    },
    whileHover: { 
      scale: 1.02,
      boxShadow: "0 8px 16px rgba(183, 62, 42, 0.2)",
      transition: {
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    whileTap: { 
      scale: 0.98,
      transition: {
        duration: 0.1,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  } as Variants,

  // Vintage Card Hover
  vintageCardHover: {
    initial: { 
      y: 0,
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
    },
    whileHover: { 
      y: -4,
      boxShadow: "0 8px 16px rgba(183, 62, 42, 0.15)",
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  } as Variants,

  // Retro Stagger Container
  retroStagger: {
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  } as Variants,

  // Vintage Badge Animation
  vintageBadge: {
    initial: { 
      scale: 0,
      rotate: -10
    },
    animate: { 
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.6,
        ease: [0.68, -0.55, 0.265, 1.55],
        delay: 0.3
      }
    },
    whileHover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        duration: 0.3,
        ease: [0.68, -0.55, 0.265, 1.55]
      }
    }
  } as Variants
}

// Utility functions for creating custom retro animations
export const createRetroAnimation = (
  initialState: any,
  animateState: any,
  duration: number = 0.5,
  ease: string | number[] = [0.4, 0, 0.2, 1]
) => ({
  initial: initialState,
  animate: {
    ...animateState,
    transition: {
      duration,
      ease
    }
  }
})

export const createRetroHover = (
  hoverState: any,
  duration: number = 0.3
) => ({
  whileHover: {
    ...hoverState,
    transition: {
      duration,
      ease: [0.4, 0, 0.2, 1]
    }
  }
})

export const createRetroStagger = (
  staggerDelay: number = 0.1,
  childrenDelay: number = 0.2
) => ({
  animate: {
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: childrenDelay
    }
  }
})

// Preset easing functions for retro animations
export const retroEasing = {
  bounce: [0.68, -0.55, 0.265, 1.55],
  smooth: [0.4, 0, 0.2, 1],
  elastic: [0.68, -0.55, 0.265, 1.55],
  slow: [0.25, 0.46, 0.45, 0.94],
  fast: [0.25, 0.46, 0.45, 0.94]
}