# Webflow to Next.js Migration Guide

## Project Status

This is a conversion of a Webflow export (`index.html`) to a Next.js 14+ project using the App Router.

### Completed ✓

1. **Phase 1: Project Scaffolding**
   - Initialized Next.js 14+ with App Router
   - Set up TypeScript configuration
   - Created folder structure: `src/app/`, `src/components/`, `src/styles/`, `public/`

2. **Phase 2: Asset Migration**
   - Copied all custom fonts (Rawest, DM Sans) to `/public/fonts/`
   - Copied all image assets to `/public/images/`
   - Copied CSS files to `/src/styles/`
   - Copied JavaScript libraries to `/public/scripts/`
   - Moved documents (PDFs) to `/public/documents/`

3. **Phase 3: Global Layout & Metadata**
   - Created `src/app/layout.tsx` with:
     - Proper metadata (title, description, OG tags)
     - Custom font declarations with `@font-face`
     - Webflow data attributes preserved
     - CSS imports in correct cascade order
     - Theme color configuration

4. **Phase 4: CSS Foundation**
   - Created `src/styles/globals.css` with global animation states
   - Imported all Webflow CSS files
   - Preserved all class names and selectors
   - Set up CSS custom properties for theming

### In Progress ⏳

5. **Phase 5: HTML Content Injection**
   - Converting 2400+ line HTML file to React
   - Preserving all Webflow attributes (data-*, class names)
   - Loading all animation scripts via `next/script`

### Key Implementation Details

#### CSS Architecture
- All original Webflow CSS is preserved without modification
- Global styles handle animation initial states
- Theme switching via CSS variables (light/dark mode, color schemes 1-10)
- Responsive breakpoints maintained (Desktop, Tablet, Mobile Landscape, Mobile Portrait)

#### Font Loading
- Using Next.js `@font-face` declarations in layout
- All 10 font weights of Rawest and DM Sans loaded with `font-display: swap`
- Fonts stored in `/public/fonts/` directory

#### Animation Infrastructure
The site uses multiple animation libraries working together:
- **GSAP** - Advanced animations with ScrollTrigger, DrawSVG, SplitText
- **Lenis** - Smooth scroll library
- **Swiper** - Carousel/slider functionality
- **Mouse Follower** - Custom cursor interaction
- **Custom Scripts** - `main-world.ts-B-snRbqi.js` for site-specific animations

#### Data-Driven Animations
Key animation attributes preserved:
- `fd-anime` - Hero load animations with split text blur/fade
- `loader-anime` - Page load animations (faderight, fadeleft, fadeup, fadedown)
- `scroll-anime` - Scroll-triggered animations
- `data-w-id` - Webflow interaction IDs
- `data-wf-page`, `data-wf-site` - Webflow metadata

### File Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with fonts and metadata
│   └── page.tsx                # Home page with script loaders
├── styles/
│   ├── globals.css             # Global styles and animation states
│   ├── webflow.css             # Main Webflow stylesheet
│   ├── mouse-follower.css      # Custom cursor styles
│   └── ui-loader.css           # Loading UI styles
└── components/                 # (To be populated with extracted components)

public/
├── fonts/                      # Custom fonts (Rawest, DM Sans - 10 weights each)
├── images/                     # All image assets (SVG, PNG, AVIF)
├── scripts/                    # Animation libraries and custom code
│   ├── gsap.min.js            # GreenSock Animation Platform
│   ├── DrawSVGPlugin.min.js    # SVG animation plugin
│   ├── ScrollTrigger.min.js    # Scroll-based animation trigger
│   ├── SplitText.min.js        # Text splitting for animations
│   ├── lenis.min.js            # Smooth scroll library
│   ├── swiper-bundle.min.js    # Carousel library
│   ├── webflow.8df354fb...js   # Main Webflow runtime
│   ├── main-world.ts...js      # Custom animation initialization
│   └── [other scripts]
├── documents/                  # Downloadable files (PDFs, etc)
└── favicon.ico

