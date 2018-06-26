import Vue from 'vue'

const component={
  //自定义prop名字，事件名字，使用v-model会自动修改生成的代码
  model:{
    prop:'value1',
    event:'change'
  },
  props:{
    // value:String,
    value1:String
  },
  template:`
  <div>
    <input type="text"
    :value="value1"
    @input="$emit('change',$event.target.value)"
    >
  </div>
  `
  ,
  //直接 写在标签里
  // methods:{
  //   handler(e){
  //     this.$emit('change',e.target.value)
  //   }
  // }
}

new Vue({
  components:{
    CompOne:component
  },
  data(){
    return{
      value:'tttt'
    }
  },
  el:"#root",
  template:`
    <div>
      <comp-one v-model="value"></comp-one>
    </div>
  `,
  //上面使用v-model后实际代码，根据组件的model属性来生成
  // <comp-one
  // :value1="value"
  // @change="value=$event"
  // ></comp-one>

  // methods:{
  //   handler(){
  //     this.value=arguments[0]
  //   }
  // }
})
