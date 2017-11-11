<template>
  <div id="detail" :class=" pageData.insurer | config('company') === '过期' ? 'failColor' : '' ">
    <div class="prompting" v-if="pageData.orderStatus == 'TOBEPAID' ">
      <img src="../../assets/images/tool.png"/>
      您的订单在30分钟内有效，请尽快支付！
    </div>
    <div class="info">
      <div :class="pageData.insurer" class="icon company" v-if="pageData.insurer"></div>
      <b>{{ pageData.insurer | config('company')}}</b>
      <span :class=" pageData.insurer | config('company') === '过期' ? 'failColor' : '' ">{{pageData.totalPremium}}</span>

      <label v-if="pageData.orderStatus !== 'TOBEPAID' ">{{pageData.orderStatus | config('detailState')}}</label>
    </div>

    <div class="address" v-if="pageData.delivery">
      <div>
        收单人：{{pageData.delivery.name}}
        <span>{{pageData.delivery.mobile}}</span>
      </div>
      <p>
        {{pageData.delivery.provinceName}} {{pageData.delivery.cityName}} {{pageData.delivery.townName}} {{pageData.delivery.details}}
      </p>
    </div>
    <table class="sale">
      <tbody>
      <tr>
        <td width="80">服务经销商</td>
        <td>{{pageData.dealerName}}</td>
      </tr>
      </tbody>
    </table>
    <div class="insuranceItem" v-if="pageData.ctpActualPremium">
      <div class="type" @click="stateDisplay('ctpStart')">
        交强险 {{pageData.ctpPolicyNo}}
        <span
            v-if="Number(this.pageData.ctpActualPremium) + Number(this.pageData.tax)">
          {{(Number(this.pageData.ctpActualPremium) + Number(this.pageData.tax)).toFixed(2)}}
        </span>
        <i :class="ctpStart ? 'down' : 'up' "></i>
      </div>
      <div class="tableWrap" v-if="ctpStart">
        <table>
          <tbody>
          <tr>
            <td>交强险</td>
            <td>
            </td>
            <td>{{pageData.ctpActualPremium}}</td>
          </tr>
          <tr>
            <td>车船税<span v-if="pageData.taxType">（{{pageData.taxType}}）</span></td>
            <td>
            </td>
            <td>{{pageData.tax}}</td>
          </tr>
          </tbody>
        </table>
        <p>
          保险期限
          <span>{{pageData.ctpStartDate}} &nbsp;至 &nbsp;{{pageData.ctpEndDate}}</span>
        </p>
      </div>
    </div>
    <div class="insuranceItem" v-if="pageData.bizActualPremium">
      <div class="type" @click="stateDisplay('bizStart')">
        商业险  {{pageData.bizPolicyNo}}
        <span>{{pageData.bizActualPremium}}</span>
        <i :class="bizStart ? 'down' : 'up' "></i>
      </div>
      <div class="tableWrap tableNext" v-if="bizStart">
        <table>
          <tbody>
          <tr v-for=" val in pageData.coverages">
            <td>{{val.name}}</td>
            <td>
              <span><span v-if="val.exemptClauseCode">不计免赔</span> {{val.sumInsured | numberToChinese}}</span>
            </td>
            <td>{{val.value}}</td>
          </tr>
          </tbody>
        </table>
        <p>保险期限 <span>{{pageData.bizStartDate}} &nbsp;至 &nbsp;{{pageData.bizEndDate}}</span></p>
      </div>
    </div>
    <div class="orderDetail">
      <table>
        <tbody>
        <tr>
          <td>订单编号</td>
          <td>{{pageData.orderNo}}</td>
        </tr>
        <tr>
          <td>创建时间</td>
          <td>{{pageData.orderCreateDate}}</td>
        </tr>
        <tr v-if="pageData.payDate">
          <td>支付时间</td>
          <td>{{pageData.payDate}}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <button class="btn" v-if="pageData.orderStatus == 'TOBEPAID' " @click="payBack">我要支付</button>
  </div>
</template>

<script>
  import utils from '@/utils'
  import Mint from 'mint-ui'

  export default {
    name: 'insuranceDetail',
    data () {
      return {
        pageData: {},
        ctpStart: true,
        bizStart: true,
        colorFail: 'PICC',
        content: '',
        ctpActualAll: null
      }
    },
    methods: {
      stateDisplay: function (state) {
        this[state] = !this[state]
      },
      payBack: function () {
        utils.onliePay(this.pageData.bmOrderNo)
      }
    },
    created () {
      Mint.Indicator.open()
      this.$store.dispatch('DETAIL_GETINFO', {orderNo: this.$route.params.orderNo}).then(response => {
        Mint.Indicator.close()
        if (response) {
          this.pageData = response
        }
      })
    },
    beforeMount () {
      utils.setDocTitle('保单详情')
    }
  }

