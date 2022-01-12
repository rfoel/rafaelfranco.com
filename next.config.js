module.exports = {
  images: {
    domains: ['user-images.githubusercontent.com'],
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.resolve.fallback = {
          net: false,
        }
      }
      return config
    },
  },
}
