import type { MetadataRoute } from 'next';
import { profile, projects } from '@/data/portfolio';
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: profile.url, changeFrequency: 'monthly', priority: 1 },
    ...projects.map((project) => ({
      url: `${profile.url}/projects/${project.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
