"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./reveal";

const SERVICES = ["weddings", "events", "business", "editorial"];

export function ClosingCTA() {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % SERVICES.length);
    }, 2400);
    return () => clearInterval(id);
  }, [reduced]);

  return (
    <section className="bg-ink py-32 lg:py-48">
      <div className="mx-auto max-w-3xl px-6 text-center lg:px-12">
        <Reveal>
          <p className="mb-8 font-body text-xs uppercase tracking-widest text-paper/50">
            Ready when you are
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="mb-8 font-display text-5xl leading-[1.05] tracking-tight text-paper md:text-7xl lg:text-8xl">
            Tell me about your project.
          </h2>
        </Reveal>

        <div className="mb-12 flex h-7 items-center justify-center font-body text-base text-paper/70 lg:mb-16 lg:h-8 lg:text-lg">
          {reduced ? (
            <span>weddings · events · business · editorial</span>
          ) : (
            <AnimatePresence mode="wait">
              <motion.span
                key={SERVICES[index]}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                {SERVICES[index]}
              </motion.span>
            </AnimatePresence>
          )}
        </div>

        <Reveal delay={0.3}>
          <Link
            href="/book"
            className="group inline-flex items-center bg-oxblood px-10 py-4 font-body text-base tracking-wide text-paper transition-colors duration-200 hover:bg-oxblood-hover lg:text-lg"
          >
            Start a project
            <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
