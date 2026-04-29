import Image from "next/image";
import { Reveal } from "./reveal";

interface TrustItem {
  name: string;
  url: string;
  logoSrc: string;
  logoAlt: string;
  // For logos that don't include the entity name in the mark itself
  // (LinkedIn / Instagram glyphs need an accompanying name; the
  // Complete Weddings + Events lockup already contains the wordmark).
  showName: boolean;
  // CWE lockup is wide; LinkedIn / Instagram are square. Aspect tells
  // the layout whether to constrain by height alone or use a wider
  // container.
  aspect: "square" | "wide";
}

const ITEMS: TrustItem[] = [
  {
    name: "Complete Weddings + Events San Diego",
    url: "https://completewedo.com/san-diego/videographers/paul-dal/",
    logoSrc: "/trust-strip/complete-weddings.svg",
    logoAlt: "Complete Weddings + Events",
    showName: false,
    aspect: "wide",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/paul-dal-4571443b7/",
    logoSrc: "/trust-strip/linkedin.svg",
    logoAlt: "LinkedIn",
    showName: true,
    aspect: "square",
  },
  {
    name: "Instagram",
    url: "https://instagram.com/pauldalstudio",
    logoSrc: "/trust-strip/instagram.svg",
    logoAlt: "Instagram",
    showName: true,
    aspect: "square",
  },
];

export function TrustStrip() {
  return (
    <section className="border-t border-hairline bg-paper py-16 lg:py-20">
      <div className="mx-auto max-w-screen-2xl px-6 lg:px-12">
        <Reveal>
          <p className="mb-10 text-center font-body text-xs uppercase tracking-widest text-muted-foreground lg:mb-12">
            Featured / Listed With
          </p>
        </Reveal>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-3 lg:gap-16">
          {ITEMS.map((item, i) => (
            <Reveal key={item.url} delay={i * 0.08}>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-ring group flex flex-col items-center gap-3"
              >
                <div
                  className={`relative flex h-8 items-center justify-center transition-opacity duration-200 group-hover:opacity-70 lg:h-9 ${
                    item.aspect === "wide" ? "w-48 lg:w-56" : "w-9 lg:w-10"
                  }`}
                >
                  <Image
                    src={item.logoSrc}
                    alt={item.logoAlt}
                    fill
                    sizes="(min-width: 1024px) 224px, 192px"
                    className="object-contain"
                  />
                </div>
                {item.showName && (
                  <span className="font-body text-sm tracking-wide text-ink/70">
                    {item.name}
                  </span>
                )}
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
