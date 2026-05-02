import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { FAQAccordion } from "@/components/site/faq-accordion";
import { TrustStrip } from "@/components/site/trust-strip";
import { getGalleriesByCategory } from "@/lib/portfolio-public";
import { buildCategoryPageMetadata } from "@/lib/seo";

export const revalidate = 60;

const CF_BASE = "https://imagedelivery.net/SPP6PvrwF_wGf30v_j1vDw";
const HERO_CF_ID = "6227ea99-0217-4ef4-35bc-247a9ee7cd00";
const INTRO_CF_ID = "271ed8b4-2732-4272-1a92-2a4b31f42b00";
const PRIMARY_CTA_HREF = "/book?service=weddings&source=christian-seo";
const SECONDARY_CTA_HREF = "/portfolio/weddings";

export async function generateMetadata(): Promise<Metadata> {
  return buildCategoryPageMetadata({
    category: "WEDDING",
    title:
      "San Diego Christian Wedding Videographer | Paul Dal Studios",
    description:
      "Cinematic wedding films for Christian couples honoring God in their covenant. Catholic Mass coverage, scripture-honoring storytelling. Films begin at $4,995.",
    path: "/san-diego-christian-wedding-videographer",
    ogImageAlt:
      "San Diego Christian wedding videographer Paul Dal Studios",
  });
}

const christianServiceJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://pauldalstudios.com/#business",
      name: "Paul Dal Studios",
      url: "https://pauldalstudios.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "San Diego",
        addressRegion: "CA",
        addressCountry: "US",
      },
      priceRange: "$$$",
      areaServed: [
        { "@type": "City", name: "San Diego" },
        { "@type": "State", name: "California" },
      ],
    },
    {
      "@type": "Service",
      serviceType: "Christian Wedding Videography",
      name: "Christian Wedding Videography",
      provider: { "@id": "https://pauldalstudios.com/#business" },
      areaServed: "San Diego, California",
      offers: {
        "@type": "Offer",
        priceCurrency: "USD",
        price: "4995",
      },
    },
  ],
};

const subPoints = [
  {
    title: "Liturgy is the spine of the day, not background.",
    body: "A Catholic Mass moves through specific moments — the Liturgy of the Word, the Rite of Marriage, the Eucharist, the Final Blessing. A Protestant ceremony often centers a homily, vow exchange, and prayer of consecration. We position cameras and audio to honor each transition the way it was designed to be experienced.",
  },
  {
    title: "Audio is everything during ceremony.",
    body: "Vows whispered before God should sound clean, present, and undistorted. Scripture readings should be intelligible from beginning to end. Worship songs should feel cinematic, not like a phone recording. Pro audio rigs run on every Christian wedding we film: lavalier on the officiant, lavalier on the groom, feed from the church sound board, plus a backup recorder.",
  },
  {
    title: "Sacred moments deserve their own pacing.",
    body: "A first kiss after a covenant ceremony hits differently than a generic wedding kiss. A prayer over the couple lasts as long as it lasts — we don't rush it in the edit. The sign of peace, the unity candle, the breaking of the glass at a Messianic ceremony — these moments earn their breath in the final film.",
  },
  {
    title: "Worship is part of the story.",
    body: "Many Christian weddings include extended worship, sometimes with a full team leading the room. The worship section is rarely an afterthought — it's often the emotional climax of the ceremony. We treat it that way.",
  },
];

const traditions = [
  {
    title: "Catholic Wedding Mass",
    body: "Full liturgical coverage including the Rite of Marriage within Mass, Eucharist, and Final Blessing. We've filmed at parishes across the Diocese of San Diego including the Immaculata, Mission San Diego de Alcalá, and St. Therese.",
  },
  {
    title: "Protestant Wedding Ceremony",
    body: "Evangelical, Reformed, Baptist, Methodist, and non-denominational ceremonies. Coverage emphasizes the homily, vow exchange, and prayer of consecration.",
  },
  {
    title: "Charismatic & Pentecostal",
    body: "Ceremonies featuring extended worship, prayer over the couple, prophetic ministry, and Spirit-led liturgical elements. We've filmed within the Hillsong, Bethel-network, and independent charismatic communities.",
  },
  {
    title: "Messianic Jewish",
    body: "Wedding ceremonies blending Jewish wedding tradition with faith in Yeshua — the chuppah, the breaking of the glass, the seven blessings reframed through Messianic lens.",
  },
  {
    title: "Christian Elopements & Micro-Weddings",
    body: "Intimate ceremonies with just a pastor, two witnesses, and a small gathering. Our Elopement Film tier is designed specifically for these days.",
  },
  {
    title: "Bilingual & Multicultural Christian Weddings",
    body: "Spanish-English, Korean-English, Tagalog-English, and other multilingual ceremonies. We coordinate with translators and adapt audio rigs to capture both languages cleanly.",
  },
];

