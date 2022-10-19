/* eslint-disable @typescript-eslint/no-var-requires */
import { defineConfig, InlineConfig } from 'vite';

const compress = require('vite-plugin-compression');
const solid = require('vite-plugin-solid');

const enableCompress = !!process.env.ENABLED_COMPRESSION;

//* https://vitejs.dev/config/
const baseConfig: InlineConfig = {
  plugins: [solid({ ssr: true })],
  root: '',
};

const buildConfig = defineConfig({
  ...baseConfig,
  plugins: [
    ...baseConfig.plugins,
    enableCompress && compress({ verbose: true, algorithm: 'brotliCompress' }),
    enableCompress && compress({ verbose: true, algorithm: 'gzip' }),
  ],
});

const SSRConfig: InlineConfig = {
  ...baseConfig,
  server: { middlewareMode: true },
  appType: 'custom',
  ssr: {
    external: ['reflect-metadata'],
  },
};

//* SSR config used inside the application to create server-side-rendering middleware
export const server = SSRConfig;

//* Vite config used to build for production
export default buildConfig;
