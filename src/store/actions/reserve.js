import utils from '@/utils'

export default {
  RESERVE_PREMIUM_RECORD: ({commit}, data) => {
    return new Promise((resolve, reject) => {
      utils.post('/ubi/premium-record', data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  RESERVE_GET_BALANCE: ({dispatch}, data) => {
    return new Promise((resolve, reject) => {
      utils.post('/ubi/balance', data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
