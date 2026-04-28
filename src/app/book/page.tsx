import type { Metadata } from "next";
import { Suspense } from "react";
import { Reveal } from "@/components/site/reveal";
import { BookForm } from "@/components/site/book-form";

const OG_IMAGE =
  "https://imagedelivery.net/SPP6PvrwF_wGf30v_j1vDw/6227ea99-0217-4ef4-35bc-247a9ee7cd00/public";

export const metadata: Metadata = {
  title: "Book",
  description:
    "Tell Paul about your project — weddings, events, business, editorial photography in San Diego and worldwide. Response within 24 hours.",
  alternates: { canonical: "https://pauldalstudios.com/book" },
  openGraph: {
    title: "Book — Paul Dal Studio",
    description:
      "Tell me about what you're planning. I'll reply within 24 hours.",
    url: "https://pauldalstudios.com/book",
    siteName: "Paul Dal Studio",
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Paul Dal Studio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Book — Paul Dal Studio",
    description:
      "Tell me about what you're planning. I'll reply within 24 hours.",
    images: [OG_IMAGE],
  },
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
                <h1 className="mb-8 font-display text-5xl leading-[1.05] tracking-tight text-ink lg:text-8xl">
                  Let&apos;s work together.
                </h1>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mb-8 max-w-md font-body text-base leading-relaxed text-ink lg:text-lg">
                  Tell me about what you&apos;re planning. Weddings, events,
                  business shoots, editorial. I&apos;ll read everything you
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
              <Suspense fallback={null}>
                <BookForm />
              </Suspense>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
