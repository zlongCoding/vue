import $ from '@/utils'

export default {
  SELECTADDRESS_UPDATED: ({commit, state}, obj) => {
    commit('selectAddress_info', obj)
  },
  SELECTADDRESS_MOREN: ({commit, state}, obj) => {
    commit('selectAddress_req', obj)
  },
  SELECTADDRESS_BACK: ({commit, state}, data) => {
    commit('selectAddress_back', data)
  },
  SELECTADDRESS_GETAREA: ({commit, state}, obj) => {
    $.post('/partner/auto/area').then(array => {
      // console.log(array)
      commit('selectAddress_area', array)
      obj.callback()
    })
  },
  SELECTADDRESS_SELECTCITY: ({commit, state}, data) => {
    commit('selectAddress_selectcCity', data)
  },
  SELECTADDRESS_UPDATEINDEX: ({commit, state}, data) => {
    commit('selectAddress_updateIndex', data)
  }
}
