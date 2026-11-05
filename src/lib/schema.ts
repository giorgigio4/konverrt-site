import { site } from '../data/site';

const org = () => ({
  '@type': 'Organization',
  '@id': `${site.url}/#org`,
  name: site.name,
  url: site.url,
  logo: `${site.url}/logo.png`,
  email: site.email,
  founder: { '@type': 'Person', name: site.founder, sameAs: site.founderLinkedin },
  address: { '@type': 'PostalAddress', streetAddress: site.address.street, addressLocality: site.address.city, addressCountry: site.address.countryCode },
  sameAs: [site.youtube, site.linkedin],
  contactPoint: { '@type': 'ContactPoint', email: site.email, contactType: 'sales' },
});

export const organization = () => ({ '@context': 'https://schema.org', ...org() });

export const service = () => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Deal origination for M&A advisors and private equity firms',
  serviceType: 'Deal origination',
  description: 'Business owners who replied that they are open to a conversation about selling, delivered in batches of 10. Per-lead refund, no retainer, month to month.',
  provider: { '@id': `${site.url}/#org` },
  areaServed: 'US',
  audience: { '@type': 'BusinessAudience', audienceType: 'M&A advisors, lower-middle-market private equity firms, independent sponsors, search funds' },
  offers: {
    '@type': 'Offer',
    priceSpecification: { '@type': 'PriceSpecification', minPrice: site.price.min, maxPrice: site.price.max, priceCurrency: site.price.currency, unitText: site.price.unit },
    url: `${site.url}/pricing/`,
  },
});

export const faqPage = (qas: { q: string; a: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: qas.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
});

export const breadcrumb = (items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: `${site.url}${it.path}` })),
});

export const webPage = (name: string, path: string, description: string) => ({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name,
  url: `${site.url}${path}`,
  description,
  isPartOf: { '@type': 'WebSite', name: site.name, url: site.url },
  about: { '@id': `${site.url}/#org` },
});
