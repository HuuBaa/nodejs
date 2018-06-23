import Vue from 'vue'

const app = new Vue({
  // el: '#root',
  template: '<div ref="div">{{text}} {{obj.a}}</div>',
  data: {
    text: 0,
    obj: {}
  }
  // watch: {
  //   text(newText , old){
  //     console.log(`${newText}:${old}`)
  //   }
  // }
})

app.$mount('#root')

app.text = 0

// let i = 0
setInterval(() => {
  // i++;
  // app.$set(app.obj,'a',i)
  // app.$delete()

  // 或者使用强制更新
  // app.obj.a=i;
  // app.$forceUpdate()

  // app.text+=1;
}, 1000)

// console.log(app.$root === app) //true
// console.log(app.$data)
// console.log(app.$props) //父组件传过来的数据
// console.log(app.$el)  //挂载的节点
// console.log(app.$options) //new Vue实例时的参数对象+默认值

// //重新渲染时生效
// app.$options.render=(h)=>{
//   return h('div',{},'new render func')
// }

// console.log(app.$children) //组件下 标签

// //插槽
// console.log(app.$slots)
// console.log(app.$scopedSlots)

// console.log(app.$refs) //快速定位到模板ref=""中的(html节点对象/组件实例vue实例)
// console.log(app.$isServer)//服务端渲染时使用

// 返回注销方法，需要自己注销 unWatch()
// const unWatch=app.$watch('text', (newText , old)=> {
//   console.log(`${newText}:${old}`)
// })

// app.$on('test',(...rest)=>{
//   console.log(`test emit ${rest} `)
// })

// app.$once('test',(...rest)=>{
//   console.log(`test emit ${rest} `)
// })

// setInterval(()=>{app.$emit('test',1,2)},1000)

// app.$forceUpdate() //强制渲染

// app.$nextTick(callback)  //在vue下一次更新dom时执行回调函数
