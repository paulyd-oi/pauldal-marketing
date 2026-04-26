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
        className="mt-10 inline-block text-sm uppercase tracking-widest underline underline-offset-4 transition-opacity hover:opacity-70"
      >
        {ctaLabel}
      </Link>
    </div>
  );

  const photoEl = (
    <div className="relative h-full min-h-[300px] w-full">
      <Image
        src={`${CF_BASE}/${imageId}/w=1200,h=1400,fit=cover`}
        alt={imageAlt}
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        className="object-cover"
      />
    </div>
  );

  return (
    <Reveal>
      <section className="w-full">
        <div className="grid min-h-[600px] grid-cols-1 md:grid-cols-2 lg:min-h-[700px]">
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