</script>

<style scoped lang="scss">
  .prompting {
    color: #ef6f42;
    background: #fcf8e3;
    border-bottom: 1px solid #f0b479;
    padding: 10px 15px;
    img {
      width: 14px;
      height: 14px;
      padding-right: 5px;
      position: relative;
      top: 2px;
    }
  }

  .info {
    height: 65px;
    position: relative;
    background: #ffffff;
    border-bottom: 1px solid #dedcdf;
    overflow: hidden;

    .icon {
      width: 45px;
      height: 45px;
      position: absolute;
      left: 12px;
      top: 10px;
      border: 1px solid #dedcdf;
      border-radius: 4px;
    }
    b {
      position: absolute;
      font-size: 18px;
      left: 65px;
      top: 25px;
    }

    span {
      position: absolute;
      right: 15px;
      font-size: 18px;
      top: 26px;
      color: #ef6f42;
    }

    label {
      background: #13d9c8;
      color: #fff;
      display: block;
      position: absolute;
      right: -23px;
      transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      -webkit-transform: rotate(45deg);
      -o-transform: rotate(45deg);
      -moz-transform: rotate(45deg);
      font-size: 10px;
      width: 66px;
      text-align: center;
      top: -3px;
      padding-top: 16px;
      padding-bottom: 4px;
    }
  }

  .address {
    background-color: #fff;
    background-image: repeating-linear-gradient(135deg, #F29B91 0px, #F09290 15px, transparent 15px, transparent 25px, #83B3DB 25px, #84ADCB 40px, transparent 40px, transparent 50px);
    padding: 4px;
    margin-top: 15px;

    div,
    p {
      background: #ffffff;
    }

    div {
      padding: 12px 10px;
      position: relative;

      span {
        display: block;
        right: 10px;
        top: 12px;
        position: absolute;
      }
    }

    p {
      font-size: 14px;
      color: #999999;
      display: block;
      padding: 12px 0 12px 10px;
      margin-top: -1px;
    }
  }

  .sale {
    background: #ffffff;
    margin-top: 15px;
    width: 100%;
    border-bottom: 1px solid #dedcdf;
    border-top: 1px solid #dedcdf;

    td {
      padding: 10px;
      line-height: 1.4;
      vertical-align: middle;

      &:nth-child(2) {
        padding-left: 0;
        color: #888888;
      }
    }
  }

  .insuranceItem {
    background: #ffffff;
    margin-top: 15px;
    border-bottom: 1px solid #dedcdf;
    border-top: 1px solid #dedcdf;

    .type {
      position: relative;
      padding: 15px;

      span {
        position: absolute;
        right: 30px;
        top: 15px;
      }
      i {

        display: inline-block;
        width: 18px;
        height: 18px;
        background-size: 18px !important;
        position: absolute;
        right: 10px;
        top: 13px;
        background: url("../../assets/images/arrow.png") top left no-repeat;
      }
      .up {
        background-position-y: -37px;
      }
      .down {
        background-position-y: -18px;
      }
    }

    .tableWrap {
      background: #f7fcff;
      padding: 15px;
      border-top: 1px solid #ebedf0;
    }
    .tableNext {
      tr {
        td:first-child {
          width: 30%;
        }
      }
    }

    table {
      width: 100%;
      tr {
        line-height: 25px;
      }
      td {
        font-size: 14px;
        color: #999;

        span span {
          background: #c9cee1;
          color: #ffffff;
          font-size: 12px;
          padding: 2px 5px;
          border-radius: 2px;
          position: relative;
          top: -1px;
        }

        &:nth-child(3) {
          text-align: right;
        }
      }
      tr td:first-child {
        width: 34%;
      }
    }

    p {
      display: block;
      margin-top: 15px;
      color: #999;
      font-size: 12px;

      span {
        color: #ef7043;
      }
    }
  }

  button {
    outline: none;
  }

  .failColor {
    color: #999 !important;
  }

  .orderDetail {
    background: #ffffff;
    margin-top: 15px;
    border-top: 1px solid #dedcdf;
    border-bottom: 1px solid #dedcdf;
    padding: 10px 0;

    table {
      width: 100%;

      td {
        padding: 5px 15px;
        font-size: 12px;
        color: #999999;

        &:nth-child(2) {
          text-align: right;
        }
      }

    }
  }

</style>
