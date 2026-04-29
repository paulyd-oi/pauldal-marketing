"use client";

// Pinned hero moment for /about. The hero photo is full-bleed and the
// three captions cross-fade through over the pin duration (600vh desktop,
// 300vh mobile). The photo carries a slow ken-burns scale (1.0 → 1.05) so
// the page never feels truly static even at the held middle of each caption.
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
  captions: [string, string, string];
}

export function AboutHeroPinned({
  cfId,
  alt,
  captions,
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

  // Cross-fade timeline. 600vh divides into 6 × 100vh slices.
  // Caption 1: in 0-100vh, hold 100-200vh, out 200-300vh
  // Caption 2: in 200-300vh (overlaps 1's out), hold 300-400vh, out 400-500vh
  // Caption 3: in 400-500vh (overlaps 2's out), hold 500-600vh
  // Each "0.167" = 100vh / 600vh.
  const opacity1 = useTransform(
    scrollYProgress,
    [0.0, 0.167, 0.333, 0.5],
    [0, 1, 1, 0],
  );
  const opacity2 = useTransform(
    scrollYProgress,
    [0.333, 0.5, 0.667, 0.833],
    [0, 1, 1, 0],
  );
  const opacity3 = useTransform(
    scrollYProgress,
    [0.667, 0.833, 1.0],
    [0, 1, 1],
  );

  const photoUrl = `${CF_BASE}/${cfId}/public`;

  // Reduced-motion: render the static layout and the first caption only.
  // No pin, no scroll math.
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
            {captions[0]}
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

        {[opacity1, opacity2, opacity3].map((opacity, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 flex items-center justify-center px-6"
            style={{ opacity }}
            aria-hidden={i === 0 ? undefined : "true"}
          >
            <h2
              className="max-w-5xl text-center font-display text-5xl leading-[0.95] tracking-tight text-paper sm:text-6xl lg:text-8xl"
              style={{ mixBlendMode: "difference" }}
            >
              {captions[i]}
            </h2>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
