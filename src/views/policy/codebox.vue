<template>
  <div class="code-box" v-if="showCodeBox">
    <div class="code-box-mask"></div>
    <div class="code-box-main">
      <h3>温馨提示</h3>
      <p>
        您好，由于平台监管需要，请填写以下内容：
      </p>
      <div class="code-box-bd" v-model="codeBoxSource">
        <label v-if="codeBoxSource.checkCode">
          <span>交管平台</span>
          <input type="text" v-model="codeForm.pmAnswer"><img :src="codeBoxSource.checkCode"/>
        </label>
        <label v-if="codeBoxSource.bizCheckCode">
          <span>商业险</span>
          <input type="text" v-model="codeForm.bizAnswer"><img :src="codeBoxSource.bizCheckCode"/>
        </label>
        <label v-if="codeBoxSource.ctpCheckCode">
          <span>交强险</span>
          <input type="text" v-model="codeForm.ctpAnswer"><img :src="codeBoxSource.ctpCheckCode"/>
        </label>
        <label v-if="codeBoxSource.bizQuestion">
          <p>问题：{{codeBoxSource.bizQuestion}}</p>
          <span>商业险</span>
          <input type="text" v-model="codeForm.bizAnswer">
        </label>
        <label v-if="codeBoxSource.ctpQuestion">
          <p>问题：{{codeBoxSource.ctpQuestion}}</p>
          <span>交强险</span>
          <input type="text" v-model="codeForm.ctpAnswer">
        </label>
      </div>
      <div class="code-box-ft">
        <span @click="cancel">取消</span>
        <span @click="confirm">确认</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'codebox',
    props: {
      codeBoxSource: {
        type: Object
      },
      codeBoxCancel: {
        type: Function
      },
      codeBoxConfirm: {
        type: Function
      }
    },
    data () {
      return {
        showCodeBox: false,
        codeForm: {}
      }
    },
    methods: {
      values () {
        return this.codeForm
      },
      clear () {
        this.codeForm.pmAnswer = ''
        this.codeForm.bizAnswer = ''
        this.codeForm.ctpAnswer = ''
      },
      cancel () {
        if (this.codeBoxCancel) {
          this.codeBoxCancel()
        }
        this.close()
      },
      confirm () {
        if (this.codeBoxConfirm) {
          this.codeBoxConfirm()
        }
        this.close()
      },
      show () {
        this.showCodeBox = true
      },
      close () {
        this.showCodeBox = false
      }
    }
  }
</script>

<style scoped lang="scss">
  .code-box {

    &.none {
      display: none;
    }

    .code-box-mask {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(51, 51, 51, 0.5);
    }

    .code-box-main {
      position: absolute;
      top: 50%;
      left: 50%;
      -webkit-transform: translate(-50%, -50%);
      -moz-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      -o-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
      height: auto;
      width: 90%;
      background: #fff;
      color: #a5a5a5;
      border-radius: 5px;

      h3 {
        text-align: center;
        margin: 15px auto;
        font-size: 16px;
        color: #333;
      }
      > p {
        line-height: 2;
        margin: 15px;
      }
    }

    .code-box-bd {
      margin: 0 auto 20px;
      padding: 0 15px;

      label {
        display: block;
        margin-bottom: 10px;
        vertical-align: middle;

        p {
          margin: 10px 0;
        }
      }
      span {
        display: inline-block;
        margin-right: 5px;
      }
      input {
        line-height: 2.8;
        width: 100px;
        border: 1px solid #e2e2e2;
        margin-right: 5px;
      }

      img {
        vertical-align: middle;
      }
    }
    .code-box-ft {
      display: flex;
      border-top: 1px solid #e3e3e3;
      position: relative;

      &:after {
        display: block;
        content: '';
        height: 45px;
        width: 1px;
        position: absolute;
        top: 0;
        left: 50%;
        background: #e3e3e3;
      }
      span {
        display: block;
        width: 50%;
        height: 45px;
        text-align: center;
        line-height: 45px;
      }
    }
  }
</style>
