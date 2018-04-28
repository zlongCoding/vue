<template>
  <div class="no-piano">
      <img src="../../assets/images/else/nodata.png" />
        <!-- <p>您还没有开通此功能，敬请期待</p> -->
         <div class="myAppiont marginNavigation" @click="piano" v-show="buttonShow"><button>我要预约</button></div>
            <loading :content="'您的账号已被冻结，目前不能预约练琴'" v-if="pianoClass"></loading>
      <navigation></navigation>
    </div>
</template>

<script>

export default {
  name: 'Class',
  data () {
    return {
      buttonShow: false,
      pianoClass: false
    }
  },
  computed: {
    userInfo () {
      return this.$store.state.Home.userInfo
    }
  },
  methods: {
    piano () {
      if (this.userInfo.data.enabled === '2') {
        this.pianoClass = true
        setTimeout(() => {
          this.pianoClass = false
        }, 1000)
      } else {
        this.$router.push({path: '/piano'})
      }
    }
  },
  beforeMount () {},
  mounted () {
    setTimeout(() => {
      this.buttonShow = true
    }, 0)
  },
  destroyed () {}
}
</script>

<style scoped lang="scss">
@import "../../assets/style/px2rem.scss";
.no-piano{
  margin: 0 auto;
  text-align: center;
}
 img{
    margin-top: px2Rem(112px);
    margin-bottom: px2Rem(158px);
    width:px2Rem(165px);
    height:auto;
  }
  .myAppiont{
  text-align:center;
   button{
      height:px2Rem(52px);
      width:px2Rem(242px);
      margin-top:px2Rem(88px);
      background: #3D5860;
      font-family: PingFangSC-Regular;
      font-size: px2Rem(18px);
      color: #FFFFFF;
      box-shadow: 0 2px 4px 2px rgba(61,88,96,0.20);
      border-radius: px2Rem(100px);
      -webkit-border-radius: px2Rem(100px);
      -moz-border-radius: px2Rem(100px);
      -ms-border-radius: px2Rem(100px);
      -o-border-radius: px2Rem(100px);
   }
}
</style>
