import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url             : 'https://ianfebisastrataruna.my.id',
      lastModified    : new Date(),
      changeFrequency : 'weekly',
      priority        : 1,
    },
    {
      url             : 'https://ianfebisastrataruna.my.id/portofolio',
      lastModified    : new Date(),
      changeFrequency : 'daily',
      priority        : 0.8,
    },
  ]
}
