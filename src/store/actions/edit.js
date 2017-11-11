import $ from '@/utils'

export default {
  EDIT_GETPOLICY: ({ commit, state }, data) => {
    let { orderNo, province } = data
    let param = {}
    if (!orderNo) {
      param = {province: province}
    } else {
      param = {orderNo: orderNo, province: province}
    }
    $.post('/auto/policy/coverage', param).then(json => {
      commit('edit_getprolicy', json)
      data.callback && data.callback()
    })
  },
  EDIT_UPDATEMODULE: ({ commit, state }, data) => {
    commit('edit_updateModule', data)
  },
  EDIT_ToogleTip: ({ commit, state }, data) => {
    commit('edit_toogleTip', data)
  },
  EDIT_SetTCI: ({ commit, state }, data) => {
    commit('edit_setTCI', data)
  }
}
