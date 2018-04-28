<template>
  <div id="login" :class="{'lognPosition': (phonefocus || codefocus)}">
     <section class="loginTitle">
       <div>
        <!-- userInfo.avatar -->
        <img src="../../assets/images/logolike.png" />
<!--          <span>乐享成人</span>
 -->       </div>
     </section>
       <section class="loginPhone">
 <!--        <div class="borderPX" style="display:none">
          <span>请输入姓名</span>
          <input type="text"  v-model="phoneNumber"/> 
        </div> -->
        <div >
           <span :class="{'spanList': (phoneNumber || phonefocus) , 'fontLeave':(!phoneNumber && !phonefocus) && phoneFirst}">请输入手机号</span>
          <input type="text"  v-model="phoneNumber" @focus="phoneFocus()" @blur="phoneBlur()"/> 
         <button @click="codeSend">{{checkCode}}</button>
        </div>
        <div class=" codeVerinfor">
           <span :class="{'spanList': (verification || codefocus) , 'fontLeave':(!verification && !codefocus) && codeFirst}">请输入验证码</span>
          <input type="text"  v-model="verification" @focus="codeFocus" @blur="codeBlur()"/> 
        </div>
       </section>
       <div class="errorTitle" :class="{'erroroPacity': errorTrue}">{{errorContent}}</div>
       <p :class="{'pOpacity': (userInfo.data.enabled && userInfo.data.enabled == '0')}">立即注册领取一节30分钟专业钢琴陪练课程</p>
       <div class="loginIn">
         <button  @click="goBack" :class="{'buttonBg' : buttonBg}">登录</button>
       </div>
<!--       <div class="haveLogin">
        已有账号，
        <span>直接登录</span>
      </div> -->
     
  </div>
</template>

<script>
import utils from '../../utils.js'
import { apiUrl } from '../../production.js'
import bgImage from '../../assets/images/else/bg.png'
export default {
  name: 'home',
  data () {
    return {
      phoneNumber: '',
      phoneFirst: false,
      codeFirst: false,
      verification: '',
      codefocus: false,
      phonefocus: false,
      checkCode: '获取验证码',
      errorTrue: false,
      errorContent: '错误代码',
      buttonBg: false
    }
  },
  computed: {
    userInfo () {
      return this.$store.state.Home.userInfo
    }
  },
  methods: {
    goBack () {
      this.buttonBg = true
      // this.$router.push({path: '/appointment'})
      if (utils.myreg(this.phoneNumber)) {
        if (utils.numTest(this.verification)) {
          this.errorTrue = false
          let param = {
            ctl: 'user',
            act: 'login',
            phone: this.phoneNumber,
            code: this.verification
          }
          utils.GET(apiUrl, param).then(data => {
            console.log(data)
            if (data.status === 1011) {
              this.buttonBg = false
              this.errorTrue = true
              this.errorContent = '手机号码错误'
            } else if (data.status === 1013) {
              this.buttonBg = false
              this.errorTrue = true
              this.errorContent = '验证码错误'
            } else {
              var hrefLocation = encodeURIComponent(location.href.split('#')[0])
              // window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx29ee96822ace32af&redirect_uri=' + hrefLocation + '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
              window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx1294de3f587622f8&redirect_uri=' + hrefLocation + '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
              // wx1294de3f587622f8
              // let params = {
              //   ctl: 'user',
              //   act: 'getUserInfo'
              // }
              // utils.GET(apiUrl, params).then(data => {
              //   this.$store.dispatch('HOME_USERINFO', data)
              // this.$router.push({path: '/appointment'})
              // })
            }
          // document.body.style.background = '#f5f5f5'
          })
        } else {
          this.errorTrue = true
          this.errorContent = '验证码错误'
        }
      } else {
        this.errorTrue = true
        this.errorContent = '手机号码错误'
      }
      // this.$store.dispatch('HOME_UNREGISTERED', true)
    },
    phoneFocus () {
      this.phonefocus = true
      this.phoneFirst = true
    },
    phoneBlur () {
      this.phonefocus = false
    },
    codeFocus () {
      this.codefocus = true
      this.codeFirst = true
    },
    codeBlur () {
      this.codefocus = false
    },
    codeSend () {
      if (this.checkCode !== '获取验证码') return
      if (utils.myreg(this.phoneNumber)) {
        this.errorTrue = false
        let param = {
          ctl: 'user',
          act: 'sendSMS',
          phone: this.phoneNumber
        }
        utils.GET(apiUrl, param).then(data => {
          // this.verification = data.data.code
          if (data.status === 1011) {
            this.errorTrue = true
            this.errorContent = '手机号码错误'
          } else if (data.status === 1012) {
            console.log('短信已发送')
          }
        })
        let sec = 60
        for (let i = 0; i <= 60; i++) {
          setTimeout(() => {
            if (sec !== 0) {
              this.checkCode = '已发送(' + sec + ')'
              sec--
            } else {
              sec = 60
              this.checkCode = '获取验证码'
            }
          }, i * 1000)
        }
      } else {
        this.errorTrue = true
        this.errorContent = '手机号码错误'
      }
    }
  },
  created () {
    utils.setDocTitle('乐享钢琴')
    document.body.style.background = `url('${bgImage}') no-repeat`
    document.body.style.backgroundSize = 'cover'
  },
  destroyed () {}
}
</script>

