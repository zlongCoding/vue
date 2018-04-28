export default {
  HOME_NAVIGATOR: ({commit, state}, boolean) => {
    commit('home_navigator', boolean)
  },
  HOME_UNREGISTERED: ({commit, state}, boolean) => {
    commit('home_unregistered', boolean)
  },
  HOME_USERINFO: ({commit, state}, info) => {
    console.log(info)
    commit('home_userInfo', info)
  }
}
