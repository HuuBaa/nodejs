//const docsLoader=require('./doc-loader') 自定义loader

module.exports=(isDev)=>{
  return{
    preserveWhitespace:true, //去除.vue文件template里的行末尾空格
    extractCSS:!isDev, //把.vue文件里的style单独打包成css文件
    cssModules:{
      localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]', //自定义.vue组件里的css对应的class/id等名字
      camelCase:true  //驼峰命名 具体例子看 /client/layout/header.vue
    },
    //postcss:
    //hotReload:false vue组件热重载,默认根据环境变量自动生成
    //loaders:{
    //   'docs':docsLoader //为.vue文件的自定义模块，设置自定义解析loader
    //    js:'coffe-loader',
    // }
    //preLoder:{},//系统loader解析前
    //postLoader:{}//系统loader解析后
  }
}
