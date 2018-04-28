<template>
  <div id="personalCenter">
    <div class="personalcenter_bg"></div>
     <div class="personalInformation">
       <img :src="userInfoMessage.data.avatar"/>
       <div>{{userInfoMessage.data.nickName}}</div>
     </div>
     <div class="personalContent">
       <div class="borderPX divClass firstDiv" @click="routerBack('/certification')" v-if="userInfoMessage.data.enabled != '0'">
        <div class="align-items"><i></i>学员认证<i></i></div>
      </div>
       <div class="borderPX divClass sendDiv" @click="routerBack('/mycourses')">
        <div class="align-items"><i></i>我的课程<i></i></div>
      </div>
       <div class="divClass threeDiv borderPX" @click="routerBack('/graduation')"  v-if="userInfoMessage.data.enabled != '0'">
        <div class="align-items"><i></i>结业申请<i></i></div>
       </div>
        <div class="divClass fourDiv" @click="routerBack('/pianoPractice')">
          <div class="align-items"><i></i>钢琴练习<i></i></div>
        </div>
        <div class="divClass fiveDiv" @click="routerBack('/complaint')">
          <div class="align-items"><i></i>我的申诉<i></i></div>
        </div>
     </div>
     <div class="contact align-items" v-if="userInfoMessage.data.schoolId != '0'"><i></i><div class="space-between"><span>联系艺校</span><a :href="'tel:'+userInfoMessage.data.schooltel">{{userInfoMessage.data.schooltel}}</a></div></div>
     <navigation></navigation>
  </div>
</template>

<script>
import utils from '../../utils.js'
export default {
  name: 'home',
  data () {
    return {
      dd: 'daa'
    }
  },
  computed: {
    appointment () {
      return this.$store.state.Home.unregistered
    },
    userInfoMessage () {
      return this.$store.state.Home.userInfo
    }
  },
  methods: {
    routerBack (content, id) {
      this.$router.push({path: content, query: {id: id}})
    }
  },
  beforeMount () {},
  mounted () {
    utils.setDocTitle('个人中心')
  },
  destroyed () {}
}
</script>

<style scoped lang="scss">
@import "../../assets/style/px2rem.scss";

