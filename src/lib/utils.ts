/**
 * Utility functions for the Draft application
 */

/**
 * Class name utility - conditionally join class names
 * Similar to clsx but simpler for our use case
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

/**
 * Format currency values
 */
export function formatCurrency(
  amount: number,
  currency: string = 'USD',
  locale: string = 'en-US'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount)
}

/**
 * Debounce function for event handlers
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}

/**
 * Throttle function for event handlers
 */
export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      fn(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

/**
 * Get viewport dimensions
 */
export function getViewportSize() {
  if (typeof window === 'undefined') {
    return { width: 0, height: 0 }
  }

  return {
    width: window.innerWidth,
    height: window.innerHeight,
  }
}

/**
 * Check if element is in viewport
 */
export function isElementInViewport(element: Element): boolean {
  const rect = element.getBoundingClientRect()
  return (
    rect.top < window.innerHeight &&
    rect.bottom > 0 &&
    rect.left < window.innerWidth &&
    rect.right > 0
  )
}

/**
 * Format date to readable string
 */
export function formatDate(
  date: Date,
  format: string = 'MMM D, YYYY'
): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date)
}

/**
 * Sanitize HTML string (basic)
 * Note: Use a proper library like DOMPurify for production
 */
export function sanitizeHTML(html: string): string {
  const tempDiv = document.createElement('div')
  tempDiv.textContent = html
  return tempDiv.innerHTML
}

/**
 * Get data attribute value from element
 */
export function getDataAttribute(
  element: Element,
  attribute: string
): string | null {
  return element.getAttribute(`data-${attribute}`)
}

/**
 * Set data attribute on element
 */
export function setDataAttribute(
  element: Element,
  attribute: string,
  value: string
): void {
  element.setAttribute(`data-${attribute}`, value)
}

/**
 * Wait for DOM element to exist
 */
export function waitForElement(
  selector: string,
  timeout = 5000
): Promise<Element | null> {
  return new Promise((resolve) => {
    const element = document.querySelector(selector)
    if (element) {
      resolve(element)
      return
    }

    const startTime = Date.now()
    const observer = new MutationObserver(() => {
      const element = document.querySelector(selector)
      if (element) {
        observer.disconnect()
        resolve(element)
      }

      if (Date.now() - startTime > timeout) {
        observer.disconnect()
        resolve(null)
      }
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })
  })
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}

/**
 * Get query parameter value
 */
export function getQueryParam(param: string): string | null {
  if (typeof window === 'undefined') return null
  
  const searchParams = new URLSearchParams(window.location.search)
  return searchParams.get(param)
}

/**
 * Set query parameter without page reload
 */
export function setQueryParam(param: string, value: string): void {
  if (typeof window === 'undefined') return

  const url = new URL(window.location.href)
  url.searchParams.set(param, value)
  window.history.replaceState({}, '', url)
}

/**
 * Check if device is mobile
 */
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false

  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
}

/**
 * Get current breakpoint
 */
export function getCurrentBreakpoint(): 'mobile' | 'tablet' | 'desktop' {
  if (typeof window === 'undefined') return 'desktop'

  const width = window.innerWidth
  
  if (width < 480) return 'mobile'
  if (width < 992) return 'tablet'
  return 'desktop'
}

/**
 * Retry async operation
 */
export async function retry<T>(
  fn: () => Promise<T>,
  options = { maxAttempts: 3, delay: 1000 }
): Promise<T> {
  let lastError: Error | null = null

  for (let i = 0; i < options.maxAttempts; i++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error as Error
      if (i < options.maxAttempts - 1) {
        await new Promise((resolve) =>
          setTimeout(resolve, options.delay * (i + 1))
        )
      }
    }
  }

  throw lastError || new Error('Max retry attempts reached')
}
