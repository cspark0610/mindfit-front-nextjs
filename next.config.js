/** @type {import('next').NextConfig} */

module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    })
    return config
  },
  webpackDevMiddleware: (config) => {
    return config
  },
  reactStrictMode: true,
  env: {
    NEXTAUTH_URL:
      process.env.NODE_ENV !== 'production'
        ? 'http://localhost:3000'
        : process.env.NEXTAUTH_URL,
    SECRET: process.env.SECRET,
  },
}
