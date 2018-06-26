import Vue from 'vue'

const childComponent={
  template:`
  <div>this is child-comp  parent-provide::{{data.value}}</div>
  `,
  //引用父级数据
  inject:['yeye','data'],
  mounted() {
    console.log(`parent: ${this.$parent.$options.name}`)
    console.log(`yeye: ${this.yeye.$options.name} vlaue:${this.data.value}`)
  },
}

const component={
  name:'comp',
  components:{
    childComponent
  },
  template:`
  <div :style="style">
    //命名插槽
    <slot name="header"></slot>
    <slot name="body"></slot>
    //作用域插槽，调用插件时可以使用组件内部定义的变量
    <slot name="val-test" aaa="aaa" :value="value"></slot>
    //子组件
    <child-component/>
  </div>
  `,
  data(){
    return{
      style:{
        height:'300px',
        width:'400px',
        border:'1px solid #aaa'
      },
      value:'comp-value'
    }
  }

}

new Vue({
  el:"#root",
  name:"Root",
  //给子级提供数据
  provide(){
    //实现跨级组件数据双向绑定
    const data={}
    Object.defineProperty(data,'value',{
      //子级组件调用data.value实际调用的是get方法
      get:()=>this.value,
      enumerable:true
    })
    return{
      //给子级提供vue实例
      'yeye':this,
      data
    }

  },
  components:{
    CompOne:component
  },
  template:`
  <div>
    <comp-one>
      <p slot="header">this slot header</p>
      <p slot="body">this slot body</p>
      <p slot="val-test" slot-scope="props">{{value}} <br>{{props.aaa}}<br> {{props.value}}</p>
    </comp-one>
    <input type="text" v-model="value">
  </div>
  `,
  data(){
    return{
      value:'vue-value'
    }
  }
})
