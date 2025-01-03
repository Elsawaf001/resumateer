import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "4mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "f5mexfoh9g6whswf.public.blob.vercel-storage.com"
      }
    ]
  } ,
  typescript : {ignoreBuildErrors : true} ,
  eslint : {ignoreDuringBuilds : true},
  reactStrictMode: false ,
};


export default nextConfig;
