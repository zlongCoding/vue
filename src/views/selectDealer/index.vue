<template>
  <section id="selectDealer">
    <div v-if="!Options.dealerList.length" class="noData">
      该城市暂无服务经销商，为了向您提供更好的服务，请选择其他投保城市!
    </div>
    <ul>
      <li v-for="item in Options.dealerList" @click="goBack(item)">
        <label>
          <input type="checkbox" class="checkbox-input"/>
          <b><span :class="Req.dealerCode === item.dealerCode ? ' checkout' : 'checkbox-core'"></span></b>
          <span class="checkbox-label">
          <section>{{item.dealerName}}</section>
          <u>{{item.address}}</u>
        </span>
        </label>
      </li>
    </ul>
  </section>
</template>

<script>
  import $ from '@/utils'

  export default {
    name: 'selectDealer',
    computed: {
      Options () {
        return this.$store.state.Insurance.Options
      },
      Req () {
        return this.$store.state.Insurance.Req
      }
    },
    methods: {
      goBack (item) {
        let fromPath = location.search.slice(0)
        this.$router.push({path: `/policy${fromPath}`})
        if (item) {
          this.$store.dispatch('INSURANCE_TOGGLE_DEALER', item)
        }
      }
    },
    beforeMount () {
      $.setDocTitle(`选择服务经销商`)
      this.$store.state.Insurance.isSelectDealer = true
    },
    mounted () {},
    destroyed () {}
  }
</script>

<style scoped lang="sass">
  @import "../../assets/style/selectDealer/index.scss"
</style>
