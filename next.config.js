/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ouuvrfmbebexnjriyvmt.supabase.co',
        port: '',
        pathname: "/storage/v1/object/**",
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: "/**",
      },
    ],
  },

}

module.exports = nextConfig
