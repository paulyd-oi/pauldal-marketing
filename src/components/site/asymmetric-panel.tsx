import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "./reveal";

const CF_BASE = "https://imagedelivery.net/SPP6PvrwF_wGf30v_j1vDw";

type AsymmetricPanelProps = {
  eyebrow: string;
  pullQuote: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  imageId: string;
  imageAlt: string;
  photoSide?: "left" | "right";
  panelVariant?: "ink" | "oxblood" | "cream";
  /**
   * Replace the image side with arbitrary content (e.g. a marquee carousel
   * of curated favorites). Default omitted → behavior unchanged: the
   * imageId-based <Image> still renders. When provided, imageId/imageAlt
   * are ignored.
   */
  photoSlot?: ReactNode;
};

const PANEL_BG_CLASSES = {
  ink: "bg-ink",
  oxblood: "bg-oxblood",
  cream: "bg-cream-hover",
} as const;

const PANEL_TEXT_CLASSES = {
  ink: "text-paper",
  oxblood: "text-paper",
  cream: "text-ink",
} as const;

export function AsymmetricPanel({
  eyebrow,
  pullQuote,
  body,
  ctaLabel,
  ctaHref,
  imageId,
  imageAlt,
  photoSide = "right",
  panelVariant = "ink",
  photoSlot,
}: AsymmetricPanelProps) {
  const photoOnRight = photoSide === "right";
  const panelBg = PANEL_BG_CLASSES[panelVariant];
  const panelText = PANEL_TEXT_CLASSES[panelVariant];

  const panelEl = (
    <div
      className={`flex flex-col justify-center px-8 py-16 lg:px-16 lg:py-24 ${panelBg} ${panelText}`}
    >
      <p className="text-xs uppercase tracking-widest opacity-70">{eyebrow}</p>
      <p className="mt-6 font-display text-3xl italic leading-tight lg:text-5xl">
        {pullQuote}
      </p>
      <p className="mt-8 max-w-md font-body text-base">{body}</p>
      <Link
        href={ctaHref}
        className="focus-ring mt-10 inline-block text-sm uppercase tracking-widest underline underline-offset-4 transition-opacity hover:opacity-70"
      >
        {ctaLabel}
      </Link>
    </div>
  );

  const photoEl = photoSlot ? (
    // Caller-supplied content (e.g. a FavoritesMarquee). The slot owns
    // its own intrinsic height; this wrapper just provides the grid cell
    // and clips overflow so a marquee's wider-than-cell track doesn't
    // burst the layout.
    <div className="relative w-full overflow-hidden">{photoSlot}</div>
  ) : (
    <div className="relative h-full min-h-[300px] w-full">
      {/* /preview is the full-resolution named variant in this CF Images
          config. Flexible variants (e.g. /w=1200,h=1400,fit=cover) are
          disabled on the account — they return 403 and Vercel proxies
          a 502 to the browser. The container's object-cover + min-h
          handle visible crop, so the named variant is visually
          equivalent for this tile. */}
      <Image
        src={`${CF_BASE}/${imageId}/preview`}
        alt={imageAlt}
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        className="object-cover"
      />
    </div>
  );

  // When photoSlot is supplied, drop the fixed min-h so the row height is
  // driven by the slot (e.g. a 500px marquee) instead of leaving dead
  // space below it. The static-image branch keeps the editorial 600/700
  // floor so the prior layout doesn't shift.
  const gridMinH = photoSlot
    ? "min-h-[400px] md:min-h-[500px]"
    : "min-h-[600px] lg:min-h-[700px]";

  return (
    <Reveal>
      <section className="w-full">
        <div className={`grid ${gridMinH} grid-cols-1 md:grid-cols-2`}>
          {photoOnRight ? (
            <>
              {panelEl}
              {photoEl}
            </>
          ) : (
            <>
              {photoEl}
              {panelEl}
            </>
          )}
        </div>
      </section>
    </Reveal>
  );
}
