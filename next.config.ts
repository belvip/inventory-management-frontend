import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ✅ Configuration de base
  reactStrictMode: true,
  
  // ✅ Gestion des erreurs
  eslint: {
    ignoreDuringBuilds: Boolean(process.env.IGNORE_ESLINT),
  },
  typescript: {
    ignoreBuildErrors: Boolean(process.env.IGNORE_TSC),
  },

  // ✅ Images
  images: {
    domains: [
      'localhost',
      '127.0.0.1',
      // ajoutez vos domains ici
    ],
    formats: ['image/webp', 'image/avif'],
  },

  // ✅ Headers de sécurité
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
        ],
      },
    ];
  },

  // ✅ Experimental (options stables)
  experimental: {
    optimizePackageImports: ['lucide-react', '@tanstack/react-query'],
  },
};

export default nextConfig;