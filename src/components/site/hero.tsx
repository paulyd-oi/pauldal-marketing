"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { HeroCamera3D } from "./hero-camera-3d";

const HERO_IMAGE_URL =
  "https://imagedelivery.net/SPP6PvrwF_wGf30v_j1vDw/6227ea99-0217-4ef4-35bc-247a9ee7cd00/public";

function fadeIn(delay: number) {
  return {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
  } as const;
}

export function Hero() {
  const prefersReduced = useReducedMotion();
  const { scrollY } = useScroll();
  const cueOpacity = useTransform(scrollY, [0, 100], [0.5, 0]);

  return (
    <section className="relative h-[85vh] w-full overflow-hidden bg-ink lg:h-screen">
      <div className="absolute inset-0">
        <motion.div
          className="h-full w-full"
          {...(prefersReduced
            ? {}
            : {
                animate: { scale: 1.04 },
                transition: { duration: 20, ease: "easeOut" },
              })}
        >
          <Image
            src={HERO_IMAGE_URL}
            alt="Haritha's celebration — cake cutting captured in golden light"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/10 to-transparent" />

      <HeroCamera3D />

      <div className="relative mx-auto flex h-full max-w-screen-2xl flex-col justify-end px-6 pb-16 lg:px-12 lg:pb-24">
        <motion.p
          className="mb-6 font-body text-xs uppercase tracking-widest text-paper/70"
          {...(prefersReduced ? {} : fadeIn(0.2))}
        >
          Paul Dal Studio
        </motion.p>

        <motion.h1
          className="max-w-4xl font-display leading-[0.95] tracking-tight text-paper"
          {...(prefersReduced ? {} : fadeIn(0.4))}
        >
          <span className="block text-5xl sm:text-6xl lg:text-8xl">
            San Diego hybrid
          </span>
          <span className="mt-2 block text-3xl italic text-paper/85 sm:text-4xl lg:text-6xl">
            photographer + videographer
          </span>
        </motion.h1>

        <motion.p
          className="mt-8 max-w-md font-body text-base leading-relaxed text-paper/80 lg:text-lg"
          {...(prefersReduced ? {} : fadeIn(0.6))}
        >
          Weddings, events, business, editorial. Available worldwide.
        </motion.p>

        <motion.div className="mt-10" {...(prefersReduced ? {} : fadeIn(0.8))}>
          <Link
            href="/book"
            className="inline-flex items-center bg-oxblood px-7 py-3.5 font-body text-base tracking-wide text-paper transition-colors duration-200 hover:bg-oxblood-hover"
          >
            Start a project
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-paper/50"
        style={{ opacity: cueOpacity }}
        {...(prefersReduced
          ? {}
          : {
              animate: { y: [0, 6, 0] },
              transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            })}
      >
        <ChevronDown className="h-5 w-5" strokeWidth={1.5} />
      </motion.div>
    </section>
  );
}