const processSteps = [
  {
    num: "01",
    title: "Discovery call.",
    body: "A 20-minute conversation about your day, your story, your faith tradition, and the moments that matter most.",
  },
  {
    num: "02",
    title: "Liturgy review.",
    body: "We read your order of service or program before the wedding day. We map cameras, audio, and pacing around your specific ceremony — not a generic template.",
  },
  {
    num: "03",
    title: "Sign and lock the date.",
    body: "50% non-refundable retainer holds the date. Contract signed. Planning begins.",
  },
  {
    num: "04",
    title: "Pre-wedding planning call.",
    body: "60 days out: we walk through the full timeline, including key liturgical or scriptural moments you want emphasized in the edit.",
  },
  {
    num: "05",
    title: "Wedding day.",
    body: "We arrive prepared. We work the timeline with reverence for what's actually happening. You stay present in your covenant.",
  },
  {
    num: "06",
    title: "Delivery.",
    body: "48-hour video sneak peek. Full film delivered in 6–8 weeks. Photo gallery in 4–6 weeks if booked together.",
  },
];

const investmentProducts = [
  {
    eyebrow: "ELOPEMENTS & INTIMATE CEREMONIES",
    priceLabel: "from $2,000",
    description:
      "Up to 4 hours, single camera, 2-3 minute cinematic film. Designed for courthouse ceremonies, Christian micro-weddings, and pastor-led elopements.",
  },
  {
    eyebrow: "WEDDING FILMS",
    priceLabel: "from $4,995",
    description:
      "Most couples invest $6,000–$10,000. Full-day cinematic coverage, multi-camera, full ceremony cut + highlight film. Built for Christian wedding services of any tradition.",
  },
  {
    eyebrow: "PHOTO + VIDEO BUNDLES",
    priceLabel: "from $7,495",
    description: "Hybrid coverage with editorial photography included.",
  },
];

const faqItems = [
  {
    question: "Do you film Catholic Masses?",
    answer:
      "Yes — full coverage of the Rite of Marriage within Mass, including the Eucharist, scripture readings, and Final Blessing. We coordinate with parish coordinators on positioning, lighting, and any restrictions specific to your church.",
  },
  {
    question: "Are you respectful of denominational differences?",
    answer:
      "Yes. We've filmed across Catholic, Protestant, charismatic, Messianic, and non-denominational ceremonies. Our role is to capture your tradition as it's lived, not to interpret it. We'll ask questions if we're unsure, never assume.",
  },
  {
    question: "Will you film during prayer or worship moments?",
    answer:
      "Yes, with discretion. We position cameras to be unobtrusive during prayer, communion, and altar moments. If your pastor or priest has specific guidelines (no flash, no foreground positioning during Eucharist, etc.), we follow them without exception.",
  },
  {
    question: "Can you film at our specific church?",
    answer:
      "Most likely. We've filmed at parishes and churches across San Diego and Southern California. If we haven't filmed at your specific venue, we visit beforehand if possible and coordinate with your church's wedding coordinator on positioning, audio, and lighting.",
  },
];

