/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // domains: [
        //     'raw.githubusercontent.com'
        // ],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*.githubusercontent.com',
                port: '',
                pathname: '**',
            },
            
        ],
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/posts',
                permanent: true,
            },
        ]
    },
}

module.exports = nextConfig
