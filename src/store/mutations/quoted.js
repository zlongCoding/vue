export default {
  quoted_update_insurance: (state, json) => {
    state.Quoted.Data.insurance = json
    let array = []
    array = array.concat(json.recommended, json.nonRecommended)
    state.Quoted.Options.company = array
    array.forEach(item => (state.Quoted.Options.loadingStatus[item] = 0))
    state.Quoted.Options.loaded = true
  },
  quoted_start_loading: (state, obj) => {
    state.Quoted.Options.loadingStatus[obj.item] = obj.code
  },
  quoted_init: (state) => {
    state.Quoted.Data.result = {}
    state.Quoted.Options.calculateDone = 0
  },
  quoted_load_done: (state, obj) => {
    state.Quoted.Options.calculateDone += 1
    if (state.Quoted.Options.calculateDone === state.Quoted.Options.company.length) {
      state.Quoted.Options.calculateDone = true
    }
  },
  quoted_set_calculate: (state, json) => {
    if (!json.totalPremium || +json.totalPremium === 0) {
      state.Quoted.Options.loadingStatus[json.insurer] = 3
    } else {
      state.Quoted.Options.loadingStatus[json.insurer] = 2
      state.Quoted.Data.result[json.insurer] = json
      if (state.Quoted.Data.result[json.insurer] && state.Quoted.Data.result[json.insurer].orderNo) {
        state.Quoted.Data.orderNos.push(state.Quoted.Data.result[json.insurer].orderNo)
      }
    }
  },
  quoted_toggle_detail: (state, item) => {
    for (var key in state.Quoted.Options.detailShow) {
      if (state.Quoted.Options.detailShow.hasOwnProperty(key)) {
        if (key !== item) {
          state.Quoted.Options.detailShow[key] = false
        }
      }
    }
    state.Quoted.Options.detailShow[item] = !state.Quoted.Options.detailShow[item]
  }
}
