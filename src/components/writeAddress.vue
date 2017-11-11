<template>
  <section class="wirte-address">
    <p>请填写收单地址</p>
    <div @click="goBack">请确认保单寄送信息正确</div>
    <i></i>
  </section>
</template>

<script>
  export default {
    name: 'writeAddress',
    props: {
      writeAddress: {
        type: String,
        default: ''
      }
    },
    methods: {
      goBack () {
        this.$router.push({path: this.writeAddress})
      }
    }
  }
</script>
<style scoped lang="sass">
  @import "../assets/style/writeAddress.scss"
</style>
