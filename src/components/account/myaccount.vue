<template>
  <div class="acount">
     <msgtitle></msgtitle>
	 <div class="message">
	 	<div class="withdraw borderten pfrg borderbox" @click="withdreaw"><img src="../../assets/img/cash.png"  /><span>提现</span></div>
	 	<div class="Details borderten pfrg borderbox" @click="part"><img src="../../assets/img/detail.png" /><span>收支明细</span></div>
	 </div>
  </div>
</template>
<script>
import msgtitle from '../common/account/msgtitle.vue'
import { myreg , numTest ,setStore , getStore} from '../../common/js/test.js'
import { mapMutations } from 'vuex'
import api from '../../api/login/login.js'
export default {
	data(){
	   return{
           account:"555.00"
		 }
	},
  created(){
    document.title="个人账户"
  },
  components:{
	  msgtitle
  },
  methods:{
      withdreaw(){
         this.$router.push("/withdraw")
      },
      part(){
         this.$router.push("/partil")
      }
  }
}

</script>
<style lang="less" scoped>
@import '../../common/css/animations.css';


.message{
  div{
  	width:9.2rem;
  	height:2.133rem;
  	line-height:2.133rem;
  	position:relative;
  	background:#fff;
  	margin: 0 auto;
  	padding-left:2.333rem;
  	color:#666;
  	font-size:0.4rem;
  	margin-top:0.533rem !important;
  	img{
  		height:0.907rem;
  		width:0.907rem;
  		position:absolute;
  		top:50%;
  		left:0.8rem;
  		margin-top:-0.453rem;
  	}
  }
}
</style>