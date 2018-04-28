<template>
	<div class="navigationMain">
    <ul class="navigation clearFloat" >
      <li @click="routerList('/appointment')"><img :src="yuyueSel"/><span :class="{'colorChange' :index === 1}">课程表</span></li>
      <li @click="routerList('/haveprocess')"><img :src="processSel" /><span :class="{'colorChange' :index === 2}">钢琴练习</span></li>
      <li @click="routerList('/personalcenter')"><img :src="mySel"><span :class="{'colorChange' :index === 3}">个人中心</span></li>
    </ul>
	</div>
	</div>
</template>

<script>
import processsel from '../assets/images/personalcenter/piano_sel@2x.png'
import processnor from '../assets/images/personalcenter/piano_nor@2x.png'
import mysel from '../assets/images/personalcenter/my_sel@2x.png'
import mynor from '../assets/images/personalcenter/my_nor@2x.png'
import yuyuenor from '../assets/images/personalcenter/yuyue_nor@2x.png'
import yuyuesel from '../assets/images/personalcenter/yuyue-sel@2x.png'
export default {
  name: 'home',
  data () {
    return {
      bannerNo: true,
      mySel: '',
      processSel: '',
      yuyueSel: '',
      index: null
    }
  },
  // computed: {
  //   navigation () {
  //     return this.$store.state.Home.unregistered
  //   }
  // },
  methods: {
    routerList (content, id) {
      this.$router.push({path: content})
    }
  },
  created () {
    this.mySel = mynor
    this.processSel = processnor
    this.yuyueSel = yuyuenor
  },
  mounted () {
    if (this.$route.path === '/personalcenter') {
      this.index = 3
      this.mySel = mysel
    } else if (this.$route.path === '/haveprocess') {
      this.processSel = processsel
      this.index = 2
    } else if (this.$route.path === '/appointment') {
      this.yuyueSel = yuyuesel
      this.index = 1
    }
  },
  beforeCreate () {
  },
  destroyed () {}
}
</script>
<style  lang="scss">
@import "../assets/style/px2rem.scss";
.navigation li{
  float: left;
  display: inline-block;
  width: 33.3%;
  background: #fff;
  text-align: center;
  position: relative;
  height:px2Rem(52px);
  // padding-top:px2Rem(38px); 
  padding:px2Rem(6px) 0;
  font-size: px2Rem(10px); 
  span{
    position:absolute;
    bottom:px2Rem(6px);
    display:inline-block;
    left:50%;
    color: #999999;
    transform:translateX(-50%);
    -webkit-transform:translateX(-50%);
    -moz-transform:translateX(-50%);
    -o-transform:translateX(-50%);
    -moz-transform:translateX(-50%);
    width:100%;
    text-align:center;
  }
}

.navigation {
  img{
  height: px2Rem(24px);
  top:px2Rem(6px);
  width: auto;
  position: absolute;
  left:50%;
  transform:translateX(-50%);
  -webkit-transform:translateX(-50%);
  -moz-transform:translateX(-50%);
  -o-transform:translateX(-50%);
  -moz-transform:translateX(-50%);
}

}
// .navigation li:nth-child(1) img{
//   top:px2Rem(6px);
//   width: px2Rem(20px);
// }
// .navigation li:nth-child(2) img{
//   top:px2Rem(6px);
//   width: px2Rem(22px);
// }
.navigationMain{
	position: fixed;
  bottom: 0;
  background: #fff;
  width:100%;
  font-family: PingFangSC-Medium;
  color: #3C575F;
  box-shadow: 1px 1px 50px #f6f6f6;
}
.colorChange{
  color: #3D5860 !important;
}
</style>
