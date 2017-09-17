import buble from 'rollup-plugin-buble'

export default {
  entry: 'src/index.js',
  plugins: [buble()],
  moduleName: 'xForm',
  targets: [
    { dest: 'dist/xForm.js', format: 'umd' },
    { dest: 'dist/xForm.common.js', format: 'cjs' },
    { dest: 'dist/xForm.esm.js', format: 'es' }
  ]
}
