<template>
  <div id="confirm">
    <div id="address" @click="toPage">
      <table v-if="Options.name === '' ? false : true">
        <tbody>
        <tr>
          <td width="90">保单收件人</td>
          <td>
            <b>{{Options.name}}</b>
            <span>{{Options.mobile}}</span>
          </td>
        </tr>
        <tr>
          <td>收件地址</td>
          <td>{{Options.provinceName}} {{Options.cityName}} {{Options.details}}</td>
        </tr>
        </tbody>
      </table>
      <write-address :writeAddress="`/selectAddress?orderNo=${order.orderNo}`"
                     v-if="Options.name !== '' ? false : true"></write-address>
    </div>
    <div class="cellList full">
      <ul>
        <li>
          <b>投保人</b>
          <span>{{order.applicantName}}</span>
        </li>
        <li>
          <b>被投保人</b>
          <span>{{order.insuredName}}</span>
        </li>
      </ul>
    </div>
    <div class="cellList full">
      <div class="insuranceInfo">
        <span :class="order.insurer" class="icon company"></span>
        {{order.insurer | config('company')}}
      </div>
      <ul>
        <li v-if="order.ctpActualPremium">
          <b>交强险 <em class="date">起保期：{{order.ctpStartDate}}</em></b>
        </li>
      </ul>
      <div class="cellList gray">
        <ul>
          <li>
            <b>车船税({{order.taxType}})</b>
            <label>&nbsp;</label>
          </li>
        </ul>
      </div>
      <ul>
        <li v-if="order.bizActualPremium">
          <b>商业险信息 <em class="date">起保期：{{order.bizStartDate}}</em></b>
        </li>
      </ul>
      <div class="cellList gray">
        <ul>
          <li v-if="order" v-for="kid in order.coverages">
            <b>{{kid.name}}</b>
            <label
                v-if="kid.code === 'DAMAGE_LOSS' || kid.code === 'THEFT' || kid.code === 'SELF_IGNITE'"><em class="tag">不计免赔</em>{{ kid.sumInsured | doubleNumber
              }}</label>
            <label v-else><em class="tag">不计免赔</em>{{ kid.sumInsured | numberToChinese }}</label>
          </li>
        </ul>
      </div>
    </div>
    <div class="pay">
      <button @click="submit(order)" :disabled='isDisabled' :class="isSubimt ? '' : 'none'">提交订单</button>
    </div>

    <div style="position: relative; height: 40px; line-height: 5">
      <p style="text-align: center; width: 100%; font-size: 12px;">由上海汽车集团保险销售有限公司提供保险支持</p>
    </div>

    <div class="global-mask" v-if="mask"></div>
    <codebox ref="codebox" :codeBoxCancel="codeBoxCancel" :codeBoxConfirm="codeBoxConfirm" :codeBoxSource="codeDB"/>
  </div>
</template>

<script>
  import utils from '@/utils'
  import Mint from 'mint-ui'
  import writeAddress from '@/components/writeAddress.vue'
  import Codebox from './codebox.vue'

  export default {
    name: 'confirm',
    data () {
      return {
        codeDB: {},
        codeParam: null,
        isSubimt: true,
        alertTip: '',
        writeUrl: 'selectAddress',
        isDisabled: false,
        mask: false
      }
    },
    computed: {
      Options () {
        return this.$store.state.selectAddress.Options
      },
      Req () {
        return this.$store.state.selectAddress.Req
      },
      addressOptions () {
        return this.$store.state.Confirm.address
      },
      order () {
        return this.$store.state.Confirm.order
      }
    },
    components: {
      writeAddress,
      Codebox
    },
    methods: {
      codeBoxCancel (data) {
        console.log('codeBoxCancel')
        this.isDisabled = false
        this.$refs.codebox.clear()
      },
      codeBoxConfirm () {
        console.log('codeBoxConfirm')
        this.isDisabled = false
        this.codeParam = this.$refs.codebox.values()
        this.submit(this.order)
      },
      submit (data) {
        if (!this.isSubimt) return

        if (!this.Options.cityName || !this.Options.details || !this.Options.mobile || !this.Options.name || !this.Options.provinceName) {
          Mint.Toast('请填写正确的保单寄送信息')
          return
        }

        let params = {
          orderNo: data.orderNo,
          delivery: {
            cityName: this.Options.cityName,
            details: this.Options.details,
            mobile: this.Options.mobile,
            name: this.Options.name,
            provinceName: this.Options.provinceName
          }
        }

        if (this.codeParam) {
          Object.assign(params, this.codeParam)
        }

        this.mask = true
        Mint.Indicator.open()
        this.$store.dispatch('CONFIRM_SUBMIT', {
          data: params,
          callback: (json) => {
            Mint.Indicator.close()
            this.isDisabled = true
            this.mask = false

            if (utils.isShowCode(json)) {
              this.codeDB = utils.isShowCode(json)
              this.$refs.codebox.show()
              return
            }

            if (json.orderStatus === 'TOBEPAID') {
              this.$router.push({path: '/policySucceed'})
            } else if (json.orderStatus === 'INSURE') {
              this.$router.push({path: '/labor'})
            } else if (json.orderStatus === 'DELETE' || json.orderStatus === 'FAILED') {
              this.$router.push({path: '/fail'})
            }
          }
        })
      },
      toPage (data) {
        this.$router.push({path: `/selectAddress?orderNo=${this.$route.query.orderNo}`})
      }
    },
    created () {
      this.alertTip = (this.$store.state.Insurance.calculate && this.$store.state.Insurance.calculate.errMsg) ? this.$store.state.Insurance.calculate.errMsg : ''
      this.isSubimt = this.alertTip === ''
    },
    beforeMount () {
      utils.setDocTitle(`确认订单`)

      if (!this.isSubimt) {
        Mint.MessageBox.alert(this.alertTip)
      }

      if (!this.Options.back) {
        this.$store.dispatch('CONFIRM_SELECTADDRESS', {
          orderNo: this.$route.query.orderNo,
          callback: (json) => {
          }
        })
      } else {
        this.$store.dispatch('SELECTADDRESS_BACK', false)
      }
      this.$store.dispatch('CONFIRM_GETITEM', {
        orderNo: this.$route.query.orderNo,
        callback: (json) => {
        }
      })
    },
    mounted () {},
    destroyed () {}
  }
