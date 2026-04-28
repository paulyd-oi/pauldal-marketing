// Public portfolio data fetcher.
// Reads from FRAME's /api/public/portfolio endpoint with 60s ISR revalidation.
// Returns sorted, transformed galleries ready for UI consumption.

const FRAME_API_BASE =
  process.env.NEXT_PUBLIC_FRAME_API_BASE ?? "https://app.pauldalstudios.com";
const CF_BASE = "https://imagedelivery.net/SPP6PvrwF_wGf30v_j1vDw";

// Vertical taxonomy. Mirrors FRAME's GalleryCategory enum exactly.
// Adding values without matching FRAME enum changes produces orphan
// labels; removing requires the FRAME-side rename-swap pattern.
//
// PERSONAL is intentionally NOT in CATEGORY_LABELS or CATEGORY_SLUGS.
// PERSONAL galleries surface only on /about (hero + parallax beats) +
// brand-content founder portrait + Schema.org Person.image. They must
// never appear in the Services dropdown, sitemap, /portfolio, or footer
// mosaic. The label/slug omission enforces this — getCategoriesWithGalleries()
// returns CATEGORY_ORDER values only, and CATEGORY_ORDER does not include PERSONAL.
export type GalleryCategory =
  | "WEDDING"
  | "ENGAGEMENT"
  | "MILESTONE_CELEBRATION"
  | "PERFORMANCE"
  | "BRAND_CONTENT"
  | "EVENT"
  | "FAMILY_LIFESTYLE"
  | "HEADSHOTS"
  | "PERSONAL";

// Categories that surface on public marketing pages. PERSONAL is excluded
// at the type level so any code path indexing CATEGORY_LABELS / CATEGORY_SLUGS
// with PERSONAL fails tsc — enforces the "PERSONAL never on dropdown / sitemap
// / portfolio / footer" invariant.
export type PublicGalleryCategory = Exclude<GalleryCategory, "PERSONAL">;

export const CATEGORY_LABELS: Record<PublicGalleryCategory, string> = {
  WEDDING: "Weddings",
  ENGAGEMENT: "Engagements",
  MILESTONE_CELEBRATION: "Milestone Celebrations",
  PERFORMANCE: "Performances",
  BRAND_CONTENT: "Brand Content",
  EVENT: "Events",
  FAMILY_LIFESTYLE: "Family / Lifestyle",
  HEADSHOTS: "Headshots",
};

export const CATEGORY_SLUGS: Record<PublicGalleryCategory, string> = {
  WEDDING: "weddings",
  ENGAGEMENT: "engagements",
  MILESTONE_CELEBRATION: "milestones",
  PERFORMANCE: "performances",
  BRAND_CONTENT: "brand-content",
  EVENT: "events",
  FAMILY_LIFESTYLE: "family-lifestyle",
  HEADSHOTS: "headshots",
};

// Response shape from FRAME (verified via curl 2026-04-28).
type FramePortfolioPhoto = {
  id: string;
  cloudflareImageId: string;
  width: number;
  height: number;
  alt: string;
};

type FramePortfolioGallery = {
  id: string;
  name: string;
  publishedAt: string | null;
  category: GalleryCategory | null;
  featuredOnHomepage: boolean;
  coverPhoto: FramePortfolioPhoto | null;
  photos: FramePortfolioPhoto[];
  photoCount: number;
};

type FramePortfolioResponse = {
  galleries: FramePortfolioGallery[];
};

// Marketing-side shapes — what the UI consumes.
export type PortfolioPhoto = {
  id: string;
  url: string;
  alt: string;
  width: number;
  height: number;
};

export type PortfolioGallery = {
  id: string;
  name: string;
  publishedAt: string | null;
  category: GalleryCategory | null;
  featuredOnHomepage: boolean;
  coverCfImageId: string;
  coverImageUrl: string;
  coverAlt: string;
  coverWidth: number;
  coverHeight: number;
  photos: PortfolioPhoto[];
  photoCount: number;
};

function cfUrl(cloudflareImageId: string): string {
  return `${CF_BASE}/${cloudflareImageId}/public`;
}

