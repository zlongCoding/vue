<template>
  <div class="settle-detail-item">
    <div class="item-title">
      <div>
        <span></span>
        <span class="item-name">4S店漆面</span>
      </div>
      <div>待结算</div>
    </div>
    <div class="item-content">
        <div>
          <p>{{item.licenseNo}}</p>
          <p>核销日期: {{item.writeOffTime}}</p>
        </div>
        <div>
          <p v-html="diffSizeAmount(item.amount, '￥')"></p>
        </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['item']
  }
</script>

<style lang="scss">
  .settle-detail-item {
    .item-content {
      div:nth-of-type(2) {
        p {
          small {
            font-size: 1rem;
          }
        }
      }
    }
  }
</style>
<style scoped lang="scss">
  .settle-detail-item {
    margin-bottom: 10px;
    .item-title {
      background-color: #fff;
      display: flex;
      justify-content: space-between;
      .item-name {
        font-size: 1.2rem;
      }
      div {
        margin: 1rem;
        font-size: 1rem;
      }
      div:nth-of-type(2) {
        color: #DE693D;
      }
    }
    .item-content {
      background-color: #F8F9FD;
      display: flex;
      justify-content: space-between;
      align-items: center;
      p {
        margin: 1rem;
      }
      p:nth-of-type(1) {
        font-size: 1rem;
      }
      p:nth-of-type(2) {
        color: #979797;
      }
      div:nth-of-type(2) {
        p {
          font-size: 1.5rem;
        }
      }
    }
  }
</style>
