<template>
	<div class="phoneReg">
	   <titleimg class="imgbotom" :msg= "msgT" ></titleimg>	
	   <p class="pfxi changep">请选择您感兴趣的对象成为C医O</p>
	   <div class="changecontent pfxi borderten">
	   	  <img src="../../assets/img/woman.png" />
	   	  <p>{{name}}</p>
	   	  <div style="line-height: .5rem;">{{name}}是官方认证的医生群体，医生全部来自三甲医院，根据您的需求提供全方位的服务</div>
	   </div>
	   <div class="borderfor pfxi next">我选TA</div>
	</div>
</template>
<script>
import titleimg from '../common/login/titileImg.vue'
export default {
  data(){
     return{
      msgT :false,
      name:"Angela.p"
     }
  },
  components:{
      titleimg
    },
}

</script>A
<style lang="less" scoped>
	@import '../../common/css/animations.css';
.changep{
	margin-top:1.307rem;
	font-size:0.427rem;
	color:#000;
	margin-bottom:1.253rem;
	text-align: center;
}
.phoneReg{
	  	position: absolute;
    top: 0px;
    left: 0px;
    height: 100%;
    width: 100%;
     overflow: hidden;
     background:#f3f4f6;
}
.changecontent{
	width:8.933rem;
	margin:0 auto;
	background:#fff;
  padding-top:1.2rem;
    color:#333;
    height:6.8rem;
    text-align: center;
    margin-bottom:1.573rem;
    p{
    	margin-top:0.24rem;
    	margin-bottom:1.12rem;
    	font-size:0.4rem;
    	color:#333;
    }
    div{
    	padding:0 1.12rem;
    	color:#666;
    	font-size:0.373rem;
    	line-height:0.453rem;
    }
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
  text-align:center;
}
</style>