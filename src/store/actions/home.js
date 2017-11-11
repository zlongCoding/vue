import $ from '@/utils'

export default {
  HOME_UPDATE_VIN: ({commit, state}, vin) => {
    if (!vin) return
    commit('home_update_vin', vin)
  },
  HOME_UPDATE_AUTHCODE: ({commit, state}, authCode) => {
    if (!authCode) return
    commit('home_update_authCode', authCode)
  },
  HOME_UPDATE_PAYCONFIG: ({commit, state}, payConfig) => {
    commit('home_update_payConfig', payConfig)
  },
  HOME_AUTH_BANMA: ({commit, state}, data) => {
    commit('home_update_vin', data.vin)
    commit('home_update_authCode', data.authCode)
    return new Promise((resolve, reject) => {
      $.post('/auth/banma', data).then(json => {
        commit('home_auth_banma', json)
        resolve(json)
      }, json => {
        commit('home_auth_banma', json)
        resolve(json)
      }).catch(err => {
        reject(err)
      })
    })
  }
}
