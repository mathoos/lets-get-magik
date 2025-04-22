import type { NextConfig } from "next";

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

export default nextConfig;