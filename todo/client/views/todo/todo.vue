<template>
  <section class="real-app">
    <input
      type="text"
      class="add-input"
      autofocus="autofocus"
      placeholder="接下去要做什么?"
      @keyup.enter="addTodo"
    >
    <Item
     :todo="todo"
      v-for="todo in filteredTodos"
      :key="todo.id"
      @del="deleteTdodo"
    />
    <Tabs
    :filter="filter"
    :todos="todos"
    @toggle="toggleFilter"
    @clearAllCompleted="clearAllCompleted"
    ></Tabs>
    <!-- <router-view></router-view> -->
  </section>
</template>

<script>
import Item from './item.vue'
import Tabs from './tabs.vue'
let id = 0

// beforeEach
// routes beforeEnter
// Todo beforeRouteEnter
// beforeResolve
// afterEach
// Todo mounted

export default {
  beforeRouteEnter (to, from, next) {
    console.log('Todo beforeRouteEnter')
    next(vm => { // vm为本组件的vue实例
      // console.log(vm)
    })
  },
  beforeRouterUpdate (to, from, next) { // 同一个组件在不同的路由下跳转 mounted不会触发，可以使用该方法
    console.log('Todo befotRouterUpdate')
    next()
  },
  beforeRouteLeave (to, from, next) {
    console.log('Todo beforeRouteLeave')
    // if(global.confirm('are you sure')){ //离开前的确认
    //   next()
    // }
    next()
  },
  data () {
    return {
      todos: [],
      filter: 'all'
    }
  },
  props: ['id'],
  mounted () {
    console.log('Todo mounted')
  },
  components: {
    Item,
    Tabs
  },
  computed: {
    filteredTodos () {
      if (this.filter === 'all') {
        return this.todos
      }
      const completed = this.filter === 'completed'
      return this.todos.filter(todo => completed === todo.completed)
    }
  },
  methods: {
    addTodo (e) {
      this.todos.unshift({
        id: id++,
        content: e.target.value.trim(),
        completed: false
      })
      e.target.value = ''
    },
    deleteTdodo (id) {
      this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1)
    },
    toggleFilter (state) {
      this.filter = state
    },
    clearAllCompleted () {
      this.todos = this.todos.filter(todo => !todo.completed)
    }
  }
}
</script>

<style lang="stylus" scoped>
.real-app{
  width 600px
  margin 0 auto
  box-shadow 0 0 5px #666
  }
  .add-input{
  position: relative;
  margin: 0;
  width: 100%;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  border: 0;
  outline: none;
  color: inherit;
  padding: 6px;
  border: 1px solid #999;
  box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  font-smoothing: antialiased;
  padding: 16px 16px 16px 60px;
  border: none;
  box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
}
</style>


