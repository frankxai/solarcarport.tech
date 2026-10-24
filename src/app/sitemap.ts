import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://solarcarport.tech';

  const routes = [
    '',
    '/commercial-audit',
    '/digital',
    '/partner-widget',
    '/system-check',
    '/v2',
    '/vault',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }));
}
