/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: '*.cloudinary.com',
        pathname: '**',
      },
    ],
    // Disable image optimization in dev for speed
    unoptimized: process.env.NODE_ENV === 'development',
  },
  // Enable or disable features based on environment
  ...(process.env.NODE_ENV === 'production' && {
    swcMinify: true,
  }),
}

module.exports = nextConfig