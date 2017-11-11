<template>
	<div>
	<section class="sectionCode" v-if ="content.includes('基础机油')">
		<section><i></i>小保养（基础机油）</section>
		<p>小保养（基础机油）服务包含更换机油、机油滤清器，其中机油、配件均为上汽原厂纯正配件。</p>
		<p>用户在经销商处做保养时，可在向经销商补足差价后，对机油升级，或小保养升级为大保养，具体如下：</p>
		<div>小保养（基础机油）加200元升级为小保养（高端机油）；</div>
		<div>小保养（基础机油）加185元升级为大保养（基础机油）；</div>
		<div>小保养（基础机油）加385元升级为大保养（高端机油）。</div>
	</section>
	<section class="sectionCode" v-if ="content.includes('高端机油')">
		<section><i></i>小保养（高端机油）</section>
		<div>小保养（高端机油）服务包含更换高端机油、机油滤清器，其中高端机油品牌为嘉实多，配件均为上汽原厂纯正配件。</div>
		<div>用户在经销商处做保养时，可在向经销商补足差价后，将小保养升级为大保养，具体为：小保养（高端机油）加185元升级为大保养（高端机油）。</div>
	</section>
     <section class="sectionCode"  v-if ="content.includes('4S店漆面')">
		<section><i></i>4S店漆面</section>
		<div>4S店漆面是由经销商提供的原厂专业漆面修复服务。</div>
	</section>
	<section class="sectionCode" v-if ="content.includes('专业检测')">
		<section><i></i>专业检测</section>
		<p>由经销商提供的专业检测服务涵盖12项行驶及安全性检查、8项行驶及运行安全深化检测，具体如下：</p>
		<p>12项行驶及安全性检查</p>
		<div>1）发动机机油检查</div>
		<div>2）皮带张紧、磨损情况检查</div>
		<div>3）冷却液检查</div>
		<div>4）空气滤清器检查</div>
		<div>5）制动、离合器液检查</div>
		<div>6）转向助力液检查</div>
		<div>7）雨刮器擦拭效果及喷射角度检查</div>
		<div>8）雨刮液量检查</div>
		<div>9）车灯、喇叭检查</div>
        <div>10）空调制冷效果检查（夏季）</div>
		<div>11）制动盘、片检查</div>
		<div>12）轮胎气压检查</div>
		<p>8项行驶及运行安全深化检查</p>
		<div>1）动力总成检查</div>
		<div>2）底盘、悬架检查</div>
		<div>3）转向系统检查</div>
		<div>4）电气系统检查</div>
        <div>5）车轮检查</div>
        <div>6）制动系统检查</div>
        <div>7）车辆整体状况检查</div>
		<div>8）专用电脑系统检查</div>
	</section>
	<section class="sectionCode"  v-if ="content.includes('宅捷修')">
		<section><i></i>宅捷修服务费用折扣券</section>
		<div>宅捷修是以上汽800客服中心为主导，集中调配全国经销商网络资源，对保修期内有需求的客户，在一定条件下提供上门取、送车及上门养、修业务，可节省用户因往返4S店而产生的时间和费用成本。</div>
		<div>宅捷修服务费用折扣券适用于宅捷修服务过程中产生的上门服务费、取送车服务费，不适用于拖车服务产生的费用以及其他费用。</div>
		<div>宅捷修24小时预约热线：800-820-0068（上汽800尊崇热线）</div>
        <div>宅捷修上门服务时间：9：00-16：00</div>
	</section>
	<section class="sectionCode"  v-if ="content.includes('工时')">
		<section><i></i>维修工时折扣券</section>
		<div>维修工时折扣券仅限用户付费维修时使用，用户享有维修工时折扣权利（维修工时折扣：金安驾8折，白金安驾7.5折，黑金安驾7折）；在常规保养、事故钣喷修理时不可使用。</div>
	</section>
	</div>
</template>
<script>
  export default {
    name: 'success',
    data () {
      return {
      }
    },
    props: {
      content: {
        default: 'aaaa'
      }
    },
    created () {
      // console.log(this.content)
    }
  }
</script>

<style lang="scss">
		.sectionCode div,.sectionCode p {
			padding: 8px 20px;
            font-size: 12px;
            line-height: 18px;
            // margin:8px 0;
		}
		.sectionCode p{
			font-weight: bolder;
		}
		.sectionCode section{
           height: 45px;
           line-height: 45px;
           background: #eee;
           border-top:1px solid #e9e9e9;
           border-bottom:1px solid #e9e9e9;
           padding-left: 15px;
           margin-bottom: 20px;
		}
	    .sectionCode div{
			padding-left: 30px;
			    padding-top: 2px;
    padding-bottom: 2px;
		}
		.sectionCode i {
			display: inline-block;
			width: 3px;
			height: 16px;
			margin-right: 6px;
			background: #56DEC6;
			position: relative;
			top:2px;
		}
		.sectionCode{
			    padding-bottom: 20px;
		}
</style>
