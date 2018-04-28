<template>
  <div>
    <div class="noClass_number" v-show="enable == '0' && textXuan">
    <img src="../../../assets/images/else/nodata.png" />
    <p class="p">试听课程已完成</p>
    <p>您可以联系艺校，获得专业指导</p>
    <button class="buttonA"><a :href="'tel:'+userInfoMessage.data.schooltel" class="space-center">联系艺校</a></button>
  </div>
  <div class="un_content" v-show="enable == '1' && textXuan">
        <img src="../../../assets/images/else/nodata.png" />
        <p :class="{'pOpacity': userInfoMessage.data.enabled == '0'}">免费体验30分钟专业钢琴测评课程</p>
        <button class="buttonDiv" @click="goBack">我要预约</button>
  </div>
  <loading :content="'您的账号已被冻结，目前不能预约课程'" v-if="noClassNumber"></loading>
</div>
</template>

<script>
import utils from '../../../utils.js'
import { apiUrl } from '../../../production.js'
export default {
  name: 'home',
  data () {
    return {
      textXuan: false,
      enable: '1',
      noClassNumber: false
    }
  },
  computed: {
    userInfoMessage () {
      return this.$store.state.Home.userInfo
    }
  },
  methods: {
    goBack (id) {
      if (this.userInfoMessage.data.enabled === '2') {
        this.noClassNumber = true
        setTimeout(() => {
          this.noClassNumber = false
        }, 1000)
      } else {
        this.$router.push({path: '/unclass'})
      }
    }
  },
  beforeMount () {
    if (this.$store.state.Home.userInfo.data.enabled === '0') {
      let params = {
        ctl: 'main',
        act: 'getSTEanble'
      }
      utils.GET(apiUrl, params).then(data => {
        this.enable = data.data.enable
      })
    }
  },
  mounted () {
    setTimeout(() => {
      this.textXuan = true
    }, 100)
  },
  destroyed () {}
}
</script>

<style scoped lang="scss">
@import "../../../assets/style/px2rem.scss";

.un_content{
  margin: 0 auto;
  text-align:center;
  img{
    margin-top: px2Rem(112px);
    margin-bottom: px2Rem(158px);
    width:px2Rem(165px);
    height:auto;
  }
  p{
    font-family: PingFangSC-Regular;
    color: #333333;
    font-size: px2Rem(15px);
    margin-bottom:px2Rem(44px);
    opacity:0;
  }
}
.buttonDiv{
  width: px2Rem(242px);
  height:px2Rem(52px);
  background: #3D5860;
  box-shadow: 0 2px 4px 2px rgba(61,88,96,0.20);
  border-radius: px2Rem(100px);
  -webkit-border-radius: px2Rem(100px);
  -moz-border-radius: px2Rem(100px);
  -ms-border-radius: px2Rem(100px);
  -o-border-radius: px2Rem(100px);
  margin: 0 auto;
  font-family: PingFangSC-Regular;
  font-size: px2Rem(18px);
  color: #FFFFFF;
  margin-bottom:px2Rem(48px);
}
.pOpacity{
  opacity:1 !important;
 }
.noClass_number{
  margin: 0 auto;
  text-align:center;
  img{
    margin-top: px2Rem(112px);
    margin-bottom: px2Rem(100px);
    width:px2Rem(165px);
    height:auto;
  }
  p{
    font-family: PingFangSC-Regular;
    color: #333333;
    font-size: px2Rem(15px);
  }
  .p{
    margin-bottom: px2Rem(4px);
  }
  .buttonA{
      width: px2Rem(242px);
      height:px2Rem(52px);
      background: #3D5860;
      box-shadow: 0 2px 4px 2px rgba(61,88,96,0.20);
      border-radius: px2Rem(100px);
      margin: 0 auto;
      font-family: PingFangSC-Regular;
      font-size: px2Rem(18px);
      margin-top:px2Rem(40px);
      margin-bottom:px2Rem(48px);
   a{
      color: #FFFFFF;
      height: 100%;
      width: 100%;
   }
  }
}
</style>
