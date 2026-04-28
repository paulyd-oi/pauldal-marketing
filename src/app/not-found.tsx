import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/reveal";

export default function NotFound() {
  return (
    <section className="bg-paper py-24 lg:py-32">
      <div className="mx-auto max-w-screen-2xl px-6 lg:px-12">
        <div className="max-w-3xl">
          <Reveal>
            <p className="mb-6 font-body text-xs uppercase tracking-widest text-ink/60">
              404. Lost in transit.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mb-8 font-display text-5xl leading-[1.05] tracking-tight text-ink lg:text-8xl">
              This page slipped through the lens.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mb-12 max-w-xl font-body text-base leading-relaxed text-ink/85 lg:text-lg">
              The page you&apos;re looking for doesn&apos;t exist anymore, or
              never did. Head back home, or get in touch directly.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/"
                className="focus-ring group inline-flex items-center bg-ink px-7 py-3.5 font-body text-base tracking-wide text-paper transition-colors duration-200 hover:bg-ink/85"
              >
                Back to home
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/book"
                className="focus-ring group inline-flex items-center bg-oxblood px-7 py-3.5 font-body text-base tracking-wide text-paper transition-colors duration-200 hover:bg-oxblood-hover"
              >
                Start a project
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
