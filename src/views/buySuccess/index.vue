<template>
  <div id="buySuccess">
    <section>
    	<p>恭喜您获取金马力</p>
    	<p><span v-if="data">{{data.premium || 0}}</span></p>
    </section>
    <div class="title">驾驶习惯越好，金马力消耗越少，剩余金马力可用于购买次年安驾优享服务包。</div>
    <span class="buy_look" @click="toPage(`/myservice?fullscreen=true&vouchersNo=${num.autoVouchersNo}`)">查看我的服务</span>
    <i></i>
    <div @click="toPage(`/policy?fullscreen=true&vouchersNo=${num.autoVouchersNo}`)" class="back">立即投保车险</div>
    <div class="mint-indicator-mask" v-if="backTitle"></div>
  </div>
</template>

<script>
  import $ from '@/utils'
  const $$ = window.Mint
  export default {
    name: 'success',
    data () {
      return {
        data: null,
        vin: null,
        num: '',
        authcode: '',
        backFalse: false,
        backTitle: false
      }
    },
    methods: {
      toPage (url) {
        if (this.backFalse) {
          this.$router.push({path: url})
        }
      }
    },
    created () {
      $$.Indicator.open()
      $.setDocTitle(`购买成功`)
      this.vin = this.$store.getters.vin
      this.authcode = this.$store.getters.authCode
      // this.vouchersNo = this.$store.state.services.vouchersNo
      $.post('/ubi/balance', {'vin': this.vin}).then(json => {
        this.data = json
      }).catch(err => {
        console.log(err)
      })
      $.post(`/vouchers/autoVouchersNo/${this.$route.query.order}`).then(json => {
        this.num = json
        this.backFalse = json.success
        if (!this.num.success) {
          this.backTitle = true
          $$.Toast({message: this.num.message, duration: 2000})
          setTimeout(() => {
            this.$router.push({path: `/home?fullscreen=true&vin=${this.vin}&authcode=${this.authcode}`})
          }, 2000)
        }
        this.$store.dispatch('SERVICE_VOUCHERSNO', json.autoVouchersNo)
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
@import "../../assets/style/px2rem.scss";


#buySuccess{
	height: px2Rem(404px);
	width: 100%;
	background: url("../../assets/images/success.png") no-repeat;
	background-size:100% auto;
	position: absolute;
	top: 0;
	color:#e86044;
	background-color: #f4cf70;
	height:100%;
	.back{
		width: 90%;
		height: px2Rem(40px);
		background: #eee;
		text-align: center;
		background: #e86044;
		line-height: px2Rem(40px);
		color:#fff;
		position: absolute;
		bottom:  px2Rem(10px);
		left: 50%;
		font-size: 18px;
		margin-left:  -45%;
		border-radius: 4px;
	}
	section{
		position: absolute;
		width:px2Rem(216px);
		height:px2Rem(93px);
		text-align:center;
		left:50%;
		// top:50%;
		margin-top: px2Rem(40px);
		margin-left:px2Rem(-82px);
		padding-top:px2Rem(20px);
	}
	.buy_look{
		color:#fff;
		position: absolute;
		bottom:  px2Rem(60px);
		font-size: 18px;
		right: 5%;
		color: #e86044;
		margin-right: 14px;
	}
	i{
		display: inline-block;
		width: 18px;
		height: 18px;
		background: url("../../assets/images/success_right.png") top left no-repeat;
		background-position: 0px 0px;
		background-size: 10px;
		position:absolute;
		bottom: px2Rem(60px);
		right: 4%;
		margin-right: -4px;
	}
	p{
       font-size:16px;
	}
	p:nth-child(2){
		font-size: 20px;
		margin-top:px2Rem(10px);
		span{
			font-size: 30px;
		}
	}
	.title{
		position: absolute;
		margin-top: px2Rem(160px);
		width:px2Rem(230px);
		margin-left:px2Rem(-90px);
		left:50%;
		font-size: 14px;
		line-height:18px;
		color:#b17d01;
	}
}

</style>
