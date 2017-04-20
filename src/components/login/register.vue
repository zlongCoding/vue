<template>
	<div class="phoneReg">
          <titleimg></titleimg>
          <img :src="imageSrc" class="phoneImg borders "/>
          <div class="phonetext border pfxi" >
             <input  type="text" class="input paddingfor" v-model="phone" placeholder="手机号码" v-on:focus="getPhoneFocus" :class="{ errorMsg: isStyleFalses , color : chagecolor}"/>	
          </div>
          <div class="phonetext border pfxi" >
             <input  type="text" class="inputs paddingfor" v-model="phonenumber" placeholder="验证码" v-on:focus="getCodeFocus" :class="{ errorMsg: isStyleFalse , color : chagecolor}"/>
             <div  @click="sendname">{{checkma}}</div>  
          </div>
          <!-- <div class="showMsg pfxi" :class="{ errorMsg: isStyleFalse}">{{errMsg}}</div> -->
          <div class="pfxi success pfxi" :class="{ successall: !contentall}">点击下一步，即表示您同意 <span>用户协议</span></div>
          <div class="pfxi contents pfxi" :class="{ contentsno: isStyleFalsesss}">{{errMsg}}<span style="opacity:0">aaaa</span></div>
          <div class="next borderfor pfxi" @click="nextStep" :class="{ nextgotext: nextdones}">下一步</div>
          <div class="contact pfxi">如有任何疑问，请<span><a href="tel:021-64225665" class="pfxi">联系我们</a></span></div>
    </div>
</template>
<script>
import titleimg from '../common/login/titileImg.vue'
import { myreg , numTest ,setStore , getStore} from '../../common/js/test.js'
import { mapMutations } from 'vuex'
import api from '../../api/login/login.js'
export default {
  data(){
     return{
          phone : null,
          phonenumber:null,
          checkma:"发送验证码",
          user:true,
          isFalse: true,
          isStyleFalse: false,
          errMsg:null,
          imageSrc:'',
          contentall:false,
          isStyleFalses:false,
          isStyleFalsesss:false,
          nextdones:false,
          errMsg:null,
          chagecolor:false
     }
  },
      created(){
        document.title="手机注册";
         var img = getStore("userAll");
         this.imageSrc = JSON.parse(img).faceimg;

      },
  components:{
      titleimg
    },
  methods:{
          ...mapMutations([
                'USER_PHOBE'
            ]),
       getCodeFocus(){
        this.isStyleFalse = false;
        this.isStyleFalsesss = false;
      },
      getPhoneFocus(){
        this.isStyleFalses = false;
        this.isStyleFalsesss = false;
        this.chagecolor = true;
      },

     nextStep(){
        var _this = this;
        _this.nextdones = true;
        if(myreg.test(_this.phone)){
          if(numTest.test(_this.phonenumber)){
             _this.USER_PHOBE(_this.phone);
            api.checkMessage("phone="+_this.phone +"&code="+_this.phonenumber).then(function(data){
                          if(data.data.data == true ){
                             _this.$router.push("/identity");
                          }else{
                             _this.isStyleFalse = true;
                             _this.isStyleFalsesss = true;
                             _this.nextdones = false;
                          }
                      })
          }else{
          _this.isStyleFalse = true;
          _this.isStyleFalsesss = true;
           _this.nextdones = false;
           _this.errMsg = "验证码填写错误"
          }
        }else{
          _this.errMsg = "手机号码填写错误"
          _this.isStyleFalses = true;
           _this.isStyleFalsesss = true;
            _this.nextdones = false;
        }
     },
      sendname(){
        var _this = this;
        if(_this.checkma == "发送验证码" ){
          }
          if(myreg.test(_this.phone)){
            if(_this.checkma.includes("已发送")){

            }else{
            api.checkPhoneNum(_this.phone).then(function(json){
              if(json.data.data == 0){
                 api.sendMessage(_this.phone).then(function(json){
                      if(json.data.data == null){
                            _this.isStyleFalse = true;
                            _this.isStyleFalsesss = true;
                             _this.nextdones = false;
                             _this.errMsg = "短信发送失败";
                      }
                  })
              }
              if(json.data.data == 1){
                _this.isStyleFalse = true;
                 _this.isStyleFalsesss = true; 
                  _this.nextdones = false;
                  _this.errMsg = "手机号码已注册"
              }        
            })
              let sec =60; 
              for(let  i=0; i<=60; i++){
              window.setTimeout(function(){
                 if (sec != 0) {
                   _this.checkma = '已发送('+sec+')' ;
                  sec--;
                 } else {
                   sec = 60;
                   _this.checkma = '发送验证码'
               }
              }, i * 1000)
           }
         }
          }else{
              _this.isStyleFalses = true;
               _this.isStyleFalsesss = true;
                _this.nextdones = false;
                _this.errMsg = "手机号码填写错误"
          }
      }
  }
}
</script>
<style lang="less" scoped>
@import '../../common/css/animations.css';
 .phoneReg{
  	text-align: center;
  	position: absolute;
    top: 0px;
    left: 0px;
    height: 100%;
    width: 100%;
    
     background:#f3f4f6;
  }
  .phoneImg{
  	 width:2.133rem;
  	 height:2.133rem;
  	 margin-top:1.04rem;
  	 margin-bottom:1.28rem;
  }
  .phonetext{
    margin:0 auto;
    width:7.667rem;
    border-bottom: 1px solid #d4d4d4;
    font-size:0.373rem;
    position:relative;
    .input{
       background:#f3f4f6;
      height:0.4rem;
      width:7.667rem;
      line-height:0.4rem;
      padding-bottom:0.56rem;
    } 

    .inputs{
          background:#f3f4f6;
          color:#434a54;
          width: 61.3%;
          height:0.4rem;
          line-height:0.4rem;
          padding-bottom:0.56rem;
          margin-top:1.067rem;
    }
    div{
      width: 34%;
      display:inline-block;
      color:#70bad1;
      padding-bottom:0.56rem;
    }
  }
