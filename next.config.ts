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
};

export default nextConfig;
