/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: '/external-auth',
  env: {
    BASEPATH: '/external-auth',
  }
}

module.exports = nextConfig
