<template>
  <div>
     <header class="pfxi">绑定银行卡需要短信确认，验证码已发送至手机：</header>
     <div class="phonenumber">{{msg}}，请按指示操作。</div>
     <div class="authcode border">            
            <input type="text"  v-model="num"/>
            <input type="text" v-model="numo"/>
            <input type="text" v-model="numt"/>
            <input type="text" v-model="numf"/>
            <input type="text" v-model="numfi"/>
            <input type="text" style="border-right:1px solid #cdced0;" v-model="nums"/></div>
     <div class="acountbottom borderfor pfrg" @click="next">下一步</div>

  </div>
</template>
<script>
import { numTest } from '../../common/js/test.js'
import { mapGetters,mapMutations } from 'vuex'
import api from '../../api/login/login.js'
export default {
	data(){
	   return{
           account:"555.00",
           msg:null,
           num:null,
           numo:null,
           numt:null,
           numf:null,
           numfi:null,
           nums:null,
           numtotal:null
		 }
	},
  watch:{
     // num:function(newVal, oldVal){
     //    console.log(newVal.length)
     // }
  },
  created(){
    document.title="银行卡";
    this.msg = this.bankcards;
  },
    computed:{
      ...mapGetters({
            bankcards:'bankcards',
          })
    },
    beforeUpdate(){
     var txts = document.getElementsByTagName("input");            
     for(var i = 0; i<txts.length;i++){
        var t = txts[i];
        t.index = i;
                    // t.setAttribute("readonly", true);
         t.onkeyup=function(evt){
            evt = (evt) ? evt : window.event
         if (evt.keyCode == 48 || evt.keyCode == 49 || evt.keyCode == 50 || evt.keyCode == 51 || evt.keyCode == 52 || evt.keyCode == 53 || evt.keyCode == 54 || evt.keyCode == 55 || evt.keyCode == 56 || evt.keyCode == 57) {
           this.value=this.value.replace(/^(.).*$/,'$1');
              var next = this.index + 1;
               if(next > txts.length - 1) return;
               txts[next].focus();
                }
            }
        }
    },
  methods:{
    ...mapMutations([
      'BANK_NEWCARD'
    ]),
      next(){
        var _this = this;
        _this.numtotal = _this.num+_this.numo+_this.numt+_this.numf+_this.numfi+_this.nums;
        if(numTest.test(_this.numtotal)){
            //验证码正确
            var fal = "true";
            _this.BANK_NEWCARD(fal);
            _this.$router.push("/withdraw")
        }
      }
  }
}
</script>
<style lang="less" scoped>
@import '../../common/css/animations.css';

header{
  margin-top:1.467rem;
  font-size:0.4rem;
  color:#000;
  margin-bottom:0.32rem;
  text-align:center;
}
.phonenumber{
  color:#000;
  font-size:0.4rem;
  text-align:center;
}
.authcode{
    position:relative;
    width:7.6rem;
    margin-top:1.867rem;
    margin-bottom:2.8rem;
    height:1.333rem;
    
    margin:0 auto;
    margin-top:1.86rem;
    margin-bottom:2.8rem;
    input{
      font-size:0.8rem;
      color:#333;
      float:left;
      text-align:center;
      display:inline-block;
      width:16.66%;
      height:100%;
      border:1px solid #cdced0;
      border-right:none;
      box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;

    }
}
</style>