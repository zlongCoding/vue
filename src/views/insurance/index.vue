<template>
  <div class="list">
    <div v-if="pageData.content && pageData.content.length > 0" v-infinite-scroll="loadMore"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
      <p>共有 {{pageData.total}} 张保单</p>
      <div class="item" v-for="(item, index) in pageData.content" :key="index">
        <div class="item-title">
          <div :class="{ outdate: item.status == 'EXPIRE' }">
            <span v-show="item.startDate">起保期：</span> {{item.startDate}}
          </div>
          <div :class="{ outdate: item.status == 'EXPIRE' }">{{item.status | config('detailState')}}</div>
        </div>
        <div class="item-content">
          <div class="picc" :class="item.insurer"></div>
          <div>{{item.insurer | config('company')}}</div>
          <div>
            <div v-if="item.ctpPremium">
              <span>交强险</span>
              <span>{{item.ctpPremium}}</span>
            </div>
            <div v-if="item.ctpPremium">
              <span>车船税<span v-show="item.tax">({{item.taxType}})</span></span>
              <span>{{item.tax}}</span>
            </div>
            <div v-if="item.bizPremium">
              <span>商业险</span>
              <span>{{item.bizPremium}}</span>
            </div>
          </div>
        </div>
        <div class="item-footer">
          <div>
            <!--<span>用户支付:</span>-->
            <!--<span>{{item.amount}}</span>-->
          </div>
          <div>
            <div class="button delete" @click="openConfirm(item, index)" v-show="checkDelete(item.status)">
              {{item.status | config('deleteTextShow')}}
            </div>
            <div class="button calc" @click="jump(item.status, item.orderNo, item.bmOrderNo)">
              {{item.status | config('submitTextShow')}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class='nodata' v-if="((pageData.content && pageData.content.length <= 0) || !pageData.content) && blank">
      <img src="../../assets/images/limits.png" alt="">
      <div>您还未有保单哦~</div>
      <button class="btn returnBtn" @click="jumpError()">返回首页</button>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import utils from '@/utils'
  import config from '@/config'
  import Mint from 'mint-ui'

  export default {
    name: 'insuranceList',
    data () {
      return {
        page: 0,
        loading: false,
        loaded: false,
        numPerPage: 10,
        pageData: {},
        blank: false
      }
    },
    methods: {
      jump (status, orderNo, bmOrderNo) {
        // console.log(status, orderNo)
        // 待支付
        if (status === 'TOBEPAID') {
          // 待付款详情页面
          utils.onliePay(bmOrderNo)
        } else if (status === 'CALC') {
          // 待投保 确定保单页面 confirm
//          this.$router.push({name: 'policy'})
          utils.post('/auto/policy/vouchersNo/' + orderNo).then(response => {
            if (response) {
              if (typeof response === 'string') {
                this.$router.push({path: `/policy?vouchersNo=${response}&orderNo=${orderNo}`})
              } else {
                Mint.Toast('卡券号异常，请联系后台服务')
              }
            } else {
              Mint.Toast('卡券号不存在，请联系后台服务')
            }
          }).catch(error => {
            console.log(error)
            // Mint.Toast('获取卡券号失败，请联系后台服务')
          })
//          this.$router.push({path: `/confirm?orderNo=${orderNo}`})
        } else {
          this.toPage('insuranceDetail', orderNo)
        }
      },
      jumpError () {
        let path = '/?vin=' + this.$store.getters.vin + '&authcode=' + this.$store.getters.authCode
        this.$router.push({path: path})
      },
      openConfirm (item, index) {
        Mint.MessageBox.confirm('确定执行此操作?', '提示').then(action => {
          Mint.Indicator.open()
          this.$store.dispatch('LIST_DELETEITEM', {
            item: item,
            index: index
          }).then(response => {
            Mint.Indicator.close()
            if (response && response.orderStatus === 'DELETE') {
              this.pageData.total = response.total
              this.pageData.content.splice(index, 1)
              Mint.Toast('操作成功')
            } else {
              this.pageData.content[index].status = response.orderStatus
              Mint.Toast('操作失败')
            }
          })
        })
      },
      checkDelete (status) {
        return config.deleteButtonShow[status]
      },
      toPage (url, val) {
        this.$store.commit('SET_ORDER_NO', val)
        this.$router.push({name: url, params: {orderNo: val}})
      },
      loadMore () {
        this.loading = true
        if ((this.page + 1) * this.numPerPage < this.pageData.total) {
          Mint.Indicator.open()
          this.$store.dispatch('LIST_INITORDERLIST', {
            page: this.page,
            size: this.numPerPage,
            vin: this.vin
          }).then(response => {
            Mint.Indicator.close()
            this.loading = false
            if (response) {
              this.pageData.content.push(...response.content)
            }
            setTimeout(() => {
              this.blank = true
            }, 500)
          }).catch(error => {
            console.log(error)
          })
        }
      }
    },
    computed: {
      ...mapGetters([
        'vin'
      ])
    },
    created () {
      Mint.Indicator.open()
      this.$store.dispatch('LIST_INITORDERLIST', {
        page: this.page,
        size: this.numPerPage,
        vin: this.vin
      }).then(response => {
        Mint.Indicator.close()
        if (response) {
          this.pageData = response
          // todo
          this.loaded = true

          setTimeout(() => {
            this.blank = true
          }, 1000)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    beforeMount () {
      utils.setDocTitle('保单列表')
    }
  }
</script>

<style lang="sass" scoped>
  @import "../../assets/style/list/index.scss"
</style>
