import pkg from './package.json'
import typescript from '@rollup/plugin-typescript'

export default {
  input: './src/index.ts',
  plugins: [
    typescript()
  ],
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'esm',
      sourcemap: true,
    },
  ],
}