# Components Directory

This directory contains reusable React components extracted from the Webflow HTML export.

## Component Structure

### Layout Components
- **Navbar** - Navigation bar with logo and menu (responsive)
- **Footer** - Footer section with links and info
- **Section** - Generic section wrapper with consistent padding/spacing

### Page Sections
- **HeroSection** - Hero/header section with title and CTA
- **FeaturedWorkSection** - Grid of featured work/case studies
- **TestimonialSection** - User testimonials/reviews
- **PricingSection** - Pricing plans with toggle
- **CTASection** - Call-to-action section

### Feature Components
- **Card** - Reusable card component
- **Button** - CTA button with variants
- **Form** - Form wrapper with validation
- **Modal** - Modal dialog component
- **Slider** - Image/content slider (Swiper-based)

### Utility Components
- **Container** - Centered content wrapper
- **Grid** - Responsive grid layout
- **Spacer** - Vertical spacing component

## Naming Conventions

- Use PascalCase for component files
- Export as default from component file
- Add `.tsx` extension for TypeScript components
- Include TypeScript interfaces for props

## Best Practices

1. **Preserve Webflow Classes** - Keep all original class names from Webflow export
2. **Data Attributes** - Preserve all `data-*` attributes for animations/interactions
3. **Props** - Accept content and configuration as props
4. **Styling** - Use original Webflow CSS (don't add Tailwind)
5. **Accessibility** - Maintain all ARIA attributes and semantic HTML

## Example Component Structure

```tsx
// src/components/Card.tsx
interface CardProps {
  title: string
  description: string
  image: string
  className?: string
}

export default function Card({ title, description, image, className }: CardProps) {
  return (
    <div className={`card-component ${className || ''}`}>
      {/* Content */}
    </div>
  )
}
```

## Migration Notes

These components are designed to be extracted from the main HTML and used throughout the site. The original HTML-injected approach in `page.tsx` can be gradually replaced with these modular components for better maintainability.

Each component should:
1. Accept children/content as props
2. Preserve all original CSS classes
3. Support customization via props
4. Work with Webflow's animation attributes
5. Be fully typed with TypeScript
