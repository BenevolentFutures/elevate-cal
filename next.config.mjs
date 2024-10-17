import { startScheduler } from './scripts/scheduler.js';
import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
        ],
      },
    ];
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    console.log('Webpack config is being generated');
    console.log('Current directory:', process.cwd());
    console.log('Is server:', isServer);
    console.log('Is dev:', dev);

    // Function to safely stringify objects, handling BigInt
    const safeStringify = (obj) => {
      return JSON.stringify(obj, (key, value) =>
        typeof value === 'bigint'
          ? value.toString()
          : value
      );
    };

    // Log specific parts of the config
    console.log('Entry:', safeStringify(config.entry));
    console.log('Output path:', config.output.path);
    console.log('Resolve modules:', safeStringify(config.resolve.modules));
    console.log('Plugins:', config.plugins.map(p => p.constructor.name));

    // Check if config.entry is a function
    if (typeof config.entry === 'function') {
      console.log('config.entry is a function');
      config.entry().then(entry => {
        console.log('Resolved entry:', safeStringify(entry));
      }).catch(err => {
        console.error('Error resolving entry:', err);
      });
    } else {
      console.log('config.entry is not a function:', typeof config.entry);
    }

    // Add a custom plugin to log file resolutions
    config.plugins.push({
      apply: (compiler) => {
        compiler.hooks.normalModuleFactory.tap('LogResolutions', (nmf) => {
          nmf.hooks.afterResolve.tap('LogResolutions', (result) => {
            if (result) {
              console.log('Resolved:', result.request, 'to', result.resource);
            }
          });
        });
      }
    });

    return config;
  },
  // Add onDemandEntries configuration
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },
};

// Start the scheduler when the Next.js server starts
if (process.env.NODE_ENV !== 'development') {
  startScheduler();
}

export default nextConfig;
