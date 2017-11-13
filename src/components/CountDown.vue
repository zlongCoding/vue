<template>
  <div class="count-down">
      <input type="button" :value="msg" @click="time()" :disabled='forbidden'>
  </div>
</template>
<script>
export default {
  data () {
    return {
      wait: 0,
      msg: '获取验证码',
      forbidden: false,
      runFn: true,
      fnResult: {}
    }
  },
  props: ['period', 'callback'],
  methods: {
    time () {
      if (this.runFn) {
        this.callback()
        this.runFn = false
      }
      this.forbidden = true
      if (this.wait === 0) {
        this.msg = '获取验证码'
        this.wait = this.period
        this.forbidden = false
        this.runFn = true
      } else {
        this.msg = `重新获取(${this.wait--}s)`
        let that = this
        setTimeout(() => {
          that.time()
        }, 1000)
      }
    }
  },
  mounted () {
    this.wait = +this.period
  }
}
</script>

<style scoped lang="scss">
  .count-down {
    input[type='button'] {
      width: 5rem;
      font-size: 10px;
      padding: 0;
    }
  }
</style>
