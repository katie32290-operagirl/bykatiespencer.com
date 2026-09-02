import type { Metadata } from "next";
import { ConnectRedesign } from "@/components/redesign/connect";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Connect",
  description:
    "Tell me what you're working on. A note reaches Katie Spencer directly.",
  path: "/contact",
});

export default function ContactPage() {
  return <ConnectRedesign />;
}
