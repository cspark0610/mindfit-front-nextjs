/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  /**
   * environments variables
   */
  env: {
    SECRET: process.env.SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    BASE_API_URL: process.env.BASE_API_URL,
    BASE_STRAPI_URL: process.env.BASE_STRAPI_URL,
    GOOGLE_PUBLIC_ID: process.env.GOOGLE_PUBLIC_ID,
    GOOGLE_SECRET_ID: process.env.GOOGLE_SECRET_ID,
    NEXT_PUBLIC_STRAPI_TOKEN: process.env.NEXT_PUBLIC_STRAPI_TOKEN,
  },
  images: {
    /**
     * strapi domain
     */
    domains: [
      'd1ogzn4icpoye1.cloudfront.net',
      'mindfit-core.s3.amazonaws.com',
      'd13kzb9dg323t3.cloudfront.net',
    ],
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
  /**
   * Webpack extension for support gql files
   */
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    })
    return config
  },
}
