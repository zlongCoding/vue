<template>
  <div id="orders">
    <fsLoading v-if="orders.isFullScreenLoading" />
    <div class="balance">
      <p>订单总金额（元）</p>
      <b class="count" v-html="diffSizeAmount(data.totalAmount)"></b>
      <ul>
        <li>
          <span>已结算金额</span>
          <u v-html="diffSizeAmount(data.totalSettledAmount)"></u>
        </li>
        <li>
          <span>待结算金额</span>
          <u v-html="diffSizeAmount(data.totalUnsettledAmount)"></u>
        </li>
        <li>
          <span>退回（笔）</span>
          <u>{{data.returnedNum}}</u>
        </li>
      </ul>
    </div>

    <ul class="tab">
      <li :class="{current: orders.currentTab === ''}" @click="toggleTab('')">全部</li>
      <li :class="{current: orders.currentTab === 'UNSUBMITTED'}" @click="toggleTab('UNSUBMITTED')">待提交</li>
      <li :class="{current: orders.currentTab === 'PENDING_REVIEW'}" @click="toggleTab('PENDING_REVIEW')">待审核</li>
      <li :class="{current: orders.currentTab === 'TO_BE_SETTLED'}" @click="toggleTab('TO_BE_SETTLED')">待结算</li>
      <li :class="{current: orders.currentTab === 'RETURNED'}" @click="toggleTab('RETURNED')">已退回</li>
    </ul>

    <div class="noData" v-if="!orders.isLoading && !data.content.length && !orders.isLoadingMore">
      <p>您还没有{{orders.currentTab | orderStatus}}订单服务哦～</p>
    </div>

    <ul class="orderList" v-if="!orders.isLoading || orders.isLoadingMore">
      <li v-for="(item, index) in data.content">
        <div class="title" :class="item.logoType">
          {{item.vouchersName}}
          <span>{{item.status | orderStatus}}</span>
        </div>
        <div class="des">
          <p>{{item.licenseNo}}</p>
          <time>核销时间：{{item.writeOffTime}}</time>
          <span v-html="diffSizeAmount(item.amount, '¥')"></span>
        </div>
        <div class="action">
          <button class="_button" v-if="item.status === 'UNSUBMITTED'" @click="toScan(item.settlementId)">上传照片</button>
          <button class="_button" v-if="item.status === 'RETURNED'" @click="returnedReason(item.settlementId)">退回原因</button>
          <button class="_button" v-if="item.status === 'RETURNED'" @click="feedBack(item.settlementId, index)">申诉</button>
        </div>
      </li>
    </ul>

    <loading v-if="orders.isLoading" />

    <div class="loadDone" v-if="data.total > 0 && data.total === data.content.length && !orders.isLoading">已全部加载完成～</div>

  </div>
</template>

<script>
import Controller from './handle'
export default Controller
</script>

<style scoped lang="sass">
@import "../../assets/style/orders/index.scss"
</style>
