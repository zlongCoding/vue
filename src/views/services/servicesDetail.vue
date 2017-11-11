<template>
  <div id="serverdetail" v-if = "pageContent">
     <!-- <header v-if="hasBought"><img src="../../assets/images/tool.png"/>您已购买安驾优享，未到再次购买期间。<span @click="toPage('/myservice')">查看></span></header> -->
     <header class="title_message" v-if="hasBought"><img src="../../assets/images/tool.png" />您已购买安驾优享，未到再次购买时间。<span @click="toPage('/myservice')">查看></span></header>
      <header class="title_total" v-if="state&&(state.lottoStatus ==='RECEIVED' || state.lottoStatus ==='USED')&&!hasBought"><img src="../../assets/images/COINS.png" />您有<span style="font-weight:bolder">{{state.goldenHorsePower || 0}}</span>金马力，购买安驾优享直抵<span style="color:#13d9c8">{{state.goldenHorsePower || 0}}</span>元！</header>
      <header class="title_total" v-if="state&&state.lottoStatus ==='UNRECEIVED'&&!hasBought"><img src="../../assets/images/COINS.png" />快来收割您的金马力，直抵现金哦~<button id="button" @click="toPage('/prizes')">领取金马力</button></header>
           <button v-if="!back || hasBought" @click="toPage()" class="fixbutton">返回</button>
     <button v-if="back && !hasBought" @click="toPageBack(`/sureorder?productNo=${productNo}`)"  class="fixbutton">立即购买</button>
     <img :src="urlCode+data.mainPictureUrl" class="server_img" />
     <div class="server_message">
       <p class="none_all">{{data.productName}} <span v-if = "!(state&&(state.lottoStatus ==='RECEIVED' || state.lottoStatus ==='USED')&&!hasBought)">原价￥{{data.sellingPrice}}</span></p>
       <ul v-if = "(state&&(state.lottoStatus ==='RECEIVED' || state.lottoStatus ==='USED')&&!hasBought)">
         <li>
           <img src="../../assets/images/COINS.png" />
           金马力立减<span class="color_blue"> {{state && state.lottoStatus !=='UNRECEIVED' &&state.goldenHorsePower || 0}} </span>元
         </li>
         <li>
           <span class="color_orange"><span>{{Number(Number(Number(data.sellingPrice) -(state && state.lottoStatus !=='UNRECEIVED' && Number(state.goldenHorsePower) || 0)).toFixed(2)) }}</span>元</span>
         </li>
       </ul>
       <p style="clear:both" v-if = "(state&&(state.lottoStatus ==='RECEIVED' || state.lottoStatus ==='USED')&&!hasBought)"></p>
       <p class="originally" v-if = "(state&&(state.lottoStatus ==='RECEIVED' || state.lottoStatus ==='USED')&&!hasBought)"> 原价￥<span class="server_call">{{data.sellingPrice}}</span></p>
     </div>
     <section v-if = "data.subProductMOGroup">
        <hgroup>服务包详情</hgroup>
        <div v-html="contentDetail">
        </div>
     </section>

     <div class="car_fixed" v-if="car_code"></div>
      <div class="carCode" v-if="car_code">
        <div>提示</div>
        <div style="color:#666">{{errorMessage}}</div>
        <!-- <div style="color:#666">您有金马力待领取，可直抵服务包费用~</div> -->
        <div class="right" @click="server_none" v-if = "!prizesDown">确认</div>
        <div class="right"v-else>
          <div @click="server_none">取消</div>
          <div  @click="toPage(urlBack)">{{buttonMessage}}</div>
        </div>
      </div>
  </div>
</template>

<script>
import $ from '@/utils'
const $$ = window.Mint

