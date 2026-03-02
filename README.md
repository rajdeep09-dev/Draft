# Draftt - Next.js Migration

A modern Next.js 14+ implementation of the Draftt platform, converted from Webflow to provide a scalable, production-ready codebase with 100% visual and functional fidelity.

## Project Overview

Draftt is an AI-powered content workflow platform designed for teams looking to streamline their content creation process. This repository contains the Next.js App Router implementation with preserved animations, interactions, and styling from the original Webflow export.

## Quick Start

### Installation

```bash
# Using npm
npm install

# Using pnpm (recommended)
pnpm install

# Using yarn
yarn install
```

### Development

```bash
npm run dev
```

The application will start on `http://localhost:3000`

### Production Build

```bash
npm run build
npm run start
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with metadata and global styles
│   ├── page.tsx            # Home page with Webflow content injection
│   └── globals.css         # Global styles and font-face declarations
├── lib/
│   ├── animations.ts       # GSAP and animation utilities
│   ├── form-validation.ts  # Form validation logic
│   └── utils.ts            # General utility functions
└── styles/
    ├── globals.css         # Global CSS with custom properties
    ├── webflow.css         # Original Webflow styles
    ├── mouse-follower.css  # Custom cursor styles
    └── ui-loader.css       # Page loader animations

public/
├── fonts/                  # Custom web fonts (Rawest, DM Sans)
├── images/                 # All image assets
├── scripts/                # Animation libraries (GSAP, Lenis, Swiper)
└── documents/              # Downloadable files
```

## Key Features

### Animations & Interactions

The project uses GSAP with the following plugins for advanced animations:

- **ScrollTrigger**: Scroll-based animations
- **DrawSVGPlugin**: SVG path animations
- **SplitText**: Text animation capabilities
- **Lenis**: Smooth scroll implementation
- **Swiper**: Carousel/slider functionality

All original Webflow animations have been preserved and are powered by the Webflow runtime scripts.

### Styling

- **Custom Fonts**: Rawest and DM Sans web fonts with multiple weights
- **CSS Variables**: Theme color system with 10+ predefined color schemes
- **Responsive Design**: Mobile-first approach with Webflow breakpoints
- **Animation States**: Built-in CSS for loader animations and transitions

### Forms

The project includes comprehensive form handling with:

- Client-side validation
- Error message display
- Success state management
- Integration with third-party services

### Analytics & Tracking

- Google Tag Manager (GTM)
- Google Analytics
- Facebook Pixel
- ReB2B tracking
- Insight analytics

## Technology Stack

- **Framework**: Next.js 14+
- **Language**: TypeScript
- **Styling**: CSS (Original Webflow styles preserved)
- **Animation**: GSAP with plugins
- **Smooth Scroll**: Lenis
- **Carousels**: Swiper
- **Package Manager**: npm, pnpm, or yarn

## Deployment

### Vercel (Recommended)

The project is optimized for deployment on Vercel:

```bash
# Deploy to Vercel
vercel deploy

# Or connect your Git repository to Vercel dashboard
# https://vercel.com/new
```

### Other Platforms

The project can be deployed to any Node.js-compatible platform:

- Netlify
- AWS (Amplify, Lightsail, EC2)
- DigitalOcean
- Heroku
- Self-hosted VPS

## Environment Variables

Create a `.env.local` file for local development:

```env
# Example environment variables
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_GA_ID=G-XXXXXXX
```

## Performance Optimization

The project implements several optimizations:

- **Image Optimization**: Next.js Image component with automatic optimization
- **Code Splitting**: Automatic code splitting for routes
- **Script Optimization**: Async loading of non-critical scripts
- **Font Optimization**: Local font serving with optimized loading
- **Caching**: Proper cache headers for assets

## Troubleshooting

### Scripts Not Loading

If animation scripts aren't loading:

1. Check the `/public/scripts/` directory contains all required files
2. Verify `next.config.js` allows static files
3. Check browser console for CORS errors

### Fonts Not Displaying

If custom fonts aren't loading:

1. Ensure fonts are in `/public/fonts/`
2. Verify `@font-face` declarations in `src/styles/globals.css`
3. Check font file permissions (should be readable)

### Animations Not Working

If GSAP animations aren't triggering:

1. Verify GSAP library is loaded: `window.gsap` in console
2. Check that ScrollTrigger is registered: `gsap.registerPlugin(ScrollTrigger)`
3. Inspect elements have correct `data-animation` attributes

## Migration Details

This project was migrated from Webflow to Next.js following the [WEBFLOW_MIGRATION.md](./WEBFLOW_MIGRATION.md) and [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) documents. Key aspects of the migration include:

- **100% Visual Fidelity**: All CSS classes and styling preserved
- **Complete Interaction Support**: All Webflow interactions re-implemented
- **Asset Preservation**: All images, fonts, and media migrated
- **DOM Structure**: Exact HTML structure maintained for compatibility

## Contributing

To contribute to this project:

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes and commit: `git commit -m "feat: your feature"`
3. Push to the branch: `git push origin feature/your-feature`
4. Submit a pull request

## License

This project is private and proprietary. Unauthorized use is prohibited.

## Support

For issues, questions, or support:

- Review the [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) for detailed information
- Check the [WEBFLOW_MIGRATION.md](./WEBFLOW_MIGRATION.md) for architecture details
- Open an issue in the GitHub repository

## Related Documentation

- [Webflow Migration Details](./WEBFLOW_MIGRATION.md) - Complete migration documentation
- [Migration Implementation Guide](./MIGRATION_GUIDE.md) - Step-by-step implementation guide
- [Next.js Documentation](https://nextjs.org/docs)
- [GSAP Documentation](https://gsap.com/docs)
- [Vercel Deployment Guide](https://vercel.com/docs)
