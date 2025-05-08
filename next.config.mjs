/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  basePath: process.env.NODE_ENV === 'production' ? '/d11-all-SimWork' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/d11-all-SimWork/' : '',
  trailingSlash: true,               // Better routing
  images: { unoptimized: true },     // Required for static
  eslint: {
    ignoreDuringBuilds: true,        // Ignore ESLint errors during build
  },
};

export default nextConfig;
