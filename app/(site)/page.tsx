import { Hero } from "@/components/sections/hero";
import { Chapters } from "@/components/sections/chapters";
import { CurrentlyBuilding } from "@/components/sections/currently-building";
import { LifeOutside } from "@/components/sections/life-outside";
import { ConnectBand } from "@/components/sections/connect-band";
import { jsonLdScript, personJsonLd } from "@/lib/seo";

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(personJsonLd())}
      />
      <Hero />
      <Chapters />
      <CurrentlyBuilding />
      <LifeOutside />
      <ConnectBand />
    </>
  );
}
