<template>
  <div id="prizes" :class="prizesId ? 'prizesId' : '' ">
     <i class="prizes_question" @click="toPage('/activityinclude')"></i>
      <img src="../../assets/images/prisesTitle.png" />
      <div>
      <p></p>
      <img src="../../assets/images/prizescar.png" class="prizescar" />
      <div class="canvas" id="scratch" >
      	<div id="card" :class="cardHidden ? 'card_inhert' : 'card_hidden' ">
      	<content v-if ="count">
        <div>恭喜您刮出“金马力”</div>
      	<div>{{count.goldenHorsePower}}</div>
      	<div style="color:#999">有效期至{{count.expiredDate | replaceCode(count.expiredDate)}}</div>
      	</content>
        <content v-else>
          <content class="prizes_message">{{promptingMessage}}</content>
        </content>
      	</div>
      </div>
      <div :class="sameTime ? 'immediatelyTime' : 'immediately' ">金马力可用于购买安驾优享服务包，直抵现金</div>
      <div :class="detailContent ? 'detail' : 'detailNone' " @click="toPage('/useranalysis')">查看详细行驶报告</div>
      <div class="lastTime" :class="backHome ? 'visibilityB' : 'visibilityH'">“金马力”<span style="color:#FB1">次日生效</span>，请于<span v-if ="identifier.haveNCD == 'NO'">{{identifier.purchasePackDate | replaceCode(identifier.purchasePackDate)}}</span><span v-else>{{dataTime}}</span>使用</div>
      <button v-if="!prizes &&!backHome&&rewards" :class="prizesDown ? 'prisedown' : 'priseup'" @click="toPage('/serviceslist')" :disabled = "!prizesDown">立即使用金马力</button>
      <!-- servicePrizes -->
      <button  v-if="prizes&&!backHome&&rewards" @click="toPage('/myservice')" class="prisedown">查看我的服务包</button>
       <button  v-if="backHome&&rewards" class="prisedown" @click="toPage(`/home?vin=${vin}&authcode=${authcode}`)">返回首页</button>
      </div>
  </div>
</template>

<script>
import $ from '@/utils'
import LuckyCard from './card'

export default {
  name: 'demo',
  data () {
    return {
      vin: null,
      car_code: true,
      carCode: {},
      prizes: null,
      servicePrizes: false,
      backHome: false,
      backHomes: false,
      authcode: null,
      sameTime: false,
      detailContent: false,
      prizesDown: false,
      prizesSuccess: false,
      cardHidden: false,
      rewards: true,
      count: {},
      addressContent: {},
      showAddress: false,
      promptingMessage: null,
      payConfig: {},
      identifier: {},
      plateNo: null,
      prizesId: true,
      nextPrize: false,
      isPhone: false,
      dataTime: null
    }
  },
  watch: {
    plateNo(cur, old) {
      this.plateNo = cur.toUpperCase()
    }
  },
  methods: {
    toPage(url) {
      this.$router.push({path: url})
    }
  },
  created () {
    $.setDocTitle(`安驾减现金 路遥知“马力”`)
    // console.log(this.$store.state.services.hasBought)
    this.prizes = this.$store.state.services.hasBought
    this.payConfig = this.$store.state.Home.payConfig
    this.vin = this.$store.getters.vin
    this.authcode = this.$store.getters.authCode
    var dataNow = new Date()
    dataNow.setTime(dataNow.getTime() + 24 * 60 * 60 * 1000)
    this.dataTime = dataNow.getFullYear() + '.' + (dataNow.getMonth() + 1) + '.' + dataNow.getDate()
    if (navigator.userAgent.indexOf('iPhone') > -1) {
      this.isPhone = true
    }
    $.post(`/partner/auto/queryLicenseNo/${this.vin}`).then(json => {
      this.carCode = json
      this.plateNo = this.carCode.plateNo
      this.identifier = json
      if (this.carCode.haveNCD && this.carCode.haveNCD !== 'YES' && (this.payConfig.lottoStatus === 'RECEIVED' || this.payConfig.lottoStatus === 'USED')) {
        this.backHome = true
      }
    })
    this.$store.dispatch('USERANALYSISI_TRIPLABE', this.vin)
  },
  mounted () {
    if (this.payConfig.lottoStatus === 'UNRECEIVED') {
      this.rewards = false
      // this.$router.push({path: '/information'})
      this.count = this.payConfig
    } else {
      this.car_code = false
      this.count = null
      this.promptingMessage = '您已领取过金马力'
      this.cardHidden = true
      this.sameTime = true
      this.detailContent = true
      this.prizesDown = true
      this.prizesId = false
      return
    }
    var _this = this
    LuckyCard({
      ratio: 0.7
    }, function() {
      _this.rewards = true
      _this.prizesId = false
      // this.clearCover()
      if (_this.count) {
        _this.prizesSuccess = true
      }
      if (_this.backHomes) {
        _this.backHome = true
      }
      // this.clearCover()
      _this.sameTime = true
      // 这里已经刮过奖了
      if (_this.payConfig.lottoStatus === 'USED') {
        // _this.prizes = false
      } else {
        _this.detailContent = true
        _this.prizesDown = true
      }
      if (_this.nextPrize) {
        return
      }
      $.post(`/ubi/Lottery/${_this.vin}`).then(json => {
        _this.nextPrize = true
        $.post('/ubi/balance', {'vin': _this.vin}).then(json => {
          _this.$store.dispatch('HOME_UPDATE_PAYCONFIG', json)
        })
      })
    })
    setTimeout(() => {
      this.cardHidden = true
    }, 500)
  },
  destroyed () {}
}

