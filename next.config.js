module.exports = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 's3.eu-west-1.amazonaws.com',
                port: '',
                pathname: '/gis-development/**',
            },
            {
                protocol: 'https',
                hostname: 's3.eu-west-1.amazonaws.com',
                port: '',
                pathname: '/gis-production-eu/**',
            },
        ],
    },
    experimental: {
        serverActions: {
            allowedOrigins: ['impact-beta.aiesec.org', '*.impact-beta.aiesec.org'],
        },
    },
}
