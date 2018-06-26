const path = require('path')//Node.js path 模块提供了一些用于处理文件路径的小工具
const createVueLoaderOptions=require('./vue-loader.config')

const isDev = process.env.NODE_ENV === 'development'//通过"build":"cross-env NODE_ENV=production webpack --config webpack.config.js",即代码中的NODE_ENV判断当前模式是开发还是产品

const config = {
	target: 'web',
	entry:path.join(__dirname, '../client/index.js'),//入口文件
	output: {
		filename: 'bundle.[hash:8].js',//设置出口文件的文件名
    path: path.join(__dirname, '../dist'),//设置出口文件的路径
    publicPath:'/public/'
	},
	module: {//webpack的模组
		rules: [//各种文件的引用规则在这里，webpack单独只能理解js文件，其他的文件全部要不同的loader来帮助webpack解析
      // {//每次保存，进行自动eslint检查
      //   test: /\.(vue|js|jsx)$/,
      //   loader: 'eslint-loader',
      //   exclude:'/node_modules/',
      //   enforce:'pre' //预处理，优先下面的loader之前处理
      // },
      {
				test: /\.vue$/,//匹配符合当前正则的文件
        loader: 'vue-loader',//由这个loader解析为webpack能明白的js代码
        options:createVueLoaderOptions(isDev)
			},
			{
				test: /\.jsx$/,
				loader: 'babel-loader'
      },
      {
				test: /\.js$/,
        loader: 'babel-loader',
        exclude:'/node_modules/'
			},
			{
				test: /\.(gif|svg|jpg|jpeg|png)$/,//可以匹配多种类型的文件交给下面的loader处理
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 1024,//未超过超过这个limit的图片文件会转化为data:64的代码插入页面，
							name: 'resources/[path][name]-[hash:8].[ext]'//超过的图片会在当前代码处理后以普通图片的形式插入页面
						}
					}
				]
			}
		]
	},
}

module.exports=config
