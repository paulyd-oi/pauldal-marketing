// CSS-only horizontal marquee for the /about loose-up moment between
// Beat 03 and the trust strip. The track holds two identical content
// blocks side by side; the first translates -100% over 40s while the
// second slides into view, producing a seamless loop. No JS, no
// framer-motion. The global prefers-reduced-motion rule in globals.css
// kills the animation duration, so the strip renders static for users
// who opted out.
//
// Decorative — wrapped aria-hidden so screen readers don't surface the
// repeating tokens as content.

const TOKENS = [
  "200 EVENTS",
  "70 WEDDINGS",
  "CALLED TO SERVE",
  "A SAN DIEGO STUDIO",
];

function Track() {
  return (
    <div className="animate-marquee flex shrink-0 items-center">
      {TOKENS.map((token, i) => (
        <span key={`${token}-${i}`} className="flex items-center">
          <span className="mx-8 font-display text-5xl italic text-ink lg:text-6xl">
            {token}
          </span>
          <span
            aria-hidden="true"
            className="mx-8 font-display text-5xl italic text-oxblood lg:text-6xl"
          >
            ·
          </span>
        </span>
      ))}
    </div>
  );
}

export function AboutMarquee() {
  return (
    <section className="relative w-full overflow-hidden bg-paper py-12 lg:py-16">
      <div
        role="presentation"
        aria-hidden="true"
        className="flex whitespace-nowrap"
      >
        <Track />
        <Track />
      </div>
    </section>
  );
}
