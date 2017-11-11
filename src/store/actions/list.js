import utils from '@/utils'

export default {
  LIST_INITORDERLIST: ({commit}, data) => {
    return new Promise((resolve, reject) => {
      utils.post('/auto/policy/query', data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  LIST_DELETEITEM: ({commit}, data) => {
    return new Promise((resolve, reject) => {
      utils.post('/auto/policy/delete/' + data.item.orderNo).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
