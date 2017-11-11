import $ from '@/utils'

export default {
  name: 'quoted',
  data: function() {
    return {
      from: '',
      classNode: 'true'
    }
  },
  computed: {
    Data () {
      return this.$store.state.Quoted.Data
    },
    HomeData () {
      return this.$store.state.Home.Data
    },
    Options () {
      return this.$store.state.Quoted.Options
    }
  },
  methods: {
    submit (orderNo) {
      this.$router.push({path: `/confirm?orderNo=${orderNo}`})
    },
    toggleDetail (item) {
      this.$store.dispatch('INSURANCE_TOGGLE_DETAIL', item)
    },
    toEdit () {
      let orderNo = this.Data.orderNos.length > 0 ? this.Data.orderNos[0] : ''
      this.$router.replace({name: 'PlanEdit', params: { orderNo: orderNo }})
    }
  },
  beforeRouteEnter (to, from, next) {
    let fromPath = from
    next(vm => {
      vm.from = fromPath
      $.setDocTitle(`查看报价`)
      let province = vm.$store.state.Insurance.Req.province
      let dealerCode = vm.$store.state.Insurance.Req.dealerCode
      if (!province || !dealerCode) {
        vm.$router.replace({path: '/'})
      }
      vm.$store.dispatch('QUOTED_GET_INSURANCE', {
        province: province,
        dealerCode: dealerCode,
        vin: vm.HomeData.vin,
        from: vm.from
      })
    })
  },
  mounted () {
  },
  destroyed () {}
}