export default async function ChristianWeddingVideographerPage() {
  const dynamicGalleries = await getGalleriesByCategory("WEDDING");
  const heroGallery = dynamicGalleries[0];
  const introGallery = dynamicGalleries[1];

  const heroPhotoCfId = heroGallery?.coverCfImageId ?? HERO_CF_ID;
  const heroPhotoAlt =
    heroGallery?.coverAlt ??
    "Christian wedding ceremony coverage by Paul Dal Studios in San Diego";
  const introPhotoCfId = introGallery?.coverCfImageId ?? INTRO_CF_ID;
  const introPhotoAlt =
    introGallery?.coverAlt ??
    "Christian wedding ceremony by Paul Dal Studios — San Diego";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(christianServiceJsonLd),
        }}
      />

      {/* HERO */}
      <section className="relative h-[80vh] w-full overflow-hidden bg-ink lg:h-[90vh]">
        <Image
          src={`${CF_BASE}/${heroPhotoCfId}/public`}
          alt={heroPhotoAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/15 to-transparent" />
        <div className="relative mx-auto flex h-full max-w-screen-2xl flex-col justify-end px-6 pb-16 lg:px-12 lg:pb-24">
          <Reveal>
            <p className="mb-6 font-body text-xs uppercase tracking-widest text-paper/70">
              Christian Weddings
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="max-w-4xl font-display text-5xl leading-[0.95] tracking-tight text-paper sm:text-6xl lg:text-8xl">
              Christian wedding videographer in San Diego.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-xl font-display text-xl italic leading-relaxed text-paper/80 lg:text-2xl">
              Cinematic films for couples whose marriage begins with covenant.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-6 max-w-xl font-body text-base leading-relaxed text-paper/70 lg:text-lg">
              A Christian wedding is more than a ceremony. It&apos;s a vow
              exchanged before God, witnessed by family and the church, and
              the beginning of a marriage rooted in something deeper than
              tradition.
            </p>
            <p className="mt-4 max-w-xl font-body text-base leading-relaxed text-paper/70 lg:text-lg">
              We film these days the way they were meant to be honored —
              cinematically, intentionally, with reverence for what&apos;s
              actually happening at the altar.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
              <Link
                href={PRIMARY_CTA_HREF}
                className="focus-ring group inline-flex items-center bg-oxblood px-7 py-3.5 font-body text-base tracking-wide text-paper transition-colors duration-200 hover:bg-oxblood-hover"
              >
                Check My Date
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href={SECONDARY_CTA_HREF}
                className="focus-ring group inline-flex items-center font-body text-sm uppercase tracking-widest text-paper/80 transition-colors hover:text-paper"
              >
                More wedding work
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SECTION 1 — Who this page is for */}
      <section className="bg-cream-hover py-24 lg:py-32">
        <div className="mx-auto max-w-screen-2xl px-6 lg:px-12">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink">
                <Image
                  src={`${CF_BASE}/${introPhotoCfId}/public`}
                  alt={introPhotoAlt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
            <div className="max-w-xl lg:pt-8">
              <Reveal delay={0.1}>
                <p className="mb-6 font-body text-xs uppercase tracking-widest text-ink/50">
                  Who this is for
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <h2 className="mb-10 font-display text-4xl leading-[1.05] tracking-tight text-ink lg:text-6xl">
                  Built for couples who take the covenant seriously.
                </h2>
              </Reveal>
              <Reveal delay={0.3}>
                <p className="mb-6 font-body text-base leading-relaxed text-ink lg:text-lg">
                  If you&apos;re searching for a Christian wedding
                  videographer in San Diego, you&apos;ve already made one of
                  the most important decisions about your day: you want a
                  filmmaker who understands what&apos;s actually happening
                  when you exchange vows.
                </p>
              </Reveal>
              <Reveal delay={0.4}>
                <p className="mb-6 font-body text-base leading-relaxed text-ink lg:text-lg">
                  We&apos;ve filmed weddings across nearly every Christian
                  tradition in Southern California — Catholic Masses with
                  full liturgy, Protestant services with extended worship,
                  charismatic ceremonies with prayer and prophecy, intimate
                  church-led elopements with just two witnesses and a pastor.
                </p>
              </Reveal>
              <Reveal delay={0.5}>
                <p className="mb-6 font-body text-base leading-relaxed text-ink lg:text-lg">
                  What every couple shares: a desire for the day to be
                  remembered the way it was lived — not as a wedding
                  production, but as the moment a marriage was sanctified.
                </p>
              </Reveal>
              <Reveal delay={0.6}>
                <p className="font-body text-base leading-relaxed text-ink lg:text-lg">
                  That&apos;s the work we do.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — What sets a Christian wedding film apart */}
      <section className="bg-paper py-24 lg:py-32">
        <div className="mx-auto max-w-screen-2xl px-6 lg:px-12">
          <div className="mb-16 max-w-2xl lg:mb-20">
            <Reveal>
              <p className="mb-6 font-body text-xs uppercase tracking-widest text-ink/50">
                Difference
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mb-6 font-display text-4xl leading-[1.05] tracking-tight text-ink lg:text-6xl">
                What sets a Christian wedding film apart.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="font-body text-base leading-relaxed text-ink/70 lg:text-lg">
                A Christian wedding has rhythms a generic wedding videographer
                often misses. Knowing those rhythms — and filming them with
                intention — is the difference between a beautiful highlight
                reel and a film that honors the day.
              </p>
            </Reveal>
          </div>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            {subPoints.map((point, i) => (
              <Reveal key={point.title} delay={i * 0.08}>
                <div>
                  <h3 className="mb-4 font-display text-2xl leading-snug tracking-tight text-ink lg:text-3xl">
                    {point.title}
                  </h3>
                  <p className="font-body text-base leading-relaxed text-ink/70">
                    {point.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 — Traditions we've filmed */}
      <section className="bg-cream-hover py-24 lg:py-32">
        <div className="mx-auto max-w-screen-2xl px-6 lg:px-12">
          <div className="mb-16 max-w-2xl lg:mb-20">
            <Reveal>
              <p className="mb-6 font-body text-xs uppercase tracking-widest text-ink/50">
                Traditions
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-4xl leading-[1.05] tracking-tight text-ink lg:text-6xl">
                Faith traditions we&apos;ve filmed across San Diego and
                California.
              </h2>
            </Reveal>
          </div>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
            {traditions.map((t, i) => (
              <Reveal key={t.title} delay={i * 0.06}>
                <div className="border-t border-hairline pt-6">
                  <h4 className="mb-3 font-display text-xl text-ink lg:text-2xl">
                    {t.title}
                  </h4>
                  <p className="font-body text-base leading-relaxed text-ink/70">
                    {t.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — Testimonials (minimal pointer to portfolio) */}
      {/* TODO: replace with 3 real Christian-wedding testimonials when operator collects them */}
      <section className="bg-paper py-24 lg:py-32">
        <div className="mx-auto max-w-2xl px-6 text-center lg:px-12">
          <Reveal>
            <p className="mb-6 font-body text-xs uppercase tracking-widest text-ink/50">
              Testimonials
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mb-8 font-display text-4xl leading-[1.05] tracking-tight text-ink lg:text-6xl">
              What couples say.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mb-8 font-body text-base leading-relaxed text-ink/70 lg:text-lg">
              More couples and films at our main wedding portfolio.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <Link
              href="/weddings"
              className="focus-ring group inline-flex items-center font-body text-sm uppercase tracking-widest text-oxblood transition-colors hover:text-oxblood-hover"
            >
              See wedding work
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* SECTION 5 — Process */}
      <section className="bg-cream-hover py-24 lg:py-32">
        <div className="mx-auto max-w-screen-2xl px-6 lg:px-12">
          <div className="mb-16 max-w-2xl lg:mb-20">
            <Reveal>
              <p className="mb-6 font-body text-xs uppercase tracking-widest text-ink/50">
                Process
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mb-6 font-display text-4xl leading-[1.05] tracking-tight text-ink lg:text-6xl">
                How we work.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="font-body text-base leading-relaxed text-ink/70 lg:text-lg">
                The same process we use for every wedding, with one specific
                addition for Christian ceremonies: a pre-wedding conversation
                about your liturgy or order of service, so we know which
                moments we&apos;re protecting on the day.
              </p>
            </Reveal>
          </div>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {processSteps.map((step, i) => (
              <Reveal key={step.num} delay={i * 0.08}>
                <div className="flex gap-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-oxblood font-body text-sm font-medium text-paper">
                    {step.num}
                  </div>
                  <div>
                    <h3 className="mb-2 font-display text-xl text-ink">
                      {step.title}
                    </h3>
                    <p className="font-body text-sm leading-relaxed text-ink/70">
                      {step.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 — Investment (mirror /weddings investment block) */}
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
                {investmentProducts.map((product, i) => (
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
                <Reveal delay={0.4}>
                  <p className="pt-2 font-display text-base italic leading-relaxed text-ink/60 lg:text-lg">
                    Every Christian wedding is different. We&apos;ll walk
                    through the right fit for your tradition on a 20-minute
                    call.
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7 — Faith-specific FAQ (uses existing FAQAccordion — UNMODIFIED) */}
      <section className="bg-cream-hover pt-24 lg:pt-32">
        <div className="mx-auto max-w-3xl px-6 lg:px-12">
          <div className="mb-12 lg:mb-16">
            <Reveal>
              <p className="mb-6 font-body text-xs uppercase tracking-widest text-ink/50">
                FAQ
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-4xl leading-[1.05] tracking-tight text-ink lg:text-6xl">
                Faith-specific questions.
              </h2>
            </Reveal>
          </div>
        </div>
        <FAQAccordion items={faqItems} />
      </section>

      {/* TrustStrip */}
      <TrustStrip />

      {/* SECTION 8 — Final CTA */}
      <section className="bg-ink py-24 lg:py-32">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-12">
          <Reveal>
            <h2 className="mb-8 font-display text-4xl leading-[1.05] tracking-tight text-paper lg:text-6xl">
              Ready to talk?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mb-4 font-body text-base leading-relaxed text-paper/70 lg:text-lg">
              If our work feels right for your day, the next step is a
              20-minute call. We listen to your story, hear your faith and
              your vision, and walk through how we&apos;d capture your day
              with reverence.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mb-12 font-body text-base text-paper/70 lg:text-lg">
              No pressure. No script. Just a conversation.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
              <Link
                href={PRIMARY_CTA_HREF}
                className="focus-ring group inline-flex items-center bg-oxblood px-10 py-4 font-body text-base tracking-wide text-paper transition-colors duration-200 hover:bg-oxblood-hover lg:text-lg"
              >
                Book a Discovery Call
                <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href={SECONDARY_CTA_HREF}
                className="focus-ring group inline-flex items-center font-body text-sm uppercase tracking-widest text-paper/80 transition-colors hover:text-paper"
              >
                More wedding work
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
