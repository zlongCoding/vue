<template>
	<div class="phoneReg">
          <titleimg class="imgbotom" :msg= "msgT" ></titleimg>
          <div class="changeline"></div>
          <div class="jincheng">3/3</div>
           <div class="phonetext border pfxi iftimg ifmations" @click="goodname">
             <input  type="text" class="inputs paddingfor" placeholder="疾病名称" readonly="readonly" v-model="name" v-on:focus="getPhoneFocus"/><span class="infspan"><i class="right-arrow1"></i><i class="right-arrow2"></i></span>
          </div>
          <div class="phonetext border pfxi iftimg ifmations ifmationtop" v-show="showmonent">
             <input  type="text" class="inputs paddingfor" placeholder="填写疾病名称" v-model="namenext" v-on:focus="getPhoneFocus"/>
          </div>
          <div class="phonetext border pfxi iftimg ifmations ifmationtop"  >
             <input  type="text" class="inputs paddingfor" placeholder="治疗方法" v-model="method" v-on:focus="getPhoneFocus" />
          </div>
          <div class="showMsg" :class="{ errorMsg: isStyleFalse}">{{errMsg}}</div>
          <div class="goodmore pfxi" @click="goodmore"><span>+</span>添加</div>
          <div class="phonetexts pftn">
            <div v-for="(item,index) in items"><span>{{item.sicknessName}}</span><span>: {{item.treatmentMethod}}</span><span class="goodsimg" @click="deletenum(index)"><img src="../../assets/img/error.png"/></span></div>
          </div>
          <div class="goodnext"><div class="borderfor pfxi bordergo" :class="{ nextgotext: nextdones}" @click="nextdone" >跳过</div><div class="borderfor pfxi bordersuceess" @click="nextgo" :class="{nextgotext: nextgos}" >完成</div></div>
    </div>
