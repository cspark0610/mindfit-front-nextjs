/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    NEXTAUTH_URL:
      process.env.NODE_ENV !== 'production'
        ? 'http://localhost:3000'
        : process.env.NEXTAUTH_URL,
    SECRET: process.env.SECRET,
  },
}
