"use client";

// The page's single moment. The closing photo plate pins to the viewport
// for the duration of this 200vh section while the foreground content
// (eyebrow, display headline, CTA) scrolls over it. The plate also drifts
// upward (translateY 0 → -10%) across the pin, so the photo never feels
// truly static.
//
// Implementation: GSAP + ScrollTrigger, lazy-imported inside useEffect so
// the libraries don't ship in any other route's bundle.
//
// Mobile (<lg): no pin, no drift. Renders as a tall single-screen section
// with static photo + content stacked normally. Pin/parallax on small
// viewports tends to fight iOS scroll momentum and looks broken.
//
// prefers-reduced-motion: same as mobile fallback.

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const CF_BASE = "https://imagedelivery.net/SPP6PvrwF_wGf30v_j1vDw";

interface AboutClosingPinnedProps {
  cfId: string;
  alt: string;
}

export function AboutClosingPinned({ cfId, alt }: AboutClosingPinnedProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const plateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    const plate = plateRef.current;
    if (!section || !pin || !plate) return;

    const desktop = window.matchMedia("(min-width: 1024px)");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!desktop.matches || reduceMotion.matches) {
      // Mobile or reduced-motion — no GSAP, no pin, no parallax.
      return;
    }

    let ctx: { revert?: () => void } | null = null;
    let resizeHandler: (() => void) | null = null;

    let cancelled = false;

    (async () => {
      const gsapModule = await import("gsap");
      const stModule = await import("gsap/ScrollTrigger");
      if (cancelled) return;

      const gsap = gsapModule.default ?? gsapModule.gsap;
      const ScrollTrigger = stModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // Pin the inner sticky-style frame for the section's full height.
        // The bg plate translates upward (0 → -10% of plate height) across
        // the same scroll range so the photo subtly drifts.
        //
        // Explicit fromTo with starting yPercent: 0 — guarantees integer
        // pixel transform at pin entry and avoids any sub-pixel rendering
        // that could read as blur. force3D: true keeps the plate on its
        // own GPU layer so the photo's pixel grid stays aligned across
        // the transform range.
        gsap.fromTo(
          plate,
          { yPercent: 0, force3D: true },
          {
            yPercent: -10,
            ease: "none",
            force3D: true,
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom bottom",
              scrub: true,
              pin: pin,
              pinSpacing: false,
            },
          },
        );
      }, section);

      resizeHandler = () => ScrollTrigger.refresh();
      window.addEventListener("resize", resizeHandler);
    })();

    return () => {
      cancelled = true;
      if (resizeHandler) window.removeEventListener("resize", resizeHandler);
      ctx?.revert?.();
    };
  }, []);

  const photoUrl = `${CF_BASE}/${cfId}/public`;

  return (
    <section ref={sectionRef} className="relative h-screen w-full lg:h-[200vh]">
      <div
        ref={pinRef}
        className="relative h-screen w-full overflow-hidden bg-ink lg:absolute lg:inset-0"
      >
        <div ref={plateRef} className="absolute inset-0">
          <Image
            src={photoUrl}
            alt={alt}
            fill
            sizes="100vw"
            quality={95}
            priority
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-ink/40" />
        <div className="relative z-10 flex h-full items-center justify-center px-6">
          <div className="mx-auto max-w-5xl text-center">
            <p className="mb-6 font-body text-xs uppercase tracking-widest text-paper/70 lg:mb-8">
              Ready to work together?
            </p>
            <h2 className="mb-10 font-display text-6xl leading-[0.9] tracking-tight text-paper lg:mb-12 lg:text-8xl xl:text-9xl">
              Let&apos;s make something true.
            </h2>
            <Link
              href="/book"
              className="focus-ring group inline-flex items-center bg-oxblood px-10 py-4 font-body text-base tracking-wide text-paper transition-colors duration-200 hover:bg-oxblood-hover lg:text-lg"
            >
              Start a project
              <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
