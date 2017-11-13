<template>
  <div class="settledetail">
    <div>
      <p>{{billMonth}}月待结算金额</p>
      <p v-html="diffSizeAmount(totalAmount, '￥')"></p>
    </div>
    <li v-for="(item, index) in settleDetailList" :key=index>
      <settleDetailItem :item="item"></settleDetailItem>
    </li>
  </div>
</template>

<script>
  import utils from '@/utils'
  import settleDetailItem from '@/views/settledetail/settleDetailItem.vue'
  export default {
    name: 'settle',
    data () {
      return {
        settleDetailList: [],
        billMonth: 0,
        totalAmount: 0,
        monthlyBillId: 0
      }
    },
    components: {
      settleDetailItem
    },
    methods: {
    },
    beforeMount () {
      utils.setDocTitle(`结算服务明细`)
      let { billMonth, totalAmount, monthlyBillId } = this.$route.params
      this.billMonth = billMonth
      this.totalAmount = totalAmount
      this.monthlyBillId = monthlyBillId
    },
    mounted () {
      utils.ajax('POST')('/writeoff-web-api/vouchers/settlement/bill/list', {size: 10, page: 0, monthlyBillId: this.monthlyBillId}).then(res => {
        this.settleDetailList = res.content
      })
    },
    destroyed () {
    }
  }
</script>
<style lang="scss">
  .settledetail {
    >div {
      p:nth-of-type(2) {
        small {
          font-size: 1.5rem;
        }
      }
    }
  }
</style>
<style scoped lang="scss">
  .settledetail {
    >div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 150px;
      background-color: #13D9C8;
      color: #fff;
      p:nth-of-type(1) {
        margin-bottom: 10px;
      }
      p:nth-of-type(2) {
        font-size: 2rem;
      }
    }
    li {
      list-style: none;
    }
  }
</style>
