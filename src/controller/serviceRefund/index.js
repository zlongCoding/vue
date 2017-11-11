import $ from '@/utils'
import Mint from 'mint-ui'

export default {
  name: 'serviceRefund',
  data () {
    return {
      totalRefundAmount: null,
      data: {},
      vin: 'VIN1234567890'
    }
  },
  methods: {
    openConfirm () {
      if (!this.totalRefundAmount) {
        return false
      }
      let tdata = null
      this.data.vouchersMOList.forEach(function (value) {
        if (value.productCategory === 'AUTO' && value.remainingQuantity === 0) {
          tdata = '您车险已投保,'
        } else if (value.productCategory === 'TRAFFIC_PACKAGE' && value.remainingQuantity === 0) {
          tdata = tdata + '流量已使用,'
        } else if (value.remainingQuantity !== value.quantity) {
          let num = value.quantity - value.remainingQuantity
          tdata = tdata + '' + value.vouchersName + '已使用' + num + '次,'
        }
      })
      let html
      if (tdata) {
        html = '<div style="line-height:22px;text-align:left;font-size:14px;color:#666666;">' + tdata + '现在可以退款<span style="color:#ee6f46">￥' + this.totalRefundAmount + '元</span>.<br />商业险脱保可能影响未来车险投保<br />您确认退款吗？</div>'
      } else {
        html = '<div style="line-height:22px;text-align:left;font-size:14px;color:#666666;">您的服务尚未使用,现在可以退款<span style="color:#ee6f46">￥' + this.totalRefundAmount + '元</span>.<br />您确认退款吗？</div>'
      }

      Mint.MessageBox.confirm(html, '提示').then(action => {
        Mint.Indicator.open()
        let data = {}
        data.ecOrderNo = this.data.ecOrderNo
        data.productNo = this.data.productNo
        data.refundModel = 'USER'
        data.vin = this.vin
        $.post('/order/refund', data).then(json => {
          if (json.refundStatus === 'SUCCESS') {
            this.$router.push({name: 'succeedRefund', params: {totalRefundAmount: this.totalRefundAmount}})
            Mint.Indicator.close()
          }
        })
      })
    },
    jump (vouchersNo, productCategory, status, vouchersName, remainingQuantity) {
      return false
      // var params = {}
      // this.$store.state.myService.vouchersNo = vouchersNo
      // if (status === 'VALID' && remainingQuantity !== 0) {
      //   this.toPage('policy')
      // } else if (status !== 'VALID' || remainingQuantity === 0) {
      //   this.toPage('insuranceList')
      // } else {
      //   if (productCategory === 'TRAFFIC_PACKAGE') {
      //     return false
      //   }
      //   params.vouchersName = vouchersName
      //   this.toPage('giftdetail', params)
      // }
      // return false
    },
    toPage (url, params) {
      this.$router.push({name: url, params: params})
    }
  },
  beforeMount () {
    $.setDocTitle(`服务礼包退款`)
    this.urlCode = $.urlCode()
    this.vin = this.$store.getters.vin
    let data = {}
    data.ecOrderNo = this.$store.state.myService.ecOrderNo
    data.productNo = this.$store.state.myService.productNo
    data.refundModel = 'USER'
    data.vin = this.$store.getters.vin
    console.log(data)
    $.post('/order/calc-order-refund', data).then(json => {
      this.data = json.orderVouchersMO
      this.totalRefundAmount = json.totalRefundAmount
    })
  },
  beforeRouteLeave (to, from, next) {
    Mint.MessageBox.close()
    next()
  },
  destroyed () {}
}
