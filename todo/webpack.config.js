const path = require('path')//Node.js path 模块提供了一些用于处理文件路径的小工具
const HTMLPlugin = require('html-webpack-plugin')//插件的基本作用就是生成html文件
const webpack = require('webpack')//引入webpack
const ExtractPlugin = require('extract-text-webpack-plugin')//该插件的主要是为了抽离css样式,防止将样式打包在js中引起页面样式加载错乱

const isDev = process.env.NODE_ENV === 'development'//通过"build":"cross-env NODE_ENV=production webpack --config webpack.config.js",即代码中的NODE_ENV判断当前模式是开发还是产品

const config = {
  target: 'web',
  entry: path.join(__dirname, 'src/index.js'),//入口文件
  output: {
    filename: 'bundle.[hash:8].js',//设置出口文件的文件名
    path: path.join(__dirname, 'dist')//设置出口文件的路径
  },
  module: {//webpack的模组
    rules: [//各种文件的引用规则在这里，webpack单独只能理解js文件，其他的文件全部要不同的loader来帮助webpack解析
      {
        test: /\.vue$/,//匹配符合当前正则的文件
        loader: 'vue-loader'//由这个loader解析为webpack能明白的js代码
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.(gif|svg|jpg|jpeg|png)$/,//可以匹配多种类型的文件交给下面的loader处理
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,//未超过超过这个limit的图片文件会转化为data:64的代码插入页面，
              name: '[name]-aaa.[ext]'//超过的图片会在当前代码处理后以普通图片的形式插入页面
            }
          }
        ]
      }
    ]
  },
  plugins: [//webpack的插件
    new webpack.DefinePlugin({//当前插件允许你创建一个在编译时可以配置的全局常量。这可能会对开发模式和发布模式的构建允许不同的行为非常有用
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"'//
      }
    }),
    new HTMLPlugin()//插件的基本作用就是生成html文件
  ]

}

if (isDev) {
  config.module.rules.push({//向webpack的模组放入新的规则与loader
    test: /\.styl/,
    use: [
      'style-loader',
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
        }
      },
      'stylus-loader'
    ]
  });
  config.devtool = '#cheap-module-eval-source-map',//为了更容易地追踪错误和警告，JavaScript 提供了 source map 功能，将编译后的代码映射回原始源代码
    config.devServer = {
      port: 8000,//webpack-dev-server 的主机
      host: '0.0.0.0',//webpack-dev-server 的端口号
      overlay: {
        errors: true//有错误时回显示在终端上
      },
      hot: true//热模块替换(HMR)/热更新 是否开启
    }
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),//热模块替换(HMR)/热更新 插件
    new webpack.NoEmitOnErrorsPlugin()//在编译出现错误时，使用 NoEmitOnErrorsPlugin 来跳过输出阶段。这样可以确保输出资源不会包含错误
  )
}
else {
  config.entry = {
    app: path.join(__dirname, 'src/index.js'),// 重定向入口文件
    vendor: ['vue']// 将支持库例如Vue 源码单独存储
  }
  config.output.filename = '[name].[chunkhash:8].js'//设置出口文件的文件名
  config.module.rules.push(//
    {
      test: /\.styl/,
      use: ExtractPlugin.extract({//抽离css样式插件的 具体应用
        fallback: 'style-loader',//将下面的传出的css代码转化为.css文件
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
  )
  config.plugins.push(
    new ExtractPlugin('styles.[contentHash:8].css'),//抽离css样式插件的 输出 为 styles.[contentHash:8].css，并为其加上contentHash码
    //CommonsChunkPlugin 插件，是一个可选的用于建立一个独立文件(又称作 chunk)的功能，通过将公共模块拆出来，
    //最终合成的文件能够在最开始的时候加载一次，便存起来到缓存中供后续使用。这个带来速度上的提升
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'//将上面82行定义的支持库抽出，减小业务代码.js文件的大小，因为支持库不经常更新，单独抽出可以作为常用文件缓存于浏览器中，减少网络负载
    }),
    new webpack.optimize.CommonsChunkPlugin({//
      name: 'runtime'//将webpack自身代码抽出为一个单独的.js文件
    })
  )
}
console.log('配置项无误，等待运行!!')
module.exports = config