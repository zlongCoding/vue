<template>
	<div>
		<header class="space-center" @click="addressBlock">

      <div>{{addressMessage}}<i></i></div>
      <!-- <div>{{addressId == '0' ?  '请选择艺校' : schoolContent.schoolName}}<i></i></div> -->
    </header>
		<div class="addressSelect positionFixed" v-show="addressChoose">
      <i @click="addressNone"></i>
      <i></i>
      <div class="content " :class="{ 'contentHeight': addressContent.length>3}">
      <ul>
       <li class="borderPX" v-for="(value, key) in addressContent" @click="chooseOne(value)">
         <p>value.schoolName</p>
         <div>value.schoolAddress</div>
       </li>
      </ul>
    </div>
    </div>
    <!-- <dialogbg :dialog="addressChoose"></dialogbg> -->
	</div>
</template>
<script>
// import utils from '../../utils.js'
export default {
  name: 'home',
  data () {
    return {
      data: '',
      addressChoose: false,
      addressMessage: '请选择艺校',
      addressContent: [1, 2, 3]
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
        for (var i = 0; i < className.length; i++) {
          className[i].style.position = 'fixed'
        }
      }
    },
    addressNone () {
      this.addressChoose = false
    },
    chooseOne (value) {
      this.addressChoose = false
      this.addressMessage = value
    }
  },
  created () {
  },
  destroyed () {}
}
</script>
<style scoped lang="scss">
@import "../../assets/style/px2rem.scss";

header{
  background: #F5F5F5;
  height:px2Rem(45px);
  div{
    font-family: PingFangSC-Regular;
    font-size: px2Rem(15px);
    color: #666666;
  }
  i{
    display:inline-block;
    width:12px;
    height:6px;
    background:url('../../assets/images/Triangle@2x.png') no-repeat;
    background-size: 100% 100%;
    margin-left: 4px;
  }
}
.addressSelect{
  position:fixed;
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
  li{
    position: relative;
    height:px2Rem(84px);
    width:100%;
    overflow: auto;
    padding:px2Rem(12px) px2Rem(15px);
    p{
      font-family: PingFangSC-Medium;
      font-size: 15px;
      color: #333333;
    }
    div{
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #666666;
      line-height: 20px;
      margin-top:px2Rem(12px);
      // position:absolute;
      // bottom:px2Rem(9px);
    }
  }
    }
}
.contentHeight{
  height:px2Rem(336px);
}

</style>
