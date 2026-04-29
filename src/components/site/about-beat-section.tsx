"use client";

// One bio beat: text column + photo column, layout mirrored on alternate beats.
// Photo enters with a scroll-decoupled rise (15% → 0%) + scale (1.05 → 1.0)
// + fade (0 → 1) as the section approaches viewport center. The transforms
// land on the photo's wrapper div, not the <Image> itself, so we don't
// thrash the image's own GPU layer.
//
// prefers-reduced-motion collapses to a static layout — no useScroll, no
// transforms.

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

const CF_BASE = "https://imagedelivery.net/SPP6PvrwF_wGf30v_j1vDw";

interface AboutBeatSectionProps {
  side: "left" | "right";
  // Beat number, e.g. "01" — rendered with the eyebrow as "01 — THE BEGINNING"
  number: string;
  eyebrow: string;
  body: string;
  cfId: string;
  alt: string;
  // Photo aspect ratio (width / height). 1.5 = 3:2 landscape, 16/9, 4/5
  // portrait, etc. Reserves the layout box pre-load (CLS = 0).
  aspect: number;
}

export function AboutBeatSection({
  side,
  number,
  eyebrow,
  body,
  cfId,
  alt,
  aspect,
}: AboutBeatSectionProps) {
  const photoRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: photoRef,
    offset: ["start end", "center center"],
  });

  // Photo enters from below the rest line, slightly oversized, slightly
  // washed out — and lands at flush, full size, full opacity by the time
  // its center crosses the viewport center.
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], ["15%", "0%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.0]);

  const photoUrl = `${CF_BASE}/${cfId}/public`;

  // Layout: text and photo columns side-by-side. `side="right"` puts the
  // photo on the right (text first in source order = better reading order
  // pre-CSS); `side="left"` reverses with order utilities.
  const photoOrderClass = side === "left" ? "lg:order-first" : "lg:order-last";

  // Static fallback — render the photo at its final state, no scroll
  // transforms attached. Layout otherwise identical so the bio rhythm
  // doesn't shift across motion preferences.
  const photoElement = reduce ? (
    <div
      ref={photoRef}
      className={`relative w-full overflow-hidden bg-ink ${photoOrderClass}`}
      style={{ aspectRatio: aspect }}
    >
      <Image
        src={photoUrl}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover"
      />
    </div>
  ) : (
    <motion.div
      ref={photoRef}
      className={`relative w-full overflow-hidden bg-ink ${photoOrderClass}`}
      style={{ aspectRatio: aspect, opacity, y, scale }}
    >
      <Image
        src={photoUrl}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover"
      />
    </motion.div>
  );

  return (
    <section className="bg-paper py-12 lg:py-24">
      <div className="mx-auto grid max-w-screen-2xl grid-cols-1 items-center gap-10 px-6 lg:grid-cols-2 lg:gap-16 lg:px-12">
        {photoElement}
        <div className="max-w-xl px-2 lg:px-0">
          <p className="mb-4 font-body text-xs uppercase tracking-widest text-muted-foreground">
            {number} — {eyebrow}
          </p>
          <p className="font-body text-base leading-relaxed text-ink lg:text-lg">
            {body}
          </p>
        </div>
      </div>
    </section>
  );
}