<style scoped lang="scss">
@import "../../assets/style/px2rem.scss";


.bgImage{
  background:url('../../assets/images/else/bg.png') no-repeat;
  background-size: 100% 100%; 
}
.lognPosition{
  // position:inherit !important;
}
.errorTitle{
  color: red;
  text-align:center;
  font-size:14px;
  margin-top:px2Rem(20px);
  opacity:0;
}
.erroroPacity{
  opacity:1;
}
#login{
  // position:absolute;
  width:100%;
  height:100%;
  // background:#fff;
  padding:0 px2Rem(32px);

  p{
    text-align:center;
    font-family: PingFangSC-Medium;
    font-size: 12px;
    color: #D6D6D6;
    margin-top:px2Rem(30px);
    opacity:0;
  }
}
.loginPhone{
  button{
    border: 1px solid #FFFFFF;
    border-radius: 4px;
    width:px2Rem(94px);
    height:px2Rem(28px);
    font-size:12px;
    color:#fff;
    position:absolute;
    right:0;
  }
  div{
    position:relative;
    z-index: 1;
    border-bottom: 1px solid #fff;
    padding-bottom:px2Rem(10px);
     // padding:px2Rem(10px) 0;
    input{
      height:px2Rem(30px);
      line-height: px2Rem(30px);
      width:60%;
      color:#fff;
      // margin-bottom:px2Rem(12px);
      font-size:px2Rem(16px);
      background:transparent;
    }
    span{
      color: #FFFFFF;
      position: absolute;
      display: inline-block;
      height:px2Rem(30px);
      line-height:px2Rem(30px);
      top:50%;
      margin-top: px2Rem(-15px);
      font-size:px2Rem(16px);
      z-index: -1;
    }
    // span:first-child{
    //   z-index: -1;
    // }
    // span:last-child{
    //   position: absolute;
    //   display: inline-block;
    //   border:1px solid #eee;
    //   background:#eee;
    //   padding:0 px2Rem(10px);
    //   border-radius: 2px;
    //   right: 0;
    //   height:px2Rem(30px);
    //   line-height:px2Rem(30px);
    //   top:50%;
    //   text-align:center;
    //   margin-top: px2Rem(-15px);
    // }
  }
  // div:nth-child(2){
  //   margin-top:px2Rem(20px);
  // }
}

.loginTitle{
  text-align:center;
  padding-top:px2Rem(39px);
  img{
    width:px2Rem(105px);
    height:px2Rem(105px);
    border-radius:50%;
    margin-bottom: px2Rem(118px);
  }
  div:nth-child(1){
    display:flex;
    display: -webkit-box;
    display:box;
    display: -webkit-flex;
    display: -ms-flexbox;
    justify-content:center;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    span{
      height:px2Rem(60px);
      display:inline-block;
     line-height:px2Rem(60px);
    }
  }
  div:nth-child(2){
    text-align:right;
    padding-right: px2Rem(40px);
  }
}
.codeVerinfor{
  margin-top:px2Rem(16px);
  input{
    width:100% !important;
  }
}
.loginIn{
  width:100%;
  padding: px2Rem(12px) 0 px2Rem(50px) 0;
  text-align:center;
  button{
    width:px2Rem(242px);
    height:px2Rem(52px);
    background: #FFFFFF;
    box-shadow: 0 2px 4px 2px rgba(61,88,96,0.20);
    border-radius: px2Rem(100px);
    font-family: PingFangSC-Medium;
    font-size: 18px;
    color: #3F5B63;
  }
}

