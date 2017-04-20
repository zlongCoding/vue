<template>
	<div>
	   <p v-if="msg"></p>
	   <img src="../../../assets/img/ceo.png"  :class="{ active: msg }"/>	
	</div>
</template>
<script type="text/javascript">
	 export default {
	 	data() {
	 		 return {
                "textnone":false
	 		 }
	 	},
	 	props:['msg'],
	 }
</script>
<style scoped>
	 div {
	 	text-align: center;
	 	height: 1.107rem;
	 }
	 div p{
	 	height: 0.133rem;
	 	width: 100%;
	 	background:#d4d4d4;
	 }
	 div img {
	 	margin-top: 0.667rem;
	 	width: 1.333rem;
	 	height: 0.427rem;
	 }
	 .active{
	 	margin-top: 0.533rem;
	 }
</style>
