import $ from '@/utils'

export default {
  MYSERVICE_VOUCHERSLIST: ({commit, state}, data) => {
    $.post('/order/vouchersList', data).then(json => {
      commit('myservice_voucherslist', json)
      data.callback && data.callback()
    })
  }
}
