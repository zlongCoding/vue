<template>
  <div class="acount acountwith">
       <header class="pfxi">到账银行卡</header>
       <div class="pfrg bankname borderten pfrg" v-if="banktrue" @click="bank">中国银行 32233232</div>
       <div class="banknone pfxi" @click="addbank" v-else>您目前没有绑定的银行卡，<span>添加银行卡</span></div>
       <div class="bankacount pfxi">提现金额</div>
       <div class="amount border"><span class="pfrg spans">&yen;</span><input type="number" class="borderbox" v-model="messages"/></div>
       <div class="amountmsg pfxi">当前账户余额215元，<span class="allnum pfxi" @click="all">全部提现</span></div>
       <div class="acountbottom pfrg borderfor" :class="{ clickacount: isActive }">完成</div>
       <div class="acountkeyboard">
           
       </div>
  </div>
</template>
<script>
import { myreg , numTest ,setStore , getStore} from '../../common/js/test.js'
import { mapGetters } from 'vuex'
import api from '../../api/login/login.js'
export default {
	data(){
	   return{
          isActive:false,
          banktrue:true,
          bankfalse:false,
          messages:null
		 }
	},   
      computed:{
      ...mapGetters({
            banknewcard:'banknewcard',
          })
    },
   watch:{
      $route(){
        console.log(this.banknewcard == "")
        if(this.banknewcard == ""){
             return ;
        }else{
           this.banktrue = true;
        }
      },
       messages: function(newVal, oldVal){

             if(newVal.indexOf(".") > 0){
              var newT = newVal.split(".")[1];
              var newO = newVal.split(".")[0];
                 if(newT >= 2){
                    if ( newT > 2) {
                         newT = newT.substr(0, 2);
                      }
                      var value = newO+"."+newT;
                       this.messages = value;
                 }
             }
       },
    },
  created(){
    document.title="提现"
  },

  methods:{
      bank(){
        this.$router.push("/bank")
      },
      addbank(){
        this.$router.push("/adbkone")
      },
      all(){
        //获取全部的金额
      }
  }
}

</script>
<style lang="less" scoped>
@import '../../common/css/animations.css';

.acountwith{
   header{
     margin-top:0.96rem;
     font-size:0.347rem;
     color:#343a46;
     text-align:center;
   }
}
.bankname{
  font-size:0.427rem;
  color:#2e87fb;
  width:9.2rem;
  background:#fff;
  height:2.133rem;
  line-height:2.133rem;
  text-align:center;
  margin:0 auto;
  margin-top:0.6rem;
  margin-bottom:0.72rem;
}
.bankacount{
  font-size:0.347rem;
  color:#343a46;
  text-align:center;
  margin-bottom:0.773rem;
}
.amount{
   width:5.84rem;
   text-align:center;
   font-size:1.267rem;
   margin: 0 auto;
   border-bottom: 1px solid #d4d4d4;
   position:relative;
   input{
    width:100%;
    margin-bottom:0.613rem;
    background:#f3f4f6;
    padding-left: 1.333rem;

   }
   span{
    position:absolute;
    line-height:1.5rem;
   }
}
.amountmsg{
  font-size:0.347rem;
  text-align:center;
  margin-top:0.32rem;
  margin-bottom:1.28rem;
  color:#676c72;
}
.banknone{
  margin-top:0.773rem;
  margin-bottom:1.653rem;
  text-align:center;
  font-size:0.347rem;
  color:#888;
  span{
    text-decoration:underline;
    color:#2b5ea0;
  }
}
.spans{
  font-size:1.08rem;
  color:#343a46;
}
.allnum{
  color:#2b5ea0;
  text-decoration:underline;
}

</style>