import Vue from 'vue'

const component={
  name:'comp',
  props:['props1'],
  // template:`
  // <div :style="style">
  //   <slot name="huu"></slot>
  //   <p>{{props1}}</p>
  // </div>
  // `,
  render(h){
    return h('div',{
        style:this.style,
        // on:{
        //   click:()=>{this.$emit('click')}
        // }
      },
        //this.$slots.default 默认插槽
        //命名插槽
        [
          this.$slots.huu,
          h('p',{},this.props1)
        ]
      )
  },
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
  components:{
    CompOne:component
  },
  methods:{
    clickHandler(){
      console.log('clicked')
    }
  },
  // template:`
  //   <comp-one ref="comp1" props1="prop1s-val">
  //     <span slot="huu">{{value}}</span>
  //   </comp-one>
  // `,
  render(h){
    return h('comp-one',{
      ref:'comp1',
      props:{
        props1:'prop1s-val'
      },
      //需要自行emit触发
      // on:{
      //   click:this.clickHandler
      // }
      //自动绑定到组件的根节点
      nativeOn:{
        click:this.clickHandler
      }
    },[
      h('span',{
        //命名插槽名字
        slot:'huu',
        domProps:{
          innerHTML:'<span>domProps</span>'
        },
        attrs:{
          id:'test-id'
        }
      },this.value)
    ])
  },
  data(){
    return{
      value:'vue-value'
    }
  }
})
