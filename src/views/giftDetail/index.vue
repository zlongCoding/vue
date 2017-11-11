<template>
  <div class='gift-detail'>
    <div class="detail">
      <div class="plain">
        <div class="upper">
          <h1>{{vouchersName}}</h1>
          <div>
            <div>
              <p><span class="num">{{result.quantity}}</span><span>次</span></p>
              <p>剩余可用</p>
            </div>
            <div>
              <p>{{result.expiryDate}}</p>
              <p>到期时间</p>
            </div>
          </div>
        </div>
        <div class="lower">
          <img :src= "imgBaseUrl + result.base64QRCode" v-if="result.base64QRCode"
          />
          <div class="botton" v-if="result.quantity > 1">
            <span @click="getVoucherDetail()">再次使用</span>
          </div>
        </div>
      </div>
    </div>
    <div class="info">
<!--       <div class="page-navbar">
        <mt-navbar class="page-part" v-model="selected">
          <mt-tab-item id="1">服务详情</mt-tab-item>
          <mt-tab-item id="2">商家信息</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="selected">
          <mt-tab-container-item id="1">
            
          </mt-tab-container-item>
          <mt-tab-container-item id="2">
             <div @click="goBusinesslist()" ><span>查看全部264家店</span></div>
             <i class="cell-allow-right"></i>
          </mt-tab-container-item>
        </mt-tab-container>
      </div> -->
      <div class="page-parts">
         <div class="left " @click="displaynone('one')" :class="isselecteds === 'one' ? 'isselected' : '' ">服务详情</div>
         <div class="right" @click="displaynone('two')" :class="isselecteds === 'two' ? 'isselected' : '' ">商家信息</div>
      </div>
<div class="detailcomponent" v-if="isselecteds === 'one'"><detail-componentfrom :content="result.vouchersName"></detail-componentfrom></div>
  <div @click="goBusinesslist()" v-if="isselecteds === 'two'" class="goBusinesslist"><span>查看全部商家</span>
   <i class="cell-allow-right"></i>
  </div>
       
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import utils from '@/utils'
import { Navbar } from 'mint-ui'
import detailComponentfrom from './detailComponent.vue'
console.log(Navbar)
export default {
  name: 'giftDetail',
  data: function () {
    return {
      selected: '1',
      result: {},
      vouchersName: '',
      isselecteds: 'one',
      imgBaseUrl: 'data:image/jpg;base64,'
    }
  },
  methods: {
    goBusinesslist() {
      this.$router.push({path: 'businesslist', query: {vouchersNo: this.vouchersNo}})
    },
    displaynone(code) {
      this.isselecteds = code
    },
    getVoucherDetail() {
      utils.post(`/vouchers/voucherDetail/${this.vouchersNo}`).then(json => {
        this.result = json
        this.$store.dispatch('SERVICE_MAPLIST', json)
      })
    }
  },
  components: {
    detailComponentfrom: detailComponentfrom
  },
  computed: {
    ...mapGetters([
      'vouchersNo'
    ])
  },
  created () {
    this.vouchersName = this.$route.params.vouchersName
    this.getVoucherDetail()
  },
  beforeMount () {
    utils.setDocTitle('礼包详情')
  }
}
</script>
<style scoped lang="scss">
.gift-detail {
  .detail {
    background: #13D9C8;
    overflow: hidden;
    .plain {
      width: 94%;
      background: #fff;
      margin: 10px auto;
      border-radius: 5px;
      .upper {
        overflow: hidden;
        background-image: linear-gradient(to right, #13D9C8 50%, rgba(255, 255, 255, 0) 0%);
        background-position: bottom;
        background-size: 10px 1px;
        background-repeat: repeat-x;
        h1 {
          text-align: center;
          margin: 10px auto;
          font-size: 16px;
        }
        >div{
          display: flex;
          justify-content: space-between;
          >div{
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            padding: 10px 20px;
            padding-top: 0;
            flex: 1;
            text-align: center;
            p {
              padding: 10px;
              .num {
                font-size: 38px;
                color: #13D9C8;
                margin-right: 5px;
              }
            }
        }
        }
      }
      .lower {
        overflow: hidden;
        img {
          width: 300px;
          height: 300px; // background: red;
          margin: 20px auto;
          display: block;
        }
        .botton {
          width: 300px;
          height: 40px;
          background: #13D9C8;
          color: #ffffff;
          margin: 0 auto 10px;
          text-align: center;
          vertical-align: middle;
          font-size: 16px;
          border-radius: 3px;
          span {
            height: 40px;
            line-height: 40px;
          }
        }
      }
    }
  }
}
</style>

<style lang="scss">
  .info {
    .mint-tab-item-label {
      font-size: 16px;
    }
    .mint-tab-container-item:nth-of-type(2) {
      div {
        background: #fff;
        padding: 16px;
        span {
          font-size: 16px;
        }
      }
    }
    .cell-allow-right {
      display: inline-block;
      width: 15px;
      height: 15px;
      background: url("../../assets/images/arrow.png") top left no-repeat;
      background-position: 0px 0px;
      background-size: 15px;
      position:absolute;
      right:12px;
      top:15px;
    }
  }
  .detailcomponent{
    background:#fff;
  }
  .page-parts{
        background-color: #fff;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    text-align: center;
    div{
          color: #13d9c8;
          display: block;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    text-decoration: none;
       height:50px;
       line-height:50px;
    font-size: 15px;
    }

  }
  .isselected{
    // border-bottom: 3px solid #26a2ff;
    color: #26a2ff;
    // margin-bottom: -3px;
    color: #26a2ff !important;
  }
  .goBusinesslist{
        -ms-flex-negative: 0;
    flex-shrink: 0;
    width: 100%;
        background: #fff;
    padding: 0 16px;
    height:50px;
    line-height:50px;
    position:relative;
        box-sizing: border-box;
    span{
          font-size: 16px;
    }
    i{
      right:45px !important;
      top:17px !important;
    }
  }
</style>
