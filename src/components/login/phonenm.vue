<template>
  <div class="phoneReg">
          <titleimg></titleimg>
          <img :src="imageSrc" class="phoneImg borders"/>
          <div class="phonetext border pfxi iftimgs  " >
             <input  type="text" class="inputs inputcolor paddingfor" placeholder="真实姓名"  v-model="realName" v-on:focus="chenkClass" />
             <div><img :src="imgUrlT" @click="imgUrOc(1)"/><img :src="imgUrlO" @click="imgUrOc(0)"/></div> 
          </div>
          <div class="phonetext border pfxi iftimg ifmations paddingfor" @click="homeSelect">
             <span class="ifnspans marginmargin"><span>{{homeText}}</span></span><span class="infspan"><i class="right-arrow1"></i><i class="right-arrow2"></i></span>
          </div>
             <div class="phonetext border pfxi iftimg ifmations" @click="homeSelect">
             <input type="text" class="ifnspans inputcolor paddingfor" placeholder="所在地"/><span class="infspan"><i class="right-arrow1"></i><i class="right-arrow2"></i></span>
          </div>
          <div class="showMsg" :class="{ errorMsg: isStyleFalse}">{{errMsg}}</div>
          <div class="next borderfor pfxi" @click="nextStep" :class="{nextgotext: addall}">下一步</div>
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
          homeText:"出生年月",
          realName:null,
          isStyleFalse: false,
          errMsg:null,
          imageSrc:'',
          contentall:false,
          addall:false,
          imgUrl : ['/static/man.png','/static/womanco.png'],
          chageUrl:['/static/manco.png','/static/woman.png'],
          imgUrlO:'/static/man.png',
          sexnum:null,
          imgUrlT:'/static/womanco.png',
     }
  },
  beforeCreate(){
    var _this = this;    
    //在这里面请求然后在created里面赋值
    this.phone = 'https://ss0.baidu.com/73F1bjeh1BF3odCf/it/u=1072856952,1536565713&fm=85&s=4DA03C724D3A540D46DDF5CA0300D0F3'
    setStore("snsUserInfoName",'http://img2.imgtn.bdimg.com/it/u=846515892,1924310114&fm=23&gp=0.jpg')
     if( getStore("registerdoct") == "true"){
     //    _this.$router.push("/rgs")
     // setStore("snsUserInfoName","")
     // setStore("registerdoct","")
     }else{
      // setStore("registerdoct","")
      //     document.title="手机注册";
      //    setStore("snsUserInfoName","")
      }},
      created(){
         this.imageSrc = getStore("snsUserInfoName");
      },
  components:{
      titleimg
    },
  methods:{
    homeSelect(){

    },
    chenkClass(){

    },
    imgUrOc(num){
    this.isStyleFalse = false;
      if(num == 0){
         this.imgUrlO = this.chageUrl[num];
         this.imgUrlT = this.imgUrl[1]
         this.sexnum = "男"
      }else{
        this.imgUrlO = this.imgUrl[0];
        this.imgUrlT = this.chageUrl[num]
        this.sexnum = "女"
      }
    },
      getPhoneFocus(){
        this.isStyleFalse = false;
      },
      getCodeFocus(){
        this.isStyleFalse = false;
      },
     nextStep(){
        var _this = this;
        this.homeText="2011.12.1"
        _this.addall = true;
        if(myreg.test(_this.phone)){
          if(numTest.test(_this.phonenumber)){
             // _this.USER_PHOBE(_this.phone);
            api.checkMessage("phone="+_this.phone +"&code="+_this.phonenumber).then(function(data){
                          if(data.data.data == true ){
                            _this.$router.push("/identity");
                            console.log("aaaaaaa")
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
     margin-bottom:1.28rem;
  }
  .phonetext{
    margin:0 auto;
    width:7.667rem;
    border-bottom: 1px solid #d4d4d4;
    font-size:0.373rem;
    .input{
       background:#f3f4f6;
      height:0.373rem;
      width:7.667rem;
      padding-bottom:0.56rem;
    }

    .inputs{
       background:#f3f4f6;
          width: 64.3%;
          height:0.373rem;
          padding-bottom:0.56rem;
    }
    div{
      width: 34%;
      display:inline-block;
      color:#70bad1;
      padding-bottom:0.56rem;
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
  color:#e63838;
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
  margin-top:2.373rem !important;
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
      .showMsg{
    height: 0.4rem;
    line-height: 0.4rem;
    margin-top: 0.333rem;
    letter-spacing: 0.02em;
    color: #ff2847;
    opacity: 0;
    width: 7.667rem;
    text-align: left;
    margin: 0 auto;
  }
    .errorMsg{
    opacity: 1;
  }
  .successall{
    margin-bottom:3.013rem;
  }
.next{
  width:7.667rem;
  border:1px solid #d4d4d4;
  height:1.067rem;
  margin:0 auto;
  line-height:1.067rem;
  margin-bottom:1.307rem;
  font-size:0.427rem;
  color:#434a54;
}
     .ifmations{
    padding-top:0.533rem;
  }
  .nextgotext{
     background:rgba(112,186,209,0.6);
  }
    .phonetext{
    margin:0 auto;
    width:7.667rem;
    border-bottom: 1px solid #d4d4d4;
    .input{
      
      height:0.373rem;
      width:7.667rem;
      margin-bottom:0.56rem;
      font-family: PingFangSC-Light;
    }
    .inputs{
          width: 100%;
          height:0.373rem;
          padding-bottom:0.56rem;
          font-size:0.373rem;
          font-family: PingFangSC-Light;
          background:#f3f4f6;
    }
    div{
        width: 1.813rem;
        position: absolute;
        top: 0px;
        right: 0px;
         padding-bottom:0.26rem;

    }
  }
    .iftimgs{
        position:relative;
    div{
      width:1.813rem;
    }
    img:nth-child(1){
      float:right;
      margin-left:0.32rem;
    }
    img:nth-child(2){
      float:right;
    }
     img{
      width:0.667rem;
      height:0.667rem;
     }
     .ifnspans{
         display:inline-block;
         color:#434a54;
          padding-bottom: 0.56rem;
     }
  }
      .inputs{
          width: 100%;
          height:0.373rem;
          padding-bottom:0.56rem;
          font-size:0.373rem;
          font-family: PingFangSC-Light;
          background:#f3f4f6;
    }
      .iftimg{
    position:relative;
    padding-top: 0.533rem;
    div{
      width:1.813rem;
    }
    img:nth-child(1){
      float:right;
      margin-left:0.32rem;
    }
    img:nth-child(2){
      float:right;
    }
     img{
      width:0.667rem;
      height:0.667rem;
     }
     .ifnspans{
         display:inline-block;
          padding-bottom: 0.56rem;
          background:#f3f4f6;
     }
  }
  .infspan{
    position:absolute;
    right:  0.5rem;
    top:.5rem;
  }
        .right-arrow1,.right-arrow2{
            width:0;
            height:0;
            display:block;
            position:absolute;
            left:0;
            top:0;
            border-top:10px transparent dashed;
            border-right:10px transparent dashed;
            border-bottom:10px transparent dashed;
            border-left:10px white solid;
            overflow:hidden;
        }
        .right-arrow1{
            left:1px;
            border-left:10px #d4d4d4 solid;
        }
        .right-arrow2{
            border-left:10px #f3f4f6 solid;
        }
  .ifnspans{
    width:100%;
    text-align: left;
    font-size:0.373rem;
  }
  .marginmargin{
     margin-bottom: 0.15rem;
  }
  .iftimg input{
    font-family: PingFangSC-Light !important;
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