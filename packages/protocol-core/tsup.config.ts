import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'abis/index': 'src/abis/index.ts',
    'constants/index': 'src/constants/index.ts',
  },
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  splitting: false,
  treeshake: true,
  minify: false,
  external: ['viem'],
  platform: 'neutral',
  target: 'es2022',
  outDir: 'dist',
});
