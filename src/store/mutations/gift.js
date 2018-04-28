export default {
  Gift_giftMessage: (state, boolean) => {
    state.Gift.gift_message = boolean
  },
  Gift_Message: (state, data) => {
    state.Gift.message = data
  },
  Gift_DataContent: (state, data) => {
    state.Gift.dataContent = data
  }
}
