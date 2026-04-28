// Public portfolio data fetcher.
// Reads from FRAME's /api/public/portfolio endpoint with 60s ISR revalidation.
// Returns sorted, transformed galleries ready for UI consumption.

const FRAME_API_BASE =
  process.env.NEXT_PUBLIC_FRAME_API_BASE ?? "https://app.pauldalstudios.com";
const CF_BASE = "https://imagedelivery.net/SPP6PvrwF_wGf30v_j1vDw";

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

  const withCovers = data.galleries.filter((g) => g.coverPhoto !== null);

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
