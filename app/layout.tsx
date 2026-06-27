import type { Metadata, Viewport } from "next";
import { Geist_Mono } from "next/font/google";
import { fontSans, fontSerif, fontScript } from "@/lib/fonts";
import { site } from "@/content/site";
import { createMetadata, jsonLdScript, websiteJsonLd } from "@/lib/seo";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
    "brand architect",
    "arts marketing",
    "season narrative",
    "nonprofit strategy",
    "creative director",
    "performing arts",
    "Knoxville Opera",
    "Katie Spencer",
  ],
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f0efed" },
    { media: "(prefers-color-scheme: dark)", color: "#1a0805" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontSans.variable} ${fontSerif.variable} ${fontScript.variable} ${geistMono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLdScript(websiteJsonLd())}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