export default {
  name: 'demo',
  data () {
    return {
      title: true,
      back: true,
      car_code: false,
      state: {},
      payConfig: {},
      productNo: null,
      data: {},
      prizesDown: false,
      errorMessage: null,
      listContent: {},
      contentDetail: null,
      urlCode: null,
      vin: null,
      hasBought: false,
      buttonMessage: null,
      urlBack: null,
      pageContent: null
    }
  },
  methods: {
    server_none() {
      this.car_code = !this.car_code
    },
    toPageBack(url) {
      if (this.state && this.state.lottoStatus === 'UNRECEIVED') {
        this.car_code = true
        this.prizesDown = true
        // this.back = false
        this.errorMessage = '您有金马力待领取，可直抵服务包费用~'
        this.buttonMessage = '领取金马力'
        this.urlBack = '/prizes'
        return
      }
      // if (this.hasBought) {
      //   this.car_code = true
      //   this.prizesDown = true
      //   this.errorMessage = '尚未到购买期间，您可在进入车险投保期间内领取金马力后再购买此服务包，金马力直抵服务包费用哦~'
      //   // this.back = false
      //   this.buttonMessage = '查看服务包'
      //   this.urlBack = '/myservice'
      //   return
      // }
      $$.Indicator.open()
      $.post(`/order/valid-buy/${this.vin}/${this.$route.query.productNo}`).then(json => {
        $$.Indicator.close()
        this.$store.dispatch('SERVICE_BUYAREA', json)
        if (json.permit === false) {
          this.car_code = true
          this.prizesDown = false
          this.back = false
          this.errorMessage = json.reason
        } else {
          this.$router.push({path: url})
        }
      }).catch(err => {
        console.log(err)
      })
    },
    toPage(url) {
      if (url) {
        console.log(url)
        this.$router.push({path: url})
      } else {
        this.$router.go(-1)
      }
    }
  },
  beforeMount () {
    $.setDocTitle(`服务包详情`)
    $$.Indicator.open()
    this.productNo = this.$route.query.productNo
    // this.payConfig = this.$store.state.Home.payConfig
    this.hasBought = this.$store.state.services.hasBought
    // this.state = this.$store.state.Home.payConfig
    this.vin = this.$store.getters.vin
    this.urlCode = $.urlCode()
    $.post('/ubi/balance', {'vin': this.vin}).then(json => {
      this.state = json
      if (this.state && this.state.lottoStatus === 'INELIGIBLE') {
        this.back = false
      }
      this.$store.dispatch('HOME_UPDATE_PAYCONFIG', json)
    }).catch(err => {
      console.log(err)
    })
    $.post(`/product/productDetail/${this.$route.query.productNo}`).then(json => {
      this.data = json
      console.log(this.data.mainPictureUrl)
      this.$store.dispatch('SERVICE_COMPANY', json)
      // /staticpage/gold.html
      $.get(`/${this.data.detailDescUrl}`).then(json => {
        $$.Indicator.close()
        this.contentDetail = json
      }).catch(err => {
        console.log(err)
      })
      setTimeout(() => {
        this.pageContent = true
      }, 100)
    }).catch(err => {
      console.log(err)
    })
    this.listContent = this.$store.state.services.detail
  },
  mounted () {},
  destroyed () {}
}

</script>

