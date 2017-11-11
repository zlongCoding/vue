<template>
  <div id="sureOrder">
     <div class="server_message">
       <p>{{company.productName}}</p>
       <ul>
         <li>
           <img src="../../assets/images/COINS.png" />
           金马力立减<span class="color_blue"> {{allNum.goldenHorsepower}} </span>元
         </li>
         <li>
           <span class="color_orange"><span>{{allNum.prdCurrentPrice}}</span>元</span>
         </li>
       </ul>
       <p style="clear:both"></p>
       <p class="originally"> 原价￥<span class="server_call">{{allNum.prdOriginalPrice}}</span></p>
     </div>
  <div class="sure_content">
              <ul class="sureOrder_first">
                 <p class="sureOrder_p">包含服务</p>
                <li class="sureOrder_meal" >
                      <div v-for="(item, index) in companyLeft">{{item}}</div>
                 </li>
                 <li class="server_maintenance">
                    <div v-for="(item, index) in companyRight">{{item}}</div>
                 </li>
                 <li style="clear:both"></li>
              </ul>
</div>
     <section class="order_content">
        <header class="order_car">
          <i></i>车险投保城市
          <div @click="address">{{province.text}} {{city.text}}</div>
           <em class="cell-allow-right"></em>
        </header>
        <div class="content_order" v-if =" allNum.insurerDiscountList && allNum.insurerDiscountList.length > 0">
          <header><i></i>选择车险投保公司</header>
          <ul>
             <li @click="changeOther(item.key, item.value)" v-for="(item, index) in allNum.insurerDiscountList">
               <div class="sectionss">
                <!-- <span class="checkout-span checkboxradio-no" v-show="!checkTwo.boolean"></span> -->
                 <span class="checkout-span " :class=" content === item.key ? 'checkboxradio' : 'checkboxradio-no' "></span>
                 <section class="sections">{{item.key | config('company')}}</section>
               </div>
              </li>
          </ul>
        </div>
        <div class="content_order" v-if ="allNum.premiumPlusFlag">
          <header><i></i>车险保费差价 <span class="sure_color">{{allNum.premiumPlusPrice}}</span></header>
          <ul>
             <li class="title_message">
               出险次数影响车险保费价格，因您的车辆自上次车险投保至今的商业险出险次数&ge;2次，您需要额外支付1000元车险保费差价
              </li>
          </ul>
        </div>
        <div class="content_order margin_top" v-if ="company.featuredProductMOList">
          <header><i></i>其他自选服务</header>
          <ul>
             <li @click="changeAll(item.productNo, index, item.sellingPrice)" v-for="(item, index) in company.featuredProductMOList">
               <div class="sectionss">
               <span class="checkout-span checkbox-core" v-show="!checkOne.boolean"></span>
                 <span class="checkout-span" :class=" checkboxALL[item.productNo] ? 'checkout' : 'checkbox-core'" v-show="checkOne.boolean"></span> <span style="display:none">{{productNoList.includes(index)}}</span><section class="sections">{{item.productName}}</section></div>
               <div class="sure_color" v-if="checkboxALL[item.productNo]">{{item.sellingPrice}}</div>
              </li>
          </ul>
        </div>
        <header class="content_order margin_top">
          <label>含：金安驾<span v-if="allNum.premiumPlusFlag">+车险保费差价</span><span v-if="productNoList && productNoList.length">+自选服务</span></label><span class="floatRight">合计：<span class="sure_color">¥{{allNum.paymentAmount}}</span></span>
        </header>
        <p class="argument">
      <label ><span class="checkout-span" :class=" checkedBox ? 'checkout' : 'checkbox-core' " ></span><input type="checkbox"   ref="input" :checked="checkedBox" @change="checkbox"/> 本人同意 &nbsp;</label>
      <a class="argument_content" @click="toPage('/userprotocol')">《安驾优享用户协议》</a>
    </p>
        <!-- <div class="sure_total">合计：<span class="sure_color">￥<span>3488.00</span></span></div> -->
     </section>
     <div class="pay">
      <div class="yingfu">应付：</div>
      <div class="price" >
        ¥<span>{{allNum.paymentAmount}}</span>
      </div>
      <button @click="submit" :class="checkedBox ? '' : 'colorGray'">提交订单</button>
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
      title: true,
      back: false,
      vin: null,
      productNoList: [],
      checkedBox: true,
      ajaxArea: null,
      province: {
        text: null,
        value: null
      },
      city: {
        text: null,
        value: null
      },
      checkboxALL: {},
      areaContent: {},
      priceConfig: {},
      insurer: null,
      productNo: null,
      checkOne: {
        checkout: false,
        boolean: false
      },
      checkTwo: {
        checkout: false,
        boolean: false
      },
      checkThree: {
        checkout: false,
        boolean: false
      },
      allNum: {},
      showAddress: false,
      addressChange: false,
      productNum: [],
      addressSlots: [
        {
          flex: 1,
          values: [],
          textAlign: 'center'
        }
      ],
      content: null,
      company: {},
      companyLeft: [],
      companyRight: [],
      beforeHorsepower: 0
    }
  },
  watch: {
    showAddress(cur, old) {
      if (cur) {
        document.body.style.overflow = 'hidden'
      }
    }
  },
  methods: {
    toPage(url) {
      this.$router.push({path: url})
    },
    address() {
      if (this.ajaxArea) {
        this.showAddress = true
        return
      }
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
        // this.province.text = provinceArr[0].value
        // this.city.text = cityArr[0][0].value
        // this.province.value = provinceArr[0].key
        // this.city.value = cityArr[0][0].key
        // this.addressSlots[0].values = provinceArr
        console.log(cityArr)
        console.log(provinceArr)
        for (let i = 0; i < provinceArr.length; i++) {
          if (provinceArr[i].value === this.province.text) {
            this.addressSlots[0].values = cityArr[i]
          }
        }
        // this.addressSlots[0].values = cityArr
        this.areaContent.provinceArr = provinceArr
        this.areaContent.cityArr = cityArr
        this.ajaxArea = true
        this.showAddress = true
      }).catch(err => {
        console.log(err)
      })
    },
    checkbox() {
      this.checkedBox = !this.checkedBox
    },
    computationsNum() {
      this.allNum.prdCurrentPrice = Number(Number(Number(Number(this.allNum.prdOriginalPrice).toFixed(2)) - Number(Number(this.allNum.goldenHorsepower).toFixed(2))).toFixed(2))
    },
    onAreaChange(picker, values) {
      if (!this.$refs.areaPicker) return
      // if (this.$refs.areaPicker.getValues()[0]) {
        // console.log(this.$refs.areaPicker.getValues()[0])
        // let index = this.$refs.areaPicker.getValues()[0].index
        // console.log(this.areaContent.cityArr[index])
        // this.addressSlots[0].values = this.areaContent.cityArr[index]
        // this.addressSlots[0].values = this.$refs.areaPicker.getValues()[0]
      // }
    },
    changeOther(content, num) {
      if (content !== this.content) {
        this.content = content
        this.insurer = content
        this.allNum.goldenHorsepower = Number(Number(Number(Number(this.allNum.goldenHorsepower).toFixed(2)) + Number(Number(num).toFixed(2)) - Number(Number(this.beforeHorsepower).toFixed(2))).toFixed(2))
        this.beforeHorsepower = Number(Number(Number(num).toFixed(2)).toFixed(2))
        this.allNum.prdCurrentPrice = Number(Number(Number(Number(this.allNum.prdOriginalPrice).toFixed(2)) - Number(this.allNum.goldenHorsepower)).toFixed(2))
        this.allNum.paymentAmount = Number(Number(Number(Number(this.allNum.totalAmount).toFixed(2)) - Number(Number(this.allNum.goldenHorsepower).toFixed(2))).toFixed(2))
      }
    },
    changeAll(config, index, num) {
      this.checkOne.boolean = true
      if (this.checkboxALL[config]) {
        this.checkboxALL[config] = false
        this.allNum.paymentAmount = Number(Number(Number(Number(this.allNum.paymentAmount).toFixed(2)) - Number(Number(num).toFixed(2))).toFixed(2))
        this.allNum.totalAmount = Number(Number(Number(Number(this.allNum.totalAmount).toFixed(2)) - Number(Number(num).toFixed(2))).toFixed(2))
        for (var i = 0; i < this.productNoList.length; i++) {
          if (this.productNoList[i] === config) {
            this.productNoList.splice(i, 1)
            this.productNum.splice(i, 1)
          }
        }
      } else {
        this.checkboxALL[config] = true
        this.productNoList.push(config)
        this.productNum.push(num)
        this.allNum.paymentAmount = Number(Number(Number(Number(this.allNum.paymentAmount).toFixed(2)) + Number(Number(num).toFixed(2))).toFixed(2))
        this.allNum.totalAmount = Number(Number(Number(Number(this.allNum.totalAmount).toFixed(2)) + Number(Number(num).toFixed(2))).toFixed(2))
      }
    },
    submit() {
      if (!this.checkedBox) {
        return
      }
      const config = {
        'city': this.city.value,
        'featuredProductNoList': this.productNoList,
        'insurer': this.insurer,
        'productNo': this.productNo,
        'province': this.province.value,
        'paymentAmount': this.allNum.paymentAmount,
        'vin': this.vin
      }
      $$.Indicator.open()
      $.post('/order/submit', config).then(json => {
        $$.Indicator.close()
        // this.$store.dispatch('SERVICE_VOUCHERSNO', json.vouchersNo)
        // this.$router.push({path: '/success'})
        if (json.partnerOrderNo) {
          $.onliePay(json.partnerOrderNo)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    onValuesChange(picker, values) {
      if (!values[0]) return
      this.addressChange = values[0].value
    },
    computations() {
      const config = {
        'city': this.city.value,
        'featuredProductNoList': this.productNoList,
        'insurer': this.insurer,
        'productNo': this.productNo,
        'province': this.province.value,
        'vin': this.vin
      }
      $$.Indicator.open()
      $.post('/order/calc-order-amount', config).then(json => {
        this.allNum = json
        $$.Indicator.close()
        if (json.warningMessage) {
          $$.Toast(json.warningMessage)
        }
        if (json.insurerDiscountList.length > 0) {
          for (var i = 0; i < json.insurerDiscountList.length; i++) {
            if (json.insurerDiscountList[i].selected === 'Y') {
              this.content = json.insurerDiscountList[i].key
              this.insurer = json.insurerDiscountList[i].key
              this.allNum.goldenHorsepower = Number(Number(Number(Number(this.allNum.goldenHorsepower).toFixed(2)) + Number(Number(json.insurerDiscountList[i].value).toFixed(2))).toFixed(2))
              this.beforeHorsepower = Number(Number(Number(json.insurerDiscountList[i].value).toFixed(2)).toFixed(2))
              this.allNum.prdCurrentPrice = Number(Number(Number(Number(this.allNum.prdOriginalPrice).toFixed(2)) - Number(this.allNum.goldenHorsepower)).toFixed(2))
              this.allNum.paymentAmount = this.allNum.prdCurrentPrice
            }
          }
        }
        if (this.productNum.length > 0) {
          var productNumTotal = 0
          for (var j = 0; j < this.productNum.length; j++) {
            productNumTotal = productNumTotal + this.productNum[j]
          }
          this.allNum.totalAmount = Number(Number(Number(Number(productNumTotal).toFixed(2)) + Number(Number(this.allNum.prdOriginalPrice).toFixed(2))).toFixed(2))
        } else {
          this.allNum.totalAmount = Number(Number(this.allNum.prdOriginalPrice).toFixed(2))
        }
        var productNumPayment = 0
        if (this.productNum.length > 0) {
          for (var u = 0; u < this.productNum.length; u++) {
            productNumPayment = productNumPayment + this.productNum[u]
          }
          this.allNum.paymentAmount = Number(Number(Number(Number(productNumPayment).toFixed(2)) + Number(Number(this.allNum.prdCurrentPrice).toFixed(2))).toFixed(2))
        } else {
          this.allNum.paymentAmount = Number(Number(this.allNum.prdCurrentPrice).toFixed(2))
        }
        if (json.premiumPlusFlag === true) {
          this.allNum.totalAmount = Number(Number(Number(Number(this.allNum.totalAmount).toFixed(2)) + Number(Number(this.allNum.premiumPlusPrice).toFixed(2))).toFixed(2))
          this.allNum.paymentAmount = Number(Number(Number(Number(this.allNum.paymentAmount).toFixed(2)) + Number(Number(this.allNum.premiumPlusPrice).toFixed(2))).toFixed(2))
        }
      }).catch(err => {
        console.log(err)
      })
    },
    toogleArea() {
      this.showAddress = !this.showAddress
    },
    selectArea() {
      if (this.$refs.areaPicker.getValues()[0]) {
        // this.province.text = this.$refs.areaPicker.getValues()[0].value
        this.city.text = this.$refs.areaPicker.getValues()[0].value
        this.city.value = this.$refs.areaPicker.getValues()[0].key
        // this.province.value = this.$refs.areaPicker.getValues()[0].key
        this.computations()
      }
      this.toogleArea()
    }
  },
  beforeMount () {
    this.vin = this.$store.getters.vin
    $.setDocTitle(`确认订单`)
    this.company = this.$store.state.services.company
    // console.log(this.$store.state.services.buyArea)
    this.city.value = this.$store.state.services.buyArea.city
    this.province.value = this.$store.state.services.buyArea.province
    this.city.text = this.$store.state.services.buyArea.cityName
    this.province.text = this.$store.state.services.buyArea.provinceName
    console.log(this.company)
    if (this.company.productDescLines) {
      if (this.company.productDescLines.length % 2 === 0) {
        this.companyLeft = this.company.productDescLines.splice(0, this.company.productDescLines.length / 2)
        this.companyRight = this.company.productDescLines
      } else {
        this.companyLeft = this.company.productDescLines.splice(0, (this.company.productDescLines.length + 1) / 2)
        this.companyRight = this.company.productDescLines
      }
    }
    this.productNo = this.$route.query.productNo
    this.computations()
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/style/px2rem.scss';

#sureOrder{

  .order_content{
    margin-top: 10px;
    margin-bottom: 70px;
    i{
      display: inline-block;
      width: 3px;
      height: 10px;
      margin-right: 11px;
      background: #56DEC6;
    }
    header{
      padding: 15px 15px;
      font-weight: bolder;
      div{
        float:right;
        padding-right: 20px;
            font-weight:initial;
      }
      .floatRight{
        float:right;
        font-size:12px;
      }
    }
    head:first-child{
      position:relative;
    }
    ul {
      padding:0 15px 10px 15px;
      
     li{
          padding-left: 12px;
         position:relative;
         margin-top:-6px;
         padding-top:5px;
         padding-bottom:5px;
      div{
        display:inline-block;
       box-sizing: border-box;
      }
      div:nth-child(2){
        width:20%;
        text-align:right;
        position:absolute;
        top: 50%;
        bottom:50%;
        right:0;
        margin-top: -6px;
      }
    }
    }
    .sure_total{
      text-align: right;
      padding:15px 20px;
      span {
        span{
          font-size:18px;
        }
      }
    }
    .content_order{
      border-bottom:1px solid #eee;
      background: #fff;
      label{
        font-weight:initial;
        font-size:12px;
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
    // right:0;
    right:15px;
    top:16px;
    // top:15px;
  }
.pay {
  background: #ffffff;
  height: 60px;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  line-height: 62px;
  padding-left: 15px;
  font-size: 16px;

  .price {
    position: absolute;
    top: 0;
    left: 56px;
    color: #ee6f44;

    span {
      font-size: 22px;
    }
  }

  button {
    background: #13d9c8;
    color: #ffffff;
    border: none;
    height: 43px;
    width: 100px;
    border-radius: 4px;
    position: absolute;
    right: 15px;
    top: 9px;
    font-size: 16px;
    outline: none;
  }
}
.sure_color{
  color:#ee6f44;
  float: right;
}
}
.checkout-span{
    display: inline-block;
    border-radius: 100%;
    position: absolute;
    margin-right:5px;
    width: 18px;
    height: 18px;
    top: 50%;
    left:0;
    bottom:50%;
    margin-top: -10px;
    vertical-align: middle;
    background-position: 0px 0px;
    background-size: 18px !important;
}
.sureorder_p{
  color:#999;
  font-size:12px;
}
.title_message{
  color:#999;
  font-size:12px;
  line-height:14px;
  margin-top:-10px;
}
.checkbox-core {
  background:url('../../assets/images/checkboxnor.png') center center no-repeat;
}
.checkout{
  background:url('../../assets/images/checkboxselect.png') center center no-repeat;
}
.argument_content{
      line-height: 1.2;
    text-decoration: underline;
    color: #000;
}
.checkboxradio-no {
  background:url('../../assets/images/radiobuttonnor.png') center center no-repeat;
}
.checkboxradio{
  background:url('../../assets/images/radiobuttonselect.png') center center no-repeat;
}


  .server_message{
    padding:20px 15px;
    background:#fff;
    p {
      font-size:18px;
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
        .color_orange{
         span{
          font-size: 18px;
         }
        }
      }
    }
  }
.sure_content{
  background:#fff;
  padding:0 15px 20px 15px;
  position:relative;
  // .sure_none{
  //   position:absolute;
  //   height:100%;
  //   width:px2Rem(5px);
  //   background:#fff;
  //   margin-left:px2Rem(-2.5px);
  //   top:0;
  //   left:50%;
  // }
}
.sureOrder_p{
  padding: px2Rem(4px) 0  px2Rem(4px) 0;
}
.sureOrder_first{
  background: #f6f6f6;
  padding: px2Rem(10px) px2Rem(20px) px2Rem(10px) px2Rem(20px);
  .sureOrder_meal{
    float:left;
  }
  .server_maintenance{
    float:right;
  }
  .sureOrder_meal, .server_maintenance{
     
     width: 50%;
    line-height: 21px;
      p {
         font-size:14px;
         font-weight:bolder;
    }
    div{
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
            color:#333;
            top:-6px;
          }
    }
  }
}
.margin_top{
  margin-top:10px;
}
.color_blue {
    color: #13d9c8;
}
.color_orange {
    color: #ee6f44;
}
.numberCar{
  text-align: right;
  input{
    display: inline-block;
    border: none;
    text-align: right;
    height: 34px;
    font-size: 14px;
    width: 80%;
    margin-top: -4px;
    padding: 0;
  }
}
.order_car{
  height:45px;
  line-height:45px;
  background:#fff;
  padding:0 15px !important;
  position:relative;
}
.argument {
    margin: 20px 15px;
    position: relative;
    padding-left: 20px;
    padding-bottom: 5px;

  input {
    position: absolute;
    left: 0;
    top: -2px;
    display:none;
  }
  span {
    display: inline-block;
    width: 18px;
    height: 18px;
    background-position: 0px 0px;
    background-size: 18px !important;
    position:absolute;
    left:0px;
    top:7px;

  }
  }
  .originally{
    font-size:12px !important;
    text-align:right;
    width:100%;
    float:right;
    margin-top:px2Rem(2px);
      .server_call{
          text-decoration:line-through;
    }
  }
  .sections{
    display:inline-block;
    width:80%;
    line-height:20px;
  }
  .sectionss{
    width:100%;
    position:relative;
    padding-left:22px;
  }
  .colorGray{
    background:#aaa !important;
  }
  .yingfu{
    // display:inline-block;
    // margin-left: 15px;
  }
</style>
