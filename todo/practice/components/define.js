import Vue from 'vue'


// const data={
//   text:0
// }

const component = {
  props:{
    active:{
      type:Boolean,
      required:true,
      //default:false,
      //default是一个对象则需要使用default()
      default(){
        return {}
      },
      validator(value){
        return typeof value==='boolean'
      }
    },
    propOne:String
  },
  template: `
  <div>
    <input type="text" v-model="text">
    <span @click="handlerChange">{{propOne}}</span>
    <span v-show="active">see me if active</span>
  </div>
  `,
  //不要这样修改，会报错，使用事件触发的形式改变数据
  // mounted(){
  //   this.propOne="inner content"
  // }
  // ,
  data(){
    return {
      text:0
    }
  },
  methods:{
    handlerChange(){
      this.$emit("change")
    }
  }
}


// 全局注册组件
//Vue.component('CompOne', component)

new Vue({
  el: '#root',
  components:{
    CompOne:component
  },
  mounted(){
    console.log(this.$refs.comp1)
  },
  data:{
    props1:"props11"
  },
  methods:{
    changeHandler(){
      this.props1+=1;
    }
  },
  template: `
  <div>
    <comp-one ref="comp1" :active="true" :prop-one="props1" @change="changeHandler"></comp-one>
    <comp-one :active="false" propOne="text2-prop"></comp-one>
  </div>
  `
})
