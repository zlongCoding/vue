<template>
  <div class="acount acuntdiv">
     <header class="pfxi">到账银行卡</header>

     <div class="bank borderten borderbox bg ">
     <div class="bankmsg"><div class="pfrg color">招商银行 储蓄卡</div><div class="pfrg color">2352352523</div></div>
     </div>
     <div class="addnew pfrg" @click="addbank">+添加新卡</div>
  </div>
</template>
<script>
import { myreg , numTest ,setStore , getStore} from '../../common/js/test.js'
import { mapMutations } from 'vuex'
import api from '../../api/login/login.js'
export default {
	data(){
	   return{
           account:"555.00",
           bgColor:"招商银行"
		 }
	},
  created(){
    document.title="银行卡"
  },

  methods:{
     addbank(){
       this.$router.push("/adbkone")
     }
  }
}

</script>
<style lang="less" scoped>
@import '../../common/css/animations.css';

.acuntdiv{
  header{
    margin-top:0.96rem;
     color:#343a46;
     font-size:0.347rem;
     text-align:center;
     margin-bottom:0.213rem;
  }

}
.bank{
  width:9.067rem;
  margin:0 auto;
  background:#ccc;
  height:2.133rem;
  margin-top:0.373rem;
  color:#fff;
  position:relative;
 
 
  .bankmsg{
    position:absolute;
    right:.6rem;
    top: 0.6rem;
  div:nth-child(1){
    font-size:0.373rem;
    margin-bottom: 0.12rem;
  }
  div:nth-child(2){
    font-size:0.64rem;
  }
   }
}
.addnew{
  color:#2e87fb;
  font-size:0.373rem;
  margin-top:1.067rem;
  text-align:center;
}
.color{
  color:#fff;
}
.colors{
  color:#aaa;
}
.bg{
   background:url("../../assets/img/card.png")  no-repeat;
    background-size: 100% 100%;
}
.bgs{
   background:url("../../assets/img/cards.png")  no-repeat;
    background-size: 100% 100%;
}
</style>