<template>
  <div id="login" :class="{'lognPosition': (phonefocus || codefocus)}">
     <section class="loginTitle">
       <div>
        <!-- <img :src="userInfo.avatar"/> -->
        <img src="../../assets/images/logolike.png" />
      </div>
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
       <div class="loginIn">
         <button  @click="goBack">登陆</button>
       </div>
  </div>
</template>

<script>
import utils from '../../utils.js'
import { apiUrl } from '../../production.js'
// import weiXinConfig from '../../weixin.js'
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
      errorContent: '错误代码'
    }
  },
  computed: {
    userInfo () {
      return this.$store.state.Home.userInfo
    }
  },
  methods: {
    goBack () {
      if (utils.myreg(this.phoneNumber)) {
        if (utils.numTest(this.verification)) {
          this.errorTrue = false
          let param = {
            ctl: 'teacher',
            act: 'login',
            phone: this.phoneNumber,
            code: this.verification
          }
          utils.GET(apiUrl, param).then(data => {
            if (data.status === 1011) {
              this.errorTrue = true
              this.errorContent = '手机号码错误'
            } else if (data.status === 1013) {
              this.errorTrue = true
              this.errorContent = '验证码错误'
            } else if (data.status === 1009) {
              this.errorTrue = true
              this.errorContent = '该账号不存在'
            } else if (data.status === 1007) {
              this.errorTrue = true
              this.errorContent = '用户名或密码错误'
            } else {
              this.$router.push({path: '/task'})
              var hrefLocation = encodeURIComponent(location.href.split('#')[0])
              window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc96529bf251d943b&redirect_uri=' + hrefLocation + '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
            }
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
          ctl: 'teacher',
          act: 'sendSMS',
          phone: this.phoneNumber
        }
        utils.GET(apiUrl, param).then(data => {
          this.verification = data.data.code
          if (data.status === 1012) {
            this.errorTrue = true
            this.errorContent = '手机号码错误'
          } else if (data.status === 1009) {
            this.errorTrue = true
            this.errorContent = '该账号不存在'
          } else {
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
          }
        })
      } else {
        this.errorTrue = true
        this.errorContent = '手机号码错误'
      }
    }
  },
  created () {
    utils.setDocTitle('教师端登陆')
    document.body.style.background = '#fff'
  },
  destroyed () {}
}
</script>

<style scoped lang="scss">
@import "../../assets/style/px2rem.scss";



.lognPosition{
  // position:inherit !important;
}
.errorTitle{
  color: red;
  text-align:center;
  font-size:px2Rem(16px);
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
}
.loginPhone{
  button{
    border: 1px solid #1E82D2;
    border-radius: 4px;
    width:px2Rem(94px);
    height:px2Rem(28px);
    font-size:12px;
    color:#1E82D2;
    position:absolute;
    right:0;
    bottom: px2Rem(9px);
  }
  div{
    position:relative;
    z-index: 1;
    border-bottom: 1px solid #1E82D2;
    padding-bottom:px2Rem(10px);
     // padding:px2Rem(10px) 0;
    input{
      height:px2Rem(30px);
      line-height: px2Rem(30px);
      width:60%;
      color:#1e82d2;
      // margin-bottom:px2Rem(12px);
      font-size:px2Rem(16px);
      background:transparent;
    }
    span{
      font-family: PingFangSC-Regular;
      color:  #1E82D2;
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
  padding-top:px2Rem(50px);
  img{
    width:px2Rem(238px);
    height:px2Rem(191px);
    margin-bottom: px2Rem(80px);
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
  padding: px2Rem(46px) 0 px2Rem(50px) 0;
  text-align:center;
  button{
    width:px2Rem(310px);
    height:px2Rem(52px);
    background: #1E82D2;
    box-shadow: 0 2px 4px 2px rgba(37,119,185,0.31);
    -webkit-box-shadow: 0 2px 4px 2px rgba(37,119,185,0.31);
    border-radius: px2Rem(100px);
    font-family: PingFangSC-Medium;
    font-size: px2Rem(18px);
    color: #B2E3FC;
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
  // color:#24c68a !important;
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
    font-size:px2Rem(16px);
  }
  to {
    -webkit-transform:translateY(px2Rem(-26px));
    -moz-transform:translateY(px2Rem(-26px));
    -ms-transform:translateY(px2Rem(-26px));
    -o-transform:translateY(px2Rem(-26px));
    transform:translateY(px2Rem(-26px));
    font-size:12px;
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
    font-size:px2Rem(16px);
  }
  to {
    -webkit-transform:translateY(px2Rem(-26px));
    -moz-transform:translateY(px2Rem(-26px));
    -ms-transform:translateY(px2Rem(-26px));
    -o-transform:translateY(px2Rem(-26px));
    transform:translateY(px2Rem(-26px));
    font-size:12px;
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
    font-size:px2Rem(16px);
  }
  to {
    -webkit-transform:translateY(px2Rem(-26px));
    -moz-transform:translateY(px2Rem(-26px));
    -ms-transform:translateY(px2Rem(-26px));
    -o-transform:translateY(px2Rem(-26px));
    transform:translateY(px2Rem(-26px));
    font-size:12px;
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
    font-size:12px;
  }
  to {
    -webkit-transform:translateY(0px);
    -moz-transform:translateY(0px);
    -ms-transform:translateY(0px);
    -o-transform:translateY(0px);
    transform:translateY(0px);
    font-size:px2Rem(16px);
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
    font-size:12px;
  }
  to {
    -webkit-transform:translateY(0px);
    -moz-transform:translateY(0px);
    -ms-transform:translateY(0px);
    -o-transform:translateY(0px);
    transform:translateY(0px);
    font-size:px2Rem(16px);
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
    font-size:12px;
  }
  to {
    -webkit-transform:translateY(0px);
    -moz-transform:translateY(0px);
    -ms-transform:translateY(0px);
    -o-transform:translateY(0px);
    transform:translateY(0px);
    font-size:px2Rem(16px);
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
    font-size:12px;
  }
  to {
    -webkit-transform:translateY(0px);
    -moz-transform:translateY(0px);
    -ms-transform:translateY(0px);
    -o-transform:translateY(0px);
    transform:translateY(0px);
    font-size:px2Rem(16px);
  }
 }
 .pOpacity{
  opacity:1 !important;
 }
</style>
