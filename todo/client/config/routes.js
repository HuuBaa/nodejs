// import Todo from './../views/todo/todo.vue'
// import Login from './../views/login/login.vue'

export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '/app',

    // path:'/app/:id',
    props: true, // 把id作为props传递到组件中
    // props:{
    //   id:'456'
    // },
    // props:(route)=>({id:route.query.b}),

    component: () => import('./../views/todo/todo.vue'), // 异步加载，进入路径时才加载
    name: 'app', // 在router-link里可以使用
    beforeEnter: (to, from, next) => {
      console.log('routes beforeEnter')
      next()
    }
    // meta:{
    //   title:'this is app',
    //   description:'asdas'
    // }

    // 子路由
    // children:[
    //   {
    //     path:'test',
    //     component:Login
    //   }
    // ]

  },
  {
    path: '/login',
    component: () => import('./../views/login/login.vue'),
    name: 'login'
  }
]
