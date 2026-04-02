import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'qxmpwcz3yas32com.public.blob.vercel-storage.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;