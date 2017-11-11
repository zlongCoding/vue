<template>
  <div id="businesslist">
    <header>
      <div @click="address"><span>{{city.text}}</span><i></i></div>
    </header>
    <div>
      <ul>
        <li v-for="(item, index) in message" >
          <div class="left" >
             <!-- <div><span>{{item.dealerName}}</span>（苏州总店）</div> -->
             <div><span>{{item.dealerName}}</span></div>
             <div>{{item.address}}</div>
          </div>
          <div class="right" @click="toPage(item.address)">
            <img src="../../assets/images/address.png"/>
          </div>
          <div style="clear: both"></div>
        </li>
      </ul>
    </div>
    <div class="myServiceImg" v-if="((message&&message.length <= 0) || !message)&&nullContent">
        <img src="../../assets/images/limits.png">
        <div class="myServiceText">没有商家信息哦~</div>
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
    name: 'home',
    data () {
      return {
        message: null,
        nullContent: false,
        province: {
          text: null,
          value: null
        },
        city: {
          text: null,
          value: null
        },
        dealerName: null,
        showAddress: false,
        addressChange: false,
        areaContent: {},
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
        content: {
          one: '',
          two: '',
          three: ''
        }
      }
    },
    methods: {
      handleChange (index) {
        console.log(index)
      },
      toogleArea() {
        document.body.style.overflow = 'hidden'
        this.showAddress = !this.showAddress
      },
      toPage (config) {
        this.$store.dispatch('BUSINESS_MAP', config)
        this.$router.push({path: '/map'})
      },
      address() {
        this.showAddress = true
      },
      selectArea() {
        if (this.$refs.areaPicker.getValues()[0] && this.$refs.areaPicker.getValues()[1]) {
          // this.province = this.$refs.areaPicker.getValues()[0].value
          this.city.text = this.$refs.areaPicker.getValues()[1].value
          this.city.value = this.$refs.areaPicker.getValues()[1].key
          this.province.value = this.$refs.areaPicker.getValues()[0].key
          console.log(this.city.value)
          console.log(this.province.value)
        }
        this.changeContent()
        this.toogleArea()
      },
      onAreaChange(picker, values) {
        if (!this.$refs.areaPicker) return
        if (this.$refs.areaPicker.getValues()[0]) {
          let index = this.$refs.areaPicker.getValues()[0].index
          this.addressSlots[1].values = this.areaContent.cityArr[index]
        // this.$store.dispatch('INSURANCE_UPDATE_CITY', index)
        }
      },
      changeContent () {
        const data = {
          'city': this.city.value,
          'dealerName': this.dealerName,
          'province': this.province.value
        }
        $.post('/partner/auto/dealer', data).then(json => {
          this.message = json
          setTimeout(() => {
            this.nullContent = true
          }, 500)
        }).catch(err => {
          console.log(err)
        })
      }
    },
    created () {
      $.setDocTitle(`商家信息`)
      // const vouchersNo = this.$route.query.vouchersNo
      $$.Indicator.open()
      this.city.value = this.$store.state.services.mapList.city
      this.province.value = this.$store.state.services.mapList.province
      this.city.text = this.$store.state.services.mapList.cityName
      this.province.text = this.$store.state.services.mapList.provinceName
      // $.post(`/partner/auto/area${vouchersNo}`).then(json => {
      //   this.city.value = json.city[0].key
      //   this.province.value = json.province.key
      //   this.province.text = json.province.value
      //   this.city.text = json.city[0].value
      this.changeContent()
      $.post('/partner/auto/area').then(json => {
        let provinceArr = []
        let cityArr = []
        $$.Indicator.close()
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
      }).catch(err => {
        console.log(err)
      })
      // })
    },
    mounted () {
    },
    destroyed () {
    }
  }
</script>

<style scoped lang="scss">
  @import '../../assets/style/px2rem.scss';
 #businesslist{
  header{
    padding: 5px 15px;
    background: #fff;
    margin-bottom:10px;
     div{
      width:100%;
       text-align: center;
      border:none;
      outline: none;
      background:#fff;
      line-height: 30px;
      height: 30px;
      font-size: 14px;
      color: #999;
      display: inline-block;
      position:relative;
      overflow: hidden;
       box-sizing:border-box;
       span{
         // width:100%;
         display:inline-block;
         height: 100%;
         font-size: 14px;
         color: #ef6f42;
       }
      i{
       content:'';
       background:url('../../assets/images/bottom.png') no-repeat;
       width:14px;
       height:14px;
       display:inline-block;
       position:relative;
       background-size:14px;
       top:6px;
       right:-2px;
      }
     }
  }
  ul{
     background:#fff;
     li{
      padding:10px 15px;
       .left{
         float:left;
         border-right:1px solid #eee;
         width:84%;
         color:#999;
         div:nth-child(1){
           
           span{
            color:#000;
            font-size:16px;
            font-weight:bolder;
           }
         }
         div{
          line-height:20px;
         }
       }
       .right{
        float:right;
        width:15%;
        height:100%;
        position: relative;
        top:4px;
        left:15px;
        img{
           width:30px;
           height:auto;
        }
       }
     }
  }
 }
 .myServiceImg img{
    width: 150px;
    height: 150px;
    display: block;
    margin: 150px auto 20px auto;
}
.myServiceImg .myServiceText{
    width: 100%;
    font-size: 18px;
    text-align: center;
}
</style>
