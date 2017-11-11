import $ from '@/utils'
import insureResult from '@/components/insureResult.vue'
export default {
  name: 'insuranceFail',
  data () {
    return {
      insuranceMessage: '保险公司核保失败'
    }
  },
  components: {
    insureResult
  },
  computed: {
    Data () {
      return this.$store.state.Home.Data
    }
  },
  beforeMount () {
    $.setDocTitle(`订单失败`)
  },
  mounted () {},
  destroyed () {}
}
