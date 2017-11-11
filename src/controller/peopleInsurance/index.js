import $ from '@/utils'
import insureResult from '@/components/insureResult.vue'
export default {
  name: 'insurancePeople',
  data () {
    return {
      insuranceMessage: '您的订单需要保险公司人工核保，核保通过后将于短信通知您。'
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
  methods: {
  },
  beforeMount () {
    $.setDocTitle(`人工核保`)
  },
  mounted () {},
  destroyed () {}
}
