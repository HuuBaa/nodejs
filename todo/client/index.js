import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './app.vue'
import Vuex from 'vuex'

// import './assets/style/test.css'
// import './assets/images/bg.jpeg'
// import './assets/style/test-stylus.styl'

import './assets/style/global.styl'
import createStore from './store/store.js'
import createRouter from './config/router.js'

Vue.use(VueRouter)
Vue.use(Vuex)

const router=createRouter()
const store=createStore()

// store.registerModule({ //动态添加模块
// })

//相当于getter
// store.watch((state)=>state.count+1,(newCount)=>{
//   console.log('new count watched , '+newCount)
// })

//mutation被调用时
// store.subscribe((mutation,state)=>{
//   console.log(mutation.type)
//   console.log(mutation.payload)
// })

//action被调用时
// store.subscribeAction((action,state)=>{
//   console.log(action.type)
//   console.log(action.payload)
// })


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
  store,
  render: (h) => h(App)
}).$mount("#root")
