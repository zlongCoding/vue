<template>
	<div>
	   <titleimg class="imgbotom" :msg= "msgT" ></titleimg>	
	   <p class="pfxi successp">恭喜您创建成功</p>
	   <div class="successdiv pfxi">
	   <div class="pfxi"><img src="../../assets/img/woman.png" /><p>简柔</p><p style="opacity:0" class="nameset">兼容</p></div>
	   <div class="pfxi"><img src="../../assets/img/woman.png" /><p>张哥哥诊所</p><p class="nameset">您的C医O</p></div>
	   </div>
	   <div class="borderfor pfxi next">继续</div>
	</div>
</template>
<script>
import titleimg from '../common/login/titileImg.vue'
export default {
  data(){
     return{
      msgT :false
     }
  },
  components:{
      titleimg
    },
}

</script>A
<style lang="less" scoped>
	@import '../../common/css/animations.css';
.successp{
	margin-top:1.307rem;
	font-size:0.427rem;
	color:#000;
	margin-bottom:1.253rem;
	text-align: center;
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
.successdiv{
	text-align: center;

	div{
		display:inline-block;
        p{
        	font-size:0.427rem;
        	column-rule: #333;
        }
        .nameset{
        	font-size:0.32rem;
        	color:#66434a;
        }

	}
	div:nth-child(1){
		margin-right:0.813rem;
	}
	div:nth-child(2){
		margin-left:0.813rem;
	}
}
</style>