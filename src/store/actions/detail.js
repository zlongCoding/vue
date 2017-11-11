import utils from '@/utils'

export default {
  DETAIL_GETINFO: ({commit}, data) => {
    return new Promise((resolve, reject) => {
      utils.post(`/auto/policy/detail/${data.orderNo}`).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
