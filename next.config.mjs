/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.avdvvn.org',
      },
    ],
  },
}

export default nextConfig
 
