import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./reveal";
import {
  CATEGORY_LABELS,
  CATEGORY_SLUGS,
  getCategoriesWithGalleries,
  getLatestGalleryByCategory,
  type GalleryCategory,
} from "@/lib/portfolio-public";

const CF = "https://imagedelivery.net/SPP6PvrwF_wGf30v_j1vDw";

// Per-category one-line descriptions. Render alongside the auto-pulled
// cover photo. Fallback descriptions for categories that haven't been
// curated yet (won't surface until those categories have galleries).
const DESCRIPTIONS: Record<GalleryCategory, string> = {
  WEDDING: "Two-shooter coverage, day-of timeline, story-driven edit.",
  ENGAGEMENT: "Pre-wedding portraits in the places you already love.",
  MILESTONE_CELEBRATION:
    "Quinceañeras, birthdays, anniversaries — once-in-a-lifetime moments.",
  PERFORMANCE:
    "Worship nights, concerts, tours — high-energy live coverage.",
  BRAND_CONTENT: "Brand portraits, product, and content packs for teams.",
  EVENT: "Live coverage with same-day teaser delivery for social.",
  FAMILY_LIFESTYLE:
    "Family sessions and lifestyle shoots that capture real connection.",
  HEADSHOTS: "Polished personal-branding portraits that look like you.",
};

export async function ServicesTeaser() {
  // Auto-pull: latest cover from each category that has galleries.
  // Categories with zero galleries are filtered out (matches dropdown
  // visibility — Option C).
  const categories = await getCategoriesWithGalleries();
  const cardData = (
    await Promise.all(
      categories.map(async (cat) => {
        const latest = await getLatestGalleryByCategory(cat);
        return { cat, latest };
      }),
    )
  ).filter((d): d is { cat: GalleryCategory; latest: NonNullable<typeof d.latest> } =>
    d.latest !== null,
  );

  if (cardData.length === 0) return null;

  return (
    <section className="bg-cream-hover py-24 lg:py-32">
      <div className="mx-auto max-w-screen-2xl px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="max-w-md lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <p className="mb-6 font-body text-xs uppercase tracking-widest text-ink/50">
                02 <span className="mx-2 text-ink/50">/</span> Services
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mb-8 font-display text-4xl leading-[1.05] tracking-tight text-ink lg:text-6xl">
                {cardData.length} ways I work.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mb-8 font-body text-base leading-relaxed text-ink lg:text-lg">
                Each project starts the same: listen, plan, shoot, deliver.
                Below is what I&apos;m available for.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <Link
                href="/services"
                className="focus-ring group inline-flex items-center font-body text-sm tracking-wide text-oxblood transition-colors hover:text-oxblood-hover"
              >
                View all services
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 gap-px bg-hairline sm:grid-cols-2">
            {cardData.map(({ cat, latest }, i) => (
              <Reveal key={cat} delay={0.1 + i * 0.08}>
                <Link
                  href={`/${CATEGORY_SLUGS[cat]}`}
                  className="focus-ring-inset group relative block h-full overflow-hidden bg-paper transition-colors hover:bg-cream-hover"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink">
                    <Image
                      src={`${CF}/${latest.coverCfImageId}/public`}
                      alt={latest.coverAlt}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="p-8 lg:p-10">
                    <h3 className="mb-4 font-display text-2xl leading-tight text-ink lg:text-3xl">
                      {CATEGORY_LABELS[cat]}
                    </h3>
                    <p className="mb-6 font-body text-sm leading-relaxed text-ink/70 lg:text-base">
                      {DESCRIPTIONS[cat]}
                    </p>
                    <span className="inline-flex items-center font-body text-xs uppercase tracking-widest text-oxblood">
                      Explore
                      <ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
