<template>
    <div class="myService" id="myService">
        <div class="servicePack" v-for="(item,index) in data.content" v-if="!data.content && data.content.lenth != 0 || data.content != null">
            <div class="servicePackHead">
                <span class="packageNmae">{{item.productName}}</span>
                <span class="packageTime">到期时间：{{item.expiryDate}}</span>
                <span class="isValid">{{item.status | config('serviceStatus')}}</span>
            </div>
            <ul v-for="it in item.vouchersMOList">
                <li class="serviceList" v-if="it.productCategory == 'AUTO'">
                    <div class="coupon" @click="jump(it.vouchersNo,it.productCategory,item.status,it.vouchersName,it.remainingQuantity)">
                        <div class="couponContent" v-if="item.status == 'VALID' && it.remainingQuantity != 0">
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
                        <div class="couponContent-Invalid" v-if="item.status != 'VALID' || it.remainingQuantity == 0">
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
                <li class="serviceList" v-if="it.productCategory != 'AUTO'"
                    @click="jump(it.vouchersNo,it.productCategory,item.status,it.vouchersName,it.remainingQuantity)">
                    <div class="serviceListImg">
                        <img :src="urlCode+it.logoUrl"/>
                    </div>
                    <div class="serviceContent">
                        <div class="service-head">
                            <div class="title">{{it.vouchersName}}</div>
                            <div class="prompt" v-show="it.consumptionQuantity">已用{{it.consumptionQuantity}}次</div>
                        </div>
                        <div  :class="it.productCategory ==='TRAFFIC_PACKAGE' ? 'servicecontent' : 'service-content' ">
                            <div  :class="it.productCategory ==='TRAFFIC_PACKAGE' ? 'contentTexts' : 'contentText' ">{{it.vouchersDesc}}</div>
                            <i v-if="it.productCategory != 'TRAFFIC_PACKAGE'"></i>
                        </div>
                        <div class="service-bottom" v-bind:class="{ 'service-active':item.status != 'VALID'}" v-if="it.productCategory != 'TRAFFIC_PACKAGE'">
                            <div class="frequency"><span>{{it.remainingQuantity}}</span>次剩余可用</div>
                        </div>
                    </div>
                    <div class="mask" v-if="item.status != 'VALID' || it.remainingQuantity == 0"></div>
                </li>
            </ul>
            <ul>
                <li class="refund">
                    <button class="btn btn-ref" @click="jumpRefund(item.productNo, item.ecOrderNo)" v-if="item.status == 'VALID'">退款申请</button>
                    <button class="btn-disabled btn-ref" v-if="item.status == 'REFUNDED'">已退款</button>
                    <a href="tel:4006543330" class="btn btn-ref btn-a" v-if="item.status == 'VALID'" style="padding-top: 6px;
        padding-bottom: 5px;">联系客服</a>
                </li>
            </ul>
        </div>
        <div class="myServiceImg" v-if="!hasBought&&contentNone&&(data.content && data.content.length == 0 || data.content == null)">
            <img src="../../assets/images/limits.png">
            <div class="myServiceText">您还未购买服务包哦~</div>
            <button class="btn returnBtn" @click="jumpError()">返回首页</button>
        </div>
        <div class="myServiceImg" v-if="hasBought&&contentNone&&(data.content && data.content.length <= 0 || data.content == null)">
            <img src="../../assets/images/error.png" />
            <div class="myServicenone">未支付</div>
            <div class="myServicenull">请您到<span> 斑马APP-我的订单 </span>中支付</div>
            <button class="btn returnBtn" @click="jumpError()">返回首页</button>
        </div>
    </div>
</template>

<script>
  import Controller from '@/controller/myService/'

  export default Controller
</script>

<style scoped lang="sass">
    @import "../../assets/style/myService/index.scss"
</style>
