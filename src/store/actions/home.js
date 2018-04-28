export default {
  HOME_NAVIGATOR: ({commit, state}, boolean) => {
    commit('home_navigator', boolean)
  },
  HOME_USERINFO: ({commit, state}, info) => {
    commit('home_userInfo', info)
  },
  HOME_WXCONFIG: ({ commit, state }, data) => {
    commit('home_wxConfig', data)
  }
}
