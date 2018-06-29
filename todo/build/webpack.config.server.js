const path = require('path')//Node.js path 模块提供了一些用于处理文件路径的小工具
const webpack = require('webpack')//引入webpack
const merge=require('webpack-merge')
const ExtractPlugin = require('extract-text-webpack-plugin')
const VueServerPlugin=require('vue-server-renderer/server-plugin')

let config;
const baseConfig=require('./webpack.config.base.js')

  config=merge(baseConfig,{
    target:'node',
    entry:path.join(__dirname, '../client/server-entry.js'),
    output:{
      libraryTarget:'commonjs2',//export的方式 moudle.exports
      filename:'server-entry.js',
      path:path.join(__dirname,'../server-build')
    },
    externals:Object.keys(require('../package.json').dependencies),//不需要打包到bundle中
    module:{
      rules:[
        {
          test: /\.styl/,
          use: ExtractPlugin.extract({//抽离css样式插件的 具体应用
            fallback: 'vue-style-loader',//将下面的传出的css代码转化为.css文件
            use: [//.styl文件经过处理后转化为css代码
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true,
                }
              },
              'stylus-loader'
            ]
          })
        }
      ]
    },
    devtool:'source-map',//为了更容易地追踪错误和警告，JavaScript 提供了 source map 功能，将编译后的代码映射回原始源代码
    plugins:[
      new ExtractPlugin('styles.[contentHash:8].css'),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV':JSON.stringify(process.env.NODE_ENV || 'development'),
        'process.env.VUE_ENV':'"server"'
      }),
      //输出的是json文件，可以设置输出名字
      new VueServerPlugin()
    ]
  })

module.exports=config
