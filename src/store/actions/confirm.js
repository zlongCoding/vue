import $ from '@/utils'

export default {
  CONFIRM_SUBMIT: ({commit, state}, data) => {
    $.post('/auto/policy/submit', data.data).then(json => {
      data.callback && data.callback(json)
    })
  },
  // CONFIRM_ADDRESS: ({commit, state}, data) => {
  //   $.post('/auto/policy/submit', data.data).then(json => json, json => {
  //     data.callback && data.callback(json)
  //   })
  // },
  CONFIRM_GETITEM: ({commit, state}, data) => {
    $.post(`/auto/policy/detail/${data.orderNo}`).then(json => {
      commit('confirm_getItem', json)
      data.callback && data.callback()
    })
  },
  CONFIRM_SELECTADDRESS: ({commit, state}, data) => {
    $.post(`/auto/policy/delivery/${data.orderNo}`).then(json => {
      commit('confirm_address', json)
      if (json.delivery && json.delivery.length > 0) {
        json.delivery[0].back = true
        commit('selectAddress_info', json.delivery[0])
      }
      commit('selectAddress_req', {name: json.name, mobile: json.mobile, province: json.province, city: json.city, detailAddress: ''})
      data.callback && data.callback()
    })
  }
}
