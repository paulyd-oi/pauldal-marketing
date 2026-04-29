"use client";

// Pinned hero moment for /about. The hero photo is full-bleed and a single
// caption holds through the pin (600vh desktop, 300vh mobile). The photo
// carries a slow ken-burns scale (1.0 → 1.05) so the page never feels
// truly static even at the held middle of the caption.
//
// Caption legibility is held by mix-blend-difference: white type inverts
// whatever's behind it — photo is the protagonist; type adapts.

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

const CF_BASE = "https://imagedelivery.net/SPP6PvrwF_wGf30v_j1vDw";

interface AboutHeroPinnedProps {
  cfId: string;
  alt: string;
  caption: string;
}

export function AboutHeroPinned({
  cfId,
  alt,
  caption,
}: AboutHeroPinnedProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Ken-burns scale across the full pin. 5% drift over 600vh = imperceptible
  // unless you're staring at a fixed point — exactly the cinematic intent.
  const heroScale = useTransform(scrollYProgress, [0, 1], [1.0, 1.05]);

  const photoUrl = `${CF_BASE}/${cfId}/public`;

  if (reduce) {
    return (
      <section className="relative h-screen w-full overflow-hidden bg-ink">
        <Image
          src={photoUrl}
          alt={alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="relative z-10 flex h-full items-center justify-center px-6">
          <h2
            className="max-w-5xl text-center font-display text-5xl leading-[0.95] tracking-tight text-paper sm:text-6xl lg:text-8xl"
            style={{ mixBlendMode: "difference" }}
          >
            {caption}
          </h2>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      className="relative h-[300vh] w-full bg-ink lg:h-[600vh]"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{ scale: heroScale }}
        >
          <Image
            src={photoUrl}
            alt={alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>

        <div className="absolute inset-0 flex items-center justify-center px-6">
          <h2
            className="max-w-5xl text-center font-display text-5xl leading-[0.95] tracking-tight text-paper sm:text-6xl lg:text-8xl"
            style={{ mixBlendMode: "difference" }}
          >
            {caption}
          </h2>
        </div>
      </div>
    </section>
  );
}
