<template>
  <div id="prizes" :class="prizesId ? 'prizesId' : '' ">
     <i class="prizes_question" @click="toPage('/activityinclude')"></i>
      <img src="../../assets/images/prisesTitle.png" />
      <div class="carCode">
      <section>
        <div>填写信息，领取金马力</div>
        <div v-if="!(identifier.lastBizEndDate && identifier.lastCtpEndDate)">车牌号、上年车险投保地关系到后续服务包的购买及使用，请准确填写！</div>
        <div v-else>车牌号关系到后续服务包的购买及使用，请准确填写！</div>
      </section>
        <section>
        <div class="orderAddress"><span>车牌号</span><input type="text" v-model="plateNo" placeholder="请输入车牌号"/></div>
        <div class="orderAddress" v-if="!(identifier.lastBizEndDate && identifier.lastCtpEndDate)"><span>上年投保地</span><content class="address" @click="toogleArea">{{province.text}} {{city.text}}<i></i></content></div>
        <div class="codeContent" :class="identifier.lastBizEndDate && identifier.lastCtpEndDate ? 'codeContentNone' : '' ">*您需要进入车险投保期间方可购买安驾优享服务包，金马力直抵服务包费用</div>
        <div class="left" @click="toPage(`/home?vin=${vin}&authcode=${authcode}`)">返回</div>
        <div class="right" @click="car_ajax">确认</div>
      </section>
      <div style="clear: both;height:40px;background: #242a39;width: 100%;"></div>
      </div>
      <mt-popup v-model="showAddress" position="bottom">
      <mt-picker :slots="addressSlots" ref="areaPicker"  @change="onAreaChange" :visibleItemCount="5" value-key="value" :showToolbar="true">
        <span class="mint-datetime-action mint-datetime-cancel"  @click="toogleArea">取消</span>
        <span class="mint-datetime-action mint-datetime-confirm" @click="selectArea">确定</span>
        <div class="picker-toolbar-hr"></div>
      </mt-picker>
    </mt-popup>
  </div>
</template>

<script>
import $ from '@/utils'
const $$ = window.Mint

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
      showAddressNone: false,
      addressSlots: [
        {
          flex: 1,
          values: [],
          className: 'slot1',
          textAlign: 'right'
        },
        {
          flex: 1,
          values: [],
          className: 'slot3',
          textAlign: 'left'
        }
      ],
      areaContent: {},
      city: {
        text: null,
        value: null
      },
      province: {
        text: null,
        value: null
      },
      promptingMessage: null,
      payConfig: {},
      identifier: {},
      plateNo: null,
      prizesId: true,
      nextPrize: false,
      isPhone: false
    }
  },
  watch: {
    plateNo(cur, old) {
      this.plateNo = cur.toUpperCase()
    },
    showAddressNone(cur, old) {
      if (cur) {
        document.body.style.overflow = 'hidden'
      }
    }
  },
  methods: {
    onAreaChange(picker, values) {
      if (!this.$refs.areaPicker) return
      if (this.$refs.areaPicker.getValues()[0]) {
        let index = this.$refs.areaPicker.getValues()[0].index
        this.addressSlots[1].values = this.areaContent.cityArr[index]
      }
    },
    toogleArea() {
      if (this.showAddressNone) {
        this.showAddress = !this.showAddress
      }
      if (this.areaContent.cityArr) return
      $.post('/partner/auto/area').then(json => {
        let provinceArr = []
        let cityArr = []
        json.forEach((item, index) => {
          let province = item.province
          province.index = index
          provinceArr.push(province)
          cityArr.push(item.city)
        })
        cityArr.forEach(item => {
          item.map((kid, index) => {
            kid.index = index
          })
        })
        this.addressSlots[0].values = provinceArr
        this.addressSlots[1].values = cityArr[0]
        this.areaContent.provinceArr = provinceArr
        this.areaContent.cityArr = cityArr
        this.showAddressNone = true
        this.showAddress = true
      })
    },
    selectArea() {
      if (this.$refs.areaPicker.getValues()[0] && this.$refs.areaPicker.getValues()[1]) {
        this.city.text = this.$refs.areaPicker.getValues()[1].value
        this.city.value = this.$refs.areaPicker.getValues()[1].key
        this.province.text = this.$refs.areaPicker.getValues()[0].value
        this.province.value = this.$refs.areaPicker.getValues()[0].key
      }
      this.toogleArea()
    },
    toPage(url) {
      this.$router.push({path: url})
    },
    car_ajax() {
      if ((!($.isCar(this.plateNo)) && this.plateNo) || !this.plateNo) {
        $$.Toast('请输入有效的车牌号')
        return
      }
      if ((this.identifier.plateNo === this.plateNo) && (this.identifier.cityName === this.city.text)) {
        if (this.carCode.haveNCD !== 'YES') {
          this.backHomes = true
        }
        this.$router.push({path: '/prizes'})
        this.car_code = false
        return
      }
      $.post('/partner/auto/saveLicenseNo', {'vin': this.vin, 'licenseNo': this.plateNo, 'city': this.city.value, 'province': this.province.value}).then(json => {
        this.$router.push({path: '/prizes'})
        this.car_code = false
        this.backHomes = true
        // this.backHome = true
      })
    }
  },
  created () {
    $.setDocTitle(`安驾减现金 路遥知“马力”`)
    // console.log(this.$store.state.services.hasBought)
    this.prizes = this.$store.state.services.hasBought
    this.payConfig = this.$store.state.Home.payConfig
    this.vin = this.$store.getters.vin
    this.authcode = this.$store.getters.authCode
    if (navigator.userAgent.indexOf('iPhone') > -1) {
      this.isPhone = true
    }
    $.post(`/partner/auto/queryLicenseNo/${this.vin}`).then(json => {
      this.carCode = json
      this.plateNo = this.carCode.plateNo
      this.province.text = this.carCode.provinceName
      this.province.value = this.carCode.province
      this.city.text = this.carCode.cityName
      this.city.value = this.carCode.city
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
  },
  destroyed () {}
}

</script>

<style scoped lang="scss">

@import '../../assets/style/px2rem.scss';

.prizesId{
  position: absolute;
}

  .carCode{
    margin-top:20px;
    box-sizing:border-box;
    border-radius:6px;
   section:nth-child(1){
    div:nth-child(1){
      color:#fff !important;
      font-size:18px;
    }
    div:nth-child(2),div:nth-child(3){
      margin: 10px 0 20px 0;
      color:#f8bf00;
      padding: 0 15%;
      line-height:20px;
    }
    div{
      font-size:14px;
    }
   }
    .left, .right{
      width:120px;
      height:40px;
      text-align:center;
      line-height:40px;
      border-radius:4px;
      display:inline-block;
      font-size:16px;
      color:#fff;
    }
    .left{
      background:#d7d7d7;
     
   float:left;
    }
    .right{
      background:#13d9c8;
      float:right;
    }
  }

  #prizes{
    position: absolute;
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
    //  color:#999;
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
        @media screen and (max-width : 320px){
         .orderAddress input{
           height:80% !important;
         }
        }
</style>