</template>
<script>
import titleimg from '../common/login/titileImg.vue'
import api from '../../api/login/login.js'
import { getStore } from '../../common/js/test.js'
import { mapGetters,mapMutations } from 'vuex'
export default {
  data(){
     return{
      msgT :true,
      name:null,
      method:null,
      items:[],
      showmonent : false,
      namenext:null,
      nextdones:false,
      nextgos:false,
      cueValue:null,
      isStyleFalse:false,
      errMsg:null
     }
  },
    computed:{
      ...mapGetters({
            userhome:'userhome'
          })
    },
    created(){
      document.title="添加擅长技能";
    },
  components:{
      titleimg
    },
    watch:{
        $route(){
          console.log("aaaaaaa")
           console.log(this.userhome)
           this.name = this.userhome.text;
           if(this.name.includes("其它")){
              this.showmonent = true;
           }
        },
        namenext(curValue,newValue){
          var _this = this;
           if(curValue.length >= 5){
               curValue = newValue
               this.namenext = curValue
           }
           // if(curValue.length > 4 ){
           //   curValue = _this.cueValue
           // }
        },
        name(curValue,newValue){
           if(curValue != "其它" || newValue != "其它"){
                this.showmonent = false;
           }
        }
    },
  methods:{
    getPhoneFocus(){
        this.errMsg = "";
        this.isStyleFalse = false;
    },
    goodname(){
        this.errMsg = "";
        this.isStyleFalse = false;
        this.showmonent = false;
        this.$router.push("/goodks");

    },
    nextgo(){
      this.nextdones= false;
      this.nextgos= true;
      this.$router.push("/nmescs")
    },
    nextdone(){
      this.nextgos= false
      this.nextdones= true
      this.$router.push("/nmescs")
    },
    deletenum(item){
      this.items.splice(item,1)
    },
    goodmore(){
       var _this = this;
       console.log(_this.items == [])
      if(_this.items == []){

      }
      if(_this.items.length > 2){
         _this.errMsg = "最多添加3中疾病";
         _this.isStyleFalse = true;
      }else{
      
        var dataname;
        if(this.name == "其它"){
            dataname = _this.namenext;
        }else if(_this.name == "" || _this.name == null){
           _this.errMsg = "疾病填写错误";
           _this.isStyleFalse = true;
        }else if(_this.name.length  > 10){
            _this.errMsg = "疾病名称最多10个字";
           _this.isStyleFalse = true;
        }else if(_this.method == "" || _this.method == null){
          _this.errMsg = "治疗方法填写错误";
           _this.isStyleFalse = true;
        }else if(_this.method.length > 100){
           _this.errMsg = "治疗方法不能超过100个字";
           _this.isStyleFalse = true;
        }else{
         var userAll = getStore("userAll");
         var id =JSON.parse(userAll)
         dataname = _this.name;
        var data = {
         "userId":id.id,
         "sicknessId": _this.userhome.id,
         "sicknessName":dataname,
         "treatmentMethod":_this.method
       }
      _this.items.push(data)
            _this.namenext = null;
      _this.name = null;
      _this.method = null
        }
      }


    },
    nextStep(){
      var data = {
           "goodats": []
           }
        data.goodats = this.items;
        var _this = this;
      api.goodat(data).then(function(json){
        console.log(json.data)
        _this.$router.push("/nmescs")
      })
    }
  },
  activated(){
     this.nextgos = false;
     this.nextdones = false;
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
    .phonetext{
    margin:0 auto;
    width:7.667rem;
    border-bottom: 1px solid #d4d4d4;
    .input{
      
      height:0.4rem;
      width:7.667rem;
      margin-bottom:0.56rem;
      font-family: PingFangSC-Light;
    }
    .inputs{
          width: 100%;
          height:0.5rem;
          line-height:0.5rem;
          padding-bottom:0.55rem;
          font-family: PingFangSC-Light;
          font-size:0.4rem;
          background:#f3f4f6;
          color:#434a54;
    }
    div{
        width: 1.813rem;
        position: absolute;
        top: 0px;
        right: 0px;
    }
  }
    .ifnspans{
    width:100%;
    text-align: left;
  }

  .infspan{
    position:absolute;
    right:  0.5rem;
    top:0px;
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
            border-left:10px #f3f4f5 solid;
        }
          .iftimg{
    position:relative;
    div{
      width:1.813rem;
    }
    img:nth-child(1){
      float:left;
    }
    img:nth-child(2){
      float:right
    }
     img{
      width:0.667rem;
      height:0.667rem;
     }
     span{
         display:inline-block;
          margin-bottom: 0.56rem;
     }
  }
  .goodmore{
  	margin-top:0.853rem;
    margin-bottom:2.05rem;
    font-size:0.427rem;
    color:#70bad1;
    span{
    	font-size:0.507rem !important;
    }
  }
  .ifmationtop{
  	margin-top:1.067rem;
  }
  .phonetexts{
  	margin: 0 auto;
    width: 7.667rem;
    height:2.667rem;
    font-size:0.4rem;
    color:#000;
   div{
    height:0.667rem;
    line-height:0.667rem;
    position:relative;
     span:nth-child(1){
        float:left;
        width:23%;
        text-align:left;
     }
     span{
       display:inline-block;
    overflow:auto;
    text-overflow: ellipsis;
    white-space: nowrap;
     }
      span:nth-child(2){
        float:left;
        width:60%;
        text-align:left;
     }
   }
  }
  .goodsimg{
    float:right;
    
   
    img{
       width:0.4rem;
       height:0.4rem;
      position:relative;
      top:0.08rem;
    }
  }
  .goodnext{
      margin: 0 auto;

      width:100%;
    div{
    height:1.067rem;
    border:1px solid #d4d4d4;
	width:4.0rem;
	margin:0 auto;
	line-height:1.067rem;
	font-size:0.427rem;
	color:#434a54;
    	display:inline-block;
    }
    div:nth-child(1){
      margin-right:.3rem;
    }
    div:nth-child(2){
      margin-left:.3rem;
    }
  }
  .changeline{
  position:absolute;
  width:100%;
  height:0.133rem;
  background:#70bad1;
  top:0px;
  left:0px;
}
.jincheng{
   position:absolute;
   top:0.453rem;
   right:.3rem;
   font-size:0.32rem;
}
  .nextgotext{
     background:rgba(112,186,209,0.6) !important;
  }
  .ifmations{
     background:#f3f4f6;
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
  .bordersuceess{
    background:#fff;
  }
  .bordergo{
    background:rgba(255,255,255,0.5) !important;
  }
  .showMsg{
    height: 0.4rem;
    line-height: 0.4rem;
    margin-top: 0.333rem;
    letter-spacing: 0.02em;
    color: #e63838;
    opacity: 0;
}
.errorMsg{
  opacity: 1;
}
</style>