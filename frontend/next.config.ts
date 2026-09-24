import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {

    remotePatterns: [

      {
        protocol: 'https',
        hostname: 'thumbs.dreamstime.com',
        port: '',
  
      }
    ]

  }
};

export default nextConfig;
