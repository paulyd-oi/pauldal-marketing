import { Hero } from "@/components/site/hero";
import { AboutTeaser } from "@/components/site/about-teaser";
import { ServicesTeaser } from "@/components/site/services-teaser";
import { PortfolioTeaser } from "@/components/site/portfolio-teaser";
import { ClosingCTA } from "@/components/site/closing-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutTeaser />
      <ServicesTeaser />
      <PortfolioTeaser />
      <ClosingCTA />
    </>
  );
}
