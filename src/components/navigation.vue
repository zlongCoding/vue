<template>
	<div class="navigationMain">
    <ul class="navigation clearFloat" >
      <li @click="routerList('/task')"><img :src="mySel"/><span :class="{'colorChange' :index === 1}">作业</span></li>
      <li @click="routerList('/teacherclass')"><img :src="yuyueSel"><span :class="{'colorChange' :index === 2}">班级</span></li>
    </ul>
	</div>
	</div>
</template>

<script>
import mysel from '../assets/images/taskY.png'
import mynor from '../assets/images/task.png'
import yuyuenor from '../assets/images/class_nor@2x.png'
import yuyuesel from '../assets/images/class_sel@2x.png'
export default {
  name: 'home',
  data () {
    return {
      bannerNo: true,
      mySel: '',
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
    this.yuyueSel = yuyuenor
  },
  mounted () {
    if (this.$route.path === '/task') {
      this.index = 1
      this.mySel = mysel
    } else if (this.$route.path === '/teacherclass') {
      this.yuyueSel = yuyuesel
      this.index = 2
    }
  },
  beforeCreate () {
  },
  destroyed () {}
}
</script>
<style scoped lang="scss">
@import "../assets/style/px2rem.scss";
.navigation li{
  float: left;
  display: inline-block;
  width: 50%;
  background: #fff;
  text-align: center;
  position: relative;
  height:px2Rem(52px);
  // padding-top:px2Rem(38px); 
  padding:px2Rem(6px) 0;
  font-size: 12px; 
  span{
    text-align:center;
    position:absolute;
    bottom:px2Rem(6px);
    display:inline-block;
    left:50%;
    color: #999999;
    -webkit-transform:translateX(-50%);
     -moz-transform:translateX(-50%);
     -o-transform:translateX(-50%);
     -moz-transform:translateX(-50%);
    width:100%;
    font-size:12px;
    text-align:center;
  }
}

.navigation {
  img{
  height: px2Rem(25px);
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
  color: #2083D2 !important;
}
</style>
