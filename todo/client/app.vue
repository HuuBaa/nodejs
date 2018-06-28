<template>
    <div id="app">
      <div id="cover"></div>
      <Header></Header>
      <p>{{counter}}<br>{{fullName}}<br></p>
      <router-link to="/app">app</router-link>
      <router-link :to="{name:'login'}">login</router-link>
      <transition :name="transitionName" mode="out-in">
        <router-view />
      </transition>
      <Footer></Footer>
    </div>
</template>

<script>
import {
  mapState,
  mapGetters,
  mapActions,
  mapMutations
} from 'vuex'

import Header from './layout/header.vue'
import Footer from './layout/footer.jsx'
// import Todo from './views/todo/todo.vue'

export default {
  data () {
    return {
      transitionName: 'fade'
    }
  },
  methods: {
    ...mapActions(['updateCountSync']),
    ...mapMutations(['updateCount'])
  },
  computed: {
    // ...mapState(['count']), //vuex同名属性
    ...mapState({
      // counter:'count' // 本组件中变量名 ：vuex变量名
      counter: (state) => state.count
      // 使用a模块的state
      // texta:(state)=>state.a.text
    }),

    ...mapGetters({
      'fullName': 'fullName', // 本组件中变量名 ：vuex变量名
      'textPlus': 'a/textPlus'
    })

    // count(){
    //   return this.$store.state.count
    // }

    // fullName(){
    //   return this.$store.getters.fullName
    // }

    // vuex模块的使用
    // ,texta(){
    //   return this.$store.state.b.text
    // }

  },
  mounted () {
    // console.log(this.$route)
    console.log(this.$store)

    // 使用了vuex的命名空间
    // this['a/updateText']('123')

    // this['a/add']({addtext:'addtext'})
    // this['b/testAction']()

    this.updateCountSync({
      num: 5,
      time: 1000
    })

    // let i=1;
    // setInterval(()=>{
    //   this.updateCount(i++)
    // },1000)

    // 触发actions
    // this.$store.dispatch('updateCountSync',{
    //     num:5,time:2000
    //   })

    // 触发mutation
    // let i=1
    // setInterval(()=>{
    //   this.$store.commit('updateCount',i++)
    // },1000)
  },
  components: {
    Header,
    Footer
    // Todo
  }
}
</script>

<style lang="stylus" scoped>
#app{
  position absolute
  left 0
  right 0
  top 0
  bottom 0
  }
  #cover{
    position absolute
    left 0
    right 0
    top 0
    bottom 0
    background-color #999
    opacity .9
    z-index -1
    }
</style>
