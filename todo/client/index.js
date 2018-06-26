import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './app.vue'

// import './assets/style/test.css'
// import './assets/images/bg.jpeg'
// import './assets/style/test-stylus.styl'

import './assets/style/global.styl'

Vue.use(VueRouter)
import createRouter from './config/router.js'
const router=createRouter()

//导航守卫
router.beforeEach((to,from,next)=>{
  console.log('beforeEach')
  next()
  //next('/login') //验证登录...
  //next({path:'login',replace:ture,name='login'})
})

router.beforeResolve((to,from,next)=>{
  console.log('beforeResolve')
  next()
})

router.afterEach((to,from)=>{
  console.log('afterEach')
})

new Vue({
  router,
  render: (h) => h(App)
}).$mount("#root")
