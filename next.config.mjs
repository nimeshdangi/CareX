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
                hostname: '172.29.144.1',
                port: '5000',
                pathname: '**',
            }
        ],
    },
    reactStrictMode: false,
};

export default nextConfig;