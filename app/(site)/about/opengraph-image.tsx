import { renderOgCard, ogSize, ogContentType } from "@/lib/og";

export const alt = "About — Katie Spencer";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgCard({
    eyebrow: "About · Katie Spencer",
    title: "Different rooms, one throughline.",
    subtitle: "An opera singer turned founder. The work looks different every time; the instinct underneath it doesn't.",
  });
}
