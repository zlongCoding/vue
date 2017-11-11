<template>
  <div class='reserve'>
    <div class="big-show">
      <div v-if="data&&data.lottoStatus ==='RECEIVED'||data.lottoStatus ==='USED'">
        <p>金马力可用于次年续保</p>
        <h1>
          <!--      <span>{{('' + totalHorsePower).split('.')[0]}}</span>
               <span>.{{('' + totalHorsePower).split('.')[1] ? ('' + totalHorsePower).split('.')[1] : '00'}}</span> -->
          <span>{{data.totalHorsePower || 0}}</span>
          <span></span>
        </h1>
        <p>避免急转弯、急加速、急刹车、金马力花费将减少</p>
      </div>
      <div v-else>
        <p></p>
        <h1 style="color: #7A7D82">暂无</h1>
        <p style="color: #989BA0">避免急转弯、急加速、急刹车、金马力花费将减少</p>
      </div>
    </div>
    <div v-if="dataList && dataList.length > 0">
      <p class='text'></p>
      <div class="date-list">
        <ul class="item-container" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading"
            infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
          <li v-for="(item, index) in dataList" :key=index>
            <time>{{item.date}}</time>
            <div class="circle"></div>
            <div class="item-content">
              <statistics :item="item"></statistics>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="nolist" v-else>
      <img src="../../assets/images/error.png" alt="">
      <p>没有行驶评分</p>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import utils from '@/utils'
  import Statistics from '@/views/reserve/statistics.vue'
  import Mint from 'mint-ui'

  export default {
    name: 'reserve',
    data () {
      return {
        pageNo: 0,
        loading: false,
        pageNum: 10,

        dataList: [],
        data: {},
        stopFetch: false
      }
    },
    methods: {
      loadMore () {
        this.loading = true
        if (!this.stopFetch) {
          Mint.Indicator.open()
          this.$store.dispatch('RESERVE_PREMIUM_RECORD', {
            pageNo: ++this.pageNo,
            pageNum: this.pageNum,
            vin: this.vin
          }).then(response => {
            if (response) {
              if (response && response.dataList && response.dataList.length) {
                this.dataList.push(...response.dataList)
              } else {
                this.stopFetch = true
              }
              this.loading = false
              Mint.Indicator.close()
            }
          })
        }
      }
    },
    computed: {
      ...mapGetters([
        'vin'
      ])
    },
    components: {
      Statistics
    },
    created () {
      this.$store.dispatch('RESERVE_PREMIUM_RECORD', {
        pageNo: this.pageNo,
        pageNum: this.pageNum,
        vin: this.vin
      }).then(response => {
        if (response) {
          this.dataList = response.dataList
        }
      })

      this.$store.dispatch('RESERVE_GET_BALANCE', {
        vin: this.vin
      }).then(response => {
        if (response && response.premium) {
          console.log(response)
          this.data = response
        }
      })
    },
    beforeMount () {
      utils.setDocTitle('金马力列表')
    }
  }
</script>
<style scoped lang="sass">
  @import "../../assets/style/reserve/index.scss"
</style>