</script>

<style scoped lang="scss">

@import '../../assets/style/px2rem.scss';

.prizesId{
  position: absolute;
}
	#prizes{
		// position: absolute;
		width: 100%;
		height: 100%;
		background:#242a39;
		text-align:center;
	    img:nth-child(2){
        padding-top:px2Rem(50px);
		   width: 70%;
		}
		.prizescar{
			width:60%;
		}
		.prizes_question{
			 background:url('../../assets/images/question.png') center center no-repeat;
             height:20px;
             width:20px;
             background-size: 20px;
             display: inline-block;
             position:absolute;
             top:px2Rem(30px);
             right: px2Rem(22px);
		}
		p{
			margin:px2Rem(20px) 0;
			color: #ddd;
			font-size: 14px;
		}
		button {
			width: 70%;
			height:40px;
			text-align: center;
			// border:1px solid #fff;
			color:#fff;
			outline: none;
			border-radius: 4px;
			font-size: 18px;
            line-height: 32px;
			border:none;
      margin-top:px2Rem(60px);
          margin-bottom: px2Rem(110px);
		}
		.canvas{
            position:relative;
            top:-35px;
		} 
		// div{
		// 	color:#999;
		// }
		div:nth-child(1){
			color:#fff;
		}
		.immediately{
			color:#999;
		    position:relative;
			top:-30px;
		}
		.immediatelyTime{
			color:#fff;
			position:relative;
			top:-30px;
		}
		.detail{
           color:#f04080;
           text-decoration:underline;
           visibility: inherit;
           font-size: 16px;
		}
		.detailNone{
			visibility: hidden;
		}
		.prisedown{
			background:red;
			border:none;
		}
		.priseup{
			background:#242a39;
			border:1px solid #aaa;
			color:#999;
		}
	}
	#scratch{
		width:px2Rem(270px);
		height:px2Rem(110px);
		margin: 0 auto;
	  #card{
	  	width:100%;
	  	height:100%;
	  	background:url('../../assets/images/prisesSuccess.png') center center no-repeat;
        background-size: 100%;
        div{
         font-size: 14px;
          width: 85.6%;
         float: right;
         color:#333;
        }
        .prizes_message{
        	color:#FB1;
        	font-size:20px ;
        	line-height:px2Rem(100px);
        	width: 85.6%;
        	float: right;
        }
      div:nth-child(1){
      color:#666;
      margin: px2Rem(15px) 0 px2Rem(2px) 0;
    }
    div:nth-child(2){
			color:#FB1;
			font-size:36px;
			margin-bottom:px2Rem(2px);
		}
	  }
	}
	.card_inhert{
		visibility:inherit;
	}
	.card_hidden{
		visibility:hidden;
	}
  .lastTime{
    color:#fff;
    position:relative;
    top:px2Rem(40px);
  }
  .visibilityB {
    opacity:1;
  }
  .visibilityH{
    opacity: 0;
  }
  section:nth-child(2){
    padding:0 10%;

      .orderAddress{
        background:#fff;
        width: 99%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border: none;
    font-size: 14px;
    border: 1px solid #d7d7d7;
    border-radius: 4px;
    position: relative;
    margin-bottom: 10px;
    span{
      position: absolute;
      left:10px;
      font-size: 14px;
      color:#999;
    }
    input{
      border:none;
      outline: none;
      height: 90%;
      top:0;
      overflow:hidden;
      position: absolute;
      right: 0;
      width: 72%;
      text-align: right;
      font-size: 14px;
      padding-right: 10px;
    }
    .address{
      display:inline-block;
         height: 96%;
      position: absolute;
      right: 10px;
      width: 72%;
      text-align: right;
      font-size: 14px;
      padding-right: 20px;
     i{
   position: absolute;
   display: inline-block;
   width: 20px;
   height: 20px;
   background: url("../../assets/images/arrow.png") top left no-repeat;
      background-position: 0px -20px;
    background-size: 20px;
    right: 0px;
    margin-top: 10px;
 }
    }
  }
  }

  .codeContent{
    margin-top:20px;
    margin-bottom:40px;
    line-height:18px;
    color:#999;
    text-align:left;
  }
  .codeContentNone{
    margin-top:20px !important;
    margin-bottom:60px !important;
  }
  .opacityDN{
    opacity:0;
  }
  .opacityD{
    opacity:1;
  }
</style>
