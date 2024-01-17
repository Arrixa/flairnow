/** @type {import('next').NextConfig} */
const nextConfig = {}

// module.exports = nextConfig

module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Add a custom Handlebars loader
    config.module.rules.push({
      test: /\.hbs$/,
      use: 'handlebars-loader',
    });

    return config;
  },
};