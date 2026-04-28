import type { MetadataRoute } from "next";
import {
  getCategoriesWithGalleries,
  CATEGORY_SLUGS,
} from "@/lib/portfolio-public";

const BASE_URL = "https://pauldalstudios.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, priority: 1.0, changeFrequency: "weekly" },
    { url: `${BASE_URL}/about`, priority: 0.7, changeFrequency: "monthly" },
    { url: `${BASE_URL}/portfolio`, priority: 0.9, changeFrequency: "weekly" },
    { url: `${BASE_URL}/services`, priority: 0.7, changeFrequency: "monthly" },
    { url: `${BASE_URL}/book`, priority: 0.8, changeFrequency: "monthly" },
    { url: `${BASE_URL}/privacy`, priority: 0.3, changeFrequency: "yearly" },
    { url: `${BASE_URL}/terms`, priority: 0.3, changeFrequency: "yearly" },
  ];

  // Dynamic service pages — match dropdown visibility logic so categories
  // without any tagged galleries (FAMILY_LIFESTYLE, HEADSHOTS pre-launch)
  // stay out of the sitemap until they have content.
  const visibleCategories = await getCategoriesWithGalleries();
  const servicePages: MetadataRoute.Sitemap = visibleCategories.map((cat) => ({
    url: `${BASE_URL}/${CATEGORY_SLUGS[cat]}`,
    priority: 0.8,
    changeFrequency: "weekly",
  }));

  return [
    ...staticPages.map((p) => ({ ...p, lastModified })),
    ...servicePages.map((p) => ({ ...p, lastModified })),
  ];
}
