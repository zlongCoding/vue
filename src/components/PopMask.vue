<template>
  <div class="pop-mask">
    <button @click="showMask = true"><slot></slot></button>
    <div class="mask" v-show="showMask">
      <div class="mask-background"></div>
      <div class="box">
        <div class="content">
          <div>确认结算</div>
          <div>
            <span v-show="showTip">短信已发送到{{tel}}，请输入验证码：</span>
            <div>
              <input type="text" ref="input">
              <countDown :period='60' :callback='getSmsCode'></countDown>
            </div>
          </div>
          <span @click="showMask=false">x</span>
        </div>
        <input type="button" @click="sendSMS()" value='确认' :disabled="false"></div>
      </div>
    </div>
  </div>
</template>
<script>
import utils from '@/utils'
export default {
  data () {
    return {
      showMask: false,
      showTip: false,
      tel: ''
    }
  },
  props: ['monthlyBillId'],
  methods: {
    getSmsCode () {
      utils.ajax('POST')('/writeoff-web-api/vouchers/settlement/bill/sendSmsCode').then(data => {
        this.tel = data
        this.showTip = true
      })
    },
    sendSMS () {
      utils.ajax('POST')('/writeoff-web-api/vouchers/settlement/bill/confirm', {monthlyBillId: this.monthlyBillId, checkCode: this.$refs.input.value}).then(data => {
        this.showMask = false
        this.$emit('refresh')
      })
    }
  }
}
</script>
<style scoped lang="scss">
  .pop-mask {
    button {
      border-style: none;
      width: 4rem;
      height: 1.5rem;
      color: #fff;
      background-color: #13d9c8;
      border-radius: 3px;
      outline: none;
      font-size: 12px;
    }
    .mask {
      display: flex;
      bottom: 0;
      left: 0;
      right: 0;
      top: 0;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      overflow: hidden;
      position: fixed;
      z-index: 10;
      .mask-background {
        bottom: 0;
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
        background-color: rgba(10, 10, 10, 0.86);
        }
      .box {
        background-color: white;
        border-radius: 5px;
        -webkit-box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
        box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
        color: #4a4a4a;
        display: block;
        z-index: 20;
        width: 17rem;
        height: 12rem;
        display: flex;
        flex-direction: column;
        .content {
          flex: 4;
          position: relative;
          padding: .8rem;
          text-align: center;
          >div:nth-of-type(1) {
            text-align: center;
            margin-top: 1rem;
            font-size: 1rem;
            div {
              display: flex;
            }
          }
          >div:nth-of-type(2) {
            margin-top: 2rem;
            display: flex;
            align-items: center;
            flex-direction: column;
            span {
              font-size: 12px;
              display: inline-block;
              margin-bottom: 10px;
            }
            div {
              display: flex;
              input {
                border: solid 1px;
                width: 6rem;
              }
            }
          }
          >span {
            position: absolute;
            right: 10px;
            top: 5px;
            font-size: 1rem;
            display: inline-block;
            width: 1.5rem;
            height: 1.5rem;
            line-height: 1.5rem;
            text-align: center;
          }
        }
        >input {
          flex: 1;
          padding: 0;
          border: none;
          background-color: #fff;
          border-top: 1px solid #ccc;
        }
      }
    }
  }
</style>
