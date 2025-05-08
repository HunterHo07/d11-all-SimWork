/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',                  // Static export
  basePath: '/i11',                  // MUST match repo name
  assetPrefix: '/i11/',              // For correct asset paths
  trailingSlash: true,               // Better routing
  images: { unoptimized: true },     // Required for static
};

export default nextConfig;
