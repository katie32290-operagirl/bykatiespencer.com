import { HomeHero } from "@/components/sections/home-hero";
import { CurrentlyTicker } from "@/components/sections/currently-ticker";
import { AboutIntro } from "@/components/sections/about-intro";
import { ChaptersSpread } from "@/components/sections/chapters-spread";
import { BuildingFeatured } from "@/components/sections/building-featured";
import { QuoteBand } from "@/components/sections/quote-band";
import { HomeConnect } from "@/components/sections/home-connect";
import { LifeOutside } from "@/components/sections/life-outside";
import { jsonLdScript, personJsonLd } from "@/lib/seo";

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(personJsonLd())}
      />
      <HomeHero />
      <CurrentlyTicker />
      <AboutIntro />
      <ChaptersSpread />
      <BuildingFeatured />
      <QuoteBand />
      <HomeConnect />
      {/* Instagram feed — kept at the bottom */}
      <LifeOutside />
    </>
  );
}
