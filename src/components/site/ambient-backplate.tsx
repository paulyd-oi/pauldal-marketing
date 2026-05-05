"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Image from "next/image";

// Cinematic full-bleed backplate. Cycles a curated list of public favorites
// from FRAME with a slow cross-fade and a subtle Ken Burns zoom.
//
// Each favorite arrives from /api/public/favorites with `overlayOpacity`
// already computed FRAME-side from the photo's mean Rec.709 luminance —
// a single source of truth for the brightness→opacity curve, tunable via
// FRAME env vars (BRIGHTNESS_THRESHOLD_LOW / HIGH and OVERLAY_OPACITY_*)
// without redeploying this site.
//
// Respects prefers-reduced-motion: zoom + cross-fade still happen but
// pacing slows and the Ken Burns transform is dropped.

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

interface AmbientBackplateProps {
  category?: CategoryFilter;
  className?: string;
  cycleSeconds?: number;
  kenBurnsScale?: number;
  /**
   * Eager priority on the first image so LCP doesn't suffer. Default true
   * for hero placements; set false when ambient is below the fold.
   */
  priorityFirst?: boolean;
}

// Subscribe to prefers-reduced-motion via useSyncExternalStore so we don't
// trip react-hooks/set-state-in-effect by writing to state during the
// first effect tick. Server snapshot returns false (no reduced motion) so
// SSR renders the animated path; client hydration corrects on first paint.
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

export function AmbientBackplate({
  category = "ALL",
  className = "",
  cycleSeconds = 9,
  kenBurnsScale = 0.03,
  priorityFirst = true,
}: AmbientBackplateProps) {
  const [items, setItems] = useState<FavoriteItem[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [loading, setLoading] = useState(true);

  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );

  useEffect(() => {
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
        // Filter on previewUrl: in this Cloudflare Images config the
        // "preview" variant is the full-resolution one (~430KB at 4242px
        // long edge) while "public" is sized small (~38KB) for cards.
        // Counter-intuitive given the variable names, but matches the
        // operator-configured CF Images variants — and matches what the
        // client-facing /gallery/[token] page uses for full-size renders.
        const filtered = filterByCategory(data.items ?? [], category).filter(
          (i) => !!i.previewUrl,
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
  }, [category]);

  useEffect(() => {
    if (items.length <= 1) return;
    const intervalMs = (reducedMotion ? cycleSeconds * 2 : cycleSeconds) * 1000;
    const id = window.setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % items.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [items.length, cycleSeconds, reducedMotion]);

  if (loading || items.length === 0) {
    return (
      <div
        className={`absolute inset-0 bg-stone-900 ${className}`}
        aria-hidden="true"
      />
    );
  }

  const fadeMs = reducedMotion ? 2400 : 1500;
  const zoomDuration = `${cycleSeconds + 1}s`;
  const targetScale = 1 + kenBurnsScale;

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {items.map((item, idx) => {
        const isActive = idx === activeIdx;
        const opacity = item.overlayOpacity ?? 0.4;
        // previewUrl is the full-resolution CF Images variant in this
        // operator's config — see the load() effect comment above.
        const url = item.previewUrl;
        if (!url) return null;
        return (
          <div
            key={item.id}
            className="absolute inset-0 transition-opacity"
            style={{
              opacity: isActive ? 1 : 0,
              transitionDuration: `${fadeMs}ms`,
              transitionTimingFunction: "ease-in-out",
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                animation: reducedMotion
                  ? "none"
                  : `pds-ambient-kenburns ${zoomDuration} ease-in-out infinite alternate`,
              }}
            >
              {/* unoptimized: bypass Vercel's _next/image re-encoding.
                  CF Images already delivers a tuned variant at the
                  source; an extra Vercel re-encode adds visible JPEG
                  artifacts on full-bleed cinematic photography for no
                  bandwidth win. fill + object-cover handle layout. */}
              <Image
                src={url}
                alt=""
                fill
                priority={idx === 0 && priorityFirst}
                sizes="100vw"
                unoptimized
                className="object-cover"
              />
            </div>
            <div
              className="absolute inset-0 bg-black"
              style={{ opacity }}
            />
          </div>
        );
      })}
      <style jsx>{`
        @keyframes pds-ambient-kenburns {
          from {
            transform: scale(1);
          }
          to {
            transform: scale(${targetScale});
          }
        }
      `}</style>
    </div>
  );
}
