import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';

import packageJson from './package.json';

export default {
  input: 'lib/index.tsx',
  output: [
    { file: packageJson.main, format: 'es' },
    { file: packageJson.browser, format: 'amd' },
  ],
  plugins: [
    resolve({
      exclude: 'node_modules/**',
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
  ],
  treeshake: false,
  external: Object.keys(packageJson.peerDependencies),
};
