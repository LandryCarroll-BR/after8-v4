const { withFaust, getWpHostname } = require('@faustwp/core');

/**
 * @type {import('next').NextConfig}
 **/
module.exports = withFaust({
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'after8stg.wpengine.com',
        port: '',
        pathname: '/wp-content/uploads/**/*',
      },
      {
        protocol: 'https',
        hostname: 'after8.wpengine.com',
        port: '',
        pathname: '/wp-content/uploads/**/*',
      },
    ],
  },
});
