export default {
  GiftMessage: ({commit, state}, boolean) => {
    commit('Gift_giftMessage', boolean)
  },
  GiftMessageData: ({commit, state}, data) => {
    commit('Gift_Message', data)
  },
  GiftDataContent: ({ commit, state }, data) => {
    commit('Gift_DataContent', data)
  }
}
