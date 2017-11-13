import $ from '@/utils'
const wx = window.wx
export default {
  name: 'scan',
  computed: {
    data () {
      return this.$store.state.Scan.Data
    },
    scan () {
      return this.$store.state.Scan
    }
  },
  methods: {
    update (obj) {
      this.$store.commit('scan_update', obj)
    },
    chooseImage (index) {
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: function (res) {
          let oldImg = this.scan.imgList
          oldImg.splice(index, 1, res.localIds[0])
          this.update({imgList: oldImg})
          this.uploadImage(res.localIds[0], index)
        }.bind(this)
      })
    },
    uploadImage (localId, index) {
      wx.uploadImage({
        localId: localId,
        isShowProgressTips: 1,
        success: function (res) {
          this.uoloadToServer(res.serverId, index)
          let oldImgID = this.scan.imgIdList
          oldImgID.splice(index, 1, res.serverId)
          this.update({imgIdList: oldImgID})
        }.bind(this)
      })
    },
    uoloadToServer (serverId, index) {
      let req = {
        vouchersNo: this.data.vouchersNo,
        writeCode: this.data.writeCode,
        mediaId: serverId,
        sort: index + 1
      }
      $.ajax('POST')(`/writeoff-web-api/vouchers/settlement/writeOffAndSaveResource`, req).then(data => {
        this.update({settlementId: data.settlementId})
      }, () => {})
    },
    submit () {
      $.ajax('POST')(`/writeoff-web-api/vouchers/settlement/sendToApproval`, {settlementId: this.scan.settlementId}, true).then(data => {
        this.$router.push({path: `/scan/success`})
      }, () => {
        this.$router.push({path: `/scan/fail`})
      })
    }
  },
  beforeMount () {
    $.setDocTitle(`扫码核销`)
    this.update({ready: false, error: false})

    $.ajax('GET')(`/writeoff-web-api/vouchers/settlement/image/{imageIndex}`).then(data => {
      this.$store.commit('scan_update_data', data)
    }, () => {})
  },
  mounted () {
    if (this.$route.query.action === 'reupload' && this.$route.query.id) {
      $.ajax('POST')(`/writeoff-web-api/vouchers/settlement/detail/${this.$route.query.id}`).then(data => {
        this.$store.commit('scan_update_data', data)
        this.update({settlementId: this.$route.query.id})
        data.resources.forEach(item => {
          let arr = this.scan.imgList
          arr.splice(item.sort - 1, 1, `/writeoff-web-api/vouchers/settlement/image/${item.imageIndex}`)
          this.update({imgList: arr})
        })
      }, () => {})
    }

    if (this.$route.query.voucherInfo) {
      $.ajax('POST')(`/writeoff-web-api/vouchers/settlement/validVouchersWriteoff/${this.$route.query.voucherInfo}`).then(data => {
        this.$store.commit('scan_update_data', data)
      }, () => {})
    }
  },
  destroyed () {}
}
