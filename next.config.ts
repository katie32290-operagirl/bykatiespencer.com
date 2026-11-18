import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Vanity bio links -> homepage with UTM params for GA4. 307 (permanent:
      // false) so the destination isn't cached and can be changed later.
      {
        source: "/ig",
        destination:
          "/?utm_source=instagram&utm_medium=social&utm_campaign=bio",
        permanent: false,
      },
      {
        source: "/li",
        destination:
          "/?utm_source=linkedin&utm_medium=social&utm_campaign=profile",
        permanent: false,
      },
      // Retired "Collaborate" page — folded into Narratives. 308 permanent.
      {
        source: "/work-with-me",
        destination: "/narratives",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [],
      // Serve the isolated Opera Saratoga concept site at the clean
      // /operasaratoga entry. Real files under the folder (whats-on.html,
      // images, styles.css, etc.) are served directly; only the bare folder
      // path falls through to this rewrite. index.html carries a <base> tag so
      // its relative links resolve under /operasaratoga/.
      afterFiles: [
        { source: "/operasaratoga", destination: "/operasaratoga/index.html" },
      ],
      fallback: [],
    };
  },
};

export default nextConfig;
