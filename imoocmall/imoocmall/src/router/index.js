import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from './../views/GoodsList'
import Title from '../views/Title'
import Image from '../views/Image'
import Cart from '../views/Cart'
import HelloWorld from '../components/HelloWorld'

Vue.use(Router);
export default new Router({
  mode:"hash",
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component:HelloWorld
    },
    {
      path: '/goods',
      name: 'GoodsList',
      components: {
        default:GoodsList,
        'title':Title,
        'img':Image
      },
    },
    {
      path: '/cart/:cartId',
      name: 'cart',
      component: Cart,
    }
  ]
})
