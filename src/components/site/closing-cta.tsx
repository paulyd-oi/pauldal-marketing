import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./reveal";

export function ClosingCTA() {
  return (
    <section className="bg-ink py-32 lg:py-48">
      <div className="mx-auto max-w-3xl px-6 text-center lg:px-12">
        <Reveal>
          <p className="mb-8 font-body text-xs uppercase tracking-widest text-paper/50">
            04 <span className="mx-2 text-paper/30">/</span> Connect
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="mb-8 font-display text-5xl leading-[1.05] tracking-tight text-paper md:text-7xl lg:text-8xl">
            Tell me about your project.
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mb-12 font-body text-base text-paper/70 lg:mb-16 lg:text-lg">
            weddings · events · business · editorial
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <Link
            href="/book"
            className="focus-ring group inline-flex items-center bg-oxblood px-10 py-4 font-body text-base tracking-wide text-paper transition-colors duration-200 hover:bg-oxblood-hover lg:text-lg"
          >
            Start a project
            <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
