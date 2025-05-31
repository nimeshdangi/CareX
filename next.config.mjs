/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '5000',
                pathname: '**',
            }, {
                protocol: 'https',
                hostname: 'localhost',
                port: '5000',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: '192.168.1.73',
                port: '5000',
                pathname: '**',
            }
        ],
        domains: ["res.cloudinary.com"]
    },
    reactStrictMode: false,
};

export default nextConfig;