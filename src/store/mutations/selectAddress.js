export default {
  selectAddress_info: (state, json) => {
    state.selectAddress.Options = json
  },
  selectAddress_req: (state, json) => {
    state.selectAddress.Req = json
  },
  selectAddress_back: (state, data) => {
    state.selectAddress.Options.back = data
  },
  selectAddress_area: (state, array) => {
    let cities = array.filter(item => {
      return item.province.value === state.selectAddress.Req.province
    })
    let citySlots = [{
      flex: 1,
      values: [],
      textAlign: 'center',
      defaultIndex: 1000
    }
    ]
    cities[0].city.forEach(item => {
      citySlots[0].values.push({
        key: item.value,
        value: item.value
      })
    })
    citySlots[0].defaultIndex = 1000
    state.selectAddress.Data.cities = cities[0].city
    state.selectAddress.Data.citySlots = citySlots
  },
  selectAddress_selectcCity: (state, data) => {
    state.selectAddress.Req.city = data.city
  },
  selectAddress_updateIndex: (state, data) => {
    // state.selectAddress.Req.city = data.city
    state.selectAddress.Data.cities.forEach((ele, idx) => {
      if (ele.value === data.city) {
        state.selectAddress.Data.citySlots[0].defaultIndex = idx
      }
    })
  }
}
