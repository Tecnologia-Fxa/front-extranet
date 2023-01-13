/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    trailingSlash: true,
    basePath: process.env.NODE_ENV === 'production' ? '/extranet-fxa' : '/extranet-fxa',
    publicRuntimeConfig: {
        contextPath: process.env.NODE_ENV === 'production' ? '/extranet-fxa' : '/extranet-fxa',
        uploadPath: process.env.NODE_ENV === 'production' ? '/extranet-fxa/upload.php' : '/api/upload'
    }
};
module.exports = nextConfig;
