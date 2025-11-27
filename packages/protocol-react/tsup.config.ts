import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'hooks/index': 'src/hooks/index.ts',
    'components/index': 'src/components/index.ts',
  },
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  splitting: false,
  treeshake: true,
  minify: false,
  external: ['react', 'react-dom', 'wagmi', '@tanstack/react-query', 'viem', '@protocol/core'],
  platform: 'browser',
  target: 'es2022',
  outDir: 'dist',
  esbuildOptions(options) {
    options.jsx = 'automatic';
  },
});
