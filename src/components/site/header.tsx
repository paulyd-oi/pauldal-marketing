// Server wrapper for the site header. Fetches the visible category list
// from FRAME and composes the services dropdown sublinks + mobile menu
// links, then hands them to HeaderClient which renders the UI.
//
// Option C dynamic visibility: only categories with at least one
// published gallery appear in the dropdown. FAMILY_LIFESTYLE and
// HEADSHOTS will surface automatically once their first gallery is
// tagged on FRAME (no marketing redeploy needed — ISR refresh).

import {
  CATEGORY_LABELS,
  CATEGORY_SLUGS,
  getCategoriesWithGalleries,
  type PublicGalleryCategory,
} from "@/lib/portfolio-public";
import { HeaderClient, type ServicesSublink } from "./header-client";
import type { MobileMenuLink } from "./mobile-menu";

export async function Header() {
  const visibleCategories: PublicGalleryCategory[] = await getCategoriesWithGalleries();

  const servicesSublinks: ServicesSublink[] = [
    { href: "/services", label: "Services overview" },
    ...visibleCategories.map((cat) => ({
      href: `/${CATEGORY_SLUGS[cat]}`,
      label: CATEGORY_LABELS[cat],
    })),
  ];

  const mobileMenuLinks: MobileMenuLink[] = [
    { href: "/about", label: "About", indent: false },
    { href: "/services", label: "Services", indent: false },
    ...visibleCategories.map((cat) => ({
      href: `/${CATEGORY_SLUGS[cat]}`,
      label: CATEGORY_LABELS[cat],
      indent: true,
    })),
    { href: "/portfolio", label: "Portfolio", indent: false },
    { href: "/book", label: "Book", indent: false },
  ];

  return (
    <HeaderClient
      servicesSublinks={servicesSublinks}
      mobileMenuLinks={mobileMenuLinks}
    />
  );
}
