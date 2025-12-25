const { withContentlayer } = require('next-contentlayer2');

/**
 * @type {import('next/dist/next-server/server/config').NextConfig}
 **/
module.exports = withContentlayer({
  output: 'export', // Set to static export
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  images: {
    unoptimized: true, // Required for static export
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: [
                {
                  name: 'prefixIds',
                  params: {
                    delim: '__',
                    prefixIds: true,
                    prefixClassNames: true,
                  },
                },
              ],
            },
          },
        },
      ],
    });

    return config;
  },
});
