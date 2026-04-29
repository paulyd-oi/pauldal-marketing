import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./reveal";
import { getPersonalPhotoByCfId } from "@/lib/portfolio-public";
import { ABOUT_PHOTO_IDS } from "@/lib/about-photos";

// Static fallback URL — used when the PERSONAL gallery endpoint is
// unreachable or the expected CF ID isn't in the gallery. Mirrors the
// FALLBACK_PORTRAIT_URL in /about/page.tsx so visual continuity between
// the homepage teaser and /about is preserved even when degraded.
const FALLBACK_ABOUT_PHOTO_URL =
  "https://imagedelivery.net/SPP6PvrwF_wGf30v_j1vDw/00a26873-4171-4b0c-f991-867f2f1c6700/public";

export async function AboutTeaser() {
  const heroPhoto = await getPersonalPhotoByCfId(ABOUT_PHOTO_IDS.hero);
  const photoUrl = heroPhoto?.url ?? FALLBACK_ABOUT_PHOTO_URL;
  const photoAlt =
    heroPhoto?.alt ?? "Paul Dal — San Diego hybrid photographer and videographer";

  return (
    <section className="bg-paper py-24 lg:py-32">
      <div className="mx-auto max-w-screen-2xl px-6 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink">
              <Image
                src={photoUrl}
                alt={photoAlt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <div className="max-w-md">
            <Reveal delay={0.1}>
              <p className="mb-6 font-body text-xs uppercase tracking-widest text-ink/50">
                01 <span className="mx-2 text-ink/50">/</span> About
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <h2 className="mb-8 font-display text-4xl leading-[1.05] tracking-tight text-ink lg:text-6xl">
                A hobby became a calling. A craft became a way to serve.
              </h2>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="mb-8 font-body text-base leading-relaxed text-ink lg:text-lg">
                In 2021, I began serving at my church with a camera in my
                hands. What started as something I loved became a craft I
                felt called to steward — capturing services, baptisms,
                worship nights, weddings, brands, and stories that bless
                people beyond the moment itself.
              </p>
            </Reveal>
            <Reveal delay={0.4}>
              <Link
                href="/about"
                className="focus-ring group inline-flex items-center font-body text-sm tracking-wide text-oxblood transition-colors hover:text-oxblood-hover"
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
