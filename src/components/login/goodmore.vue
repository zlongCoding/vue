<template>
	<div class="phoneReg">
          <titleimg class="imgbotom" :msg= "msgT" ></titleimg>
           <div class="phonetext border pfxi iftimg ifmations" >
             <input  type="text" class="inputs paddingfor" placeholder="其他"/><span class="infspan"><i class="right-arrow1"></i><i class="right-arrow2"></i></span>
          </div>
          <div class="phonetext border pfxi iftimg ifmations ifmationtop" >
             <input  type="text" class="inputs paddingfor" placeholder="填写治疗方法"/>
          </div>
          <div class="goodmore pfxi"><span>+</span>添加</div>
          <div class="phonetexts pfxi" style="backgrund:red;"></div>
          <div class="goodnext"><div class="borderfor pfxi" @click="nextdone" :class="{nextgotext:nextdones}">跳过</div><div class="borderfor pfxi" @click="nextgo" :class="{nextgotext:nextgos}">下一步</div></div>
    </div>
</template>
<script>
import titleimg from '../common/login/titileImg.vue'
export default {
  data(){
     return{
      msgT :true,
      nextdones:false,
      nextgos:false
     }
  },
  components:{
      titleimg
    },
  methods:{
    nextgo(){
      this.nextdones= false
     this.nextgos= true
    },
    nextdone(){
      this.nextgos= false
      this.nextdones= true
    }
  }
}

</script>
<style lang="less" scoped>
@import '../../common/css/animations.css';
.imgbotom{
  margin-bottom:2.16rem;
}
 .phoneReg{
  	text-align: center;
  	position: absolute;
    top: 0px;
    left: 0px;
    height: 100%;
    width: 100%;
     overflow: hidden;
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
          margin-bottom:0.56rem;
          font-family: PingFangSC-Light;
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
            border-left:10px blue solid;
        }
        .right-arrow2{
            border-left:10px white solid;
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
    margin-bottom:2.133rem;
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
    background:red;
    height:2.667rem;
  }
  .goodnext{
      margin: 0 auto;
    width: 7.667rem;
    margin-top:1.067rem;
    div{
    height:1.067rem;
    border:1px solid #d4d4d4;
	width:40%;
	margin:0 auto;
	line-height:1.067rem;
	margin-bottom:1.307rem;
	font-size:0.427rem;
	color:#434a54;
    	display:inline-block;
    }
    div:nth-child(1){
    	float:left;
    }
    div:nth-child(2){
    	float:right;
    }
    div{
      background:rgba(225,225,225,0.5);
    }
  }
  .nextgotext{
     background:rgba(112,186,209,0.6);
  }
</style>