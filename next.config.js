/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    trailingSlash: true,
    /* basePath: '/extranet-fxa', */
    publicRuntimeConfig: {
        contextPath: '/',
        uploadPath: process.env.NODE_ENV === 'production' ? '/upload.php' : '/api/upload'
    }
};
module.exports = nextConfig;
