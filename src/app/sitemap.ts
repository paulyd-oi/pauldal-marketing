import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://pauldalstudios.com";
  const now = new Date();

  return [
    { url: base, lastModified: now, priority: 1.0 },
    { url: `${base}/about`, lastModified: now, priority: 0.8 },
    { url: `${base}/services`, lastModified: now, priority: 0.8 },
    { url: `${base}/portfolio`, lastModified: now, priority: 0.7 },
    { url: `${base}/book`, lastModified: now, priority: 0.9 },
  ];
}
