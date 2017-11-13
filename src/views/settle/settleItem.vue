<template>
  <div class="settleItem">
    <div class="item-data"  @click="toPage({billMonth: item.billMonth, totalAmount: item.totalAmount, monthlyBillId: item.monthlyBillId})">
        <div>
          <div><p>{{item.billMonth}}月</p></div>
          <div>
            <p>订单数</p>
            <p>{{item.monthlyBillId}}</p>
          </div>
        </div>
        <div>
          <p v-html="diffSizeAmount(item.totalAmount, '￥')"></p>
        </div>
        <div class='arrow'></div>
    </div>
    <div class="item-opration">
        <router-link :to="{ path: 'invoice', query: { totalAmount: item.totalAmount }}">发票信息</router-link>
        <div class="confirm" v-if="item.status === 'PENDING_CONFIRM'"><popMask :monthlyBillId="item.monthlyBillId" @refresh="refresh()">确认结算</popMask></div>
        <div class="done" v-else>结算完成</div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['item'],
    methods: {
      toPage (data) {
        this.$router.push({name: 'SettleDetail', params: data})
      },
      refresh () {
        this.item.status = 'PENDING_PAYMENT'
      }
    }
  }
</script>

<style lang="scss">
  .settleItem {
    .item-data {
      >div:nth-of-type(2) {
        p {
          small {
            font-size: 1.2rem;
          }
        }
      }
    }
  }
</style>

<style scoped lang="sass">
@import "../../assets/style/settle/index.scss"
</style>