export async function getPortfolioGalleries(): Promise<PortfolioGallery[]> {
  let data: FramePortfolioResponse;

  try {
    const response = await fetch(`${FRAME_API_BASE}/api/public/portfolio`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      console.error(
        `[portfolio-public] FRAME API returned ${response.status}`
      );
      return [];
    }

    data = (await response.json()) as FramePortfolioResponse;
  } catch (error) {
    console.error("[portfolio-public] FRAME API fetch failed", error);
    return [];
  }

  if (!data.galleries || !Array.isArray(data.galleries)) {
    console.error("[portfolio-public] Unexpected response shape", data);
    return [];
  }

  // Defensive: PERSONAL galleries are served from a separate endpoint
  // (/api/public/personal-assets). If one ever leaks through the portfolio
  // endpoint, drop it here so it never reaches /portfolio, sitemap, dropdown,
  // or footer mosaic.
  const withCovers = data.galleries.filter(
    (g) => g.coverPhoto !== null && g.category !== "PERSONAL",
  );

  withCovers.sort((a, b) => {
    if (a.publishedAt === null && b.publishedAt === null) return 0;
    if (a.publishedAt === null) return 1;
    if (b.publishedAt === null) return -1;
    return (
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  });

  return withCovers.map((g) => ({
    id: g.id,
    name: g.name,
    publishedAt: g.publishedAt,
    category: g.category ?? null,
    featuredOnHomepage: g.featuredOnHomepage ?? false,
    coverCfImageId: g.coverPhoto!.cloudflareImageId,
    coverImageUrl: cfUrl(g.coverPhoto!.cloudflareImageId),
    coverAlt: g.name,
    coverWidth: g.coverPhoto!.width,
    coverHeight: g.coverPhoto!.height,
    photos: g.photos.map((p, idx) => ({
      id: p.id,
      url: cfUrl(p.cloudflareImageId),
      alt: `Photo ${idx + 1} of ${g.photos.length} from ${g.name}`,
      width: p.width,
      height: p.height,
    })),
    photoCount: g.photoCount,
  }));
}

// Filter all galleries by category (preserves the createdAt-desc sort
// from getPortfolioGalleries).
export async function getGalleriesByCategory(
  category: GalleryCategory,
): Promise<PortfolioGallery[]> {
  const all = await getPortfolioGalleries();
  return all.filter((g) => g.category === category);
}

// Returns the most-recently-published gallery in a category, or null if
// the category has zero galleries (e.g., FAMILY_LIFESTYLE / HEADSHOTS
// before first tag).
export async function getLatestGalleryByCategory(
  category: GalleryCategory,
): Promise<PortfolioGallery | null> {
  const filtered = await getGalleriesByCategory(category);
  return filtered[0] ?? null;
}

// Galleries flagged as homepage-hero candidates by the operator.
// Falls back to all galleries when zero are flagged so the homepage
// hero always has content (never blank).
export async function getFeaturedHomepageGalleries(): Promise<PortfolioGallery[]> {
  const all = await getPortfolioGalleries();
  const featured = all.filter((g) => g.featuredOnHomepage);
  return featured.length > 0 ? featured : all;
}

// Distinct categories that currently have at least one gallery — used
// for dynamic header dropdown visibility (Option C: hide empty
// categories until first gallery is tagged). Order matches the canonical
// taxonomy (not data order). PERSONAL is intentionally absent — see the
// type comment above.
const CATEGORY_ORDER: PublicGalleryCategory[] = [
  "WEDDING",
  "ENGAGEMENT",
  "MILESTONE_CELEBRATION",
  "PERFORMANCE",
  "BRAND_CONTENT",
  "EVENT",
  "FAMILY_LIFESTYLE",
  "HEADSHOTS",
];

export async function getCategoriesWithGalleries(): Promise<PublicGalleryCategory[]> {
  const all = await getPortfolioGalleries();
  const present = new Set<PublicGalleryCategory>();
  for (const g of all) {
    if (g.category && g.category !== "PERSONAL") present.add(g.category);
  }
  return CATEGORY_ORDER.filter((c) => present.has(c));
}

// Deterministic daily rotation. dayOfYear is monotone-increasing within a
// year and wraps at year boundary (Dec 31 → Jan 1 produces a different
// index for non-empty arrays). Same input on the same UTC day always
// returns the same item — caches and ISR play nicely.
export function pickByDate<T>(items: T[]): T | null {
  if (items.length === 0) return null;
  const today = new Date();
  const start = new Date(Date.UTC(today.getUTCFullYear(), 0, 0));
  const dayOfYear = Math.floor((today.getTime() - start.getTime()) / 86_400_000);
  return items[dayOfYear % items.length];
}
