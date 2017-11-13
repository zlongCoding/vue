export default {
  orders_to_tab: (state, tab) => {
    state.Orders.currentTab = tab
  },
  orders_update: (state, obj) => {
    for (let [key, value] of Object.entries(obj)) {
      state.Orders[key] = value
    }
  },
  orders_update_data: (state, obj) => {
    if (obj.isMore) {
      state.Orders.Data.content = state.Orders.Data.content.concat(obj.data.content)
    } else {
      state.Orders.Data = Object.assign({}, obj.data)
    }
  },
  orders_splice_data: (state, index) => {
    var arr = state.Orders.Data.content
    arr.splice(index, 1)
    state.Orders.Data.content = arr
  }
}
