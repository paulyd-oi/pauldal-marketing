import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./reveal";

// TODO: replace with real Paul self-portrait
const ABOUT_PHOTO =
  "https://imagedelivery.net/SPP6PvrwF_wGf30v_j1vDw/00a26873-4171-4b0c-f991-867f2f1c6700/public";

export function AboutTeaser() {
  return (
    <section className="bg-paper py-24 lg:py-32">
      <div className="mx-auto max-w-screen-2xl px-6 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink">
              <Image
                src={ABOUT_PHOTO}
                alt="Paul Dal — San Diego hybrid photographer and videographer"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <div className="max-w-md">
            <Reveal delay={0.1}>
              <p className="mb-6 font-body text-xs uppercase tracking-widest text-ink/60">
                01 <span className="mx-2 text-ink/40">/</span> About
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <h2 className="mb-8 font-display text-4xl leading-[1.05] tracking-tight text-ink lg:text-6xl">
                Born in Manila. Sharpened in San Diego.
              </h2>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="mb-8 font-body text-base leading-relaxed text-ink/85 lg:text-lg">
                I started shooting in 2019. A kid from the Philippines who
                moved to the US at five, learned to see through a viewfinder
                somewhere along the way. I serve as creative director at my
                church, where I&apos;ve documented over 200 events for a
                community of ten thousand. The same eye now goes into weddings,
                brands, and editorial work. Photography is how I pay attention.
              </p>
            </Reveal>
            <Reveal delay={0.4}>
              <Link
                href="/about"
                className="group inline-flex items-center font-body text-sm tracking-wide text-oxblood transition-colors hover:text-oxblood-hover"
              >
                More about me
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
