// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.epusercontent.com",
      },
      {
        protocol: "https",
        hostname: "**.cm.elasticpath.com",
      },
      {
        protocol: "https",
        hostname: "**cdn.shopify.com",
      },
      {
        protocol: "https",
        hostname: "**asset1.cxnmarksandspencer.com",
      },
      {
        protocol: "https",
        hostname: "**imgs.search.brave.com",
      },  
      {
        protocol: "https",
        hostname: "**.com"
      },
      {
        protocol: "https",
        hostname: "**.net"
      }
    ],
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };

    return config;
  },
};

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = {
  ...withBundleAnalyzer(nextConfig),
  eslint: {
    ignoreDuringBuilds: true,
  }
};