#personalCenter{
  position: relative;
  .personalcenter_bg{
    background: #3F5B63;
    width:100%;
    height:px2Rem(105px);
  }
}
 .personalInformation, .contact{
  background: #fff;
  box-sizing:border-box;
  -ms-box-sizing:border-box;
  -moz-box-sizing:border-box;
  -webkit-box-sizing:border-box;
 }
 .personalInformation {
   position:absolute;
   width: px2Rem(330px);
   height:px2Rem(132px);
   z-index: 99;
   left: 50%;
   top:px2Rem(23px);
   transform: translateX(-50%);
    -webkit-transform:translateX(-50%);
  -moz-transform:translateX(-50%);
  -o-transform:translateX(-50%);
  -moz-transform:translateX(-50%);
   box-shadow: 0 2px 18px 0 rgba(0,0,0,0.19);
   border-radius: 8px;
   text-align: center;
   div{
   }
   img{
     width: px2Rem(58px);
     height:px2Rem(58px);
     border-radius: 50%;
     margin-top:px2Rem(16px);
     margin-bottom:px2Rem(14px);
   }
 }
 .personalContent, .contact{
  font-family: PingFangSC-Regular;
  font-size: px2Rem(16px);
  color: #333333;
 }
 .personalContent{
  margin-top:px2Rem(90px);
  margin-bottom: px2Rem(20px);
  padding: 0 px2Rem(15px);
   .divClass {
     background:#fff;
     height:px2Rem(50px);
     div{
      display: flex;
      display: -webkit-flex;
      display: -ms-flexbox;
      height:100%;
      padding-left:  px2Rem(50px);
      padding-right:  px2Rem(15px);
      position:relative;
      i:nth-child(1){
        position:absolute;
        left: px2Rem(15px);
        display: inline-block;
        margin-top: -1px;
      }
      i:nth-child(2){
       position:absolute;
       right: px2Rem(15px);
       display: inline-block;
       width:px2Rem(10px);
       height:px2Rem(20px);
       margin-top: -1px;
       top:50%;
       background:url('../../assets/images/personalcenter/right_arrow@2x.png') no-repeat;
       background-size: 100% 100%;
       transform: translateY(-50%);
        -webkit-transform:translateY(-50%);
        -moz-transform:translateY(-50%);
        -o-transform:translateY(-50%);
        -moz-transform:translateY(-50%);
      }
     }
    }
   .firstDiv{
    i {
      display:inline-block
    }
     i:nth-child(1){
      width:px2Rem(20px);
      height:px2Rem(20px);
      top:50%;
      transform: translateY(-50%);
       -webkit-transform:translateY(-50%);
       -moz-transform:translateY(-50%);
       -o-transform:translateY(-50%);
       -moz-transform:translateY(-50%);
      background:url('../../assets/images/personalcenter/student@2x.png') no-repeat;
       background-size: 100% 100%;
     }
   }
   .sendDiv{
    i:nth-child(1){
      width:px2Rem(20px);
      height:px2Rem(20px);
      background:url('../../assets/images/personalcenter/class@2x.png') no-repeat;
      background-size: 100% 100%;
      top:50%;
      transform: translateY(-50%);
       -webkit-transform:translateY(-50%);
       -moz-transform:translateY(-50%);
       -o-transform:translateY(-50%);
       -moz-transform:translateY(-50%);
    }
   }
   .threeDiv{
    i:nth-child(1){
      width:px2Rem(20px);
      height:px2Rem(20px);
      top:50%;
      background:url('../../assets/images/personalcenter/icon_jieye.png') no-repeat;
      background-size: 100% 100%;
      transform: translateY(-50%);
       -webkit-transform:translateY(-50%);
      -moz-transform:translateY(-50%);
      -o-transform:translateY(-50%);
      -moz-transform:translateY(-50%);
    }
   }
  .fourDiv{
    i:nth-child(1){
      width:px2Rem(20px);
      height:px2Rem(20px);
      top:50%;
      background:url('../../assets/images/personalcenter/piano1.png') no-repeat;
      background-size: 100% 100%;
      transform: translateY(-50%);
      -webkit-transform:translateY(-50%);
      -moz-transform:translateY(-50%);
      -o-transform:translateY(-50%);
      -moz-transform:translateY(-50%);
    }
  }
  .fiveDiv{
    i:nth-child(1){
      width:px2Rem(20px);
      height:px2Rem(20px);
      top:50%;
      background:url('../../assets/images/personalcenter/complaint.png') no-repeat;
      background-size: 100% 100%;
      transform: translateY(-50%);
      -webkit-transform:translateY(-50%);
      -moz-transform:translateY(-50%);
      -o-transform:translateY(-50%);
      -moz-transform:translateY(-50%);
    }
  }
 }
 .contact{
  position:relative;
  margin: 0 px2Rem(15px);
  padding-left:  px2Rem(50px);
  padding-right:  px2Rem(15px);
 a {
  font-size: px2Rem(16px);
  font-family: PingFangSC-Regular;
  color: #666666;
 }
  div{
   height:px2Rem(50px);
   line-height:px2Rem(50px); 
  }
  i {
    position:absolute;
    left: px2Rem(15px);
    display: inline-block;
    width:px2Rem(20px);
    height:px2Rem(20px);
    margin-top: -1px;
    background:url('../../assets/images/personalcenter/Fill1@2x.png') no-repeat;
    background-size: 100% 100%;
    top:50%;
    transform: translateY(-50%);
    -webkit-transform:translateY(-50%);
    -moz-transform:translateY(-50%);
    -o-transform:translateY(-50%);
    -moz-transform:translateY(-50%);
  }
  div{
    width:100%;
  }
 }
</style>
