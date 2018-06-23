const path = require('path')//Node.js path 模块提供了一些用于处理文件路径的小工具
const HTMLPlugin = require('html-webpack-plugin')//插件的基本作用就是生成html文件
const webpack = require('webpack')//引入webpack
const merge=require('webpack-merge')

let config;
const baseConfig=require('./webpack.config.base.js')
const defaultPlugins= [//webpack的插件
		new webpack.DefinePlugin({//当前插件允许你创建一个在编译时可以配置的全局常量。这可能会对开发模式和发布模式的构建允许不同的行为非常有用
			'process.env': {
				NODE_ENV:'"development"'
			}
		}),
		new HTMLPlugin({
        template:path.join(__dirname,'./template.html')
      }
    )//插件的基本作用就是生成html文件
	]

  config=merge(baseConfig,{
    entry:path.join(__dirname, '../practice/index.js'),
    module:{
      rules:[
        {//向webpack的模组放入新的规则与loader
          test: /\.styl/,
          use: [
            'vue-style-loader',
            // 'css-loader',
            {
              loader:'css-loader',
              options:{
                module:true, //开启cssmodule 具体看 /client/layout/footer.jsx
                localIdentName: '[path]-[name]-[hash:base64:5]'
              }
            },
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
			port: 8080,//webpack-dev-server 的主机
			host: '0.0.0.0',//webpack-dev-server 的端口号
			overlay: {
				errors: true//有错误时回显示在终端上
      },
      hot:true//热模块替换(HMR)/热更新 是否开启
    },
    resolve:{
      // import Vue from 'vue',指定vue文件
        alias:{
          'vue':path.join(__dirname,'../node_modules/vue/dist/vue.esm.js')
        }
    },
    plugins:defaultPlugins.concat([
      new webpack.HotModuleReplacementPlugin(),//热模块替换(HMR)/热更新 插件
      new webpack.NoEmitOnErrorsPlugin()//在编译出现错误时，使用 NoEmitOnErrorsPlugin 来跳过输出阶段。这样可以确保输出资源不会包含错误
    ])
  })

module.exports=config
