"use client";

// One bio beat. Three layout variants for the A24 cinematic register:
//
//   "default"        — legacy 50/50 photo + text column (kept for fallback)
//   "photoPlate"     — full-bleed dark photo, text overlay in a corner
//   "creamInterlude" — asymmetric cream bg, type-dominant, photo annotates
//
// All variants share the same prefers-reduced-motion fallback shape: render
// static at full opacity.

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

type CommonProps = {
  eyebrow: string;
  headline: string;
  body: string;
  cfId: string;
  alt: string;
};

type DefaultProps = CommonProps & {
  variant?: "default";
  side: "left" | "right";
  number: "01" | "02" | "03";
  aspect: number;
};

type PhotoPlateProps = CommonProps & {
  variant: "photoPlate";
  textPosition: "bottomLeft" | "bottomRight";
};

type CreamInterludeProps = CommonProps & {
  variant: "creamInterlude";
};

type AboutBeatSectionProps =
  | DefaultProps
  | PhotoPlateProps
  | CreamInterludeProps;

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

// Slower, more cinematic for full-bleed photoPlate variant.
const plateTextVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.18,
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export function AboutBeatSection(props: AboutBeatSectionProps) {
  const variant = props.variant ?? "default";

  if (variant === "photoPlate") {
    return <PhotoPlateBeat {...(props as PhotoPlateProps)} />;
  }
  if (variant === "creamInterlude") {
    return <CreamInterludeBeat {...(props as CreamInterludeProps)} />;
  }
  return <DefaultBeat {...(props as DefaultProps)} />;
}

function DefaultBeat({
  side,
  number,
  eyebrow,
  headline,
  body,
  cfId,
  alt,
  aspect,
}: DefaultProps) {
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

function PhotoPlateBeat({
  textPosition,
  eyebrow,
  headline,
  body,
  cfId,
  alt,
}: PhotoPlateProps) {
  const reduce = useReducedMotion();
  const photoUrl = `${CF_BASE}/${cfId}/public`;

  const positionClass =
    textPosition === "bottomLeft"
      ? "bottom-12 left-6 lg:bottom-24 lg:left-24 max-w-2xl"
      : "bottom-12 right-6 lg:bottom-24 lg:right-24 max-w-2xl text-right";

  const eyebrowClass =
    "mb-4 font-mono text-xs tracking-[0.25em] text-paper/70 lg:text-sm";
  const headlineClass =
    "font-display text-balance text-5xl leading-[0.95] tracking-tight text-paper lg:text-7xl xl:text-8xl";
  const bodyWrapperClass =
    textPosition === "bottomLeft" ? "mt-6 max-w-md" : "mt-6 ml-auto max-w-md";
  const bodyClass =
    "font-body text-base leading-relaxed text-paper/85 lg:text-lg lg:leading-[1.6]";

  const textBlock = reduce ? (
    <div className={`absolute z-10 ${positionClass}`}>
      <p className={eyebrowClass}>{eyebrow}</p>
      <h2 className={headlineClass}>{headline}</h2>
      <div className={bodyWrapperClass}>
        <p className={bodyClass}>{body}</p>
      </div>
    </div>
  ) : (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      className={`absolute z-10 ${positionClass}`}
    >
      <motion.p custom={0} variants={plateTextVariants} className={eyebrowClass}>
        {eyebrow}
      </motion.p>
      <motion.h2 custom={1} variants={plateTextVariants} className={headlineClass}>
        {headline}
      </motion.h2>
      <motion.div custom={2} variants={plateTextVariants} className={bodyWrapperClass}>
        <p className={bodyClass}>{body}</p>
      </motion.div>
    </motion.div>
  );

  return (
    <section className="relative h-screen w-full overflow-hidden bg-ink">
      <Image
        src={photoUrl}
        alt={alt}
        fill
        priority
        sizes="100vw"
        quality={90}
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent" />
      {textBlock}
    </section>
  );
}

function CreamInterludeBeat({
  eyebrow,
  headline,
  body,
  cfId,
  alt,
}: CreamInterludeProps) {
  const reduce = useReducedMotion();
  const photoUrl = `${CF_BASE}/${cfId}/public`;

  const eyebrowClass =
    "mb-4 font-mono text-xs tracking-[0.25em] text-ink/60 lg:text-sm";
  const headlineClass =
    "font-display text-balance text-6xl leading-[0.9] tracking-tight text-ink lg:text-8xl xl:text-9xl lg:-mr-12";
  const bodyClass =
    "mt-8 max-w-md font-body text-lg leading-relaxed text-ink/85 lg:text-xl lg:leading-[1.7]";

  const textCol = reduce ? (
    <div className="col-span-12 lg:col-span-6 lg:col-start-7 lg:pt-24">
      <p className={eyebrowClass}>{eyebrow}</p>
      <h2 className={headlineClass}>{headline}</h2>
      <p className={bodyClass}>{body}</p>
    </div>
  ) : (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-15% 0px" }}
      className="col-span-12 lg:col-span-6 lg:col-start-7 lg:pt-24"
    >
      <motion.p custom={0} variants={plateTextVariants} className={eyebrowClass}>
        {eyebrow}
      </motion.p>
      <motion.h2 custom={1} variants={plateTextVariants} className={headlineClass}>
        {headline}
      </motion.h2>
      <motion.p custom={2} variants={plateTextVariants} className={bodyClass}>
        {body}
      </motion.p>
    </motion.div>
  );

  return (
    <section className="relative w-full bg-paper py-32 lg:py-48">
      <div className="mx-auto grid max-w-7xl grid-cols-12 gap-6 px-6 lg:gap-12">
        <div className="relative col-span-12 aspect-[4/5] overflow-hidden bg-ink lg:col-span-5 lg:col-start-1">
          <Image
            src={photoUrl}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover"
          />
        </div>
        {textCol}
      </div>
    </section>
  );
}
