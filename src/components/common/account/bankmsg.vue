<template>
  <div class="bankmsg">
	 <p class="pfxi pleaase">{{title}}</p>
	 <div class="pfxi chikare">{{message}}</div>
	 <div class="pfxi name">{{name}}</div>
	 <div class="acountname border" >{{card}} <input type="text"  class="pfxi" v-model="messagess"  v-if="card == '手机号码'" :class="{widths: card == '手机号码'}" /> <input type="text"  class="pfxi" v-model="messages" @input="handleInput" v-if="card != '手机号码'"/></div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
	data(){
	   return{
	   	   messages:null,
	   	   messagess:null
		 }
	},
	props:['title','message','card','name'],
	watch:{
		// name(newValue,curVal){
  //           this.BANK_NAME(newValue)
		// },
		messages(newValue,curVal){
			this.BANK_CARD(newValue)
		},
		messagess(newValue,curVal){
			this.BANK_CARD(newValue)
		}
	},
	// created(){
 //       this.BANK_NAME(this.name)
	// },
	methods:{
	   ...mapMutations([
           // 'BANK_NAME',
           'BANK_CARD'
       ]),
	
	 handleInput: function() {
        var value = this.messages;
        // 最多3位
    if(this.messages.length < 23){
        if(/\S{5}/.test(value)){
            this.messages = value.replace(/\s/g, '').replace(/(.{4})/g, "$1 ");
        }
     }else{
        value = value.substr(0, 23);
        this.messages = value;
     }
    }
}
}
</script>
<style lang="less" scoped>
@import '../../../common/css/animations.css';

	.pleaase{
	   margin-top:1.467rem;
       font-size:0.4rem;
       color:#000;
       text-align:center;
       margin-bottom:1.267rem;
	 }
	 .chikare{
	 	font-size:0.32rem;
	 	color:#433a54;
	 	margin-bottom:0.32rem !important;
	 }
.bankmsg{
	 div{
	 	width:7.6rem;
	 	padding-left:0.267rem;
	 	margin:0 auto;
	 }
	 .acountname{
        color:#434a54;
        font-size:0.373rem;
        border-bottom:1px solid #cdced0;
        input {
        	width: 86%;
        	padding-bottom: 0.533rem;
        }
	 }
}
.name{
	font-size:0.373rem;
	color:#000;
	margin-bottom:1.6rem !important;
}
.widths{
	width:78% !important;
}
</style>