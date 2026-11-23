import React, { useEffect } from 'react';
import { SITE_CONFIG } from '../config/siteConfig';

export interface BreadcrumbSchemaItem {
  name: string;
  path: string;
}

export interface SeoHeadProps {
  title: string;
  description: string;
  canonicalPath: string;
  breadcrumbs?: BreadcrumbSchemaItem[];
  serviceSchema?: {
    name: string;
    description: string;
    serviceType: string;
  };
  faqSchema?: Array<{ question: string; answer: string }>;
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let tag = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function upsertCanonical(href: string) {
  let link = document.head.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

export const SeoHead: React.FC<SeoHeadProps> = ({
  title,
  description,
  canonicalPath,
  breadcrumbs,
  serviceSchema,
  faqSchema,
}) => {
  useEffect(() => {
    const cleanPath = canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`;
    const canonicalDomain = SITE_CONFIG.domain.canonicalUrl;
    const canonicalUrl = `${canonicalDomain}${cleanPath === '/' ? '/' : cleanPath}`;

    document.title = title;
    upsertMeta('name', 'description', description);
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', canonicalUrl);
    upsertMeta('property', 'og:site_name', SITE_CONFIG.seoDefaults.siteName);
    upsertMeta('property', 'og:image', SITE_CONFIG.seoDefaults.ogImage);
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', SITE_CONFIG.seoDefaults.ogImage);
    upsertCanonical(canonicalUrl);

    // Build truthful Schema.org JSON-LD graph (zero fake ratings, reviews, or office address)
    const graph: Array<Record<string, unknown>> = [
      {
        '@type': 'ProfessionalService',
        '@id': `${canonicalDomain}/#organization`,
        name: SITE_CONFIG.brand.name,
        url: canonicalDomain,
        description: SITE_CONFIG.seoDefaults.defaultDescription,
        telephone: SITE_CONFIG.contact.phoneDisplay,
        email: SITE_CONFIG.contact.email,
        areaServed: [
          { '@type': 'City', name: 'Delhi' },
          { '@type': 'AdministrativeArea', name: 'Delhi NCR' },
          { '@type': 'Country', name: 'India' },
        ],
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: [
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
              'Sunday',
            ],
            opens: '10:00',
            closes: '21:00',
          },
        ],
      },
    ];

    if (breadcrumbs && breadcrumbs.length > 0) {
      graph.push({
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((crumb, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: crumb.name,
          item: `${canonicalDomain}${crumb.path === '/' ? '/' : crumb.path}`,
        })),
      });
    }

    if (serviceSchema) {
      graph.push({
        '@type': 'Service',
        name: serviceSchema.name,
        description: serviceSchema.description,
        serviceType: serviceSchema.serviceType,
        provider: { '@id': `${canonicalDomain}/#organization` },
        areaServed: [
          { '@type': 'AdministrativeArea', name: 'Delhi NCR' },
          { '@type': 'Country', name: 'India' },
        ],
      });
    }

    if (faqSchema && faqSchema.length > 0) {
      graph.push({
        '@type': 'FAQPage',
        mainEntity: faqSchema.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      });
    }

    let script = document.head.querySelector('script[data-lostbyte-jsonld="true"]');
    if (!script) {
      script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      script.setAttribute('data-lostbyte-jsonld', 'true');
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': graph,
    });
  }, [title, description, canonicalPath, breadcrumbs, serviceSchema, faqSchema]);

  return null;
};
