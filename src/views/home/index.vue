<template>
  <div id="home">
    <div id="homeSlider"  @click="toPage('/prizes')">
      <img :src="bannerJpg">
    </div>
    <div id="nav">
      <ul>
        <li @click="toPage('/serviceslist')">
          <div class="icon anjia"></div>
          <b>买服务包</b>
        </li>
        <li @click="toPage('/myservice')">
          <div class="icon insurance" :class="message ? 'homeMessage' : ''"></div>
          <b>我的服务</b>
        </li>
        <li>
          <router-link :to="{name: 'insuranceList'}">
            <div class="icon policy"></div>
            <b>查看保单</b>
          </router-link>
        </li>
        <li @click="toPage('/phonelist')">
          <div class="icon claim"></div>
          <b>电话理赔</b>
        </li>
      </ul>
    </div>

    <div id="renewFunds">
      <h3>金马力</h3>
      <div class="homeContent" @click="toPage('/reserve')">
        <b v-if="data&&data.lottoStatus ==='RECEIVED'||data.lottoStatus ==='USED'">{{data.totalHorsePower || 0}}</b>
        <b class="none" v-else>0</b>
        <span>详情</span>
      </div>
      <label v-if ="data&&data.lottoStatus ==='RECEIVED' " @click="toPage('/serviceslist')">购买服务包，金马力直抵现金（有效期至{{data.expiredDate}}）</label>
      <label v-if ="data&&data.lottoStatus ==='USED'  " style="color:#999;text-decoration: none;">可用于抵扣次年安驾优享服务包费用</label>
      <label v-if ="data&&data.lottoStatus ==='INELIGIBLE' " style="color:#999;text-decoration: none;">金马力可直抵服务包费用，敬请期待~</label>
      <label @click="toPage('/prizes')" v-if ="data&&data.lottoStatus ==='UNRECEIVED'">快来收割您的金马力，抵现金</label>
    </div>

    <div id="report">
      <h3>今日驾驶速递</h3>
      <ul class="distance">
        <li class="icon">
          <span class="num">{{day_behavior && day_behavior.driverMileage || 0}}</span>
          <span><span style="color:#ccc">公里</span><br>行驶里程</span>
        </li>
        <li class="icon icon1">
          <span class="num">{{day_behavior && day_behavior.premium || 0}}</span>
          <span><br>消耗金马力</span>
        </li>
        <!--      <li class="icon icon1 icon2" >
               <span class="num">{{day_behavior && day_behavior.score || 0}}</span>
               <span>分<br>行驶评分</span>
             </li> -->
      </ul>
      <ul class="action">
        <li class="icon">
          <span class="num">{{day_behavior && day_behavior.sharpTurn || 0}}</span>
          <span>次 急转弯</span>
        </li>
        <li class="icon icon1">
          <span class="num">{{day_behavior && day_behavior.rapidAcceleration || 0}}</span>
          <span>次 急加速</span>
        </li>
        <li class="icon icon1 icon2">
          <span class="num">{{day_behavior && day_behavior.rapidBrake || 0}}</span>
          <span>次 急刹车</span>
        </li>
      </ul>
    </div>
    <div class="companyNumbering">沪ICP备17041228号</div>
  </div>
</template>

<script>
  import $ from '@/utils'
  import banner from '../../assets/images/banner.jpg'
  import bannerNo from '../../assets/images/bannerno.jpg'
  // const $$ = window.Mint
  export default {
    name: 'home',
    data () {
      return {
        prizes_img: false,
        message: false,
        labelMessage: true,
        data: {},
        vin: null,
        authCode: null,
        day_behavior: null,
        bannerJpg: null,
        fullscreen: false
      }
    },
    methods: {
      handleChange (index) {
        console.log(index)
      },
      toPage (url) {
        if (url === '/prizes' && this.data && this.data.lottoStatus === 'INELIGIBLE') {
          return
        }
        if (url === '/prizes' && this.data && this.data.lottoStatus === 'UNRECEIVED') {
          this.$router.push({path: '/information'})
        } else {
          this.$router.push({path: url})
        }
      }
    },
    created () {
      this.fullscreen = this.$route.query.fullscreen
      if (this.fullscreen) {
        $.fullScreen()
        $.setDocTitle('智慧车险', true)
      } else {
        $.setDocTitle('智慧车险')
      }
      this.vin = this.$route.query.vin
      this.authcode = this.$route.query.authcode
      this.$store.dispatch('HOME_UPDATE_VIN', this.vin)
      this.$store.dispatch('HOME_UPDATE_AUTHCODE', this.authcode)
      $.post('/ubi/day-driving-behavior', {date: $.dateformat((new Date()), 'yyyyMMdd'), vin: this.vin}).then(json => {
        this.day_behavior = json.response
      }).catch(err => {
        console.log(err)
      })
      $.post('/ubi/balance', {'vin': this.vin}).then(json => {
        this.data = json
        if (json && json.lottoStatus !== 'INELIGIBLE') {
          this.bannerJpg = banner
        } else {
          this.bannerJpg = bannerNo
        }
        this.$store.dispatch('HOME_UPDATE_PAYCONFIG', json)
      }).catch(err => {
        console.log(err)
      })
      $.post(`/order/hasBought/${this.vin}`).then(json => {
        this.message = json
        this.$store.dispatch('SERVICE_HASBOUGHT', json)
      }).catch(err => {
        console.log(err)
      })
    },
    mounted () {
    },
    destroyed () {
    }
  }
