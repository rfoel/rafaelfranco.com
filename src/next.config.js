module.exports = {
  env: {
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    DOMAIN_NAME: process.env.DOMAIN_NAME,
    PERSONAL_ACCESS_TOKEN: process.env.PERSONAL_ACCESS_TOKEN,
    REGION: process.env.REGION,
    SECRET_COOKIE_PASSWORD: process.env.SECRET_COOKIE_PASSWORD,
    STAGE: process.env.STAGE,
  },
  // eslint-disable-next-line @typescript-eslint/require-await
  async rewrites() {
    return [
      {
        source: '/bee.js',
        destination: 'https://cdn.splitbee.io/sb.js',
      },
      {
        source: '/_hive/:slug',
        destination: 'https://hive.splitbee.io/:slug',
      },
    ]
  },
}
