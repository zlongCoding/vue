<template>
    <div class="succeedRefund">
        <div class="refundContent">
             <div class="refundContentImg"><img src="../../assets/images/succeedRefund.png"/></div>
             <div class="refundContentText">
                 <h1>申请退款成功</h1>
                <p>我们将在3个工作日之内完成您的退款，请您耐心等待。</p>
                <p>
            		商品：金安驾服务包<br />
            		总价：{{totalRefundAmount}}
                </p>
             </div>
        </div>
        <button class="btn returnBtn" @click="jump()">返回首页</button>
    </div>
</template>

<script>
import Controller from '@/controller/succeedRefund/'
export default Controller
</script>

<style scoped lang="sass">
@import "../../assets/style/succeedRefund/index.scss"
</style>
