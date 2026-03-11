# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Technology Stack

- **Framework**: Next.js 15 with App Router and React 19
- **TypeScript**: Strict mode with comprehensive type definitions
- **Styling**: Tailwind CSS 4 with custom design system
- **Animations**: Framer Motion + custom CSS animations
- **Theme System**: next-themes with dark/light mode support
- **Development**: Turbopack for fast development builds
- **Deployment**: Vercel with optimized production builds

## Development Commands

```bash
# Development
npm run dev          # Start development server with Turbopack
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint with auto-fix
npm run type-check   # TypeScript type checking

# Analysis
npm run analyze      # Bundle analysis with @next/bundle-analyzer
```

## Architecture Overview

### Core Structure
- `app/` - Next.js App Router pages and layouts with TypeScript
- `components/` - Reusable React components with consistent interfaces
- `lib/` - Utilities, types, and shared logic
- `public/` - Static assets including optimized images and media

### Animation System
The codebase uses a sophisticated animation architecture:

- **AnimatedSection Wrapper**: Reusable component in `components/AnimatedSection.tsx` that provides viewport-based animations using Framer Motion
- **Custom CSS Animations**: Defined in `app/globals.css` for complex animations like the credibility bar scroll
- **Performance Optimization**: Animations are viewport-aware and use `transform` properties for GPU acceleration

Example usage:
```tsx
<AnimatedSection>
  <YourComponent />
</AnimatedSection>
```

### Theme System
Complete dark/light theme implementation:

- **CSS Variables**: Defined in `app/globals.css` with theme-specific values
- **Hydration Safety**: Uses `useHydrated` hook to prevent theme flash
- **Component Integration**: All components support theme switching via Tailwind classes

Key theme colors:
- Electric Cyan: `#4F8DFD` (brand primary)
- Ink Black: `#0F0F0F` (dark theme background)
- Parchment White: `#FEFEFE` (light theme background)

### Mobile Navigation
Uses React Portal architecture for z-index isolation:

- Portal renders directly in `document.body` to escape header context
- Ultra-high z-index (999999) ensures proper stacking
- Theme-aware styling with proper mobile spacing

### Content Integration
- **RSS Proxy**: Custom API route at `app/api/rss/route.ts` for Substack integration
- **Dynamic Imports**: Components loaded on-demand for performance
- **Embedded Content**: Calendly widgets and TikTok embeds with custom styling

## Component Patterns

### Props Interfaces
All components use TypeScript interfaces for props:

```tsx
interface ComponentProps {
  children: React.ReactNode;
  className?: string;
  // Other specific props
}
```

### Animation Wrappers
Consistent animation patterns using the AnimatedSection wrapper:

- Viewport-based triggering
- Customizable animation properties
- Performance-optimized transforms

### Theme Integration
Components should support both themes:

```tsx
className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
```

## Brand Guidelines

### Design Philosophy
"Business ≡ Poetry" - Professional excellence meets creative expression

### Visual Identity
- **Primary Font**: System font stack for performance
- **Color Palette**: Electric Cyan, Ink Black, Parchment White
- **Spacing**: Tailwind spacing scale with custom extensions
- **Animation**: Smooth, purposeful transitions (200-300ms duration)

### Content Strategy
- Professional portfolio showcasing business and creative work
- Substack integration for thought leadership
- Social proof through company credibility bar
- Clear calls-to-action for consultation services

## Performance Optimization

### Bundle Size
- Current first load: ~153kB optimized
- Dynamic imports for non-critical components
- Image optimization with Next.js Image component

### Animation Performance
- Use `transform` properties for GPU acceleration
- Viewport-based animation triggering
- CSS animations for complex sequences

### Loading Strategies
- Critical above-the-fold content loads first
- Progressive enhancement for interactive elements
- Lazy loading for below-the-fold content

## Troubleshooting

### Theme Flash Issues
- Ensure `useHydrated` hook is used for theme-dependent rendering
- Check that CSS variables are properly defined in globals.css

### Animation Performance
- Verify animations use `transform` and `opacity` properties
- Check that animations are not running on scroll events

### Mobile Navigation Issues
- Confirm Portal is rendering in document.body
- Verify z-index values are sufficiently high (999999)
- Check that theme classes are applied correctly

### Build Issues
- Run `npm run type-check` to catch TypeScript errors
- Use `npm run lint` to fix ESLint issues
- Clear `.next` cache if builds are inconsistent

## Development Guidelines

### Component Creation
1. Create TypeScript interface for props
2. Support both light and dark themes
3. Use AnimatedSection wrapper for viewport animations
4. Follow existing naming conventions

### Styling Approach
1. Use Tailwind classes for consistency
2. Custom CSS only for complex animations
3. Maintain responsive design patterns
4. Follow brand color guidelines

### Performance Considerations
1. Use dynamic imports for heavy components
2. Optimize images with Next.js Image component
3. Minimize layout shifts with proper sizing
4. Test animation performance on mobile devices