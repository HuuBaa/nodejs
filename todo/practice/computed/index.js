import Vue from 'vue'

const app = new Vue({
  el: '#root',
  template: `
  <div>
    <p>fullname:{{fullName}}</p>
    <p>getname:{{getName()}}</p>
    <p>number:{{number}}</p>
    <p>fname:{{fname}}</p>
    number:<input type="text" v-model="number"><br>
    firstName：<input type="text" v-model="firstName"><br>
    lastName：<input type="text" v-model="lastName"><br>
    obj.a：<input type="text" v-model="obj.a"><br>
  </div>
  `,
  data: {
    firstName: 'hu',
    lastName: 'bang',
    fname: '',
    number: 0,
    obj: {
      a: 1
    }
  },
  methods: {
    // 其他变量改变时会重新计算，重新渲染就会重新计算
    getName () {
      console.log('new name')
      return this.firstName + ' ' + this.lastName
    }
  },

  watch: {
    // 监听this.firstName的变化
    firstName (newName, oldName) {
      this.fname = newName + ' ' + this.lastName
    },
    // 监听this.lastName的变化
    lastName: {
      handler (newName, oldName) {
        this.fname = this.firstName + ' ' + newName
      },
      immediate: false// 马上执行一次该方法
    },

    obj: {
      handler () {
        // this.obj.a++; //！！！不要修改监听的值！！！！
        console.log('obj.a changed')
      },
      deep: true // 监听对象内部所有属性
    },
    // 或者，直接监听obj的属性
    'obj.a': {
      handler () {
        console.log('obj.a changed')
      }
    }
  },
  computed: {
    // 其他变量改变时不会重新计算，依赖值变化才会重新计算
    fullName () {
      console.log('new full')
      return this.firstName + ' ' + this.lastName
    }
    // name:{
    //  //取name值时触发
    //   get(){
    //     console.log("new full")
    //     return this.firstName+' '+this.lastName
    //   },
    //   设置name值时触发
    //   set(name){
    //     const names=name.split(' ')
    //     this.firstName=names[0]
    //     this.lastName=names[1]
    //   }
    // }
  }
})
