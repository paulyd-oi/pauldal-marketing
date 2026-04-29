"use client";

// Client implementation of the site header. Receives services dropdown
// sublinks and mobile menu links from the parent server wrapper
// (src/components/site/header.tsx) so the dropdown can dynamically
// reflect which categories currently have published galleries.

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Menu, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { MobileMenu, type MobileMenuLink } from "./mobile-menu";

export type ServicesSublink = { href: string; label: string };

interface Props {
  servicesSublinks: ServicesSublink[];
  mobileMenuLinks: MobileMenuLink[];
}

export function HeaderClient({ servicesSublinks, mobileMenuLinks }: Props) {
  const SERVICES_PATHS = servicesSublinks.map((s) => s.href);
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const servicesPanelRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 0);
  });

  // /about is the cinematic surface — pinned full-bleed photo sections at
  // top (AboutHeroPinned) and bottom (AboutClosingPinned). The cream header
  // bar over those moments breaks the full-bleed immersion. On /about we
  // render the header as transparent with light-on-dark text + light
  // backdrop-blur. drop-shadow-sm keeps the text legible against the
  // paper-colored bio middle. Other routes are unchanged.
  const isAboutRoute = pathname === "/about" || pathname.startsWith("/about/");

  useEffect(() => {
    if (!servicesOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        servicesRef.current &&
        !servicesRef.current.contains(event.target as Node)
      ) {
        setServicesOpen(false);
      }
    }
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") setServicesOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, [servicesOpen]);

  useEffect(() => {
    setServicesOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 border-b transition-[background-color,border-color] duration-200",
          isAboutRoute
            ? "bg-transparent backdrop-blur-sm"
            : "bg-paper",
          scrolled ? "border-hairline" : "border-transparent"
        )}
      >
        <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-6 lg:h-20 lg:px-12">
          <Link
            href="/"
            className={cn(
              "focus-ring font-display text-lg tracking-tight lg:text-xl",
              isAboutRoute ? "text-paper drop-shadow-md" : "text-ink"
            )}
          >
            Paul Dal Studios
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            <Link
              href="/about"
              className={cn(
                "focus-ring font-body text-sm tracking-wide [font-variant:small-caps] transition-colors duration-[180ms]",
                isAboutRoute && "drop-shadow-md",
                pathname === "/about"
                  ? isAboutRoute
                    ? "text-paper underline decoration-1 underline-offset-4"
                    : "text-oxblood underline decoration-1 underline-offset-4"
                  : isAboutRoute
                  ? "text-paper/80 hover:text-paper"
                  : "text-foreground/70 hover:text-oxblood"
              )}
            >
              About
            </Link>

            {/* Services dropdown */}
            <div
              ref={servicesRef}
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={servicesOpen}
                aria-controls="services-menu"
                onClick={() => setServicesOpen((v) => !v)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setServicesOpen(true);
                    requestAnimationFrame(() => {
                      const first = servicesPanelRef.current?.querySelector<HTMLAnchorElement>(
                        "a"
                      );
                      first?.focus();
                    });
                  }
                }}
                className={cn(
                  "focus-ring inline-flex items-center gap-1 font-body text-sm tracking-wide [font-variant:small-caps] transition-colors duration-[180ms]",
                  isAboutRoute && "drop-shadow-md",
                  SERVICES_PATHS.includes(pathname)
                    ? isAboutRoute
                      ? "text-paper underline decoration-1 underline-offset-4"
                      : "text-oxblood underline decoration-1 underline-offset-4"
                    : isAboutRoute
                    ? "text-paper/80 hover:text-paper"
                    : "text-foreground/70 hover:text-oxblood"
                )}
              >
                Services
                <ChevronDown
                  className={cn(
                    "h-3 w-3 transition-transform duration-200",
                    servicesOpen && "rotate-180"
                  )}
                />
              </button>
              <div
                id="services-menu"
                ref={servicesPanelRef}
                role="menu"
                className={cn(
                  "absolute left-1/2 top-full z-50 -translate-x-1/2 pt-2 transition-[opacity,visibility] duration-150",
                  servicesOpen
                    ? "visible opacity-100"
                    : "invisible opacity-0"
                )}
              >
                <div className="min-w-[200px] border border-hairline bg-paper py-2 shadow-sm">
                  {servicesSublinks.map(({ href, label }) => (
                    <Link
                      key={href}
                      href={href}
                      role="menuitem"
                      tabIndex={servicesOpen ? 0 : -1}
                      onClick={() => setServicesOpen(false)}
                      className={cn(
                        "focus-ring-inset block px-5 py-2.5 font-body text-sm tracking-wide transition-colors duration-[180ms]",
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
                "focus-ring font-body text-sm tracking-wide [font-variant:small-caps] transition-colors duration-[180ms]",
                isAboutRoute && "drop-shadow-md",
                pathname === "/portfolio"
                  ? isAboutRoute
                    ? "text-paper underline decoration-1 underline-offset-4"
                    : "text-oxblood underline decoration-1 underline-offset-4"
                  : isAboutRoute
                  ? "text-paper/80 hover:text-paper"
                  : "text-foreground/70 hover:text-oxblood"
              )}
            >
              Portfolio
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setMenuOpen(true)}
              className={cn(
                "focus-ring -mr-2 flex min-h-11 min-w-11 items-center gap-1.5 p-3 lg:hidden",
                isAboutRoute ? "text-paper drop-shadow-md" : "text-ink"
              )}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
              <span className="font-body text-xs tracking-wide [font-variant:small-caps]">
                Menu
              </span>
            </button>

            <Link
              href="/book"
              className="focus-ring inline-flex items-center justify-center bg-oxblood font-body text-sm tracking-wide text-paper transition-colors duration-[180ms] hover:bg-oxblood-hover max-lg:min-h-11 max-lg:px-5 max-lg:py-3 lg:px-5 lg:py-2"
            >
              Book
            </Link>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} links={mobileMenuLinks} />
    </>
  );
}
