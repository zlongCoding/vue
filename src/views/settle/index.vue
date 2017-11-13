<template>
  <div class="settle">
    <li v-for="(item, index) in settleList" :key=index>
      <settleItem :item="item"></settleItem>
    </li>
  </div>
</template>

<script>
  import utils from '@/utils'
  import settleItem from '@/views/settle/settleItem.vue'
  export default {
    name: 'settle',
    data () {
      return {
        settleList: []
      }
    },
    components: {
      settleItem
    },
    methods: {
      getData () {
        utils.ajax('POST')('/writeoff-web-api/vouchers/settlement/bill/monthlyList', {size: 10, page: 0}).then(res => {
          this.settleList = res.content
        })
      }
    },
    beforeMount () {
      utils.setDocTitle(`结算服务`)
    },
    mounted () {
      this.getData()
    },
    destroyed () {
    }
  }
</script>

<style scoped lang="scss">
  .settle {
    li {
      list-style: none;
    }
  }
</style>
