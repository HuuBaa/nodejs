const path = require('path')//Node.js path 模块提供了一些用于处理文件路径的小工具
const HTMLPlugin = require('html-webpack-plugin')//插件的基本作用就是生成html文件
const webpack = require('webpack')//引入webpack
const ExtractPlugin = require('extract-text-webpack-plugin')//该插件的主要是为了抽离css样式,防止将样式打包在js中引起页面样式加载错乱
const merge=require('webpack-merge')

const isDev = process.env.NODE_ENV === 'development'//通过"build":"cross-env NODE_ENV=production webpack --config webpack.config.js",即代码中的NODE_ENV判断当前模式是开发还是产品
const baseConfig=require('./webpack.config.base.js')
let config;

const defaultPlugins= [//webpack的插件
		new webpack.DefinePlugin({//当前插件允许你创建一个在编译时可以配置的全局常量。这可能会对开发模式和发布模式的构建允许不同的行为非常有用
			'process.env': {
				NODE_ENV: isDev ? '"development"' : '"production"'//
			}
		}),
		new HTMLPlugin({
      template:path.join(__dirname,'./template.html')
    })//插件的基本作用就是生成html文件
	]

if (isDev) {
  config=merge(baseConfig,{
    module:{
      rules:[
        {//向webpack的模组放入新的规则与loader
          test: /\.styl/,
          use: [
            'vue-style-loader',
             'css-loader',
            // {
            //   loader:'css-loader',
            //   options:{
            //     module:true, //开启cssmodule 具体看 /client/layout/footer.jsx
            //     localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]'
            //   }
            // },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
              }
            },
            'stylus-loader'
          ]
        }
      ]
    },
    devtool:'#cheap-module-eval-source-map',//为了更容易地追踪错误和警告，JavaScript 提供了 source map 功能，将编译后的代码映射回原始源代码
    devServer:{
			port: 8000,//webpack-dev-server 的主机
			host: '0.0.0.0',//webpack-dev-server 的端口号
			overlay: {
				errors: true//有错误时回显示在终端上
      },
      //解决手动刷新页面无法访问
      historyApiFallback:{
        index:'/public/index.html'
      },
			hot: true//热模块替换(HMR)/热更新 是否开启
    },
    plugins:defaultPlugins.concat([
      new webpack.HotModuleReplacementPlugin(),//热模块替换(HMR)/热更新 插件
      new webpack.NoEmitOnErrorsPlugin()//在编译出现错误时，使用 NoEmitOnErrorsPlugin 来跳过输出阶段。这样可以确保输出资源不会包含错误
    ])
  })

}else {
  config=merge(baseConfig,{
    entry:{
      app:path.join(__dirname, '../client/index.js'),// 重定向入口文件
      vendor:['vue']// 将支持库例如Vue 源码单独存储
    },
    output:{
      filename:'[name].[chunkhash:8].js'//设置出口文件的文件名
    },
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
        },
      ]
    },
    plugins:defaultPlugins.concat([
      new ExtractPlugin('styles.[contentHash:8].css'),//抽离css样式插件的 输出 为 styles.[contentHash:8].css，并为其加上contentHash码
      //CommonsChunkPlugin 插件，是一个可选的用于建立一个独立文件(又称作 chunk)的功能，通过将公共模块拆出来，
      //最终合成的文件能够在最开始的时候加载一次，便存起来到缓存中供后续使用。这个带来速度上的提升
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'//将上面82行定义的支持库抽出，减小业务代码.js文件的大小，因为支持库不经常更新，单独抽出可以作为常用文件缓存于浏览器中，减少网络负载
      }),
      new webpack.optimize.CommonsChunkPlugin({//
        name: 'runtime'//将webpack自身代码抽出为一个单独的.js文件
      })
    ])
  })
}

console.log('配置项无误，等待运行!!')
module.exports = config
