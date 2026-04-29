"use client";

// One bio beat: text column + photo column, layout mirrored on alternate
// beats. Photo column carries a scroll-decoupled rise (15% → 0%) + scale
// (1.05 → 1.0) + fade (0 → 1) as the section approaches viewport center.
//
// Text column reveals in choreographed stagger when the section enters
// view: eyebrow → headline → body, each rising 24px while fading in,
// 0.12s offset between each. Ease is exponential ease-out so the lift
// feels weightless. Fires once per scroll session.
//
// prefers-reduced-motion collapses both photo and text to static layouts.

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";

const CF_BASE = "https://imagedelivery.net/SPP6PvrwF_wGf30v_j1vDw";

interface AboutBeatSectionProps {
  side: "left" | "right";
  number: "01" | "02" | "03";
  eyebrow: string;
  headline: string;
  body: string;
  cfId: string;
  alt: string;
  // Photo aspect ratio (width / height). 1.5 = 3:2 landscape, 16/9, 4/5
  // portrait, etc. Reserves the layout box pre-load (CLS = 0).
  aspect: number;
}

const textVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export function AboutBeatSection({
  side,
  number,
  eyebrow,
  headline,
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

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], ["15%", "0%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.0]);

  const photoUrl = `${CF_BASE}/${cfId}/public`;

  const photoOrderClass = side === "left" ? "lg:order-first" : "lg:order-last";

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

  const eyebrowClass =
    "font-body text-xs uppercase tracking-widest text-muted-foreground";
  const headlineClass =
    "font-display text-balance text-5xl leading-[0.95] tracking-tight text-ink lg:text-7xl xl:text-[5.5rem]";
  const bodyClass =
    "max-w-md font-body text-lg leading-relaxed text-ink/85 lg:text-xl lg:leading-[1.7] " +
    "first-letter:float-left first-letter:mr-3 first-letter:mt-1 " +
    "first-letter:font-display first-letter:text-6xl " +
    "first-letter:leading-[0.85] first-letter:text-ink " +
    "lg:first-letter:mt-2 lg:first-letter:text-7xl";

  const textColumn = reduce ? (
    <div className="flex flex-col gap-6 lg:gap-8">
      <p className={eyebrowClass}>
        {number} — {eyebrow}
      </p>
      <h2 className={headlineClass}>{headline}</h2>
      <p className={bodyClass}>{body}</p>
    </div>
  ) : (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-15% 0px" }}
      className="flex flex-col gap-6 lg:gap-8"
    >
      <motion.p custom={0} variants={textVariants} className={eyebrowClass}>
        {number} — {eyebrow}
      </motion.p>
      <motion.h2 custom={1} variants={textVariants} className={headlineClass}>
        {headline}
      </motion.h2>
      <motion.p custom={2} variants={textVariants} className={bodyClass}>
        {body}
      </motion.p>
    </motion.div>
  );

  return (
    <section className="bg-paper py-16 lg:py-24">
      <div className="mx-auto grid max-w-screen-2xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2 lg:gap-20 lg:px-12">
        {photoElement}
        {textColumn}
      </div>
    </section>
  );
}
