export default {
  CLASS_DELETETRUE: ({commit, state}, boolean) => {
    commit('class_delteTrue', boolean)
  },
  CLASS_ENABLE: ({commit, state}, data) => {
    commit('class_enable', data)
  }
}
