<template>
  <div class="acount">
     <msgtitle></msgtitle>
	
    <div class="header"><div v-for="item in items"><span class="borderfor pfrg" @click="spancolor(item)" :class="{ span: spanname == item}">{{item}}</span></div></div>
<!-- 	 	<div>
       <img src="../../assets/img/cash.png" /><span>提现</span>
    </div> -->
  <div> 
	 	<div class="message messageo borderten borderbox"><img src="../../assets/img/detail.png" /><div class="acountone pfrg"><p class="pfrg pffont">收支明细</p><p class="pfxi pfxifont">2017-05-25</p></div><div class="acounttwo Helve acounttwoone">-550.00</div></div>
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
           account:"555.00",
           spanname:"全部",
           items:["全部","收入","支出"]
		 }
	},
  created(){
    document.title="收支明细"
  },
  components:{
	  msgtitle
  },
  methods:{
     spancolor(e){
        this.spanname = e;
     }
  }
}

</script>
<style lang="less" scoped>
@import '../../common/css/animations.css';

.header{
  width:100%;
  background:#fff;
  div{
    height: 1.333rem;
    width:33.33%;

    line-height:1.333rem;
    text-align:center;
    display:inline-block;
  }
      span{
      color:#333;
     font-size:0.32rem;
    }
}
    .span{
      display:inline-block;
      width:2.333rem;
      height:.8rem;
      background:#2e87fb;
      line-height: .8rem;
      color:#fff !important;
    }
.messageo{
  margin-top:0.533rem !important;
}
.message{
 
    width:9.2rem;
    height:2.133rem;
    position:relative;
    background:#fff;
    margin: 0 auto;
    padding-left:2.333rem;
    color:#666;
    font-size:0.4rem;
    
     img{
      height:0.907rem;
      width:0.907rem;
      position:absolute;
      top:50%;
      left:0.8rem;
      margin-top:-0.453rem;
    }

    div{
      display:inline-block;
    
    }
    .acountone{
     height:0.8rem;
      position:absolute;
      top:50%;
      margin-top:-0.4rem;
    }
    .acounttwo{
       position:absolute;
       right:0px;
       height:100%;
        padding-right: 1.333rem;
       line-height: 2.133rem;;
    }
}
.acounttwoone{
  color:#f45d93;
}
.acounttwoall{
  color:#1cbcc3;
}
.messaget{
  margin-top:0.4rem;
}
.pffont{
  font-size:0.373rem;
  color:#000;
}
.pfxifont{
  margin-top:0.24rem;
  font-size:0.293rem;
  color:#666;
}
</style>