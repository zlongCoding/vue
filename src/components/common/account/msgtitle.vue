<template>
  <div>
	 <div class="imgaccount">
	 	<div class="imgs"><img src="../../../assets/img/menu.png" class="left"/><img src="../../../assets/img/ceo.png" class="center" /><img src="../../../assets/img/accountsearch.png"  class="right"/></div>
	 	<img  :src="imageSrc" class="imgtitles borders" />
	 	<p class="acountmn pfrg">诊所收入 （元）</p>
	 	<p class="maney Helve">{{account}}</p>
	 </div>
  </div>
</template>
<script>
import { getStore } from '../../../common/js/test.js'
export default {
	data(){
	   return{
           account:"555.00",
           imageSrc:null,
		 }
	},
	created(){
         var img = getStore("userAll");
         this.imageSrc = JSON.parse(img).faceimg;
	},
	methods:{

	}
}

</script>
<style lang="less" scoped>
@import '../../../common/css/animations.css';

.imgaccount{
	text-align:center;
	padding-top:0.48rem;
	padding-bottom:0.48rem;
	background:#ccc;
	background:url(../../../assets/img/bgs.png) no-repeat;
}
 .imgs{
 	height:0.427rem;
 	line-height:0.427rem;
    position:relative;
    margin: 0 auto;
    margin-bottom:0.72rem;
    width: 80%;
    
 }
.center{
	 text-align:center;
	 position:absolute;
	 left:50%;
	 width:1.347rem;
	 margin-left:-0.673rem !important;
}
.right{
	position:absolute;
	right:0px;
    top:50%;
    height:0.32rem;
    margin-top:-.16rem;
}
.left{
	position:absolute;
	left:0px;
	top:50%;
	height:0.267rem;
	margin-top:-.14rem;
}
.imgtitles{
	text-align:center;
	width:1.333rem;
	height:1.333rem;
	backfround:red;
}
.acountmn{
	font-size:0.347rem;
	color:#666;
	margin-top:0.64rem;
	margin-bottom:0.293rem;
}
.maney{
	font-size:0.64rem;
    color:#333;
}
</style>