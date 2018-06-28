export default {
  // 和computed类似
  fullName (state) {
    return `${state.firstName} ${state.lastName}`
  }
}
