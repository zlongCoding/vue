import $ from '@/utils'

export default {
  QUOTED_GET_CALCULATE: ({commit, state}, obj) => {
    let Insurance = state.Insurance.Req
    let params = {
      dealerAgreement: {
        insurer: obj.insurer
      },
      dealerCode: Insurance.dealerCode,
      owner: {
        certificateNo: Insurance.certificateNo,
        certificateType: Insurance.certificateType,
        mobile: Insurance.ownerMobile,
        name: Insurance.ownerName
      },
      vehicle: {
        engineNo: Insurance.engineNo,
        licenseNo: Insurance.licenseNo,
        modelName: Insurance.modelName,
        registerDate: $.dateformat(Insurance.registerDate, 'yyyy-MM-dd'),
        vin: Insurance.vin
      }
    }
    if (state.Edit.policylist) {
      Object.assign(params, { coverages: state.Edit.policylist })
    }
    if (obj.isSelectedCTP) {
      Object.assign(params, { isSelectedCTP: obj.isSelectedCTP })
    }
    if (!params.dealerCode) return
    commit('quoted_start_loading', {item: obj.insurer, code: 1})
    $.post(`/auto/policy/calculate`, params).then(json => {
      commit('quoted_set_calculate', json)
      commit('quoted_load_done')
      if (state.Quoted.Options.calculateDone === state.Quoted.Data.insurance.recommended.length) {
        window.store.dispatch('QUOTED_LOAD_UNRECOMOND')
      }
    },
    json => {
      commit('quoted_start_loading', {item: obj.insurer, code: 3})
      commit('quoted_load_done')
      if (state.Quoted.Options.calculateDone === state.Quoted.Data.insurance.recommended.length) {
        window.store.dispatch('QUOTED_LOAD_UNRECOMOND')
      }
    })
  },
  QUOTED_LOAD_UNRECOMOND: ({commit, state}) => {
    state.Quoted.Data.insurance.nonRecommended.forEach(item => {
      window.store.dispatch('QUOTED_GET_CALCULATE', {
        insurer: item,
        isSelectedCTP: state.Edit.isSelectedCTP === true ? '1' : '0'
      })
    })
  },
  QUOTED_GET_INSURANCE: ({commit, state}, obj) => {
    // 如果是从修改投保页面跳转过来
    if (obj.from && obj.from.name === 'PlanEdit') {
    } else {
      // if (state.Quoted.Options.loaded) return
    }
    $.post(`/partner/auto/insurance/${obj.province}/${obj.dealerCode}/${obj.vin}`).then(json => {
      commit('quoted_update_insurance', json)
      if (state.Quoted.Data.insurance.recommended && state.Quoted.Data.insurance.recommended.length > 0) {
        commit('quoted_toggle_detail', state.Quoted.Data.insurance.recommended[0])
        commit('quoted_init')
        state.Quoted.Data.insurance.recommended.forEach(item => {
          window.store.dispatch('QUOTED_GET_CALCULATE', {
            insurer: item,
            isSelectedCTP: state.Edit.isSelectedCTP === true ? '1' : '0'
          })
        })
      } else {
        if (state.Quoted.Data.insurance.nonRecommended && state.Quoted.Data.insurance.nonRecommended.length > 0) {
          commit('quoted_toggle_detail', state.Quoted.Data.insurance.nonRecommended[0])
          commit('quoted_init')
          window.store.dispatch('QUOTED_LOAD_UNRECOMOND')
        }
      }
    })
  },
  INSURANCE_TOGGLE_DETAIL: ({commit, state}, insurer) => {
    commit('quoted_toggle_detail', insurer)
  }
}
