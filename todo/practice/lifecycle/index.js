import Vue from 'vue'

const app=new Vue({
  el: '#root',
  //没有的话,使用render,继续没有,就把el的outerHTML编译成模板
  //template: '<div>{{text}} temp</div>',
  data: {
    text: 0
  },
  beforeCreate () {
    console.log(this.$el, 'beforeCreate')
  },
  created () {
    console.log(this.$el, 'created')
  },
  //$el是原来的el
  beforeMount () {
    console.log(this.$el, 'beforeMount')
  },
  //渲染函数
  render(h){
    //throw new TypeError(" render error")
    console.log('render')
    return h('div',{},this.text)
  } ,
  //模板已经挂载到el上，覆盖了el
  mounted () {
    console.log(this.$el, 'mounted')
  },
  //数据更新时
  beforeUpdate () {
    console.log(this, 'beforeUpdate')
  },
  updated() {
    console.log(this, 'updated')
  },
  activated () {
    console.log(this, 'activated')
  },
  deactivated () {
    console.log(this, 'deactivated')
  },
  beforeDestroy () {
    console.log(this, 'beforeDestroy')
  },
  destroyed () {
    console.log(this, 'destroyed')
  },

  //开发环境&&本组件的渲染error，才会被调用
  renderError(h,err){
    return h('div',{},err.stack)
  },
  //正式环境，会向上冒泡，子组件也可捕获
  errorCaptured(){

  }
})

// setInterval(()=>{
//   app.text=app.text+1
// },1000)

// setTimeout(()=>{
//   app.$destroy()
// },1000)