<style scoped lang="scss">
@import '../../assets/style/px2rem.scss';

  #serverdetail{
   header {
    height: 40px;
    width: 100%;
    margin-bottom: 10px;
    padding-left: 15px;
    line-height: 40px;
    font-size: 14px;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    ul{
      overflow-y: auto
    }
    img {
     width:20px;
     height:20px;
     margin-right:4px;
     position: relative;
     top: 4px; 
   }
   span{
     font-size:12px;
   }
 }
  .server_img{
    width:100%;
    height:auto;
  }
  .server_message{
    padding:15px 20px 20px 20px;
    background:#fff;
    p {
      font-size:18px;
      margin-bottom: px2Rem(4px);
    }
    ul{
      li{
        font-size:12px;
        display: inline-block;
      }
      img{
        width:15px;
        height:15px;
        position:relative;
        top:2px;
      }
      li:nth-child(2){
        float:right;
        margin-top:0px;
        .server_call{
          text-decoration:line-through;
        }
        .color_orange{
         span{
          font-size: 18px;
         }
        }
      }
    }
  }
  .fixbutton{
    width:100%;
    height:px2Rem(45px);
    background:#13d9c8;
    font-size:18px;
    color:#fff;
    outline: none;
    border: none;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index:1000;
  }
  hgroup{
    font-weight: bolder;
    font-size:14px;
    height:px2Rem(35px);
    line-height:px2Rem(35px);
    border-bottom: 1px solid #ddd;
    padding-left:20px;
  }
  section{
   padding-bottom: 20px;
    background:#fff;
    margin:12px 0 px2Rem(60px) 0;
    .server_content_other{
      img{
        width:20px;
        height:auto;
        position:absolute;
        left:20px;
      }
      li{
        label{
          float:right;
        }
        padding-left:8px;
        position:relative;
        line-height:20px;
        &:before{
            content:'.';
            position:absolute;
            left: -1px;
            font-size:16px;
            color:#000;
            top:-6px;
          }
        span{
          font-weight:bolder;
          display: inline-block;
        }
      }
    }
    .server_content{
      div{
        margin-bottom: px2Rem(4px);
      }
      padding:0 20px;
      i {
        display: inline-block;
        width: 3px;
        height: 10px;
        margin-right: 11px;
        background: #56DEC6;
      }
      li{
        font-size:12px;
      }
      margin-top:20px;
    }
    .server_content_first{
       border:1px solid #13d9c8;
       padding:px2Rem(15px) 0;
       // position:relative;
       .server_meal, .server_maintenance{
        
         width:49%;
         display:inline-block;
         padding:px2Rem(5px) px2Rem(25px);
         box-sizing:border-box;
         p{
          font-weight:bolder;
          margin-bottom:4px;
         }
         li{
          color:#333;
          font-size:12px;
          position:relative;
          padding-left: px2Rem(10px);
          line-height:16px;
          &:before{
            content:'.';
            position:absolute;
            left: 0px;
            font-size:16px;
            color:#000;
            top:-6px;
          }
         }
       }
       .server_meal{
          border-right:1px solid #13d9c8;
         float:left;
       }
       .server_maintenance{
        float:right;
       }
    }
  }
}
.server_padding{
  padding-left: 50px !important;
}
.color_blue{
  color:#13d9c8;
}
.color_orange{
  color:#ee6f44;
}
.font_weight{
  font-weight:bolder;
} 
.multiplied{
  display:inline-block;
  margin-bottom: 0 !important;
}
@media screen and (max-width : 320px){
  header {
    font-size:12px !important;
  }
}

 .car_fixed{
  position:fixed;
  width:100%;
  height:100%;
  background:#000;
      opacity: .5;
    top: 0;
    left: 0;
    z-index:1001;
 }
  .carCode{
    position:fixed;
    width:300px;
    background:#fff;
    left:50%;
    top:50%;
    margin-left: -150px;
    margin-top: -80px;
    padding: 20px 10px 0 10px;
    box-sizing:border-box;
    border-radius:6px;
    z-index: 1100;
    text-align: center;
    div:nth-child(1){
     font-size:16px;
     color:#000;
    }
    div:nth-child(2){
     font-size:14px;
     padding:20px 5px;
     line-height: 16px;
    }
    div:nth-child(3){
     font-size:16px;
     color:#13d9c8;
     height:45px;
     line-height:45px;
     text-align:center;
     width:300px;
     margin-left:-10px;
     border-top:1px solid #eee;
    }
    .right{
      div{
        width:49%;
        display:inline-block;
        margin:0;
        padding:0;
      }
      div:nth-child(1){
     font-size:16px;
     color:#999;
     border-right:1px solid #eee;
    }
        div:nth-child(2){
     font-size:16px;
     color:#13d9c8;
     height: 100%;
    line-height: inherit;
    }
    }
  }
   .originally{
    font-size:12px !important;
    text-align:right;
    width:100%;
    float:right;
      .server_call{
          text-decoration:line-through;
    }
  }
  .none_all{
    span {
          float: right;
    font-size: 14px;
    }

  }
   .title_total{
   background: #fff;
          // font-size:14px;
          #button{
            height:30px;
            background:#13d9c8;
            border:none;
            width:px2Rem(90px);
            float:right;
            margin-right:px2Rem(10px);
            margin-top: 5px;
            color:#fff;
            font-size:14px;
          }
       }
              .title_message{
         color:#ef6f42;
         background: #fcf8e3;
         padding-right:20px;
         span {
           float: right
         }
       }
             @media screen and (max-width : 320px){
        header {
          font-size:12px !important;
          #button{
            font-size:12px !important;
          }
        }
       }
</style>
