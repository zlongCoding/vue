<template>
  <div>
     <imgtitle></imgtitle>
     <header>提现申请已提交</header>
    <div class="imgtitle" > <img src="../../assets/img/success.png"  alt="" /></div>
     <div class="bankname"><span class="spanone">到账银行卡</span><span class="spantwo">建设银行21414131</span></div>
     <div class="banknumber"><span class="spanone">提现金额</span><span class="spantwo">&yen;200.00</span></div>
     <div class="acountbottom borderfor pfrg succrssnone">完成</div>
  </div>
</template>
<script>
import imgtitle from '../common/account/imgtitle.vue'
import { mapMutations } from 'vuex'
import api from '../../api/login/login.js'
export default {
	data(){
	   return{
           account:"555.00"
		 }
	},
  created(){
    document.title="手机号认证"
  },
  components:{
	  imgtitle
  },
  methods:{
  
  }
}

</script>
<style lang="less" scoped>
@import '../../common/css/animations.css';

header{
  font-size:0.4rem;
  color:#000;
  margin-bottom:1.173rem;
  text-align:center;
}
.imgtitle{
   margin-bottom:1.2rem !important; 
   text-align:center;
  margin:0 auto;

  img{
    width:1.333rem;
  }
}
.bankname , .banknumber{
  width:7.6rem;
  margin:0 auto;
  height:1rem;
}
.spanone{
   font-size:0.347rem;
   color:#343a46;
}
.spantwo{
   font-size:0.427rem;
   color:#343a46;
   float:right;
}
.succrssnone{
  margin-top:1.733rem;
}
</style>