.haveLogin{
  width:100%;
  font-family: PingFangSC-Medium;
  font-size: 12px;
  color: #FFFFFF;
  text-align:right;
  span{
    color: #24c68a;
  }
}
.spanList{
    animation:fontSize .2s linear forwards;
  -webkit-animation:fontSize .2s linear forwards;
  -moz-animation:fontSize .2s linear forwards;
  color:#24c68a !important;
}
.fontLeave{
  animation:fontSizeLeave .2s linear forwards;
  -webkit-animation:fontSizeLeave .2s linear forwards;
  -moz-animation:fontSizeLeave .2s linear forwards;
}
@keyframes fontSize
 {
  from {
    transform:translateY(0px);
    -webkit-transform:translateY(0px);
    -moz-transform:translateY(0px);
    -o-transform:translateY(0px);
    -ms-transform:translateY(0px);
    font-size:px2Rem(14px);
  }
  to {
    -webkit-transform:translateY(px2Rem(-26px));
    -moz-transform:translateY(px2Rem(-26px));
    -ms-transform:translateY(px2Rem(-26px));
    -o-transform:translateY(px2Rem(-26px));
    transform:translateY(px2Rem(-26px));
    font-size:px2Rem(12px);
  }
 }
 @-webkit-keyframes fontSize
 {
  from {
    transform:translateY(0px);
    -webkit-transform:translateY(0px);
    -moz-transform:translateY(0px);
    -o-transform:translateY(0px);
    -ms-transform:translateY(0px);
    font-size:px2Rem(14px);
  }
  to {
    -webkit-transform:translateY(px2Rem(-26px));
    -moz-transform:translateY(px2Rem(-26px));
    -ms-transform:translateY(px2Rem(-26px));
    -o-transform:translateY(px2Rem(-26px));
    transform:translateY(px2Rem(-26px));
    font-size:px2Rem(12px);
  }
 }
 @-moz-keyframes fontSize
 {
  from {
    transform:translateY(0px);
    -webkit-transform:translateY(0px);
    -moz-transform:translateY(0px);
    -o-transform:translateY(0px);
    -ms-transform:translateY(0px);
    font-size:px2Rem(14px);
  }
  to {
    -webkit-transform:translateY(px2Rem(-26px));
    -moz-transform:translateY(px2Rem(-26px));
    -ms-transform:translateY(px2Rem(-26px));
    -o-transform:translateY(px2Rem(-26px));
    transform:translateY(px2Rem(-26px));
    font-size:px2Rem(12px);
  }
 }
 @keyframes fontSizeLeave
 {
  from {
    -webkit-transform:translateY(px2Rem(-26px));
    -moz-transform:translateY(px2Rem(-26px));
    -ms-transform:translateY(px2Rem(-26px));
    -o-transform:translateY(px2Rem(-26px));
    transform:translateY(px2Rem(-26px));
    font-size:px2Rem(12px);
  }
  to {
    -webkit-transform:translateY(0px);
    -moz-transform:translateY(0px);
    -ms-transform:translateY(0px);
    -o-transform:translateY(0px);
    transform:translateY(0px);
    font-size:px2Rem(14px);
  }
 }
 @-moz-keyframes fontSizeLeave
 {
  from {
    -webkit-transform:translateY(px2Rem(-26px));
    -moz-transform:translateY(px2Rem(-26px));
    -ms-transform:translateY(px2Rem(-26px));
    -o-transform:translateY(px2Rem(-26px));
    transform:translateY(px2Rem(-26px));
    font-size:px2Rem(12px);
  }
  to {
    -webkit-transform:translateY(0px);
    -moz-transform:translateY(0px);
    -ms-transform:translateY(0px);
    -o-transform:translateY(0px);
    transform:translateY(0px);
    font-size:px2Rem(14px);
  }
 }
 @-webkit-keyframes fontSizeLeave
 {
  from {
    -webkit-transform:translateY(px2Rem(-26px));
    -moz-transform:translateY(px2Rem(-26px));
    -ms-transform:translateY(px2Rem(-26px));
    -o-transform:translateY(px2Rem(-26px));
    transform:translateY(px2Rem(-26px));
    font-size:px2Rem(12px);
  }
  to {
    -webkit-transform:translateY(0px);
    -moz-transform:translateY(0px);
    -ms-transform:translateY(0px);
    -o-transform:translateY(0px);
    transform:translateY(0px);
    font-size:px2Rem(14px);
  }
 }
 @-ms-keyframes fontSizeLeave
 {
  from {
    -webkit-transform:translateY(px2Rem(-26px));
    -moz-transform:translateY(px2Rem(-26px));
    -ms-transform:translateY(px2Rem(-26px));
    -o-transform:translateY(px2Rem(-26px));
    transform:translateY(px2Rem(-26px));
    font-size:px2Rem(12px);
  }
  to {
    -webkit-transform:translateY(0px);
    -moz-transform:translateY(0px);
    -ms-transform:translateY(0px);
    -o-transform:translateY(0px);
    transform:translateY(0px);
    font-size:px2Rem(14px);
  }
 }
 .pOpacity{
  opacity:1 !important;
 }
 .buttonBg{
    background: #3d5860 !important;
    color: #fff !important;
 }
</style>
