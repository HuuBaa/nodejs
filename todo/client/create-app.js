//服务端每次渲染都需要一个新的app
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from './app.vue'
import Meta from 'vue-meta'

import './assets/style/global.styl'
import createStore from './store/store.js'
import createRouter from './config/router.js'
import Notification from './components/notification'

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(Meta)
Vue.use(Notification)

export default () => {
  const router = createRouter()
  const store = createStore()

  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })

  return { app, router, store }
}


