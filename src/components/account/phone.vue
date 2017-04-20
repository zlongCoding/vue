<template>
  <div>
     <imgtitle></imgtitle>
     <header>绑定银行卡需要短信确认，验证码已发送至手机：</header>
     <div>21313211，请按指示操作。</div>
     <div><span></span><span></span><span></span><span></span><span></span><span></span></div>
     <div>下一步</div>
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

</style>