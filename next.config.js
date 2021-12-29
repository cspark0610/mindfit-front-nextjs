/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: ['cdn.pixabay.com'],
  },
  reactStrictMode: true,
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
}
