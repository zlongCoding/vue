import $ from '@/utils'

export default {
  name: 'succeedRefund',
  data () {
    return {
      totalRefundAmount: null
    }
  },
  methods: {
    jump () {
      let path = '/?vin=' + this.$store.getters.vin + '&authcode=' + this.$store.getters.authCode
      this.$router.push({ path: path })
    }
  },
  beforeMount () {
    $.setDocTitle(`退款成功`)
    this.totalRefundAmount = this.$route.params.totalRefundAmount
  },
  mounted () {},
  destroyed () {}
}
