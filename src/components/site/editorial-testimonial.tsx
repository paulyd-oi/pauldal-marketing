import { Reveal } from "./reveal";

type EditorialTestimonialProps = {
  quote: string;
  attribution: string;
  context?: string;
  bgVariant?: "paper" | "cream" | "ink";
};

const BG_CLASSES = {
  paper: "bg-paper",
  cream: "bg-cream-hover",
  ink: "bg-ink",
} as const;

export function EditorialTestimonial({
  quote,
  attribution,
  context,
  bgVariant = "paper",
}: EditorialTestimonialProps) {
  const isDark = bgVariant === "ink";
  const textClass = isDark ? "text-paper" : "text-ink";
  const subTextClass = isDark ? "text-paper/70" : "text-ink/70";

  return (
    <section className={`${BG_CLASSES[bgVariant]} py-24 lg:py-40`}>
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
        <Reveal>
          <p
            className={`font-display text-3xl italic leading-tight tracking-tight md:text-5xl lg:text-6xl ${textClass}`}
          >
            &ldquo;{quote}&rdquo;
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-12 space-y-1">
            <p className={`font-body text-base ${textClass}`}>
              — {attribution}
            </p>
            {context && (
              <p className={`font-body text-sm ${subTextClass}`}>{context}</p>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
