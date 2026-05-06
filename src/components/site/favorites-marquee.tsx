"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

// Continuous horizontal marquee scroll of public favorites pulled from
// FRAME's /api/public/favorites endpoint. Drop-in for the right column of
// AsymmetricPanel — replaces the single static image with a slow drift
// of all curated work.
//
// Photos render as CSS background-images on plain divs (not <Image />)
// so the compositor thread isn't shouldering 52 Next/Image lifecycles
// during a transform animation. GPU-painted pixels in a transform-
// animated track is the canonical performant marquee pattern.
//
// thumbnailUrl (smaller CF Images variant) — marquee cells are
// decorative-sized (~750px wide desktop, smaller on mobile) so the
// full-resolution preview variant is overkill and was causing periodic
// decode hitches as new images entered the viewport during scroll.
// AmbientBackplate keeps previewUrl since it's a true full-bleed hero.
// unoptimized bypasses Vercel re-encoding (CF Images already tunes).
//
// prefers-reduced-motion subscribed via useSyncExternalStore; reduced-motion
// path freezes the scroll entirely (static strip).

const FRAME_ORIGIN =
  process.env.NEXT_PUBLIC_FRAME_API_URL ?? "https://app.pauldalstudios.com";

type CategoryFilter = "ALL" | "WEDDING" | "ENGAGEMENT";

interface FavoriteItem {
  id: string;
  publicUrl: string | null;
  previewUrl: string | null;
  thumbnailUrl: string | null;
  brightness: number | null;
  overlayOpacity: number;
  galleryTitle: string;
  galleryCategory: string | null;
}

interface FavoritesMarqueeProps {
  /**
   * Server-fetched favorites passed in by the page (see src/lib/favorites.ts).
   * When non-empty the client-side fetch effect is a no-op — HTML ships
   * with image URLs already in it. Empty array (or omitted) falls back to
   * the original client-side fetch so dev hot-reload + transient FRAME
   * outages still degrade gracefully.
   */
  initialItems?: FavoriteItem[];
  category?: CategoryFilter;
  durationSeconds?: number;
  heightPx?: number;
  /**
   * Smaller mobile height. Marquee stays horizontal on mobile (no stacking).
   */
  mobileHeightPx?: number;
  direction?: "left" | "right";
  className?: string;
}

function subscribeReducedMotion(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}
function getReducedMotionSnapshot(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function getReducedMotionServerSnapshot(): boolean {
  return false;
}

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function filterByCategory(
  items: FavoriteItem[],
  category: CategoryFilter,
): FavoriteItem[] {
  if (category === "ALL") return items;
  if (category === "WEDDING") {
    return items.filter(
      (i) => i.galleryCategory === "WEDDING" || i.galleryCategory === "ENGAGEMENT",
    );
  }
  return items.filter((i) => i.galleryCategory === category);
}

export function FavoritesMarquee({
  initialItems,
  category = "ALL",
  durationSeconds = 60,
  heightPx = 500,
  mobileHeightPx = 320,
  direction = "left",
  className = "",
}: FavoritesMarqueeProps) {
  // Seed state from server-fetched items when present. Filter + shuffle
  // happen up front so the first render shows a stable order; we don't
  // re-shuffle on every render.
  const seededItems =
    initialItems && initialItems.length > 0
      ? shuffle(
          filterByCategory(initialItems, category).filter((i) => !!i.thumbnailUrl),
        )
      : [];

  const [items, setItems] = useState<FavoriteItem[]>(seededItems);
  const [loading, setLoading] = useState(seededItems.length === 0);
  const [paused, setPaused] = useState(false);

  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );

  useEffect(() => {
    // Server provided seed → skip the client fetch entirely.
    if (initialItems && initialItems.length > 0) return;

    let cancelled = false;
    async function load() {
      try {
        const res = await fetch(`${FRAME_ORIGIN}/api/public/favorites?limit=50`, {
          mode: "cors",
        });
        if (!res.ok) {
          setLoading(false);
          return;
        }
        const data = (await res.json()) as { items?: FavoriteItem[] };
        if (cancelled) return;
        const filtered = filterByCategory(data.items ?? [], category).filter(
          (i) => !!i.thumbnailUrl,
        );
        setItems(shuffle(filtered));
        setLoading(false);
      } catch {
        setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [category, initialItems]);

  if (loading || items.length === 0) {
    return (
      <div
        className={`relative bg-stone-100 ${className}`}
        style={{ height: heightPx, ["--marquee-h" as string]: `${heightPx}px`, ["--marquee-h-mobile" as string]: `${mobileHeightPx}px` }}
        aria-hidden="true"
      />
    );
  }

  // Duplicate items for seamless loop. The keyframe translates by -50% so
  // the second copy continues exactly where the first left off.
  const doubledItems = [...items, ...items];
  const animationDirection = direction === "left" ? "normal" : "reverse";

  // 3:2 landscape aspect ratio at the chosen height. Photos are mostly
  // landscape favorites; portraits crop to landscape via object-cover.
  const photoWidth = Math.round(heightPx * 1.5);
  const mobilePhotoWidth = Math.round(mobileHeightPx * 1.5);
  const gapPx = 16;

  return (
    <div
      className={`relative overflow-hidden marquee-root ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
      aria-label="Featured photography"
      aria-roledescription="carousel"
    >
      <div
        className="flex marquee-track"
        style={{
          gap: `${gapPx}px`,
          width: "max-content",
          animation: reducedMotion
            ? "none"
            : `pds-marquee-scroll ${durationSeconds}s linear infinite ${animationDirection}`,
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {doubledItems.map((item, idx) => {
          const url = item.thumbnailUrl;
          if (!url) return null;
          return (
            <div
              key={`${item.id}-${idx}`}
              className="flex-shrink-0 marquee-item bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${url})` }}
              role="img"
              aria-label=""
            />
          );
        })}
      </div>

      <style jsx>{`
        .marquee-root {
          height: ${mobileHeightPx}px;
        }
        .marquee-item {
          width: ${mobilePhotoWidth}px;
          height: ${mobileHeightPx}px;
        }
        @media (min-width: 768px) {
          .marquee-root {
            height: ${heightPx}px;
          }
          .marquee-item {
            width: ${photoWidth}px;
            height: ${heightPx}px;
          }
        }
        @keyframes pds-marquee-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
