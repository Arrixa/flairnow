const { hostname } = require('os');
const { PrismaPlugin } = require('@prisma/nextjs-monorepo-workaround-plugin')

/** @type {import('next').NextConfig} */
const nextConfig = {}

// module.exports = nextConfig

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
      },
    ],
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {

    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()]
    }
    // Exclude handlebars from bundling
    config.externals = config.externals || {};
    config.externals.handlebars = 'commonjs handlebars';

    // Add a custom Handlebars loader
    config.module.rules.push({
      test: /\.hbs$/,
      use: 'handlebars-loader',
    });

    config.module.rules.push({
      test: /\.html$/,
      exclude: /node_modules/,
      use: 'raw-loader', // or any other loader you prefer
    });

    if (!isServer) {
      // Exclude @mapbox/node-pre-gyp from client-side bundle
      config.resolve.alias['@mapbox/node-pre-gyp'] = false;
      // Exclude modules causing 'fs' module issues in the browser
      config.resolve.alias.fs = false;
      config.resolve.alias.child_process = false;
      config.resolve.alias.net = false;
      config.resolve.alias.tls = false;
      config.resolve.alias.dns = false;
    }

    if (isServer) {
      config.externals.push('nodemailer');
    }

    return config;
  },
};