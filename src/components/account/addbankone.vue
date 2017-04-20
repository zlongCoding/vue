<template>
  <div>
     <addbank :title="seachone" :message="message" :card="card" :name="name"></addbank>
     <div class="acountbottom borderfor pfrg" @click="next">下一步</div>
  </div>
</template>
<script>
import addbank from '../common/account/bankmsg.vue'
import {  mapGetters } from 'vuex'
import api from '../../api/account/index.js'
export default {
	data(){
	   return{
           account:"555.00",
           seachone:'请绑定持卡人本人的银行卡',
           message:'持卡人',
           card:'卡号',
           msg:null,
           name:"张龙"
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
       var data = {
          "name": this.name,
          "cardNumber": this.bankcards
       }
       console.log(this.bankcards)
       var _this = this;
       api.identifyBankCard(data).then(function(json){
           if(json.data.desc == "OK"){
               _this.$router.push("/adbktwo")
           }
       })
    }
  }
}

</script>
<style lang="less" scoped>
@import '../../common/css/animations.css';

div{
  margin-top:1.947rem;
}
</style>