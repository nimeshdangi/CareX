/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '5000',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: '192.168.18.188',
                port: '5000',
                pathname: '**',
            }
        ],
    },
    reactStrictMode: false,
};

export default nextConfig;