</script>

<style scoped lang="scss">
  @import '../../assets/style/px2rem.scss';

  #home {
  }

  #homeSlider {
    height: px2Rem(180px);
    background: #ffffff;
    img{
      width:100%;
    }
  }

  #nav {
    background: #ffffff;
    overflow: hidden;
    border-bottom: 1px solid #e1e6ec;
    padding: 10px 0;

    .icon {
      width: 40px;
      height: 40px;
      margin: 0 auto;
    }
    .homeMessage {
      position: relative;
      &:after {
        position: absolute;
        content: '';
        top: -2px;
        right: -4px;
        width: 8px;
        height: 8px;
        background: #ff0000;
        border-radius: 50%;
      }
    }
    .insurance {
      background: url('../../assets/images/insurance.png') no-repeat;
      background-size: contain;
    }
    .policy {
      background: url('../../assets/images/policy.png') no-repeat;
      background-size: contain;
    }
    .claim {
      background: url('../../assets/images/claim.png') no-repeat;
      background-size: contain;
    }
    .anjia {
      background: url('../../assets/images/anjia.png') no-repeat;
      background-size: contain;
    }

    li {
      float: left;
      width: 25%;
      height: 70px;
      box-sizing: border-box;
      text-align: center;
      // border-right: 1px solid #e2e2e2;
      padding-left: 2px;
      margin-top: px2Rem(10px);

      &:nth-child(3) {
        border-right: none;
      }

      b {
        display: block;
        margin: 11px 0 3px;
      }

      span {
        font-size: 10px;
      }

      a {
        color: #333;
      }
    }
  }

  #renewFunds {
    margin-top: 12px;
    height: 80px;
    padding: 20px;
    border-top: 1px solid #e1e6ec;
    border-bottom: 1px solid #e1e6ec;
    text-align: center;
    background: url("../../assets/images/bg-001.jpeg") 1rem 0 no-repeat #fff;
    background-size: contain;
    position: relative;

    .homeContent {
      position: relative;
      span {
        position: absolute;
        right: 30px;
        top: 20px;
        font-size: 14px;
        color: #999;
      }

      &:after {
        content: '';
        display: block;
        width: 30px;
        height: 70px;
        background: url("../../assets/images/home.png") right top no-repeat #fff;
        background-position-y: 45px;
        background-size: 24px;
        position: absolute;
        top: -25px;
        right: 0;
      }
    }

    h3 {
      display: block;
      font-size: 18px;
    }

    b {
      display: inline-block;
      font-size: 30px;
      height: 34px;
      padding-top: 10px;
      color: #1ed2c9;
      margin-bottom: 10px;

      u {
        font-weight: normal;
        font-size: 16px;
        text-decoration: none;
      }

      &.none {
        color: #BAC0D2
      }
    }

    label {
      font-size: 12px;
      color: #ef6f42;
      text-decoration: underline;
          height: 18px;
    display: inline-block;
    line-height: 18px;
    }
  }

  #report {
    margin-top: 12px;
    background: #fff;
    border-top: 1px solid #e1e6ec;
    border-bottom: 1px solid #e1e6ec;
    background: url("../../assets/images/bg-002.png") 0 120% no-repeat #fff;
    background-size: contain;
    overflow: hidden;
    margin-bottom: 12px;

    h3 {
      display: block;
      font-size: 16px;
      text-align: center;
      margin-top: 20px;
      margin-bottom: 20px;
    }

    .icon {
      background: url("../../assets/images/home.png") right top no-repeat;
      background-size: 24px;
    }

    ul {
      display: inline-block;
      width: 48%;
    }

    .distance {
    color: #999;
      li {
        line-height: 1.2;
        padding-left: 65px;
        font-size: 12px;
        vertical-align: top;
        margin: 0 0 15px 0;
        white-space: nowrap;

        span {
          display: inline-block;
          text-align: left;
        }

        &.icon {
          background-position: 38px -84px;
        }

        &.icon1 {
          background-position: 38px -175px;
        }

        &.icon1.icon2 {
          background-position: 38px -488px;
        }

        .num {
          font-size: 20px;
          color: #1ed2c9;
          font-weight: bold;
          margin-left: 10px;
        }
      }
    }

    .action {

      border-left: 1px solid #ebeff8;

      li {
        line-height: 1.8;
        padding-left: 65px;
        vertical-align: middle;
        font-size: 12px;
        white-space: nowrap;

        &.icon {
          width: 35px;
          background-position: 35px -252px;
        }

        &.icon1 {
          background-position: 35px -302px;
        }

        &.icon2 {
          background-position: 35px -354px;
        }

        .num {
          font-size: 18px;
          font-weight: bold;
        }

        span {
          font-weight: bold;
        }
      }
    }
  }
  .companyNumbering{
      text-align:center;
      font-size:12px;
      color:#999;
      position:relative;
      margin-bottom:12px;
      &:before,&:after{
        background: rgb(204, 204, 204);
        content: "";  
        height: 1px;  
        position: absolute;  
        top: 50%;  
        width: 20%;
      }
      &:before{
        left: 12%;
      }
      &:after{
        right:12%;
      }
  }
      @media screen and (max-width : 320px){
          #renewFunds label{
            width: 105% !important;
          }
        }
</style>
