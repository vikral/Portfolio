/** Site-wide SEO defaults used by index.html helpers and usePageMeta. */
export const SITE = {
  name: 'Vikral',
  title: 'Shubham Kumar — Software Engineer & WordPress Developer',
  titleTemplate: (page) => `${page} | Shubham Kumar`,
  description: 'Shubham Kumar (known as Vikral) is a professional Software Engineer and WordPress Developer with 5+ years of experience building scalable websites, eCommerce platforms, and modern web applications using WordPress, Angular, PHP, and JavaScript.',
  url: 'https://vikral.netlify.app',
  author: 'Shubham Kumar',
  nickname: 'Vikral',
  locale: 'en_US',
  language: 'en',
  email: 'vikralshubham1@gmail.com',
  ogImage: 'https://vikral.netlify.app/og-image.png',
  ogImageAlt: 'Shubham Kumar — Software Engineer & WordPress Developer',
  themeColor: '#0D0D0D',
  keywords: [
    'Shubham Kumar',
    'Shubham Vikral',
    'Vikral',
    'WordPress Developer',
    'Software Engineer',
    'Angular Developer',
    'WooCommerce Developer',
    'PHP Developer',
    'Freelance Web Developer India',
    'CMS Developer',
  ].join(', '),
}

/** Absolute URL for a path (leading slash optional). */
export function absoluteUrl(path = '/') {
  if (!path || path === '/') return `${SITE.url}/`
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${SITE.url}${normalized}`
}

/** Default homepage JSON-LD (Person + WebSite). */
export function homeJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE.url}/#website`,
        url: `${SITE.url}/`,
        name: SITE.name,
        description: SITE.description,
        inLanguage: SITE.language,
        publisher: { '@id': `${SITE.url}/#person` },
      },
      {
        '@type': 'Person',
        '@id': `${SITE.url}/#person`,
        name: SITE.author,
        alternateName: SITE.nickname,
        url: `${SITE.url}/`,
        email: SITE.email,
        jobTitle: 'Software Engineer & WordPress Developer',
        description: SITE.description,
        image: SITE.ogImage,
        knowsAbout: [
          'WordPress',
          'WooCommerce',
          'Angular',
          'PHP',
          'JavaScript',
          'Drupal',
          'Web Performance',
          'SEO',
          'Accessibility',
        ],
      },
      {
        '@type': 'ProfilePage',
        '@id': `${SITE.url}/#profilepage`,
        url: `${SITE.url}/`,
        name: SITE.title,
        description: SITE.description,
        mainEntity: { '@id': `${SITE.url}/#person` },
        isPartOf: { '@id': `${SITE.url}/#website` },
      },
    ],
  }
}
