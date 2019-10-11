import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';

import packageJson from './package.json';

export default {
  input: 'lib/index.ts',
  output: [
    { file: packageJson.main, format: 'es' },
    { file: packageJson.browser, format: 'amd' },
  ],
  plugins: [
    resolve(),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
  ],
  external: Object.keys(packageJson.peerDependencies),
};
