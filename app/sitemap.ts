import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url             : 'https://www.ianfebisastrataruna.my.id',
      lastModified    : new Date(),
      changeFrequency : 'weekly',
      priority        : 1,
    },
    {
      url             : 'https://www.ianfebisastrataruna.my.id/portofolio',
      lastModified    : new Date(),
      changeFrequency : 'daily',
      priority        : 0.8,
    },
    {
      url             : 'https://www.ianfebisastrataruna.my.id/portofolio/loyalty-management-for-astra-honda-motor',
      lastModified    : new Date(),
      changeFrequency : 'daily',
      priority        : 0.8,
    },
    {
      url             : 'https://www.ianfebisastrataruna.my.id/portofolio/gendut-grosir',
      lastModified    : new Date(),
      changeFrequency : 'daily',
      priority        : 0.8,
    },
  ]
}
