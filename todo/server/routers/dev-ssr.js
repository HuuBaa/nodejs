const Router=require('koa-router')
const axios=require('axios')
const MemoryFS=require('memory-fs')
const fs=require('fs')
const webpack=require('webpack')
const VueServerRenderer=require('vue-server-renderer')
const path=require('path')
const serverConfig=require('../../build/webpack.config.server')

const serverCompiler=webpack(serverConfig)
const mfs=new MemoryFS()
serverCompiler.outputFileSystem=mfs

let bundle
//使用watch,修改文件后重新打包
serverCompiler.watch({},(err,stats)=>{
  if(err) throw err  //打包错误
  stats=stats.toJson() //包含eslint错误
  stats.errors.forEach(err => console.log(err))
  stats.warnings.forEach(err => console.log(err))

  const bundlePath=path.join(
    serverConfig.output.path,
    'vue-ssr-server-bundle.json'
  )
  bundle=JSON.parse(mfs.readFileSync(bundlePath,'utf-8')) //读取生成的bundle

})

const handleSSR=async (ctx)=>{
  if(!bundle){
    ctx.body="稍等..."
    return
  }

  //client.js
  const clientManifestResp=await axios.get(
    'http://127.0.0.1/vue-ssr-client-manifest.json'
  )
  const clientManifest=clientManifestResp.data

  const template=fs.readFileSync(
    path.join(__dirname,'../server.template.ejs')
  )

  const renderer=VueServerRenderer
    .createBundleRenderer(bundle,{
      inject:false,
      clientManifest //会自动生成script标签
    })
}
