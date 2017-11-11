<template>
  <div class="succeedRefund">
    <div class="refundContent">
      <div class="refundContentImg"><img src="../../assets/images/succeedRefund.png"/></div>
      <div class="refundContentText">
        <h1>投保成功</h1>
        <p>保单正常将在5个工作日之内寄达，请您注意查收！</p>
      </div>
      <div class="look" @click="jumpTo('/insurance/list')">查看保单<i></i></div>
    </div>
    <button class="btn returnBtn" @click="jumpTo(`/home?vin=${vin}&authcode=${authcode}`)">返回首页</button>
  </div>
</template>

<script>
  import $ from '@/utils'

  export default {
    name: 'policySucceed',
    data () {
      return {
        vin: null,
        authcode: ''
      }
    },
    methods: {
      jumpTo (url) {
        this.$router.push({path: url})
      }
    },
    beforeMount () {
      $.setDocTitle('投保成功')
      this.vin = this.$store.getters.vin
      this.authcode = this.$store.getters.authCode
    }
  }
</script>

<style scoped lang="sass">
  @import "../../assets/style/succeedRefund/index.scss"
</style>
