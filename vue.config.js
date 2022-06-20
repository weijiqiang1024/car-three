const { defineConfig } = require('@vue/cli-service')
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = defineConfig({
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  indexPath: 'index.html',
  // lintOnSave: process.env.NODE_ENV !== 'production', // 开发环境下启用eslint
  runtimeCompiler: false,
  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  productionSourceMap: false,
  transpileDependencies: true,
  configureWebpack: {
    performance: {
      hints: 'warning',
      maxAssetSize: 51200000,
      maxEntrypointSize: 51200000,
      assetFilter: (assetFilename) => {
        return assetFilename.endsWith('.css') || assetFilename.endsWith('.js')
      }
    },
    externals: {
      THREE: 'window.THREE',
    },
  },
  chainWebpack: config => {
    config.entry = ['./src/main.js']
    // 配置别名
    config.resolve.alias
      .set("@", resolve("src"))
      .set("assets", resolve("src/assets"))
  },
   // 代理配置
   devServer: {
    host: 'localhost',
    port: 8080, // 端口号
    https: false, // https:{type:Boolean}
    open: true, // 配置自动启动浏览器  open: 'Google Chrome'-默认启动谷歌
    // 配置单个代理
    // proxy: {
    //   '/api': {
    //     target: 'http://10.5.4.92:8869',
    //     // target: "http://192.168.15.4:9997",
    //     // ws: true, // 代理的WebSockets
    //     changeOrigin: true, // 允许websockets跨域
    //     pathRewrite: {
    //       '^/api': ''
    //     }
    //   }
    // }
  }
})
