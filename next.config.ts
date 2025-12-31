import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from "next";

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
};

export default withNextIntl(nextConfig);