.success{
  margin:0 auto;
	font-size:0.32rem;
	margin-top:0.347rem;
	margin-bottom:1.333rem;
	color:#333;
  width: 7.667rem;
  text-align:left;
  span{
    color:#000;
  }

}
.contents{
	font-size:0.373rem;
	color:#e63838;
  opacity:0;
	margin-bottom:1.333rem;
}
.next{
	width:7.667rem;
	border:1px solid #d4d4d4;
	height:1.067rem;
	margin:0 auto;
	line-height:1.067rem;
	margin-bottom:1.293rem;
	font-size:0.427rem;
	color:#434a54;
}
	.contact{
		text-align: center;
		font-size: 0.347rem;
		color:#333;
		letter-spacing:0.02em;
		a{
			color:#333;
		}
	}
  .contentsno{
    opacity:1;
  }
      .showMsg{
    height: 0.4rem;
    line-height: 0.4rem;
    margin-top: 0.333rem;
    letter-spacing: 0.02em;
    color: #e63838;
    opacity: 0;
    width: 7.667rem;
    text-align: left;
    margin: 0 auto;
  }
    .errorMsg{
      color: #e63838 !important;
  }
  .successall{
    margin-bottom:1.32rem;
  }
     input::-webkit-input-placeholder { /* WebKit browsers */  
      color: #434a54; 
      font-family: PingFangSC-Light !important; 
  }  
  input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */  
     color: #434a54;  
     font-family: PingFangSC-Light !important;
  }  
  input::-moz-placeholder { /* Mozilla Firefox 19+ */  
     color:  #434a54;   
     font-family: PingFangSC-Light !important;
  }  
  input:-ms-input-placeholder { /* Internet Explorer 10+ */  
     color:  #434a54;  
     font-family: PingFangSC-Light !important;
  } 
    .nextgotext{
     background:rgba(112,186,209,0.6) !important;
  }
     .color::-webkit-input-placeholder { /* WebKit browsers */  
      color: #434a54; 
      font-family: PingFangSC-Light !important; 
  }  
  .color:-moz-placeholder { /* Mozilla Firefox 4 to 18 */  
     color: #434a54;  
     font-family: PingFangSC-Light !important;
  }  
  .color::-moz-placeholder { /* Mozilla Firefox 19+ */  
     color:  #434a54;   
     font-family: PingFangSC-Light !important;
  }  
  .color:-ms-input-placeholder { /* Internet Explorer 10+ */  
     color:  #434a54;  
     font-family: PingFangSC-Light !important;
  } 
</style>