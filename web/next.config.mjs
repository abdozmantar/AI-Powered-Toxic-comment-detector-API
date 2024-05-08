/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        BASE_URL: process.env.BASE_URL,
      },
      images:{
        remotePatterns:[{
          hostname:"api.producthunt.com"
        }]
      }
     
};

export default nextConfig;
