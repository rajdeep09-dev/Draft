/**
 * Form validation utilities for Webflow forms
 */

/**
 * Validation error interface
 */
export interface ValidationError {
  field: string
  message: string
}

/**
 * Form validation schema
 */
export interface ValidationSchema {
  [key: string]: (value: any) => string | null
}

/**
 * Validate email address
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate URL
 */
export function validateURL(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * Validate phone number (basic international format)
 */
export function validatePhone(phone: string): boolean {
  const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

/**
 * Validate password strength
 */
export function validatePassword(password: string): {
  valid: boolean
  score: number
  feedback: string
} {
  let score = 0
  const feedback: string[] = []

  if (password.length < 8) {
    feedback.push('Password must be at least 8 characters')
  } else {
    score += 1
  }

  if (password.match(/[a-z]/)) {
    score += 1
  } else {
    feedback.push('Add lowercase letters')
  }

  if (password.match(/[A-Z]/)) {
    score += 1
  } else {
    feedback.push('Add uppercase letters')
  }

  if (password.match(/[0-9]/)) {
    score += 1
  } else {
    feedback.push('Add numbers')
  }

  if (password.match(/[^a-zA-Z0-9]/)) {
    score += 1
  } else {
    feedback.push('Add special characters')
  }

  return {
    valid: score >= 4,
    score,
    feedback: feedback.join(', '),
  }
}

/**
 * Validate required field
 */
export function validateRequired(value: any): boolean {
  if (typeof value === 'string') {
    return value.trim().length > 0
  }
  return Boolean(value)
}

/**
 * Validate minimum length
 */
export function validateMinLength(value: string, min: number): boolean {
  return value.length >= min
}

/**
 * Validate maximum length
 */
export function validateMaxLength(value: string, max: number): boolean {
  return value.length <= max
}

/**
 * Validate number range
 */
export function validateRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max
}

/**
 * Validate against regex pattern
 */
export function validatePattern(value: string, pattern: RegExp): boolean {
  return pattern.test(value)
}

/**
 * Validate form data against schema
 */
export function validateForm(
  formData: Record<string, any>,
  schema: ValidationSchema
): ValidationError[] {
  const errors: ValidationError[] = []

  for (const [field, validator] of Object.entries(schema)) {
    const value = formData[field]
    const error = validator(value)
    
    if (error) {
      errors.push({ field, message: error })
    }
  }

  return errors
}

/**
 * Validate credit card number (Luhn algorithm)
 */
export function validateCreditCard(cardNumber: string): boolean {
  const digits = cardNumber.replace(/\D/g, '')
  
  if (digits.length < 13 || digits.length > 19) {
    return false
  }

  let sum = 0
  let isEven = false

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i], 10)

    if (isEven) {
      digit *= 2
      if (digit > 9) {
        digit -= 9
      }
    }

    sum += digit
    isEven = !isEven
  }

  return sum % 10 === 0
}

/**
 * Validate file upload
 */
export function validateFile(
  file: File,
  options?: {
    maxSize?: number // in bytes
    allowedTypes?: string[]
  }
): { valid: boolean; error?: string } {
  if (!file) {
    return { valid: false, error: 'No file selected' }
  }

  if (options?.maxSize && file.size > options.maxSize) {
    return {
      valid: false,
      error: `File size exceeds ${options.maxSize / 1024 / 1024}MB limit`,
    }
  }

  if (options?.allowedTypes && !options.allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `File type not allowed. Allowed types: ${options.allowedTypes.join(', ')}`,
    }
  }

  return { valid: true }
}

/**
 * Clean form data (trim strings, remove empty fields)
 */
export function cleanFormData(
  data: Record<string, any>,
  removeEmpty = false
): Record<string, any> {
  const cleaned: Record<string, any> = {}

  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      cleaned[key] = value.trim()
    } else {
      cleaned[key] = value
    }

    if (removeEmpty && !cleaned[key]) {
      delete cleaned[key]
    }
  }

  return cleaned
}

/**
 * Format form errors for display
 */
export function formatFormErrors(
  errors: ValidationError[]
): Record<string, string> {
  const formatted: Record<string, string> = {}

  for (const error of errors) {
    formatted[error.field] = error.message
  }

  return formatted
}

/**
 * Get first error for a field
 */
export function getFieldError(
  errors: ValidationError[],
  field: string
): string | null {
  const error = errors.find((e) => e.field === field)
  return error?.message || null
}

/**
 * Check if field has error
 */
export function hasFieldError(
  errors: ValidationError[],
  field: string
): boolean {
  return errors.some((e) => e.field === field)
}

/**
 * Common validation schema presets
 */
export const VALIDATION_SCHEMAS = {
  contactForm: {
    name: (value: string) =>
      !validateRequired(value) ? 'Name is required' : null,
    email: (value: string) => {
      if (!validateRequired(value)) return 'Email is required'
      if (!validateEmail(value)) return 'Invalid email address'
      return null
    },
    message: (value: string) =>
      !validateRequired(value) ? 'Message is required' : null,
  },
  
  loginForm: {
    email: (value: string) => {
      if (!validateRequired(value)) return 'Email is required'
      if (!validateEmail(value)) return 'Invalid email address'
      return null
    },
    password: (value: string) =>
      !validateRequired(value) ? 'Password is required' : null,
  },
  
  signupForm: {
    email: (value: string) => {
      if (!validateRequired(value)) return 'Email is required'
      if (!validateEmail(value)) return 'Invalid email address'
      return null
    },
    password: (value: string) => {
      if (!validateRequired(value)) return 'Password is required'
      const passwordCheck = validatePassword(value)
      if (!passwordCheck.valid) return passwordCheck.feedback
      return null
    },
    confirmPassword: (value: string) =>
      !validateRequired(value) ? 'Please confirm your password' : null,
  },
} as const
