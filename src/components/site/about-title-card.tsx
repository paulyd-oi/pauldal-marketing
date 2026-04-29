"use client";

// Pure typography moment between the pinned hero and the first beat.
// Full-bleed dark plate, top + bottom hairlines bracket the moment, a
// monospace credit row sits like film titles above a serif assertion.
//
// Reveal stagger: hairline → credit → headline → hairline.
// prefers-reduced-motion: render static at full opacity.

import { motion, useReducedMotion, type Variants } from "framer-motion";

const variants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.18,
      duration: 1.0,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const hairlineVariants: Variants = {
  hidden: { opacity: 0, scaleX: 0 },
  visible: (i: number) => ({
    opacity: 1,
    scaleX: 1,
    transition: {
      delay: i * 0.18,
      duration: 1.0,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export function AboutTitleCard() {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <section className="relative flex min-h-screen items-center justify-center bg-ink py-24 lg:py-32">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <div className="mx-auto mb-16 h-px w-24 bg-paper/30" />
          <p className="mb-12 font-mono text-xs tracking-[0.25em] text-paper/60 lg:text-sm">
            PAUL DAL — A SAN DIEGO PHOTOGRAPHER &amp; VIDEOGRAPHER
            <span className="mx-3 opacity-50">·</span>
            EST. 2021
          </p>
          <h2 className="font-display text-balance text-5xl leading-[1.05] tracking-tight text-paper lg:text-7xl xl:text-8xl">
            A quiet study of light, presence, and people.
          </h2>
          <div className="mx-auto mt-16 h-px w-24 bg-paper/30" />
        </div>
      </section>
    );
  }

  return (
    <section className="relative flex min-h-screen items-center justify-center bg-ink py-24 lg:py-32">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10% 0px" }}
        className="mx-auto max-w-5xl px-6 text-center"
      >
        <motion.div
          custom={0}
          variants={hairlineVariants}
          className="mx-auto mb-16 h-px w-24 origin-center bg-paper/30"
        />
        <motion.p
          custom={1}
          variants={variants}
          className="mb-12 font-mono text-xs tracking-[0.25em] text-paper/60 lg:text-sm"
        >
          PAUL DAL — A SAN DIEGO PHOTOGRAPHER &amp; VIDEOGRAPHER
          <span className="mx-3 opacity-50">·</span>
          EST. 2021
        </motion.p>
        <motion.h2
          custom={2}
          variants={variants}
          className="font-display text-balance text-5xl leading-[1.05] tracking-tight text-paper lg:text-7xl xl:text-8xl"
        >
          A quiet study of light, presence, and people.
        </motion.h2>
        <motion.div
          custom={3}
          variants={hairlineVariants}
          className="mx-auto mt-16 h-px w-24 origin-center bg-paper/30"
        />
      </motion.div>
    </section>
  );
}
