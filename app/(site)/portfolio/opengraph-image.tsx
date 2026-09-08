import { renderOgCard, ogSize, ogContentType } from "@/lib/og";

export const alt = "Work — Katie Spencer";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgCard({
    eyebrow: "Work · Katie Spencer",
    title: "Work is where ideas become real.",
    subtitle: "From strategy to story to production: work that gets people to care, show up, and come back.",
  });
}
