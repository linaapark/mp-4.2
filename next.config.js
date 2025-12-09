/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "www.artic.edu",
                pathname: "/iiif/2/**",
            },
            {
                protocol: "https",
                hostname: "img.artsearch.io",
                pathname: "/**",
            },
        ],

    },
};

export default nextConfig;
