/** @type {import('next').NextConfig} */
const nextConfig = {}

// module.exports = nextConfig

module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Exclude handlebars from bundling
    config.externals = config.externals || {};
    config.externals.handlebars = 'commonjs handlebars';

    // Add a custom Handlebars loader
    config.module.rules.push({
      test: /\.hbs$/,
      use: 'handlebars-loader',
    });

    return config;
  },
};