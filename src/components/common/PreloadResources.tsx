import { useEffect } from 'react';

interface PreloadResourcesProps {
  images?: string[];
  fonts?: string[];
  scripts?: string[];
}

export const PreloadResources: React.FC<PreloadResourcesProps> = ({
  images = [],
  fonts = [],
  scripts = []
}) => {
  useEffect(() => {
    // Preload critical images
    images.forEach((src) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });

    // Preload fonts
    fonts.forEach((src) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'font';
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
      link.href = src;
      document.head.appendChild(link);
    });

    // Preload scripts
    scripts.forEach((src) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'script';
      link.href = src;
      document.head.appendChild(link);
    });

    // Performance optimizations
    
    // DNS prefetch for external domains
    const externalDomains = [
      '//fonts.googleapis.com',
      '//fonts.gstatic.com',
      '//cdn.jsdelivr.net'
    ];

    externalDomains.forEach((domain) => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = domain;
      document.head.appendChild(link);
    });

    // Prefetch next likely pages
    const prefetchPages = ['/events', '/login'];
    
    prefetchPages.forEach((page) => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = page;
      document.head.appendChild(link);
    });

  }, [images, fonts, scripts]);

  return null; // This component doesn't render anything
};

// Performance monitoring utilities
export const reportWebVitals = (metric: any) => {
  // You can send metrics to analytics service
  if (process.env.NODE_ENV === 'development') {
    console.log('Web Vital:', metric);
  }
  
  // Example: Send to Google Analytics
  // gtag('event', metric.name, {
  //   event_category: 'Web Vitals',
  //   value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
  //   event_label: metric.id,
  //   non_interaction: true,
  // });
};

// Optimize images with different formats
export const getOptimizedImageUrl = (src: string, width?: number, format?: 'webp' | 'avif' | 'jpg') => {
  // This would integrate with your image CDN/optimization service
  // For now, return the original src
  let optimizedSrc = src;
  
  if (width) {
    // Add width parameter if supported by your CDN
    optimizedSrc += `?w=${width}`;
  }
  
  if (format) {
    // Add format parameter if supported by your CDN
    optimizedSrc += `${width ? '&' : '?'}format=${format}`;
  }
  
  return optimizedSrc;
};

export default PreloadResources;