<template>
  <div id="carInsurance">
     <header class="title_total" v-if="state&&(state.lottoStatus ==='RECEIVED' || state.lottoStatus ==='USED')&&!message"><img src="../../assets/images/COINS.png" />您有<span style="font-weight:bolder">{{state.goldenHorsePower || 0}}</span>金马力，购买安驾优享直抵<span style="color:#13d9c8">{{state.goldenHorsePower || 0}}</span>元！</header>
      <header class="title_total" v-if="state&&state.lottoStatus ==='UNRECEIVED'&&!message"><img src="../../assets/images/COINS.png" />快来收割您的金马力，直抵现金哦~<button @click="toPage('/prizes')">领取金马力</button></header>
     <header class="title_message" v-if="message"><img src="../../assets/images/tool.png" />您已购买安驾优享，未到再次购买时间。<span @click="toPage('/myservice')">查看></span></header>
     <ul class="car_content"  v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" infinite-scroll-immediate-check="false" v-if="data.content&&data.content.length > 0">
     	<li class="car_list" @click="pageBack(`/servicesdetail/?productNo=${item.productNo}`, data.content[index])" v-for="(item, index) in data.content" :key="index">
     	  <img :src="urlCode+item.logoUrl"  class="server_title" />
     	  <div class="car_message">
        <div class="server_message">{{item.productName}}</div>
        <div class="car_before" v-if="(state&&(state.lottoStatus ==='RECEIVED' || state.lottoStatus ==='USED')&&!message)">原价￥<span>{{item.sellingPrice}}</span></div>
        <div class="car_after" v-if="(state&&(state.lottoStatus ==='RECEIVED' || state.lottoStatus ==='USED')&&!message)">金马力立减价 <span>{{Number(Number(Number(item.sellingPrice) - (state&&state.lottoStatus !=='UNRECEIVED'&&Number(Number(state.goldenHorsePower).toFixed(2))|| 0)).toFixed(2))|| 0}}</span>元</div>
        <div class="car_common" v-if="!(state&&(state.lottoStatus ==='RECEIVED' || state.lottoStatus ==='USED')&&!message)">原价<span> {{item.sellingPrice}}<span>元</span></span></div>
     	  	 <!-- <p><span>{{item.productName}}</span>服务包</p> -->
     	  	 <ul>
     	  	 	<li v-for="(items, index) in item.productDescLines"><span v-if="index < 4">{{items}}</span></li>
              <li v-if="item.productDescLines.length > 3"><span>.....</span></li>
     	  	 </ul>     	  	 
     	  </div>
     	  <div class="clear"></div>
     	</li>
     </ul>
    <div class='car_list' v-if="((data.content&&data.content.length <= 0) ||!data.content)&&imgContent">
      <img src="../../assets/images/limits.png"  class="globalImg" />
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
      // title: true,
      // raffle: true,
      page: -1,
      loading: false,
      numPerPage: 10,
      data: {},
      payConfig: {},
      config: '金安驾',
      state: {},
      vin: null,
      message: null,
      urlCode: null,
      imgContent: null
      // srcImg: ['../../assets/images/titleone.png']
    }
  },
  methods: {
    loadMore() {
      this.loading = true
      if ((this.page + 1) * this.numPerPage < this.data.total) {
        this.pageAjax()
      }
    },
    toPage(url) {
      this.$router.push({path: url})
    },
    pageBack(url, config) {
      this.$store.dispatch('SERVICE_DETAIL', config)
      this.$router.push({path: url})
    },
    pageAjax() {
      $$.Indicator.open()
      const data = {
        page: ++this.page,
        size: this.numPerPage,
        vin: this.vin
      }
      $.post('/product/sellProductList', data).then(json => {
        this.data = json
        $$.Indicator.close()
        setTimeout(() => {
          this.imgContent = true
        }, 1000)
      }).catch(err => {
        console.log(err)
      })
    }
  },
  beforeMount () {
    $.setDocTitle(`安驾优享`)
    this.vin = this.$store.getters.vin
    this.payConfig = this.$store.state.Home.payConfig
    this.urlCode = $.urlCode()
    $.post('/ubi/balance', {'vin': this.vin}).then(json => {
      this.state = json
      this.$store.dispatch('HOME_UPDATE_PAYCONFIG', json)
    }).catch(err => {
      console.log(err)
    })
    $.post(`/order/hasBought/${this.vin}`).then(json => {
      this.message = json
      this.$store.dispatch('SERVICE_HASBOUGHT', json)
    }).catch(err => {
      console.log(err)
    })
    this.pageAjax()
  },
  mounted () {},
  destroyed () {}
}

</script>

<style scoped lang="scss">
  @import '../../assets/style/px2rem.scss';
  #carInsurance{
        position: absolute;
    height: 100%;
    width: 100%;
   header {
    height: 40px;
    width: 100%;
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
 .title_total{
   background: #fff;
	        // font-size:14px;
	        button{
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
       .car_content{
         .car_list {
          margin-top: 10px;
          padding:10px;
          background:#fff;
          position:relative;
          .server_title{
           width:px2Rem(180px);
           height:px2Rem(155px);
           margin-right: px2Rem(6px);  
           display: inline-block;
         }
         .car_message{
          display:inline-block;
          position: absolute;
          top:px2Rem(20px);
          p{
           font-size:16px;
           color: #333;
           span{
            font-weight:bolder;
          }
          margin:px2Rem(5px) 0;
        }
        ul{
          // position:absolute;
          // bottom:0;
        }
        li {
         font-size:12px;
         line-height:14px;
                  // color:#999;
                }
                .car_before{
                  margin-top:px2Rem(10px);
                  font-size:12px;

                  span{
                    text-decoration:line-through;
                    font-size:14px;
                  }
                }
                .car_after{
                 color:#13d9c8;
                 padding:px2Rem(2px) 0 px2Rem(8px) 0;
                 span{
                  font-size: 20px;
                }
              }
              .car_common{
                margin: 10px 0;
                span{
                  color:#13d9c8;
                  font-size: 20px;
                  span{
                    font-size: 14px;
                  }
                }
              }
            }
          }
          .clear{
            clear: both; 
          }
        }
      }

      @media screen and (max-width : 320px){
        header {
          font-size:12px !important;
          button{
            font-size:12px !important;
          }
        }
        .car_after{
          font-size: 12px !important;
          span{
            font-size: 14px !important;
          }
        }
        .car_before{
          margin-top:6px !important;
          span{
           font-size:12px !important;
         }
       }
     }
.server_message{
  font-weight:bolder;
  font-size:14px;
}
.server_one{
  background: url("../../assets/images/titleone.png") no-repeat;
      background-size: 100% auto;
}
.server_two{
  background: url("../../assets/images/titleTwo.png") no-repeat;
      background-size: 100% auto;
}
.server_three{
  background: url("../../assets/images/titleThree.png") no-repeat;
      background-size: 100% auto;
}
.globalImg{
    position: absolute;
    left: 50%;
    top: 50%;
    width: 150px;
    height: 162px;
    margin-top: -81px;
    margin-left: -75px;
}
 </style>
