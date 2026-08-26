import { HomeV3 } from "@/components/sections/home-v3";
import { jsonLdScript, personJsonLd } from "@/lib/seo";

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(personJsonLd())}
      />
      <HomeV3 />
    </>
  );
}
