import FilterWarningsPlugin from 'webpack-filter-warnings-plugin';
/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'maps.googleapis.com',
        pathname: '/maps/api/place/photo',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
  webpack: (config) => {
    // Add the FilterWarningsPlugin to Webpack plugins

    config.ignoreWarnings = [
      {
        module: /typeorm/,
        message: /Module not found|dependency is an expression/,
      },
    ];
    return config;
  },
};

export default nextConfig;
