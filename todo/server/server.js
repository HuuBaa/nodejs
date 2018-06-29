const Koa=require('koa')

const app=new Koa()

const isDev = process.env.NODE_ENV === 'development'
const staticRouter=require('./routers/static')

app.use(async (ctx,next)=>{
  try {
    console.log(`request with path ${ctx.path}`)
    await next()
  } catch (error) {
    console.log(error)
    ctx.status=500
    if(isDev){
      ctx.body=error.message
    }else{
      ctx.body='请稍后重试!'
    }
  }
})

app.use(staticRouter.routes()).use(staticRouter.allowedMethods())

let pageRouter
if (isDev){
  pageRouter=require('./routers/dev-ssr')
}else{
  pageRouter=require('./routers/ssr')
}

app.use(pageRouter.routes()).use(pageRouter.allowedMethods())

const HOST=process.env.HOST||'0.0.0.0'
const PORT=process.env.PORT||'3333'

app.listen(PORT,HOST,()=>{
  console.log(`server is listening on ${HOST}:${PORT}`)
})



