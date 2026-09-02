import type { Metadata, Viewport } from "next";
import Script from "next/script";
import {
  fontSans,
  fontDisplay,
  fontAccent,
  fontKsLabel,
  fontKsVoice,
  fontKsDisplay,
} from "@/lib/fonts";
import { site } from "@/content/site";
import { createMetadata, jsonLdScript, websiteJsonLd } from "@/lib/seo";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  ...createMetadata(),
  title: {
    default: site.title,
    template: `%s · ${site.name}`,
  },
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: [
    "Katie Spencer",
    "storyteller",
    "creative strategist",
    "brand storytelling",
    "founder",
    "keynote speaker",
    "GreenRoom",
    "arts organizations",
    "nonprofit strategy",
    "Knoxville",
  ],
};

export const viewport: Viewport = {
  themeColor: "#D65A2E",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontSans.variable} ${fontDisplay.variable} ${fontAccent.variable} ${fontKsLabel.variable} ${fontKsVoice.variable} ${fontKsDisplay.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdScript(websiteJsonLd())}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster position="bottom-right" />
        </ThemeProvider>

        {/* Google Analytics (GA4) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-FLNYKF503X"
          strategy="afterInteractive"
        />
        <Script id="ga4" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-FLNYKF503X');
          `}
        </Script>
        <Script src="/_vercel/insights/script.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
