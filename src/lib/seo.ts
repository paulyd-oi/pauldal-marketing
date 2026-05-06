import type { Metadata } from "next";
import {
  getLatestGalleryByCategory,
  type GalleryCategory,
} from "./portfolio-public";

const SITE_NAME = "Paul Dal Studios";
const SITE_URL = "https://www.pauldalstudios.com";
const CF_BASE = "https://imagedelivery.net/SPP6PvrwF_wGf30v_j1vDw";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.jpg`;

type SeoArgs = {
  // Full display title — passed through verbatim. Existing operator copy
  // already includes " — Paul Dal Studios" where wanted; don't double-append.
  title: string;
  description: string;
  // Page path, leading slash, no trailing slash for non-root: "/about"
  path: string;
  // Absolute URL or undefined (falls back to /og-default.jpg)
  ogImage?: string;
  // Custom alt text for the OG image (defaults to the title)
  ogImageAlt?: string;
};

export function buildMetadata({
  title,
  description,
  path,
  ogImage,
  ogImageAlt,
}: SeoArgs): Metadata {
  const url = `${SITE_URL}${path}`;
  const image = ogImage ?? DEFAULT_OG_IMAGE;
  const alt = ogImageAlt ?? title;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
      images: [{ url: image, width: 1200, height: 630, alt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

// Build metadata for a service page whose hero is auto-pulled from a
// FRAME GalleryCategory. The OG image reflects whichever gallery is
// currently the latest in the category, falling back to the default
// site OG image if zero galleries are tagged.
export async function buildCategoryPageMetadata({
  category,
  title,
  description,
  path,
  ogImageAlt,
}: {
  category: GalleryCategory;
  title: string;
  description: string;
  path: string;
  ogImageAlt?: string;
}): Promise<Metadata> {
  const latest = await getLatestGalleryByCategory(category);
  const ogImage = latest?.coverCfImageId
    ? `${CF_BASE}/${latest.coverCfImageId}/public`
    : undefined;
  return buildMetadata({
    title,
    description,
    path,
    ogImage,
    ogImageAlt: ogImageAlt ?? latest?.coverAlt ?? title,
  });
}
