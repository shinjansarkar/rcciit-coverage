# Glassmorphic Design Update

## Overview
Complete redesign of the RCCIIT Coverage portal with a continuous scrolling background carousel and glassmorphic UI elements.

## Key Changes

### 1. **Continuous Background Carousel**
- **Component**: `src/components/common/BackgroundCarousel.tsx`
- **Technology**: `embla-carousel-auto-scroll`
- **Features**:
  - Infinite continuous scrolling (no pauses between slides)
  - Speed: 0.5 (smooth, slow scroll)
  - Never stops on interaction or hover
  - Fixed full-page background (z-index: -10)
  - Dark overlay with backdrop blur for content readability
  - Triple-repeated images for seamless infinite loop

### 2. **Theme Update: Glossy Black + Dark Gold**

#### Color Palette
```css
--background: #000000 (Pure Black)
--card: #141414 (Glossy Black)
--primary: #8B6914 (Dark Gold)
--foreground: #F2F2F2 (Off-white Text)
--muted-foreground: #999999 (Gray Text)
```

#### Custom Effects
- **Glass Effect**: Semi-transparent black (70% opacity) with 12px blur
- **Glass Effect Strong**: Semi-transparent black (85% opacity) with 16px blur
- **Glossy Gold**: Gradient buttons with inner shadow for depth
- **Hover States**: Enhanced gold glow on interactive elements

### 3. **Updated Pages**

#### Home.tsx
- ✅ Background carousel component
- ✅ Glassmorphic hero section
- ✅ Transparent stats section with blur
- ✅ Glassmorphic time period cards
- ✅ Glossy gold buttons
- ✅ Enhanced drop shadows for text legibility

#### EventsList.tsx
- ✅ Background carousel component
- ✅ Glassmorphic header with period info
- ✅ Transparent event cards
- ✅ Glossy gold action buttons
- ✅ Glass effect on back button

#### EventDetail.tsx
- ✅ Background carousel component
- ✅ Glassmorphic event header
- ✅ Transparent resource cards
- ✅ Glass effect on all sections
- ✅ Glossy gold "Open Drive" buttons

### 4. **CSS Utilities Added**

```css
.glass-effect {
  background: rgba(20, 20, 20, 0.7);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.glass-effect-strong {
  background: rgba(20, 20, 20, 0.85);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(139, 105, 20, 0.3);
}

.glossy-gold {
  background: linear-gradient(135deg, #8B6914, #B8860B);
  box-shadow: 0 4px 12px rgba(139, 105, 20, 0.4),
              inset 0 1px 0 rgba(255, 255, 255, 0.2);
}
```

### 5. **Design Principles**

1. **Transparency**: All components have semi-transparent backgrounds
2. **Blur**: Consistent backdrop-filter blur for depth
3. **Contrast**: Dark backgrounds ensure carousel visibility
4. **Gold Accents**: Dark gold (#8B6914) for all interactive elements
5. **Smooth Transitions**: 0.3s cubic-bezier animations
6. **Legibility**: Enhanced text shadows and proper contrast ratios

## Technical Details

### Package Installed
```bash
npm install embla-carousel-auto-scroll
```

### Image Requirements
- Location: `public/images/events/`
- Files: `slide1.jpg` through `slide7.jpg`
- Images are tripled in the carousel for seamless infinite scroll
- Background images show through all transparent components

## User Experience

### Desktop
- Full-screen background carousel continuously scrolls
- All content appears in glassmorphic cards over the carousel
- Subtle blur effect maintains focus on content
- Gold buttons stand out against dark backgrounds

### Mobile
- Responsive glassmorphic design maintained
- Touch interactions don't stop the carousel
- Content remains readable with proper contrast

## Browser Compatibility

The design uses modern CSS features:
- `backdrop-filter` (supported in all modern browsers)
- CSS gradients
- RGBA colors
- CSS animations

Fallback for older browsers: Solid dark backgrounds if backdrop-filter unsupported.

## Next Steps

1. Add your event photos to `public/images/events/`
2. Test the continuous scroll speed (adjust in `BackgroundCarousel.tsx` if needed)
3. Verify text legibility across all pages
4. Consider adding more images for longer scroll sequences

## Performance Notes

- Images use lazy loading (except first 3)
- Carousel uses CSS transforms (GPU accelerated)
- Backdrop blur is performant on modern devices
- Fixed positioning prevents layout reflows
