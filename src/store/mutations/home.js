export default {
  home_update_vin: (state, vin) => {
    state.Home.Data.vin = vin
  },
  home_update_authCode: (state, authCode) => {
    state.Home.Data.authCode = authCode
  },
  home_update_payConfig: (state, payConfig) => {
    state.Home.payConfig = payConfig
  },
  home_auth_banma: (state, json) => {
    state.Home.auth_banma = json
  }
}
