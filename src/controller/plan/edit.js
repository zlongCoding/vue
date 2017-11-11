import $ from '@/utils'
const $$ = window.Mint

export default {
  name: 'planEdit',
  data: function () {
    return {
      maxNumOnePage: 9,
      packup: false,
      bitmap: [],
      bitmapBackup: [],
      choosenValueTemp: {
        key: '',
        value: 0
      },
      TCIValueTemp: {
        key: '',
        value: 0
      },
      popupModules: {},
      showTCI: false,
      TCIslots: [
        {
          flex: 1,
          values: [{key: '投保', value: '1'}, {key: '不投保', value: '0'}],
          textAlign: 'center',
          defaultIndex: 1000
        }
      ],
      TCIvalue: {
        key: '投保',
        value: '1'
      }
    }
  },
  computed: {
    policyFlag() {
      return this.$store.state.Edit.policyFlag
    },
    policylist() {
      return this.$store.state.Edit.policylist
    },
    slots() {
      return this.$store.state.Edit.slots
    },
    showExpand() {
      return this.$store.state.Edit.policylist.length > this.maxNumOnePage
    },
    showItem() {
      let idx
      let array = []
      for (idx = 0; idx < this.maxNumOnePage; idx++) {
        array.push(1)
      }
      for (idx = this.maxNumOnePage; idx < this.policylist.length; idx++) {
        array.push(0)
      }
      this.bitmapBackup = this.bitmap = array
      return this.bitmap
    }
  },
  methods: {
    selectTCI() {
      this.TCIvalue = this.TCIValueTemp
      this.toogleTCI()
      this.$store.dispatch('EDIT_SetTCI', {
        data: this.TCIvalue
      })
    },
    toogleTCI() {
      document.body.style.overflow = 'hidden'
      this.showTCI = !this.showTCI
    },
    toogleTip(index) {
      if (this.policylist[index].isSelect === '0') {
        return
      }
      this.$store.dispatch('EDIT_ToogleTip', {
        data: index
      })
    },
    detectShow(index) {
      return this.showItem[index]
    },
    showMore() {
      // 收起状态
      if (this.bitmap.indexOf(0) > 0) {
        this.bitmap.copyWithin(this.bitmap.indexOf(0), 0)
      } else {
        // 展开状态
        this.bitmap = [].concat(this.bitmapBackup)
      }
      this.packup = !this.packup
    },
    toPage(url) {
      this.$router.push({ path: url })
    },
    back() {
      this.$router.replace({ path: '/quoted' })
    },
    tooglePop(index) {
      this.$store.dispatch('EDIT_UPDATEMODULE', { index: index })
      let { isSelect, sumInsured } = this.policylist[index]
      // let idxOfSlots = 0
      this.slots[index][0].values.forEach((ele, idx) => {
        if (ele.value === this.filtValue(sumInsured, isSelect)) {
          this.slots[index][0].defaultIndex = idx
        }
      })
    },
    filtValue(sumInsured, isSelect) {
      if (isSelect === '0') {
        return isSelect
      } else {
        return !sumInsured || sumInsured === 'null' ? isSelect : sumInsured
      }
    },
    onTCIChange(picker, values) {
      if (!values[0]) return
      this.TCIValueTemp.key = values[0].key
      this.TCIValueTemp.value = values[0].value
    },
    onValuesChange(picker, values) {
      if (!values[0]) return
      this.choosenValueTemp.key = values[0].key
      this.choosenValueTemp.value = values[0].value
    },
    selectItem(index) {
      // 投保或者不投保
      if (this.choosenValueTemp.value === '0' || this.choosenValueTemp.value === '1') {
        this.policylist[index].sumInsured = ''
        this.policylist[index].isSelect = this.choosenValueTemp.value
        if (this.choosenValueTemp.value === '0') {
          if (this.policylist[index].exemptSelected === '1') {
            this.policylist[index].exemptSelected = '0'
          }
        }
      } else {
        this.policylist[index].isSelect = '1'
        this.policylist[index].sumInsured = this.choosenValueTemp.value
      }
      this.tooglePop(index)
    }
  },
  beforeMount() {
    $.setDocTitle(`调整投保方案`)
    let orderNo = this.$route.params.orderNo
    $$.Indicator.open()
    this.$store.dispatch('EDIT_GETPOLICY', {
      orderNo: orderNo,
      province: this.$store.state.Insurance.Req.province,
      callback: () => {
        $$.Indicator.close()
      }
    })
  },
  mounted () {
    // slots初始化
    for (let slot of this.slots) {
      slot[0].defaultIndex = 1000
    }
    this.TCIslots[0].defaultIndex = 0
  },
  destroyed() { }
}