</script>

<style lang="scss" scoped>
  #confirm {
    /*padding-bottom: 80px;*/
  }

  #address {
    background-color: #fff;
    background-image: repeating-linear-gradient(135deg, #F29B91 0px, #F09290 15px, transparent 15px, transparent 25px, #83B3DB 25px, #84ADCB 40px, transparent 40px, transparent 50px);
    padding: 4px;

    table {
      width: 100%;
      background: #fff;
      border-collapse: separate;

      tr {
        border-bottom: 1px solid #eeeeee;

        &:nth-child(2) {
          border-bottom: none;
        }

        td {
          padding: 10px 0;
          color: #898989;
          background: #fff;
          position: relative;
          line-height: 20px;
          border-collapse: collapse;
          border-spacing: 0;
          border-left: none;
          border-right: none;

          &:first-child {
            text-indent: 10px;
          }

          &:nth-child(2) {
            padding-right: 10px;
          }

          b {
            font-weight: normal;
            color: #333333;
          }

          span {
            position: absolute;
            right: 10px;
            color: #333333;
          }
        }
      }
    }
  }

  .cellList.full {
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    margin-top: 15px;

    ul li {
      margin-left: 0;

      b {
        margin-left: 15px;
        font-size: 16px;
      }

      i {
        font-style: normal;
        color: #999;
      }

      em.date {
        font-style: normal;
        font-size: 12px;
        color: #888;
      }

      em.tag {
        background: #c9cee1;
        color: #fff;
        font-size: 12px;
        padding: 3px 5px;
        border-radius: 2px;
        background-size: 14px;
        background-position: 3px 3px;
        margin: 0 8px;
      }

      span.right {
        right: 15px;
        color: #414141;
      }
    }
  }

  .cellList.gray {
    background: #f7fcff;

    ul li {
      color: #888888;

      span.right {
        right: 15px;
        color: #888888;
      }

      label,
      u {
        position: absolute;
        left: 90px;
        background: #d2d8e6;
        color: #fff;
        font-size: 12px;
        padding: 4px 5px;
        text-decoration: none;
        border-radius: 2px;
        top: 13px;

        &.current {
          background: #13d9c8;
        }
      }

      label {
        left: 152px;
        padding: 4px 0;
        background: none;
        color: #868686;
        font-size: 14px;
        top: 12px;
      }
    }
  }

  .cellList.total {
    ul li {
      span {
        right: 15px;
        color: #ef6e44;
        font-size: 20px;
        top: 13px;

        i {
          font-style: normal;
          font-size: 14px;
        }
      }
    }
  }

  .pay {
    height: 60px;
    line-height: 62px;
    font-size: 16px;
    text-align: center;
    margin-top: 30px;

    .price {
      position: absolute;
      top: 0;
      left: 56px;
      color: #ee6f44;

      span {
        font-size: 22px;
      }
    }

    .none {
      background: #ccc;
    }

    button {
      background: #13d9c8;
      display: inline-block;
      color: #ffffff;
      border: none;
      height: 43px;
      width: 80%;
      border-radius: 3px;
      font-size: 16px;
    }
  }

  .insuranceInfo {
    border-bottom: 1px solid #eee;
    font-weight: bold;
    font-size: 16px;
    height: 65px;
    line-height: 68px;
    position: relative;
    padding-left: 65px;

    .icon {
      width: 45px;
      height: 45px;
      position: absolute;
      left: 12px;
      border: 1px solid #ebeff8;
      top: 10px;
    }
  }

  .global-mask {
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, .5);
  }
</style>
