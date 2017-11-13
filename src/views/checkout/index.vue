<template>
  <div id="checkout">
    <ul class="checkoutList">
      <li v-for="item in data.List">
        <div class="des">
          <div class="month">10月</div>
          <div class="count">订单数<b>132</b></div>
          <span>
            ¥<b>{{item.price}}.</b>00
          </span>
        </div>
        <div class="action">
          <div class="left">
            <a href="#">发票信息</a>
          </div>
          <div class="right">
            <button class="_button">下载对账清单</button>
            <span>结算完成</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Controller from './handle'
export default Controller
</script>

<style scoped lang="sass">
@import "../../assets/style/checkout/index.scss"
</style>
