/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    SECRET: process.env.SECRET,
    BASE_API_URL: process.env.BASE_API_URL,
    BASE_STRAPI_URL: process.env.BASE_STRAPI_URL,
    GOOGLE_PUBLIC_ID: process.env.GOOGLE_PUBLIC_ID,
    GOOGLE_SECRET_ID: process.env.GOOGLE_SECRET_ID,
  },
  i18n: {
    /**
     * These are all the locales you want to support
     * in your application
     */
    locales: ['en', 'es'],
    /**
     * This is the default locale you want to be used when
     * visiting a non-locale prefixed path e.g. `/hello`
     */
    defaultLocale: 'es',
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    })
    return config
  },
}
