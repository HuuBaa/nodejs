import routes from './routes.js'
import VueRouter from 'vue-router'

export default () => {
  return new VueRouter({
    routes,
    mode: 'history', // url模式切换
    // base:'/base/'   //url前缀
    // linkExactActiveClass:'', //为当前路径的a标签添加class，精准匹配
    // linkActiveClass:'',
    scrollBehavior (to, from, savedPosition) { // 路由跳转时，滚动条行为设置
      // savedPosition是保存的滚动条位置，to、from是路由对象
      if (savedPosition) {
        return savedPosition
      } else {
        return {x: 0, y: 0}
      }
    },
    fallback: true// 浏览器不支持history的mode时，自动使用hash
    // parseQuery(query){
    //   //查询字符串转换成对象 string=>object
    // },
    // stringifyQuery(obj){
    //   //与上面相反
    // }
  })
}
