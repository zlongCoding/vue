<template>
    <div class="myService">
    	<div class="servicePack">
    		<div class="servicePackHead">
    			<span class="packageNmae">{{data.productName}}</span>
    			<span class="packageTime">到期时间：{{data.expiryDate}}</span>
    			<span class="isValid">{{data.status | config('serviceStatus')}}</span>
    		</div>
	    	<ul v-for="it in data.vouchersMOList">
	    		<li class="serviceList" v-if="it.productCategory == 'AUTO'" @click="jump(it.vouchersNo,it.productCategory,data.status,it.vouchersName,it.remainingQuantity)">
	    			<div class="coupon" @click="jump()">
			    		<div class="couponContent" v-if="data.status == 'VALID' && it.remainingQuantity != 0">
			    		    <div class="couponContentLeft">
			    		    	<div class="title">{{it.vouchersName}}</div>
				    		    <div class="time">
				    		    	<div>{{it.vouchersDesc}}</div>
				    		    </div>
			    		    </div>
			    		    <div class="couponContentRight">
			    		    	<div><span>1</span>次</div>
			    		    	<div>立即兑换</div>
			    		    </div>
			    		</div>
			    		<div class="couponContent-Invalid" v-if="data.status != 'VALID' || it.remainingQuantity == 0">
			    		    <div class="couponContentLeft">
			    		    	<div class="title">{{it.vouchersName}}</div>
				    		    <div class="time">
				    		    	<div>{{it.vouchersDesc}}</div>
				    		    </div>
			    		    </div>
			    		    <div class="couponContentRight-Invalid">
			    		    	<div>已投保</div>
			    		    	<a href="javascript:void(0)">查看保单</a>
			    		    </div>
			    		</div>
			    	</div>
	    		</li>
	    		<li class="serviceList" v-if="it.productCategory != 'AUTO'" @click="jump(it.vouchersNo,it.productCategory,data.status,it.vouchersName,it.remainingQuantity)">
	    		   <div class="serviceListImg">
	    		   	   <img :src="urlCode+it.logoUrl"/>
	    		   </div>
	    		   <div class="serviceContent">
	    		        <div class="service-head">
	    		        	<div class="title">{{it.vouchersName}}</div>
	    		        	<div class="prompt" v-show="it.consumptionQuantity">已用{{it.consumptionQuantity}}次</div>
	    		        </div>
	    		        <div :class="it.productCategory ==='TRAFFIC_PACKAGE' ? 'servicecontent' : 'service-content' ">
	    		        	<div :class="it.productCategory ==='TRAFFIC_PACKAGE' ? 'contentTexts' : 'contentText' ">{{it.vouchersDesc}}</div>
	    		        	<!-- <i v-if="it.productCategory != 'TRAFFIC_PACKAGE'"></i> -->
	    		        </div>
	    		        <div class="service-bottom" v-bind:class="{ 'service-active':data.status != 'VALID'}" v-if="it.productCategory != 'TRAFFIC_PACKAGE'">
	    		        	<div class="frequency"><span>{{it.remainingQuantity}}</span>次剩余可用</div>
	    		        </div>
	    		   </div>
	    		   <div class="mask" v-if="data.status != 'VALID' || it.remainingQuantity == 0"></div>
	    		</li>
	    	</ul>
    	</div>
    	<div class="explain">
    		<h1>退款说明</h1>
    		<div class="explainList">
    			<span>1、</span>
    			<p>车险若已投保，交强险、车船税不可退，商业险部分可退，商业险在申请退款后3个工作日失效；</p>
    		</div>
    		<div class="explainList">
    			<span>2、</span>
    			<p>流量若已使用，流量费用不可退，退款后有效期内流量仍可继续使用；</p>
    		</div>
    		<div class="explainList">
    			<span>3、</span>
    			<p>除车险、流量外的其他服务，一旦申请退款，服务即刻注销；</p>
    		</div>
    		<div class="explainList">
    			<span>4、</span>
    			<p>申请退款需要收取部分手续费</p>
    		</div>
    	</div>
    	<div class="serviceRefund">
    		<div class="money">
    			<div class="moneyLeft">退款金额：</div>
    			<div class="moneyRight"><span>￥</span>{{totalRefundAmount}}</div>
    		</div>
    		<button class="btn" v-on:click="openConfirm()">退款</button>
    	</div>
    </div>
</template>

<script>
import Controller from '@/controller/serviceRefund/'
export default Controller
</script>

<style scoped lang="sass">
@import "../../assets/style/myService/index.scss"
</style>
