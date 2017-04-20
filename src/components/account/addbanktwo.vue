<template>
  <div>
     <addbank :title="seachone" :message="message" :name = "name" :card="card"></addbank>
     <p class="pfxi agree"><span class="three">您已同意</span> <span class="zero">平台收费规则说明</span> <span class="three">及</span> <span class="zero">法律条款</span></p>
     <div class="acountbottom borderfor pfrg" @click="next">下一步</div>
  </div>
</template>
<script>
import addbank from '../common/account/bankmsg.vue'
import { mapGetters ,mapMutations} from 'vuex'
import api from '../../api/login/login.js'
import { myreg } from '../../common/js/test.js'
export default {
	data(){
	   return{
           account:"555.00",
           seachone:"请选择银行卡类型",
           message:'卡类型',
           name:'中国剑圣',
           card:'手机号码'

		 }
	},
  created(){
    document.title="添加银行卡"
  },
  components:{
	  addbank
  },
    computed:{
      ...mapGetters({
            bankcards:'bankcards',
          })
    },
  methods:{
     next(){
         var _this = this;
        if(myreg.test(_this.bankcards)){
             //手机号码验证正确的时候
             _this.$router.push("/adbklast")
        }else{

        }
     }
  }
}

</script>
<style lang="less" scoped>
@import '../../common/css/animations.css';

p{
   text-align:center;
   font-size:0.32rem;
   color:#434a54;
   margin-top:0.373rem;
   margin-bottom:1.28rem;
}
.three{
  color:#333;
}
.zero{
  color:#000;
}
</style>