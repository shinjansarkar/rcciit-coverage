// Structured Data (JSON-LD) helpers for SEO

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  coverImage?: string;
  location?: string;
  category?: string;
}

export interface Organization {
  name: string;
  url: string;
  logo: string;
  description: string;
  email: string;
}

// Organization structured data
export const createOrganizationStructuredData = (org: Organization) => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": org.name,
  "url": org.url,
  "logo": org.logo,
  "description": org.description,
  "email": org.email,
  "sameAs": [
    // Add social media links here when available
  ]
});

// Event structured data
export const createEventStructuredData = (event: Event, organizationName: string = "RCCIIT Coverage Team") => ({
  "@context": "https://schema.org",
  "@type": "Event",
  "name": event.title,
  "description": event.description,
  "startDate": event.date,
  "image": event.coverImage,
  "organizer": {
    "@type": "Organization",
    "name": organizationName
  },
  ...(event.location && {
    "location": {
      "@type": "Place",
      "name": event.location
    }
  }),
  "eventStatus": "https://schema.org/EventScheduled"
});

// Website structured data
export const createWebsiteStructuredData = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "RCCIIT Coverage Team",
  "url": "https://coverage.rcciit.org",
  "description": "Official documentation and resource portal for RCCIIT events",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://coverage.rcciit.org/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
});

// Breadcrumb structured data
export const createBreadcrumbStructuredData = (breadcrumbs: Array<{ name: string; url: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": breadcrumbs.map((crumb, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": crumb.name,
    "item": crumb.url
  }))
});

// Collection/Gallery structured data
export const createImageGalleryStructuredData = (title: string, images: Array<{ url: string; caption?: string }>) => ({
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  "name": title,
  "image": images.map(img => ({
    "@type": "ImageObject",
    "url": img.url,
    ...(img.caption && { "caption": img.caption })
  }))
});

// Educational organization data (for RCCIIT)
export const createEducationalOrganizationData = () => ({
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "RCC Institute of Information Technology",
  "alternateName": "RCCIIT",
  "url": "https://www.rcciit.org",
  "description": "Premier engineering college affiliated to Maulana Abul Kalam Azad University of Technology (MAKAUT)",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Canal South Road, Beliaghata",
    "addressLocality": "Kolkata",
    "addressRegion": "West Bengal",
    "postalCode": "700015",
    "addressCountry": "IN"
  }
});