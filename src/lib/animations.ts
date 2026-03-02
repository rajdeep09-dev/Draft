/**
 * Animation utilities and helpers for Webflow interactions
 * These work with GSAP, ScrollTrigger, and Lenis scripts
 */

/**
 * Animation attributes recognized by Webflow/GSAP
 */
export const ANIMATION_ATTRIBUTES = {
  // Page load animations
  LOADER_ANIME: 'loader-anime',
  FD_ANIME: 'fd-anime',
  
  // Scroll-triggered animations
  SCROLL_ANIME: 'scroll-anime',
  AFTER_SPLIT_BLUR_FADE: 'after-split-blur-fade',
  BEFORE_SPLIT_BLUR_FADE: 'before-split-blur-fade',
  
  // Directional animations
  FADE_RIGHT: 'faderight',
  FADE_LEFT: 'fadeleft',
  FADE_UP: 'fadeup',
  FADE_DOWN: 'fadedown',
  
  // Split text animations
  SPLIT_ANIME_BLUR: 'split-anime-blur',
  
  // Interactive elements
  LOADER_ANIME_TYPE: 'loader-anime',
  SCROLL_ANIME_TYPE: 'scroll-anime',
} as const

/**
 * CSS classes used in animations
 */
export const ANIMATION_CLASSES = {
  PARTICLE_ABSOLUTE: 'particle-absolute',
  SPLIT_WORD: 'split-word',
  FEATURED_WORK_STICKY: 'featured-work-sticky-wrap',
  SECTION_HEADER: 'section-header',
} as const

/**
 * Initialize Webflow scroll animations on an element
 * This is called automatically by the Webflow scripts,
 * but can be manually triggered if needed
 */
export function triggerScrollAnimation(element: Element) {
  if (typeof window !== 'undefined' && 'gsap' in window) {
    // GSAP ScrollTrigger will handle this automatically
    // Just ensure the element has the proper data attributes
    return true
  }
  return false
}

/**
 * Manually trigger a fade animation on an element
 */
export function triggerFadeAnimation(
  element: Element,
  direction: 'up' | 'down' | 'left' | 'right' = 'up',
  duration: number = 0.8
) {
  if (typeof window === 'undefined') return
  
  const gsap = (window as any).gsap
  if (!gsap) return

  const toVars: any = {
    opacity: 1,
    duration,
    ease: 'power3.out',
  }

  // Set initial state
  gsap.set(element, {
    opacity: 0,
  })

  // Calculate translation based on direction
  const translateValue = 50
  switch (direction) {
    case 'up':
      gsap.set(element, { y: translateValue })
      toVars.y = 0
      break
    case 'down':
      gsap.set(element, { y: -translateValue })
      toVars.y = 0
      break
    case 'left':
      gsap.set(element, { x: translateValue })
      toVars.x = 0
      break
    case 'right':
      gsap.set(element, { x: -translateValue })
      toVars.x = 0
      break
  }

  // Animate in
  gsap.to(element, toVars)
}

/**
 * Register a scroll trigger for an element
 * Fires when element enters viewport
 */
export function createScrollTrigger(
  element: Element,
  onEnter: () => void,
  onLeave?: () => void
) {
  if (typeof window === 'undefined') return

  const gsap = (window as any).gsap
  const ScrollTrigger = gsap?.ScrollTrigger

  if (!ScrollTrigger) return

  return ScrollTrigger.create({
    trigger: element,
    onEnter: () => onEnter(),
    onLeave: () => onLeave?.(),
    markers: false, // Set to true for debugging
  })
}

/**
 * Wait for GSAP and ScrollTrigger to be loaded
 */
export async function waitForGSAP(timeout = 5000): Promise<boolean> {
  return new Promise((resolve) => {
    const startTime = Date.now()
    
    const checkGSAP = () => {
      if (typeof window !== 'undefined' && (window as any).gsap) {
        resolve(true)
        return
      }
      
      if (Date.now() - startTime > timeout) {
        resolve(false)
        return
      }
      
      setTimeout(checkGSAP, 100)
    }
    
    checkGSAP()
  })
}

/**
 * Trigger Lenis smooth scroll to element
 */
export function smoothScrollToElement(element: Element | null) {
  if (!element || typeof window === 'undefined') return

  const lenis = (window as any).lenis
  if (!lenis) {
    // Fallback to native scroll
    element.scrollIntoView({ behavior: 'smooth' })
    return
  }

  lenis.scrollTo(element)
}

/**
 * Initialize all animations on page load
 * This is called by the Webflow scripts automatically
 */
export function initializeAllAnimations() {
  if (typeof window === 'undefined') return

  // The Webflow scripts handle this automatically
  // This is just a placeholder for custom animation initialization
  
  document.dispatchEvent(new Event('animationsInitialized'))
}

/**
 * Animation configuration presets
 */
export const ANIMATION_PRESETS = {
  fadeInUp: {
    duration: 0.8,
    delay: 0,
    ease: 'power3.out',
  },
  fadeInLeft: {
    duration: 0.8,
    delay: 0,
    ease: 'power3.out',
  },
  fadeInRight: {
    duration: 0.8,
    delay: 0,
    ease: 'power3.out',
  },
  staggerDelay: 0.1,
  scrollTriggerDefaults: {
    start: 'top 85%',
    toggleActions: 'play reverse play reverse',
  },
} as const
