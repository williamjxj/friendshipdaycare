import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from "next";
import withSerwist from '@serwist/next';

const withNextIntl = createNextIntlPlugin('./src/i18n/config.ts');

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    qualities: [75, 85],
    remotePatterns: [
      // Allow all R2.dev subdomains (format: https://{accountId}.r2.dev/{bucketName}/...)
      // This includes pub-*.r2.dev and any other R2 subdomain
      {
        protocol: 'https',
        hostname: '*.r2.dev',
        pathname: '/**',
      },
      // Allow any custom CDN or public URL configured via environment variables
      // Note: If you have a specific CDN domain, you can add it here explicitly for better security
      // Example:
      // {
      //   protocol: 'https',
      //   hostname: 'cdn.yourdomain.com',
      //   pathname: '/**',
      // },
    ],
  },
  // Fix watchpack errors by ignoring system directories
  webpack: (config) => {
    config.watchOptions = {
      ...config.watchOptions,
      ignored: [
        '**/node_modules',
        '**/.git',
        '**/.next',
        '**/Applications/**',
        '/Applications/**',
      ],
    };
    return config;
  },
};

// PWA service worker (Serwist): compiled from src/app/sw.ts to public/sw.js at build time.
// Disabled in development; register only in production (see ServiceWorkerRegister).
const withSerwistInit = withSerwist({
  swSrc: 'src/app/sw.ts',
  swDest: 'public/sw.js',
  disable: process.env.NODE_ENV === 'development',
});

export default withSerwistInit(withNextIntl(nextConfig));
