export default {
  login_update: (state, array) => {
    let key = array[0]
    let val = array[1]
    state.Login.Req[key] = val
  },
  login_toggleLoading: (state, status) => {
    state.Login.isLoading = status
  },
  login_update_captcha: (state, status) => {
    state.Login.captchaPath = `/auth/captcha?${new Date().getTime()}`
  }
}
