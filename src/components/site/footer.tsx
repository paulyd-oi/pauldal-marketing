import Link from "next/link";
import Image from "next/image";
import { BrandMark } from "./brand-mark";
import {
  getPortfolioGalleries,
  pickByDate,
  type PortfolioGallery,
} from "@/lib/portfolio-public";

const CF_BASE = "https://imagedelivery.net/SPP6PvrwF_wGf30v_j1vDw";

const NAV_ITEMS = [
  { href: "/", label: "HOME" },
  { href: "/about", label: "ABOUT" },
  { href: "/services", label: "SERVICES" },
  { href: "/weddings", label: "WEDDINGS" },
  { href: "/events", label: "EVENTS" },
  { href: "/brand-content", label: "BRAND CONTENT" },
  { href: "/portfolio", label: "PORTFOLIO" },
  { href: "/book", label: "BOOK" },
];

// Curated fallback covers — used only if FRAME's public portfolio API
// is unreachable (e.g., during local dev with no API_BASE). Otherwise
// the mosaic auto-rotates through real production galleries with
// deterministic daily selection.
const FALLBACK_PHOTOS = [
  { id: "09079dde-3a23-4762-83e7-31fd9aab2600", alt: "Event coverage by Paul Dal Studio — Stone Brewery, San Diego" },
  { id: "271ed8b4-2732-4272-1a92-2a4b31f42b00", alt: "Wedding photography — Encinitas, San Diego" },
  { id: "c677437a-cb68-4084-39f7-84ca10557700", alt: "Editorial studio session — Paul Dal Studio" },
  { id: "572fc2e5-5737-4841-7c9b-a717b6413500", alt: "Corporate gala photography — Del Mar, San Diego" },
  { id: "e491bf5a-ef22-4627-d5bf-450844197b00", alt: "Brand portraits — Founders Series, Paul Dal Studio" },
  { id: "6c0df0fa-2eda-4511-b622-a532ab1ee000", alt: "Wedding photography — La Jolla, San Diego" },
];

type MosaicPhoto = { id: string; alt: string; cfImageId: string };

// Pick 6 covers via deterministic daily rotation. Different starting
// offset each day so mosaic content cycles through all gallery covers
// over time. Same input on the same UTC day always returns the same
// 6 (caches play nicely).
function pickMosaic(galleries: PortfolioGallery[]): MosaicPhoto[] {
  if (galleries.length === 0) {
    return FALLBACK_PHOTOS.map((p) => ({ id: p.id, alt: p.alt, cfImageId: p.id }));
  }
  if (galleries.length <= 6) {
    return galleries.map((g) => ({
      id: g.id,
      alt: g.coverAlt,
      cfImageId: g.coverCfImageId,
    }));
  }
  // Rotate the starting offset each day. Offset advances by 7 daily
  // (relatively prime to 6 in most arrays) so consecutive days don't
  // overlap heavily.
  const rotated = pickByDate(
    Array.from({ length: galleries.length }, (_, i) => i),
  ) ?? 0;
  const start = (rotated * 7) % Math.max(1, galleries.length);
  const window: MosaicPhoto[] = [];
  for (let i = 0; i < 6; i++) {
    const g = galleries[(start + i) % galleries.length];
    window.push({ id: g.id, alt: g.coverAlt, cfImageId: g.coverCfImageId });
  }
  return window;
}

function PhotoStrip({ photos }: { photos: MosaicPhoto[] }) {
  return (
    <div className="flex gap-2">
      {photos.map((photo) => (
        <div
          key={photo.id}
          className="relative h-24 flex-1 overflow-hidden lg:h-28"
        >
          <Image
            src={`${CF_BASE}/${photo.cfImageId}/public`}
            alt={photo.alt}
            fill
            sizes="(min-width: 768px) 16vw, 33vw"
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}

export async function Footer() {
  const allGalleries = await getPortfolioGalleries();
  const mosaic = pickMosaic(allGalleries);
  const leftPhotos = mosaic.slice(0, 3);
  const rightPhotos = mosaic.slice(3, 6);

  return (
    <footer>
      {/* Section A — Photo + Wordmark Block */}
      <div className="bg-ink px-6 py-16 text-paper lg:px-12 lg:py-24">
        <div className="mx-auto max-w-7xl">
          {/* Mobile: stack wordmark on top, then 6-photo grid */}
          <div className="md:hidden">
            <div className="flex flex-col items-center text-center">
              <BrandMark size="md" />
              <p className="mt-3 font-display text-3xl tracking-tight">
                PAUL DAL STUDIO
              </p>
              <p className="mt-3 text-xs uppercase tracking-widest text-paper/70">
                SAN DIEGO + BEYOND
              </p>
            </div>
            <div className="mt-12 grid grid-cols-3 grid-rows-2 gap-2">
              {mosaic.map((photo) => (
                <div
                  key={photo.id}
                  className="relative aspect-[4/3] w-full overflow-hidden"
                >
                  <Image
                    src={`${CF_BASE}/${photo.cfImageId}/public`}
                    alt={photo.alt}
                    fill
                    sizes="33vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Desktop: 3-col with photos flanking wordmark */}
          <div className="hidden grid-cols-3 items-center gap-8 md:grid">
            <PhotoStrip photos={leftPhotos} />
            <div className="flex flex-col items-center text-center">
              <BrandMark size="md" />
              <p className="mt-3 font-display text-3xl tracking-tight lg:text-4xl">
                PAUL DAL STUDIO
              </p>
              <p className="mt-3 text-xs uppercase tracking-widest text-paper/70">
                SAN DIEGO + BEYOND
              </p>
            </div>
            <PhotoStrip photos={rightPhotos} />
          </div>
        </div>
      </div>

      {/* Section B — Horizontal Site Nav */}
      <div className="border-t border-paper/20 bg-ink px-6 py-6 text-paper lg:py-8">
        <nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-3 lg:gap-x-12">
          {NAV_ITEMS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="focus-ring font-display text-sm uppercase tracking-widest transition-colors duration-200 hover:text-cream-hover"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Section C — Meta Row */}
      <div className="border-t border-paper/20 bg-ink px-6 py-4 text-paper/50">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-y-2 md:flex-row md:justify-between">
          <p className="text-xs">
            &copy; 2026 Paul Dal Studio. All rights reserved.
          </p>
          <p className="text-xs uppercase tracking-widest">
            <Link
              href="/privacy"
              className="focus-ring transition-colors hover:text-paper"
            >
              PRIVACY
            </Link>
            <span className="mx-2">/</span>
            <Link
              href="/terms"
              className="focus-ring transition-colors hover:text-paper"
            >
              TERMS
            </Link>
            <span className="mx-2">/</span>
            <a
              href="https://instagram.com/pauldalstudio"
              target="_blank"
              rel="noopener"
              className="focus-ring transition-colors hover:text-paper"
            >
              INSTAGRAM
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
