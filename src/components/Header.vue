<template>
  <div id="header">
    <div id="processBar"></div>
    <!--
    <div class="fullMask" v-if="!data.isSuccess">
      <loading v-if="data.initing" />
      <div class="error" v-if="data.isError">
        {{data.errorText}}
      </div>
      <button class="_button" v-if="data.toBind" @click="toBind">绑定账户</button>
    </div>
    -->
  </div>
</template>

<script>
import $ from '@/utils'
const wx = window.wx
let rockQueen = {
  sdk: false,
  sign: false
}
export default {
  name: 'header',
  computed: {
    data () {
      return this.$store.state.Header
    }
  },
  methods: {
    update (obj) {
      this.$store.commit('header_update', obj)
    },
    toBind () {
      this.update({
        isError: false,
        isSuccess: true
      })
      this.$router.replace({path: `/login?ref=${encodeURIComponent(this.$route.fullPath)}`})
    },
    welcome () {
      if (rockQueen.sdk && rockQueen.sign) {
        this.update({
          isError: false,
          isSuccess: true,
          voucherInfo: $.url(location.search).voucherInfo
        })
      }
    },
    fuckOff (text) {
      this.update({
        initing: false,
        isError: true,
        errorText: text
      })
    }
  },
  beforeMount () {
    if (!$.isWeChat()) {
      this.fuckOff('请使用微信打开 :)')
      return
    }
    if (!wx.enabled) {
      $.ajax('POST')(`/writeoff-web-api/weChat/sign`, {url: document.URL}).then(data => {
        wx.config({
          debug: true,
          appId: data.appId,
          timestamp: data.timestamp,
          nonceStr: data.nonceStr,
          signature: data.signature,
          jsApiList: ['chooseImage', 'previewImage', 'uploadImage', 'downloadImage']
        })
        wx.ready(() => {
          wx.enabled = true
          rockQueen.sdk = true
          this.welcome()
        })
        wx.error((res) => {
          this.fuckOff('微信授权或微信签名失败！')
        })
      }, () => {})
    }
    $.ajax('POST')('/auth/weChat', {code: $.url(location.search).code}, true).then(data => {
      rockQueen.sign = true
      this.welcome()
    }, (res) => {
      if (res.status !== 200) {
        this.fuckOff('微信授权或微信签名失败！')
        return
      }
      let data = res.errorMessges[0]
      if (data.code === '991' || data.code === '992') {
        this.update({
          initing: false,
          isError: true,
          errorText: data.message
        })
      }
      if (data.code === '992') {
        this.update({toBind: true})
      }
    })
  }
}
</script>

<style lang="sass">
@import "../assets/style/reset.scss"
@import "../assets/style/global.scss"
@import "../assets/style/sweetalert.scss"
</style>
<style scoped lang="sass">
@import "../assets/style/header.scss"
</style>
