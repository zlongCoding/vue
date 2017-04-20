<template>
	<div class="phoneReg">
          <titleimg class="imgbotom"></titleimg>
          <!-- <img src="../../assets/img/man.png" class="phoneImg"/> -->
          <div class="phonetext border pfxi" >
             <input  type="text" class="input paddingfor" v-model="phone" placeholder="手机号码" v-on:focus="getPhoneFocus" />	
          </div>
          <div class="phonetext border pfxi" >
             <input  type="text" class="inputs paddingfor" v-model="phonenumber" placeholder="验证码" v-on:focus="getCodeFocus" />
             <div  @click="sendname">{{checkma}}</div>	
          </div>
          <!-- <div class="showMsg" :class="{ errorMsg: isStyleFalse}">{{errMsg}}</div> -->
          <div class="next borderfor pfxi border nexttop" @click="nextStep">登录</div>
          <div class="pfxi contents">没有账号，<span @click="goregister">马上注册</span></div>
         <img src="../../assets/img/wechat.png"  class="imgl" :class="{imgopcaty:imgopcatys}" @click="imgclick"/>
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
          imgopcatys : false
		 }
	},
  created(){
    document.title="登录"
       setStore("snsUserInfoName","")
  },
	components:{
		  titleimg
		},
  methods:{
      getPhoneFocus(){
        this.isStyleFalse = false;
      },
      getCodeFocus(){
        this.isStyleFalse = false;
      },
      imgclick(){
         this.imgopcatys = true;
      },
     nextStep(){
        var _this = this;
        if(myreg.test(_this.phone)){
          if(numTest.test(_this.phonenumber)){
             // _this.USER_PHOBE(_this.phone);
            api.checkMessage("phone="+_this.phone +"&code="+_this.phonenumber).then(function(data){
                          if(data.data.data == true ){
                            // _this.$router.push("/comfrom");
                            alert('aaaa')
                          }else{
                             _this.isStyleFalse = true;
                             _this.errMsg = "验证码输入错误"
                          }
                      })
          }else{
          _this.isStyleFalse = true;
          _this.errMsg = "验证码输入错误"
          }
        }else{
          _this.isStyleFalse = true;
          _this.errMsg = "手机号码输入错误"
        }
     },
     goregister(){
       this.$router.push("/register")
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
                 api.sendMessage(_this.phone).then(function(data){
                      
                  })
              }
              if(json.data.data == 1){
                _this.isStyleFalse = true;
                _this.errMsg = "手机号码已注册";
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
              _this.isStyleFalse = true;
              _this.errMsg = "手机号码输入错误";
          }
      }
  }
}

</script>
<style lang="less" scoped>
@import '../../common/css/animations.css';
.imgbotom{
  margin-bottom:2.32rem;
}
 .phoneReg{
  	text-align: center;
  	position: absolute;
    top: 0px;
    left: 0px;
    height: 100%;
    width: 100%;
     overflow: hidden;
     background:#f3f4f6;
  }
  .phoneImg{
  	 width:2.133rem;
  	 height:2.133rem;
  	 margin-top:1.04rem;
  	 padding-bottom:1.28rem;
  }
  .imgopcaty{
    opacity:.6;
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
    margin-top: 0.333rem;
  }
  .errorMsg{
   color: #e63838;
  }
  .phonetext{
  	margin:0 auto;
  	width:7.667rem;
  	border-bottom: 1px solid #d4d4d4;
  	font-size:0.373rem;
  	.input{
  		background:#f3f4f6;
  		height:0.4rem;
  		width:7.667rem;
      line-height:0.4rem;
  		padding-bottom:0.56rem;
  	}

  	.inputs{
      color:#434a54;
         background:#f3f4f6;
  		    width: 64.3%;
  		    height:0.5rem;
          line-height:0.5rem;
  		   padding-bottom:0.54rem;
  		    margin-top:1.067rem;
  	}
  	div{
  		width: 34%;
  		display:inline-block;
  		color:#70bad1;
  	}
  }
.success{
	font-size:0.32rem;
	margin-top:0.347rem;
	margin-bottom:1.333rem;
	color:#000;
}
.contents{
	font-size:0.373rem;
	color: #333;
	margin-bottom:2.32rem;
   span{
      text-decoration: underline;
   }
} 
.next{
	width:7.667rem;
	border:1px solid #d4d4d4;
	height:1.067rem;
	margin:0 auto;
	line-height:1.067rem;
	margin-bottom:0.533rem;
	font-size:0.427rem;
	color:#434a54;
}
.nexttop{
	margin-top:2.32rem;
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
  .imgl{
    width:1.467rem;
    height:1.467rem;
  }
   input::-webkit-input-placeholder { /* WebKit browsers */  
      color: #434a54;  
  }  
  input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */  
     color: #434a54;  
  }  
  input::-moz-placeholder { /* Mozilla Firefox 19+ */  
     color:  #434a54;   
  }  
  input:-ms-input-placeholder { /* Internet Explorer 10+ */  
     color:  #434a54;  
  } 
</style>