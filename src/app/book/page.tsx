import type { Metadata } from "next";
import { Reveal } from "@/components/site/reveal";
import { BookForm } from "@/components/site/book-form";

export const metadata: Metadata = {
  title: "Book",
  description:
    "Tell me about what you're planning — weddings, events, business shoots, editorial. I'll reply within 24 hours.",
};

export default function BookPage() {
  return (
    <section className="bg-paper py-24 lg:py-32">
      <div className="mx-auto max-w-screen-2xl px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Left — editorial prose */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <div className="max-w-md">
              <Reveal>
                <p className="mb-6 font-body text-xs uppercase tracking-widest text-muted-foreground">
                  Book
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <h1 className="mb-8 font-display text-5xl leading-[1.05] tracking-tight text-ink lg:text-7xl">
                  Let&apos;s work together.
                </h1>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mb-8 max-w-md font-body text-base leading-relaxed text-ink/85 lg:text-lg">
                  Tell me about what you&apos;re planning. Weddings, events,
                  business shoots, editorial — I&apos;ll read everything you
                  send and reply within 24 hours.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <p className="font-body text-sm text-muted-foreground">
                  San Diego based. Available worldwide.
                </p>
              </Reveal>
            </div>
          </div>

          {/* Right — form */}
          <div className="max-w-lg">
            <Reveal delay={0.2}>
              <BookForm />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
