<template>
  <div id="insureResult">
  
    <p>{{mode}}</p>
    <section><span v-if="classnone">提示：</span>{{messages}}</section>
    <div @click="goBack" :class="{active: classnone}">{{buttonName}}</div>
  </div>
</template>

<script>
export default {
  name: 'insureResult',
  props: {
    buttonName: {
      type: String,
      default: '返回报价首页'
    },
    messages: {
      type: String,
      default: ''
    },
    imgRul: {
      type: String,
      default: ''
    },
    goRul: {
      type: String,
      default: ''
    },
    mode: {
      type: String,
      default: ''
    },
    classnone: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    goBack () {
      this.$router.push({path: this.goRul})
    }
  }
}
</script>
<style scoped lang="sass">
@import "../assets/style/insureResult.scss"
</style>