tsconfig.json                   # TypeScript configuration
next.config.js                  # Next.js configuration
package.json                    # Dependencies
```

### Webflow Interactions Preserved

1. **Scroll-Based Animations**
   - Elements animate in on scroll with Intersection Observer
   - Blur and fade effects on text elements
   - Particle effects on sections

2. **Theme Switching**
   - 10 color schemes available (pink, white, dark, etc.)
   - Light/dark mode toggle
   - Dynamic CSS variable updates

3. **Navigation**
   - Sticky navbar with scroll behavior
   - Mobile hamburger menu toggle
   - Smooth scroll to anchors

4. **Interactive Elements**
   - Form submission handling (contact forms)
   - Pricing toggle (monthly/annual)
   - Accordion/collapse sections
   - Modal dialogs

5. **Advanced Effects**
   - Custom cursor (mouse follower)
   - SVG animations
   - Split text animations
   - Parallax scrolling (via Lenis)

### Migration Checklist

- [x] Initialize Next.js project with App Router
- [x] Set up folder structure
- [x] Create root layout with metadata and fonts
- [x] Migrate all assets (images, fonts, documents)
- [x] Copy CSS files and set up global styles
- [x] Configure font-face declarations
- [x] Set up Script component for animations
- [ ] Extract and convert HTML body to React components
- [ ] Ensure all CSS classes are applied correctly
- [ ] Verify animations trigger on scroll
- [ ] Test form submissions
- [ ] Test responsive design on all breakpoints
- [ ] Test theme switching
- [ ] Verify all links work correctly
- [ ] Performance optimization (image optimization with next/image)
- [ ] SEO verification (meta tags, structured data)

### Next Steps

1. **Extract Main Content**
   - Convert the 2400+ line HTML body to React components
   - Preserve all Webflow class names and data attributes
   - Use `dangerouslySetInnerHTML` for complex nested HTML if needed

2. **Component Architecture**
   - Create component for navbar
   - Create component for hero section
   - Create component for featured work section
   - Create component for testimonials
   - Create component for pricing
   - Create component for footer
   - Create layout components for sections

3. **Form Handling**
   - Implement form validation
   - Create API route for form submissions
   - Add success/error states

4. **Dynamic Features**
   - Implement theme switcher
   - Add page transitions
   - Set up analytics

5. **Optimization**
   - Optimize images with `next/image`
   - Code splitting for large scripts
   - Lazy loading for below-the-fold content
   - Remove unused CSS

### Known Challenges

1. **HTML Size** - The source HTML is 2400+ lines with extensive inline styles
2. **Complex Selectors** - Webflow generates deeply nested selectors that must be preserved
3. **Animation Dependencies** - Multiple animation libraries with specific initialization order
4. **Dynamic Styles** - Inline style attributes with CSS variables require careful parsing

### Debugging Tips

1. Check browser console for script loading errors
2. Inspect element styles to verify CSS cascade
3. Use React DevTools to inspect component structure
4. Check Network tab to ensure all assets load from `/public/`
5. Verify animation library initialization in browser console

### Performance Considerations

- **Font Loading**: Using `font-display: swap` for better performance
- **Script Strategy**: Using `afterInteractive` to defer non-critical scripts
- **Image Optimization**: Migrate images to use `next/image` component
- **CSS**: Minification already done by Webflow export

### Browser Compatibility

The conversion maintains compatibility with:
- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome mobile)

### Testing Checklist

- [ ] Visual pixel-perfect match with original
- [ ] All interactions work (clicks, hovers, scrolls)
- [ ] Animations trigger correctly
- [ ] Forms submit successfully
- [ ] Responsive design works on all breakpoints
- [ ] Performance metrics acceptable
- [ ] SEO metadata correct
- [ ] Accessibility features working

### Support

For issues or questions about this migration:
1. Check the conversion notes in this file
2. Review the original Webflow export for reference
3. Check console for JavaScript errors
4. Verify all assets loaded in Network tab
