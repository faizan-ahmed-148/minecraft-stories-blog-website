/** @type {import('next').NextConfig} */

import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});
const nextConfig = withBundleAnalyzer({
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  experimental: {
    optimizePackageImports: ['react-icons', '@fortawesome/free-solid-svg-icons','@fortawesome/free-brands-svg-icons' ],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "admin.minecraftstories.gg",
      },
      {
        protocol: "https",
        hostname: "play-lh.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "w7.pngwing.com",
      },
    ],
  },
    
  async rewrites() {
    return [
      {
        source: "/missing-page",
        destination: "/",
      },
    ];
  },
  async headers() {
    return [
      {
        // Cache control headers for CSS files in multiple directories
        source: "/(css|styles|assets)/(.*).css", // Adjust the regex pattern to match your directory structure
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/sitemap.xml",
        headers: [
          {
            "key": "Cache-Control",
            "value": "no-store, no-cache, must-revalidate, proxy-revalidate"
          }
        ]
      },
      {
        // Cache control headers for font files in multiple directories
        source: "/fonts/(.*).(woff|woff2|ttf|otf|eot)", // Adjust the regex pattern to match your directory structure
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
});

export default nextConfig;
