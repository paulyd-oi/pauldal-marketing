import type { Metadata } from "next";
import { Suspense } from "react";
import { Reveal } from "@/components/site/reveal";
import { BookForm } from "@/components/site/book-form";
import { AmbientBackplate } from "@/components/site/ambient-backplate";
import { getFavorites, filterByCategory } from "@/lib/favorites";

const OG_IMAGE =
  "https://imagedelivery.net/SPP6PvrwF_wGf30v_j1vDw/6227ea99-0217-4ef4-35bc-247a9ee7cd00/public";

export const metadata: Metadata = {
  title: "Book",
  description:
    "Tell Paul about your project — weddings, events, business, editorial photography in San Diego and worldwide. Response within 24 hours.",
  alternates: { canonical: "https://pauldalstudios.com/book" },
  openGraph: {
    title: "Book — Paul Dal Studios",
    description:
      "Tell me about what you're planning. I'll reply within 24 hours.",
    url: "https://pauldalstudios.com/book",
    siteName: "Paul Dal Studios",
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Paul Dal Studios" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Book — Paul Dal Studios",
    description:
      "Tell me about what you're planning. I'll reply within 24 hours.",
    images: [OG_IMAGE],
  },
};

export default async function BookPage() {
  const initialFavorites = filterByCategory(await getFavorites(), "WEDDING");
  return (
    <>
      {/* Hero — ambient cycling reel of wedding favorites */}
      <section className="relative h-[50vh] min-h-[400px] w-full overflow-hidden bg-ink">
        <AmbientBackplate
          category="WEDDING"
          initialItems={initialFavorites}
          priorityFirst
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink/60" />
        <div className="relative z-10 mx-auto flex h-full max-w-screen-2xl flex-col justify-end px-6 pb-12 lg:px-12 lg:pb-20">
          <div className="max-w-2xl">
            <Reveal>
              <p className="mb-4 font-body text-xs uppercase tracking-widest text-paper/70">
                Book
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="mb-6 font-display text-5xl leading-[1.05] tracking-tight text-paper lg:text-7xl">
                Let&apos;s work together.
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="font-body text-base leading-relaxed text-paper/80 lg:text-lg">
                Tell me about what you&apos;re planning. I&apos;ll read everything
                you send and reply within 24 hours.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Form — solid bg-paper for input readability */}
      <section className="bg-paper py-20 lg:py-28">
        <div className="mx-auto max-w-screen-2xl px-6 lg:px-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_minmax(0,1.4fr)] lg:gap-20">
            {/* Left — supporting prose */}
            <div className="lg:sticky lg:top-32 lg:self-start">
              <div className="max-w-md">
                <Reveal>
                  <p className="mb-6 font-body text-xs uppercase tracking-widest text-muted-foreground">
                    San Diego based. Available worldwide.
                  </p>
                </Reveal>
                <Reveal delay={0.1}>
                  <p className="font-body text-base leading-relaxed text-ink lg:text-lg">
                    Weddings, events, business shoots, editorial. Every inquiry
                    gets a personal reply, not an autoresponder.
                  </p>
                </Reveal>
              </div>
            </div>

            {/* Right — form */}
            <div className="max-w-xl">
              <Reveal delay={0.2}>
                <Suspense fallback={null}>
                  <BookForm />
                </Suspense>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
