# Slideshow Setup Instructions

## Image Placement

Place your event photos in the following location with these exact filenames:

```
public/images/events/
├── slide1.jpg
├── slide2.jpg
├── slide3.jpg
├── slide4.jpg
├── slide5.jpg
├── slide6.jpg
└── slide7.jpg
```

## Based on the Photos Provided

Based on your concert/event photos, save them as:
- **slide1.jpg** - Band performance with full stage view (first image with multiple band members)
- **slide2.jpg** - Duo singers performing (two performers with traditional vest)
- **slide3.jpg** - Singer with open arms gesture (blue shirt performer)
- **slide4.jpg** - Silhouette performer with red shawl
- **slide5.jpg** - Performer with microphone stand (headband performer)
- **slide6.jpg** - Female vocalist in black outfit
- **slide7.jpg** - Any additional event photo you'd like to include

## Image Requirements

- **Format**: JPG, PNG, or WebP
- **Recommended size**: 1920x1080px (Full HD) or similar 16:9 aspect ratio
- **File size**: Keep under 500KB per image for optimal loading
- **Orientation**: Landscape/horizontal orientation works best

## Features

The slideshow includes:
- ✅ Auto-play with 3-second intervals
- ✅ Pause on mouse hover
- ✅ Smooth transitions
- ✅ Responsive design (adapts to mobile/desktop)
- ✅ Gradient overlay for text readability
- ✅ Infinite loop

## Customization

To modify the slideshow behavior, edit `src/pages/public/Home.tsx`:

```tsx
// Change slide duration (currently 3000ms = 3 seconds)
Autoplay({
  delay: 3000, // Change this value
  stopOnInteraction: false,
  stopOnMouseEnter: true,
})

// Add/remove images
const slideshowImages = [
  "/images/events/slide1.jpg",
  "/images/events/slide2.jpg",
  // Add more...
];
```

## Troubleshooting

If images don't show:
1. Verify images are in `public/images/events/` directory
2. Check filenames match exactly (case-sensitive)
3. Ensure images are in a web-compatible format (JPG, PNG, WebP)
4. Clear browser cache and refresh
