export default { //可以有异步操作
  updateCountSync(store,data){
    setTimeout(()=>{
      store.commit('updateCount',data.num)
    },data.time)
  }
}
