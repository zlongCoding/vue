import $ from '@/utils'

export default {
  INSURANCE_TOGGLE: ({commit, state}, type) => {
    commit('insurance_toggle', type)
  },
  INSURANCE_UPDATE_REQ: ({commit, state}, obj) => {
    commit('insurance_update_req', obj)
  },
  INSURANCE_GET_DEALER_LIST: ({commit, state}, obj) => {
    $.post('/partner/auto/dealer', {city: obj.city, province: obj.province}).then(arr => {
      commit('insurance_update_dealer_list', arr)
    })
  },
  INSURANCE_GETAREA: ({commit, state}, obj) => {
    let getDealer = function (province, city) {
      // $.post('/partner/auto/dealer', {city: city, province: province}).then(arr => {
      //   commit('insurance_update_dealer_list', arr)
      //   obj.callback && obj.callback()
      // })
      $.post(`/auto/policy/dealer/${obj.params.vouchersNo}`).then(arr => {
        commit('insurance_update_dealer_list', arr)
        obj.callback && obj.callback()
      })
    }

    let initAreaInfo = function (cityArray) {
      $.post(`/partner/auto/vehicle-person`, obj.params.area).then(json => {
        commit('insurance_update_info', json)
        getDealer(cityArray[0].province.key, cityArray[0].city[0].key)
        window.store.dispatch('INSURANCE_UPDATE_CITY_VALUE', {
          province: cityArray[0].province,
          city: cityArray[0].city[0]
        })
      })
    }

    let vouchersNo = obj.params.vouchersNo

    $.post(`/auto/policy/area/${vouchersNo}`).then(response => {
      let array = [response]
      commit('insurance_update_area', array)
      initAreaInfo(array)
    })
  },
  POLICY_CALCULATE: ({commit}, data) => {
    return new Promise((resolve, reject) => {
      $.post(`/auto/policy/calculate`, data).then(response => {
        commit('SET_POLICY_CALCULATE', response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  INSURANCE_UPDATE_CITY: ({commit, state}, index) => {
    commit('insurance_update_city', index)
  },
  INSURANCE_UPDATE_CITY_VALUE: ({commit, state}, obj) => {
    commit('insurance_update_city_value', obj)
  },
  INSURANCE_TOGGLE_DEALER: ({commit, state}, item) => {
    commit('insurance_toggle_dealer', item)
  }
}
