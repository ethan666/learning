module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
      'import',
      {
        libraryName: 'antd-mobile-vue',
        libraryDirectory: 'es',
        style: true
      },
      'antd-mobile-vue'
    ]
  ]
}
