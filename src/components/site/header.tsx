"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { Menu, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./mobile-menu";

const SERVICES_SUBLINKS = [
  { href: "/services", label: "Services overview" },
  { href: "/weddings", label: "Weddings" },
  { href: "/events", label: "Events" },
  { href: "/business", label: "Business" },
];

const SERVICES_PATHS = SERVICES_SUBLINKS.map((s) => s.href);

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 0);
  });

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 border-b transition-[background-color,border-color] duration-200",
          scrolled
            ? "border-hairline bg-paper/80 backdrop-blur-sm"
            : "border-transparent bg-paper"
        )}
      >
        <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-6 lg:h-20 lg:px-12">
          <Link
            href="/"
            className="font-display text-lg tracking-tight text-ink lg:text-xl"
          >
            Paul Dal Studio
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            <Link
              href="/about"
              className={cn(
                "font-body text-sm tracking-wide [font-variant:small-caps] transition-colors duration-[180ms]",
                pathname === "/about"
                  ? "text-oxblood underline decoration-1 underline-offset-4"
                  : "text-foreground/70 hover:text-oxblood"
              )}
            >
              About
            </Link>

            {/* Services dropdown */}
            <div className="group relative">
              <Link
                href="/services"
                className={cn(
                  "inline-flex items-center gap-1 font-body text-sm tracking-wide [font-variant:small-caps] transition-colors duration-[180ms]",
                  SERVICES_PATHS.includes(pathname)
                    ? "text-oxblood underline decoration-1 underline-offset-4"
                    : "text-foreground/70 hover:text-oxblood"
                )}
              >
                Services
                <ChevronDown className="h-3 w-3 transition-transform duration-200 group-hover:rotate-180" />
              </Link>
              <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-2 opacity-0 transition-[opacity,visibility] duration-150 group-hover:visible group-hover:opacity-100">
                <div className="min-w-[200px] border border-hairline bg-paper py-2 shadow-sm">
                  {SERVICES_SUBLINKS.map(({ href, label }) => (
                    <Link
                      key={href}
                      href={href}
                      className={cn(
                        "block px-5 py-2.5 font-body text-sm tracking-wide transition-colors duration-[180ms]",
                        pathname === href
                          ? "text-oxblood"
                          : "text-foreground/80 hover:bg-cream-hover hover:text-oxblood"
                      )}
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link
              href="/portfolio"
              className={cn(
                "font-body text-sm tracking-wide [font-variant:small-caps] transition-colors duration-[180ms]",
                pathname === "/portfolio"
                  ? "text-oxblood underline decoration-1 underline-offset-4"
                  : "text-foreground/70 hover:text-oxblood"
              )}
            >
              Portfolio
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setMenuOpen(true)}
              className="-mr-2 flex min-h-11 min-w-11 items-center gap-1.5 p-3 text-ink lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
              <span className="font-body text-xs tracking-wide [font-variant:small-caps]">
                Menu
              </span>
            </button>

            <Link
              href="/book"
              className="inline-flex items-center justify-center bg-oxblood font-body text-sm tracking-wide text-paper transition-colors duration-[180ms] hover:bg-oxblood-hover max-lg:min-h-11 max-lg:px-5 max-lg:py-3 lg:px-5 lg:py-2"
            >
              Book
            </Link>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
