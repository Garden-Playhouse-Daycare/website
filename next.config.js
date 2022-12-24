/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ouuvrfmbebexnjriyvmt.supabase.co",
        port: "80",
        pathname: "/storage/v1/object/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "80",
        pathname: "/**",
      },
    ],
  },
  {
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/,
        use: ["@svgr/webpack"]
      });
  
      return config;
    }
  }
};

module.exports = nextConfig;
