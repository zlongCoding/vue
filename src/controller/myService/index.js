import $ from '@/utils'

export default {
  name: 'myService',
  data () {
    return {
      fullscreen: false,
      page: 0,
      size: 10,
      vin: 'VIN1234567890',
      urlCode: null,
      contentNone: false,
      hasBought: null
    }
  },
  methods: {
    jump (vouchersNo, productCategory, status, vouchersName, remainingQuantity) {
      var params = {}
      this.$store.state.myService.vouchersNo = vouchersNo
      if (productCategory === 'AUTO' && status === 'VALID' && remainingQuantity !== 0) {
        this.toPage('policy')
      } else if (productCategory === 'AUTO' && status !== 'VALID' || remainingQuantity === 0) {
        this.toPage('insuranceList')
      } else {
        if (status !== 'VALID') {
          return false
        } else {
          if (productCategory === 'TRAFFIC_PACKAGE') {
            return false
          }
          params.vouchersName = vouchersName
          this.toPage('giftdetail', params)
        }
      }
    },
    jumpRefund (productNo, ecOrderNo) {
      this.$store.state.myService.productNo = productNo
      this.$store.state.myService.ecOrderNo = ecOrderNo
      this.toPage('serviceRefund')
    },
    jumpError () {
      let path = '/?vin=' + this.$store.getters.vin + '&authcode=' + this.$store.getters.authCode
      this.$router.push({ path: path })
    },
    toPage (url, params) {
      this.$router.push({name: url, params: params})
    }
  },
  computed: {
    data () {
      return this.$store.state.myService.voucherslist
    }
  },
  created () {
    this.fullscreen = this.$route.query.fullscreen
  },
  beforeMount () {
    this.urlCode = $.urlCode()
    this.hasBought = this.$store.state.services.hasBought
    if (this.fullscreen) {
      $.fullScreen()
      $.setDocTitle('我的服务', true)
    } else {
      $.setDocTitle('我的服务')
    }
    this.$store.dispatch('MYSERVICE_VOUCHERSLIST', {
      page: this.page,
      size: this.size,
      vin: this.$store.getters.vin,
      callback: () => {
        setTimeout(() => {
          this.contentNone = true
        }, 500)
      }
    })
  },
  mounted () {},
  destroyed () {}
}
