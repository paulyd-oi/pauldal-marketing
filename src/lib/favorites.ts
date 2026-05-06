// Server-side fetch utility for FRAME's photographer-favorites endpoint.
// Used by every page that mounts FavoritesMarquee or AmbientBackplate so
// the HTML ships with image URLs already in it — eliminates the ~4-second
// client-side fetch wait that was visible on first paint.
//
// Cached via Next.js fetch cache with 1-hour revalidation. New favorites
// hearted in FRAME show up on the marketing site within an hour.
//
// Empty-array fallback on any failure path: client components retain their
// existing client-side fetch as a safety net, so a transient FRAME outage
// or build-time fetch failure degrades to the old behavior, not a broken
// component.

const FRAME_ORIGIN =
  process.env.NEXT_PUBLIC_FRAME_API_URL ?? "https://app.pauldalstudios.com";

export interface FavoriteItem {
  id: string;
  publicUrl: string | null;
  previewUrl: string | null;
  thumbnailUrl: string | null;
  brightness: number | null;
  overlayOpacity: number;
  galleryTitle: string;
  galleryCategory: string | null;
}

export type FavoritesCategory = "ALL" | "WEDDING" | "ENGAGEMENT";

export async function getFavorites(limit = 50): Promise<FavoriteItem[]> {
  try {
    const res = await fetch(
      `${FRAME_ORIGIN}/api/public/favorites?limit=${limit}`,
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) {
      console.warn(`[favorites] server fetch returned ${res.status}`);
      return [];
    }
    const data = (await res.json()) as { items?: FavoriteItem[] };
    return data.items ?? [];
  } catch (err) {
    console.warn("[favorites] server fetch failed:", err);
    return [];
  }
}

export function filterByCategory(
  items: FavoriteItem[],
  category: FavoritesCategory = "ALL",
): FavoriteItem[] {
  if (category === "ALL") return items;
  if (category === "WEDDING") {
    return items.filter(
      (i) => i.galleryCategory === "WEDDING" || i.galleryCategory === "ENGAGEMENT",
    );
  }
  return items.filter((i) => i.galleryCategory === category);
}
