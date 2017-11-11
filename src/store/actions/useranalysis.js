import utils from '@/utils'

export default {
  USERANALYSISI_TRIPLABE: ({commit}, data) => {
    let vin = data
    return new Promise((resolve, reject) => {
      utils.post(`/ubi/trip-label/${vin}`).then(response => {
        commit('useranalysis_gettriplabel', response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
