import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  noExternal: ['@usermap/sdk-core'], // bundle this
  external: ['react', 'react-native', 'react-native-svg'], // keep these external
});
