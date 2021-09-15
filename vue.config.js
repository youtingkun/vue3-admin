/* 配置文件 */
const path = require('path')
const WebpackBar = require('webpackbar')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const title = 'vue3-admin'

module.exports = {
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: true, // 是否开启 eslint 自动校验
  productionSourceMap: false, // 不输出 map 文件，以加速生产环境构建
  devServer: {
    publicPath: '/',
    hot: true,
    port: '8080',
    open: false, // 是否自动打开页面
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/': {
        target: 'http://yapi.youtingkun.com/mock/13', //mock地址
        ws: true,
        pathRewrite: {
          // '^/api/': ''
        },
        changeOrigin: true,
        secure: false
      }
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, 'src/styles/variables.scss'),
        path.resolve(__dirname, 'src/styles/mixins.scss')
      ]
    }
  },
  configureWebpack: () => {
    const config = {
      name: title // 可以在 index.html 中被访问，用来注入页面标题
    }
    if (process.env.NODE_ENV === 'production') {
      ;(config.plugins = [
        new WebpackBar({
          name: title
        }),
        // gzip
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
          threshold: 10240,
          minRatio: 0.8,
          deleteOriginalAssets: false
        })
      ]),
        // 生产环境清除 console.log
        (config.optimization = {
          minimizer: [
            new TerserPlugin({
              terserOptions: {
                mangle: true,
                compress: {
                  warnings: false,
                  drop_console: false,
                  drop_debugger: false,
                  pure_funcs: ['console.log'] // 清除 console.log
                }
              }
            })
          ]
        })
    }
    return config
  },
  chainWebpack: (config) => {
    // 当有很多页面时，它会导致太多毫无意义的请求
    config.plugins.delete('prefetch')
    // 开发环境 sourcemap 不包含列信息
    config.when(process.env.NODE_ENV === 'development', (config) =>
      config.devtool('cheap-source-map')
    )
    // svg
    const dir = path.resolve(__dirname, 'src/icons/svg')
    config.module
      .rule('svg-sprite')
      .test(/\.svg$/)
      .include.add(dir)
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({ extract: false })
      .end()
    config.plugin('svg-sprite').use(require('svg-sprite-loader/plugin')), [{ pluginSprite: true }]
    config.module.rule('svg').exclude.add(dir)
    // 将运行代码单独生成文件
    if (process.env.NODE_ENV !== 'development') {
      config.optimization.runtimeChunk('single')
    }
  }
}
