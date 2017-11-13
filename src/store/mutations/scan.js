export default {
  scan_update: (state, obj) => {
    for (let [key, value] of Object.entries(obj)) {
      state.Scan[key] = value
    }
  },
  scan_update_data: (state, data) => {
    state.Scan.Data = data
  }
}
