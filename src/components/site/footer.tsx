import Link from "next/link";
import { ExternalLink, Mail } from "lucide-react";

const PAGE_LINKS = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/book", label: "Book" },
];

export function Footer() {
  return (
    <footer className="mt-32 border-t border-hairline py-16 lg:py-24">
      <div className="mx-auto max-w-screen-2xl px-6 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-4 lg:gap-8">
          <div>
            <p className="font-display text-2xl text-ink">Paul Dal Studio</p>
            <p className="mt-2 font-body text-sm text-muted-foreground">
              San Diego — Available worldwide
            </p>
          </div>

          <div>
            <p className="font-body text-xs uppercase tracking-widest text-muted-foreground">
              Pages
            </p>
            <ul className="mt-4 space-y-3">
              {PAGE_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="font-body text-sm text-ink transition-colors duration-[180ms] hover:text-oxblood"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-body text-xs uppercase tracking-widest text-muted-foreground">
              Connect
            </p>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="https://instagram.com/pauldalstudio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-body text-sm text-ink transition-colors duration-[180ms] hover:text-oxblood"
                >
                  <ExternalLink className="h-4 w-4" />
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@pauldalstudios.com"
                  className="inline-flex items-center gap-2 font-body text-sm text-ink transition-colors duration-[180ms] hover:text-oxblood"
                >
                  <Mail className="h-4 w-4" />
                  Email
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-body text-xs uppercase tracking-widest text-muted-foreground">
              Contact
            </p>
            <p className="mt-4 font-body text-sm leading-relaxed text-ink">
              Available for weddings, events, business, editorial worldwide. San
              Diego based.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-hairline pt-12 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>&copy; 2026 Paul Dal Studio</p>
          <p className="[font-variant:small-caps]">Crafted with intention</p>
        </div>
      </div>
    </footer>
  );
}
