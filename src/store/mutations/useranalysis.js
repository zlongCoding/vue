export default {
  useranalysis_gettriplabel: (state, data) => {
    if (data && data.tripLabelMO) {
      state.useranalysis.Data = data.tripLabelMO
    }
  }
}
