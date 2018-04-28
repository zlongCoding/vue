<template>
  <div id="certification">
    <div class="title">
    <div>学员资格证</div>
    <p>Cadet qualification certificate</p>
    <img :src="userInfo.data.pic" v-if="userInfo.data.pic.length > 5 && userInfo.data.userName != '0'"/>
    <div v-if="userInfo.data.pic.length > 5 && userInfo.data.userName != '0'">{{userInfo.data.userName}}</div>
    <div v-if="userInfo.data.pic.length <= 5 || userInfo.data.userName == '0'" class="divClass">请联系艺校认证您的真实姓名及照片</div>
    </div>
    <section>
       <img src="../../assets/images/personalcenter/gangqinbg@2x.png" />
    </section>
  </div>
</template>

<script>
import utils from '../../utils'
export default {
  name: 'certification',
  computed: {
    userInfo () {
      return this.$store.state.Home.userInfo
    }
  },
  methods: {
    routerList (id) {
      this.$router.push({path: 'list', query: {id: id}})
    }
  },
  beforeMount () {
    document.body.style.background = '#fff'
  },
  mounted () {
    utils.setDocTitle('学员认证')
  },
  destroyed () {}
}
</script>

<style scoped lang="scss">
@import "../../assets/style/px2rem.scss";

 #certification{
  .title{
   width: px2Rem(312px);
   margin:0 auto;
   overflow: hidden;
   font-family: PingFangSC-Semibold;
   text-align:center;
   margin-top: px2Rem(30px);
   background: #3D5860;
   box-shadow: 0 2px 18px 0 rgba(0,0,0,0.19);
   border-radius: 8px 8px 0 0;
   -webkit-border-radius: 8px 8px 0 0;
   -moz-border-radius: 8px 8px 0 0;
   -o-border-radius: 8px 8px 0 0;
   div:first-child{
    font-size: px2Rem(18px);
    margin-top:px2Rem(31px);
    margin-bottom:px2Rem(11px);
    color: #FFFFFF;
   }
   .divClass{
    margin-top:px2Rem(40px);
    margin-bottom:px2Rem(60px);
   }
   div:last-child{
    font-size: px2Rem(18px);
    color: #FFFFFF;
    margin-bottom:px2Rem(20px);
   }
   p{
    opacity: 0.6;
    font-size: px2Rem(14px);
    color: #FFFFFF;
   }
   img{
     width: px2Rem(80px);
     height:px2Rem(80px);color: #FFFFFF;

     border-radius: 50%;
     margin:px2Rem(20px) 0 px2Rem(16px) 0;
   }
 }
  section{
    margin:0 auto;
    background: #FFFFFF;
    box-shadow: 0 2px 18px 0 rgba(0,0,0,0.19);
    -webkit-box-shadow: 0 2px 18px 0 rgba(0,0,0,0.19);
    -moz-box-shadow: 0 2px 18px 0 rgba(0,0,0,0.19);
    -ms-box-shadow: 0 2px 18px 0 rgba(0,0,0,0.19);
    -o-border-radius:0 0 8px 8px;
    width:px2Rem(312px);
    height:px2Rem(165px);
    text-align:center;
    img{
      height:100%;
      width:auto;
    }
   }
 }
</style>
