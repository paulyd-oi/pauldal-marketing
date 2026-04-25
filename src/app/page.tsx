import { Hero } from "@/components/site/hero";
import { AboutTeaser } from "@/components/site/about-teaser";
import { ServicesTeaser } from "@/components/site/services-teaser";
import { PortfolioTeaser } from "@/components/site/portfolio-teaser";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutTeaser />
      <ServicesTeaser />
      <PortfolioTeaser />
      {/* TODO: closing CTA section */}
      <div className="h-screen" />
    </>
  );
}
