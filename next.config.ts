import withBundleAnalyzer from '@next/bundle-analyzer';
import type { NextConfig } from 'next';

const withAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  compress: true,
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nlophnjcxamllgclixdd.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default withAnalyzer(nextConfig);
