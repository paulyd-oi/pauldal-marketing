import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./reveal";
import { ServicesAccordion, type AccordionItem } from "./services-accordion";
import { EditorialTestimonial } from "./editorial-testimonial";
import { MarqueeTestimonial } from "./marquee-testimonial";
import { SectionDivider } from "./section-divider";
import { PhotoFlankedHeading } from "./photo-flanked-heading";
import { FAQAccordion } from "./faq-accordion";
import { ProcessSteps } from "./process-steps";

const CF = "https://imagedelivery.net/SPP6PvrwF_wGf30v_j1vDw";

// Required sections: hero, intro, gallery, finalCta — render on every
// service page. Optional sections (marked ?:) are gated by `&&` guards in
// the JSX below; pass undefined to hide them. Lets new categories ship
// with curated depth that grows over time, while existing pages
// (/weddings, /events, /business→/brand-content) pass every field and
// render unchanged.
export interface LandingPageContent {
  hero: {
    eyebrow: string;
    headline: string;
    subhead: string;
    cta: { label: string; href: string };
    photoCfImageId: string;
    photoAlt: string;
  };
  pricingSummary?: {
    cards: { label: string; value: string }[];
    note: string;
  };
  // Richer investment block — used in place of pricingSummary when a page
  // has multiple distinct products (e.g. /weddings: elopements vs full
  // films vs photo+video bundles). When both are set, investmentBlock wins.
  investmentBlock?: {
    products: {
      eyebrow: string;
      priceLabel: string;
      description: string;
    }[];
  };
  intro: {
    eyebrow: string;
    headline: string;
    paragraphs: string[];
    photoCfImageId: string;
    photoAlt: string;
  };
  gallery: {
    eyebrow: string;
    headline: string;
    photos: { cfImageId: string; alt: string }[];
    caption: string;
  };
  accordion?: {
    eyebrow: string;
    headline: string;
    subhead: string;
    items: AccordionItem[];
  };
  process?: {
    eyebrow: string;
    headline: string;
    subhead: string;
  };
  testimonial?: {
    quote: string;
    attribution: string;
    context?: string;
    bgVariant?: "paper" | "cream" | "ink";
  };
  testimonialVariant?: "editorial" | "marquee";
  faqHeadlineImageId?: string;
  faqItems?: { question: string; answer: string }[];
  finalCta: {
    headline: string;
    subhead: string;
    cta: { label: string; href: string };
  };
}

interface LandingPageLayoutProps {
  content: LandingPageContent;
  // Optional injection slots — render between sections without forcing
  // every page to bake in the same shape. /weddings uses these for the
  // package tier section (afterIntro) and the trust-strip (beforeFinalCta).
  afterIntro?: ReactNode;
  beforeFinalCta?: ReactNode;
}

