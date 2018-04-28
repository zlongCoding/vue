<template>
	<div>
		<header class="space-between" >
      <div>作业进度：{{addressMessage}}</div>
      <div @click="addressBlock">选择作业</div>
    </header>
		<div class="addressSelect positionFixed" v-show ="addressChoose">
      <i @click="addressNone"></i>
      <i></i>
      <div >
      <ul class="content " :class="{ 'contentHeight': addressContent.length>5}">
       <li class="borderPX" v-for="(value, key) in addressContent" @click="chooseOne(value)">
         {{value.name}}
       </li>
      </ul>
    </div>
    </div>
    <div class="dialog-bg positionFixed" v-show="addressChoose"></div>
	</div>
</template>
<script>
import utils from '../../utils.js'
import { apiUrl } from '../../production.js'
export default {
  name: 'home',
  data () {
    return {
      data: '',
      addressChoose: false,
      addressMessage: '',
      addressContent: [],
      classId: ''
    }
  },
  computed: {
  },
  methods: {
    addressBlock () {
      this.addressChoose = true
      var className = document.getElementsByClassName('positionFixed')
      if (document.documentElement.clientHeight >= document.body.offsetHeight) {
        for (var i = 0; i < className.length; i++) {
          className[i].style.position = 'absolute'
        }
      } else {
        for (var j = 0; j < className.length; j++) {
          className[j].style.position = 'fixed'
        }
      }
    },
    addressNone () {
      this.addressChoose = false
    },
    chooseOne (value) {
      this.addressChoose = false
      this.addressMessage = value.name
      this.$emit('addressId', value.id)
    },
    classIdOne () {
      let param = {
        ctl: 'main',
        act: 'getWorkProgressList',
        classId: this.classId
      }
      utils.GET(apiUrl, param).then(data => {
        this.addressContent = data.data
      })
    }
  },
  mounted () {
    this.classId = JSON.parse(utils.getStore('classGo')).classId
    var courseId = JSON.parse(utils.getStore('classGo')).courseId
    this.$emit('addressId', courseId)
    this.addressMessage = JSON.parse(utils.getStore('classGo')).name
    this.classIdOne()
  },
  destroyed () {}
}
</script>
<style scoped lang="scss">
@import "../../assets/style/px2rem.scss";

header{
  background: #FFF;
  height:px2Rem(45px);
  padding:0 px2Rem(15px);
  div:nth-child(1){
    font-family: PingFangSC-Regular;
    font-size: px2Rem(15px);
    color: #333333;
  }
  div:nth-child(2){
   font-family: PingFangSC-Regular;
   font-size: 13px;
   color: #2083D2;
  }
}
.addressSelect{
  position: fixed;
  bottom: 0;
  z-index: 1000;
  background:#fff;
  width:100%;
  i{
    display:inline-block;
    z-index:1000;
  }
  i:nth-child(1){
    width:24px;
    height:24px;
    background:url('../../assets/images/close@2x.png');
    background-size: 100% 100%;
    position:absolute;
    top:-58px;
    right:15px;
  }
  i:nth-child(2){
    position:absolute;
    width:1px;
    background:#fff;
    height:40px;
    right:26px;
    top:-35px;
    z-index:-1;
  }
  .content{
     overflow-y: auto;
     height:px2Rem(200px);
  li{
    position: relative;
    height:px2Rem(50px);
    line-height: px2Rem(50px);
    width:100%;
    font-family: PingFangSC-Regular;
    color: #666666;
    padding-left: px2Rem(15px);
    font-size: 15px;
  }
    }
}
.contentHeight{
  height:px2Rem(336px) !important;
}

</style>
