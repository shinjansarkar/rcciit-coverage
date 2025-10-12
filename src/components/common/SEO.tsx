import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'event';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  noIndex?: boolean;
  structuredData?: object;
}

const DEFAULT_TITLE = 'RCCIIT Coverage Team - Event Documentation & Resource Portal';
const DEFAULT_DESCRIPTION = 'Official documentation and resource portal for RCCIIT events. Access photos, videos, and resources from academic events, cultural festivals, and institutional activities.';
const DEFAULT_IMAGE = 'https://rcciit-coverage.vercel.app/og-image.jpg';
const SITE_URL = 'https://rcciit-coverage.vercel.app';

export const SEO: React.FC<SEOProps> = ({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords,
  image = DEFAULT_IMAGE,
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author = 'RCCIIT Coverage Team',
  noIndex = false,
  structuredData
}) => {
  const fullTitle = title ? `${title} | RCCIIT Coverage Team` : DEFAULT_TITLE;
  const fullUrl = url ? `${SITE_URL}${url}` : SITE_URL;
  const fullImage = image.startsWith('http') ? image : `${SITE_URL}${image}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content={author} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:alt" content={title || 'RCCIIT Coverage Team'} />
      <meta property="og:site_name" content="RCCIIT Coverage Team" />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {author && <meta property="article:author" content={author} />}

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={fullImage} />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;