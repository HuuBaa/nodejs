import Vue from 'vue'

const app=new Vue({
  el:"#root",
  // template:`
  //   <div  v-bind:id="id_name" v-on:click="handleClick">
  //   {{isActive ? 'active' : 'not active'}}<br>
  //   {{arr.join('-')}}<br>
  //   {{Date.now()}}<br>
  //   <p v-html="html"></p>
  //   </div>
  // `
  template:`
  <div>
    <div
    :class="{active:!isActive,active3:!isActive}"
    :style="[styles,styles2]"
    >
      <p v-html="html"></p>
    </div>

    <div
    :class="[!isActive ? 'active1' : '',{active2:!isActive},class_name]"
    >
      <p v-text="">11</p>
    </div>
  </div>
  `
  ,
  data:{
    isActive:false,
    arr:[1,2,3],
    html:"<span>span123</span>",
    id_name:"main",
    class_name:"main_class",
    styles:{
      color:'red',
      appearance:'none'//自动加前缀
    },
    styles2:{
      color:'black'
    }
  },
  computed:{
    getJoinedArr(){
      return arr.join('-')
    }
  },
  methods:{
    handleClick(){
      alert("clicked")
    }
  }
})
