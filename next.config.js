/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    trailingSlash: true,
    basePath: '/extranet-fxa',
    publicRuntimeConfig: {
        contextPath: '/extranet-fxa',
        uploadPath: process.env.NODE_ENV === 'production' ? '/extranet-fxa/upload.php' : '/api/upload'
    }
};
module.exports = nextConfig;
