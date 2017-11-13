export default {
  header_update: (state, obj) => {
    for (let [key, value] of Object.entries(obj)) {
      state.Header[key] = value
    }
  }
}
