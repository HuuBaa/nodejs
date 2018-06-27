import Vuex from 'vuex'
import defaultState from './state/state.js'
import mutations from './mutations/mutations.js'
import getters from './getters/getters.js'
import actions from './actions/actions.js'

const isDev = process.env.NODE_ENV === 'development'

export default ()=>{
  const store=new Vuex.Store({
    strict:isDev,//只能在开发环境使用，限制state在mutation之外的修改
    state:defaultState, //数据
    getters, //和computed类似
    mutations, //修改state的操作
    actions, //异步操作
    plugins:[
      (store)=>{
        console.log('my vuex plugins')
      }
    ]
    // modules:{
    //   a:{
    //     namespaced:true, //命名空间 actions/mutations/getters 不会冲突
    //     state:{
    //       text:'modules-a'
    //     },
    //     getters:{
    //       textPlus(state,getters,routeState){
    //         return state.text + routeState.count+routeState.b.text
    //       }
    //     },
    //     mutations:{
    //       updateText(state,text){
    //         state.text=text
    //       }
    //     },
    //     actions:{
    //       add({state,commit,rootState},data){
    //         commit('updateText',data.addtext)//本模块中查找updateText
    //         //commit('updateCount',56789,{root:true})//调用全局的mutation
    //       }
    //     }
    //   },
    //   b:{
    //     namespaced:true,
    //     state:{
    //       text:'modules-b'
    //     },
    //     actions:{
    //       testAction({commit}){
    //         commit('a/updateText','test-in-b',{root:true})//调用其他模块的mutation
    //       }
    //     }
    //   }
    // }
  })

  //vuex的热更替
  if(module.hot){
    module.hot.accept([
      './state/state.js',
      './mutations/mutations.js',
      './getters/getters.js',
      './actions/actions.js'
    ],()=>{
      const newState=require('./state/state.js').default
      const newMutations=require('./mutations/mutations.js').default
      const newGetters=require('./getters/getters.js').default
      const newActions=require('./actions/actions.js').default

      store.hotUpdate({
        state:newState,
        mutations:newMutations,
        actions:newActions,
        getters:newGetters
      })
    })
  }

  return store
}