export function LandingPageLayout({
  content,
  afterIntro,
  beforeFinalCta,
}: LandingPageLayoutProps) {
  return (
    <>
      {/* Hero — full-bleed photo */}
      <section className="relative h-[80vh] w-full overflow-hidden bg-ink lg:h-[90vh]">
        <Image
          src={`${CF}/${content.hero.photoCfImageId}/public`}
          alt={content.hero.photoAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/15 to-transparent" />
        <div className="relative mx-auto flex h-full max-w-screen-2xl flex-col justify-end px-6 pb-16 lg:px-12 lg:pb-24">
          <Reveal>
            <p className="mb-6 font-body text-xs uppercase tracking-widest text-paper/70">
              {content.hero.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="max-w-4xl font-display text-5xl leading-[0.95] tracking-tight text-paper sm:text-6xl lg:text-8xl">
              {content.hero.headline}
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-xl font-body text-base leading-relaxed text-paper/70 lg:text-lg">
              {content.hero.subhead}
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-10">
              <Link
                href={content.hero.cta.href}
                className="focus-ring group inline-flex items-center bg-oxblood px-7 py-3.5 font-body text-base tracking-wide text-paper transition-colors duration-200 hover:bg-oxblood-hover"
              >
                {content.hero.cta.label}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Investment block — multi-product editorial (optional, takes precedence) */}
      {content.investmentBlock && (
        <section className="bg-paper py-24 lg:py-32">
          <div className="mx-auto max-w-screen-2xl px-6 lg:px-12">
            <div className="border-y border-hairline py-12 lg:py-16">
              <div className="grid grid-cols-1 gap-10 lg:grid-cols-[auto_1fr] lg:gap-16">
                <Reveal>
                  <p className="font-body text-xs uppercase tracking-widest text-ink/50">
                    Investment
                  </p>
                </Reveal>
                <div className="max-w-2xl space-y-12 lg:space-y-14">
                  {content.investmentBlock.products.map((product, i) => (
                    <Reveal key={product.eyebrow} delay={i * 0.1}>
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/50">
                          {product.eyebrow}
                        </p>
                        <p className="mt-3 font-display text-3xl leading-snug tracking-tight text-ink lg:text-4xl">
                          {product.priceLabel}
                        </p>
                        <p className="mt-4 font-body text-base leading-relaxed text-ink/70 lg:text-lg">
                          {product.description}
                        </p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Pricing summary — editorial list (optional, fallback when no investmentBlock) */}
      {!content.investmentBlock && content.pricingSummary && (
        <section className="bg-paper py-24 lg:py-32">
          <div className="mx-auto max-w-screen-2xl px-6 lg:px-12">
            <div className="border-y border-hairline py-12 lg:py-16">
              <div className="grid grid-cols-1 gap-10 lg:grid-cols-[auto_1fr] lg:gap-16">
                <Reveal>
                  <p className="font-body text-xs uppercase tracking-widest text-ink/50">
                    Investment
                  </p>
                </Reveal>
                <div className="max-w-2xl">
                  <ul className="space-y-3 lg:space-y-4">
                    {content.pricingSummary.cards.map((card, i) => (
                      <Reveal key={card.label} delay={i * 0.08}>
                        <li className="flex flex-wrap items-baseline gap-x-4 font-display text-2xl leading-snug tracking-tight text-ink lg:text-3xl">
                          <span className="text-ink/50">{card.label}</span>
                          <span>{card.value}</span>
                        </li>
                      </Reveal>
                    ))}
                  </ul>
                  <Reveal delay={0.3}>
                    <p className="mt-8 font-body text-sm text-ink/50 lg:text-base">
                      {content.pricingSummary.note}
                    </p>
                  </Reveal>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Brand mark divider */}
      <SectionDivider />

      {/* Intro — editorial split */}
      <section className="bg-cream-hover py-24 lg:py-32">
        <div className="mx-auto max-w-screen-2xl px-6 lg:px-12">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink">
                <Image
                  src={`${CF}/${content.intro.photoCfImageId}/public`}
                  alt={content.intro.photoAlt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
            <div className="max-w-xl lg:pt-8">
              <Reveal delay={0.1}>
                <p className="mb-6 font-body text-xs uppercase tracking-widest text-ink/50">
                  {content.intro.eyebrow}
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <h2 className="mb-10 font-display text-4xl leading-[1.05] tracking-tight text-ink lg:text-6xl">
                  {content.intro.headline}
                </h2>
              </Reveal>
              {content.intro.paragraphs.map((p, i) => (
                <Reveal key={i} delay={0.3 + i * 0.1}>
                  <p className="mb-6 font-body text-base leading-relaxed text-ink lg:text-lg">
                    {p}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {afterIntro}

      {/* Gallery */}
      <section className="bg-paper py-24 lg:py-32">
        <div className="mx-auto max-w-screen-2xl px-6 lg:px-12">
          <div className="mb-16 max-w-2xl lg:mb-20">
            <Reveal>
              <p className="mb-6 font-body text-xs uppercase tracking-widest text-ink/50">
                {content.gallery.eyebrow}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-4xl leading-[1.05] tracking-tight text-ink lg:text-6xl">
                {content.gallery.headline}
              </h2>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {content.gallery.photos.map((photo, i) => (
              <Reveal key={photo.cfImageId} delay={i * 0.05}>
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink">
                  <Image
                    src={`${CF}/${photo.cfImageId}/public`}
                    alt={photo.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
            ))}
          </div>

          {content.gallery.caption &&
            !/sample work|replace with curated/i.test(content.gallery.caption) && (
              <Reveal delay={0.5}>
                <p className="mt-8 font-body text-xs uppercase tracking-widest text-ink/50">
                  {content.gallery.caption}
                </p>
              </Reveal>
            )}
        </div>
      </section>

      {/* What's included accordion (optional) */}
      {content.accordion && (
        <section className="bg-cream-hover py-24 lg:py-32">
          <div className="mx-auto max-w-screen-2xl px-6 lg:px-12">
            <div className="mb-16 max-w-2xl lg:mb-20">
              <Reveal>
                <p className="mb-6 font-body text-xs uppercase tracking-widest text-ink/50">
                  {content.accordion.eyebrow}
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="mb-6 font-display text-4xl leading-[1.05] tracking-tight text-ink lg:text-6xl">
                  {content.accordion.headline}
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="font-body text-sm leading-relaxed text-ink/70">
                  {content.accordion.subhead}
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <ServicesAccordion items={content.accordion.items} />
            </Reveal>
          </div>
        </section>
      )}

      {/* How it works (optional) */}
      {content.process && (
        <section className="bg-paper py-24 lg:py-32">
          <div className="mx-auto max-w-screen-2xl px-6 lg:px-12">
            <div className="mb-16 max-w-2xl lg:mb-20">
              <Reveal>
                <p className="mb-6 font-body text-xs uppercase tracking-widest text-ink/50">
                  {content.process.eyebrow}
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="mb-6 font-display text-4xl leading-[1.05] tracking-tight text-ink lg:text-6xl">
                  {content.process.headline}
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="font-body text-base leading-relaxed text-ink/70 lg:text-lg">
                  {content.process.subhead}
                </p>
              </Reveal>
            </div>

            <ProcessSteps />
          </div>
        </section>
      )}

      {/* FAQ — photo-flanked heading + accordion (optional, both must be set) */}
      {content.faqHeadlineImageId && content.faqItems && (
        <>
          <PhotoFlankedHeading
            headline="Before you book, a few things worth knowing."
            body="The questions I get asked most. If yours isn't here, send it through the contact form. Happy to walk through anything."
            imageId={content.faqHeadlineImageId}
            imageAlt="Paul Dal Studios behind the scenes"
            photoSide="right"
          />
          <FAQAccordion items={content.faqItems} />
        </>
      )}

      {/* Testimonial — editorial pull-quote OR marquee variant (optional) */}
      {content.testimonial &&
        (content.testimonialVariant === "marquee" ? (
          <MarqueeTestimonial
            eyebrow={content.testimonial.attribution}
            quote={content.testimonial.quote}
            attribution={content.testimonial.context}
            marqueeText="CLIENT LOVE"
            bgVariant="ink"
          />
        ) : (
          <EditorialTestimonial
            quote={content.testimonial.quote}
            attribution={content.testimonial.attribution}
            context={content.testimonial.context}
            bgVariant={content.testimonial.bgVariant ?? "cream"}
          />
        ))}

      {beforeFinalCta}

      {/* Final CTA */}
      <section className="bg-ink py-24 lg:py-32">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-12">
          <Reveal>
            <h2 className="mb-6 font-display text-4xl leading-[1.05] tracking-tight text-paper lg:text-6xl">
              {content.finalCta.headline}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mb-12 font-body text-base text-paper/70 lg:text-lg">
              {content.finalCta.subhead}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <Link
              href={content.finalCta.cta.href}
              className="focus-ring group inline-flex items-center bg-oxblood px-10 py-4 font-body text-base tracking-wide text-paper transition-colors duration-200 hover:bg-oxblood-hover lg:text-lg"
            >
              {content.finalCta.cta.label}
              <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
