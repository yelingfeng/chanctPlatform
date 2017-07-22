import buble from 'rollup-plugin-buble'

export default {
  entry: 'src/index.js',
  plugins: [buble()],
  moduleName: 'chanctForm',
  targets: [
    { dest: 'dist/chanctForm.js', format: 'umd' },
    { dest: 'dist/chanctForm.common.js', format: 'cjs' },
    { dest: 'dist/chanctForm.esm.js', format: 'es' }
  ]
}
