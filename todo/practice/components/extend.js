import Vue from 'vue'

const component = {
  props:{
    active:Boolean,
    propOne:String
  },
  template: `
  <div>
    <input type="text" v-model="text">
    <span @click="handlerChange">{{propOne}}</span>
    <span v-show="active">see me if active</span>
  </div>
  `,
  data(){
    return {
      text:0
    }
  },
  mounted() {
    console.log('comp mounted')
  },
  methods:{
    handlerChange(){
      this.$emit("change")
    }
  }
}

const component2={
  //parent:parent 无法指定parent，渲染时自动自动
  extends:component, //继承组件
  data(){ //可以覆盖继承的属性
    return{
      text:1
    }
  },
  mounted() {
    console.log('comp2 mounted')
    console.log(this.$parent.$options.name) //查看父组件
    //this.$parent.text+=1 修改父组件的数据，尽量不要使用
  }
}

const par=new Vue({
  name:"parent",
})

new Vue({
  parent:par, //可以指定parent
  name:"Root",
  el:"#root",
  components:{
    Comp:component2
  },
  template:`<comp></comp>`,
  mounted() {
    console.log(this.$parent.$options.name) //查看父组件
  }
})

//第二种继承方法
// const CompVue=Vue.extend(component)

// new CompVue({
//   el:"#root",
//   propsData:{
//     propOne:'xxx',
//     active:true
//   },
//   data:{
//     text:123
//   },
//   mounted() {
//     console.log('instance mounted')
//   }
// })
