export default {
  SET_POLICY_CALCULATE: (state, data) => {
    state.Insurance.calculate = data
  },
  insurance_toggle: (state, type) => {
    state.Insurance.Options[type] = !state.Insurance.Options[type]
  },
  insurance_update_req: (state, obj) => {
    state.Insurance.Req[obj.key] = obj.value
  },
  insurance_update_area: (state, array) => {
    let provinceArr = []
    let cityArr = []
    array.forEach((item, index) => {
      let province = item.province
      province.index = index
      provinceArr.push(province)
      cityArr.push(item.city)
    })
    cityArr.forEach(item => {
      item.map((kid, index) => {
        kid.index = index
      })
    })

    state.Insurance.Options.area[0].values = provinceArr
    state.Insurance.Options.provinceList = provinceArr
    state.Insurance.Options.cityList = cityArr
  },
  insurance_update_city: (state, index) => {
    state.Insurance.Options.area[2].values = state.Insurance.Options.cityList[index]
  },
  insurance_update_info: (state, json) => {
    if (!json.registerDate) {
      json.isRegisterDate = false
    } else {
      json.isRegisterDate = true
    }

    if (!json.ctpStartDate) {
      json.isCtpStartDate = false
    } else {
      json.isCtpStartDate = true
    }

    json.isConfirmRegisterDate = false
    json.isConfirmCtpStartDate = false
    json.registerDate = (json.registerDate ? json.registerDate : new Date())
    json.ctpStartDate = (json.ctpStartDate ? json.ctpStartDate : new Date())

    state.Insurance.Req = json
    state.Insurance.Req.certificateType = 'ID_CARD'
    let province = json.province
    state.Insurance.Options.provinceList.forEach(item => {
      if (item.key === province) {
        state.Insurance.Options.province = item
        let cityList = state.Insurance.Options.cityList[item.index]
        cityList.forEach(kid => {
          if (kid.key === json.city) {
            state.Insurance.Options.city = kid
          }
        })
      }
    })
  },
  insurance_update_city_value: (state, obj) => {
    state.Insurance.Req.city = obj.city.key
    state.Insurance.Req.province = obj.province.key
    state.Insurance.Options.city = obj.city
    state.Insurance.Options.province = obj.province
  },
  insurance_update_dealer_list: (state, arr) => {
    if (!arr.length) {
      state.Insurance.Req.dealerCode = ''
      state.Insurance.Options.dealerList = []
      state.Insurance.Options.currentDealer = {}
      return
    }
    state.Insurance.Options.dealerList = arr
    state.Insurance.Options.currentDealer = arr[0]
    state.Insurance.Req.dealerCode = arr[0].dealerCode
  },
  insurance_toggle_dealer: (state, item) => {
    state.Insurance.Options.currentDealer = item
    state.Insurance.Req.dealerCode = item.dealerCode
  }
}
