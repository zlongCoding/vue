<template>
  <div id="scanStatus">
    <div class="status" :class="status">
      <span></span>
      <div v-if="status === 'success'">
        <p>恭喜您已提交成功</p>
        <label>服务内容：{{data.vouchersName}}</label>
        <button class="_button" @click="toOrders">订单服务</button>
      </div>
      <div v-if="status !== 'success'">
        <p>提交失败，请重新提交</p>
        <button class="_button" @click="goBack">重新提交</button>
      </div>
    </div>
  </div>
</template>

<script>
import Controller from './statusHandle'
export default Controller
</script>

<style scoped lang="sass">
@import "../../assets/style/scan/status.scss"
</style>
