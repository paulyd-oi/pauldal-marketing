import { Reveal } from "./reveal";

type MarqueeTestimonialProps = {
  eyebrow: string;
  quote: string;
  attribution?: string;
  marqueeText: string;
  bgVariant?: "ink" | "oxblood";
};

const BG_CLASSES = {
  ink: "bg-ink",
  oxblood: "bg-oxblood",
} as const;

const MARQUEE_KEYFRAMES = `@keyframes marquee-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`;

const MARQUEE_REPEAT = 12;

export function MarqueeTestimonial({
  eyebrow,
  quote,
  attribution,
  marqueeText,
  bgVariant = "ink",
}: MarqueeTestimonialProps) {
  const repeated = Array.from({ length: MARQUEE_REPEAT }, () => marqueeText).join(
    "  ·  "
  );

  return (
    <section
      className={`relative overflow-hidden py-24 lg:py-32 ${BG_CLASSES[bgVariant]}`}
    >
      <style dangerouslySetInnerHTML={{ __html: MARQUEE_KEYFRAMES }} />

      {/* Background marquee layer */}
      <div className="pointer-events-none absolute inset-0 flex select-none flex-col justify-center opacity-25">
        {[0, 1, 2, 3].map((row) => (
          <div
            key={row}
            className="flex whitespace-nowrap font-display text-7xl text-paper motion-reduce:[animation:none] lg:text-9xl"
            style={{
              animation: "marquee-scroll 40s linear infinite",
              animationDirection: row % 2 === 1 ? "reverse" : "normal",
            }}
          >
            <span className="pr-8">{repeated}</span>
            <span className="pr-8" aria-hidden="true">
              {repeated}
            </span>
          </div>
        ))}
      </div>

      {/* Foreground card */}
      <Reveal>
        <div className="relative z-10 mx-auto max-w-2xl bg-paper p-12 text-ink lg:p-16">
          <div className="text-center">
            <p className="text-xs uppercase tracking-widest text-ink/60">
              {eyebrow}
            </p>
            <p className="mt-6 font-display text-2xl italic leading-snug lg:text-3xl">
              &ldquo;{quote}&rdquo;
            </p>
            {attribution && (
              <p className="mt-6 text-sm text-ink/60">{attribution}</p>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
