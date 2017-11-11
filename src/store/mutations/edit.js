import utils from '@/utils'

export default {
  edit_getprolicy: (state, array) => {
    state.Edit.isSelectedCTP = true
    state.Edit.policylist = array
    state.Edit.oripolicylist = []
    for (let item of array) {
      state.Edit.oripolicylist.push(JSON.parse(JSON.stringify(item)))
    }
    let baseSlot = [{key: '投保', value: '1'}, {key: '不投保', value: '0'}]
    let concatSlot = [{key: '不投保', value: '0'}]
    for (let idx in array) {
      let options = []
      if (array[idx].options.length > 0) {
        options = utils.arrayNumberToSlot(array[idx].options, utils.numberToChinese, true)
      }
      if (options.length > 0) {
        // state.Edit.slots[idx][0].values = options.concat(concatSlot)
        state.Edit.slots[idx][0].values = concatSlot.concat(options)
      } else {
        // state.Edit.slots[idx][0].values = options.concat(baseSlot)
        state.Edit.slots[idx][0].values = baseSlot.concat(options)
      }
    }
  },
  edit_updateModule: (state, data) => {
    let flag = !state.Edit.policyFlag[data.index]
    state.Edit.policyFlag.splice(data.index, 1, flag)
  },
  edit_toogleTip: (state, data) => {
    if (state.Edit.policylist[data.data].exemptSelected === '1') {
      state.Edit.policylist[data.data].exemptSelected = '0'
    } else {
      state.Edit.policylist[data.data].exemptSelected = '1'
    }
  },
  edit_setTCI: (state, data) => {
    if (data.data.value === '0') {
      state.Edit.isSelectedCTP = false
    } else {
      state.Edit.isSelectedCTP = true
    }
  }
}
