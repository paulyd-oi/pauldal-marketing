import { Hero } from "@/components/site/hero";
import { AboutTeaser } from "@/components/site/about-teaser";
import { ServicesTeaser } from "@/components/site/services-teaser";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutTeaser />
      <ServicesTeaser />
      {/* TODO: portfolio teaser */}
      <div className="h-screen" />
    </>
  );
}
