<template>
	<div id="classAll">
    <img src="../../assets/images/bg.png" class="bg" />
    <div class="content">
      <div class="title borderRadius transformTranslate">
        <img :src="userInfoMessage.avatar" class="borderRadius" />
        <p>{{userInfoMessage.name}}</p>
      </div>
      <ul class="flex-wrap marginNavigation">
        <li v-for="(value, key) in contentAjax" @click="goBack(value.id)">
          <p>{{value.name}}</p>
          <img :src="value.pic" />
          <div class="space-between">
            <span>{{value.packageName}}</span>
            <span class="numberPeople">{{value.total}}人</span>
          </div>
        </li>
      </ul>
    </div>
    <navigation></navigation>
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
      contentAjax: []
    }
  },
  computed: {
    userInfoMessage () {
      return this.$store.state.Home.userInfo
    }
  },
  methods: {
    goBack (id) {
      this.$router.push({path: '/classdetail', query: {classId: id}})
    }
  },
  created () {
    utils.setDocTitle('班级')
    let param = {
      ctl: 'main',
      act: 'getClasses'
    }
    utils.GET(apiUrl, param).then(data => {
      this.contentAjax = data.data
    })
  },
  destroyed () {}
}
</script>
<style scoped lang="scss">
@import "../../assets/style/px2rem.scss";

#classAll{
  .bg{
     width: 100%;
     height: auto;
  }
}
.content{
  background: #F5F5F5;
  -webkit-border-radius: px2Rem(20px) px2Rem(20px) 0 0;
  -moz-border-radius: px2Rem(20px) px2Rem(20px) 0 0;
  -ms-border-radius: px2Rem(20px) px2Rem(20px) 0 0;
  -o-border-radius: px2Rem(20px) px2Rem(20px) 0 0;
  border-radius: px2Rem(20px) px2Rem(20px) 0 0;
  width:100%;
  position: absolute;
  top:px2Rem(106px);
  .title{
    position: absolute;
    top: px2Rem(-34px);
    left: 50%;
    height:px2Rem(68px);
    width: px2Rem(68px);
    background:#fff;
    padding: px2Rem(3px);
    text-align: center;

    // margin
    img{
      width:100%;
      height:100%;
    }
    p{
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #000000;
      margin-top:px2Rem(11px);
    }
  }
  ul{
    width:100%;
    padding:0 px2Rem(15px);
    padding-top:px2Rem(87px);
  }
  li{
    width:px2Rem(165px);
    height:px2Rem(165px);
    background: #FFFFFF;
    text-align:center;
    margin-bottom:px2Rem(15px);
    padding:px2Rem(13px) px2Rem(10px);
    @include borderRadiusNumber(4px);
    img{
      width:px2Rem(92px);
      height:px2Rem(92px);  
      margin-top:px2Rem(10px);
      margin-bottom:px2Rem(12px); 
    }
    p{
      font-family: PingFangSC-Medium;
      font-size: px2Rem(15px);
      color: #F5A623;
    }
    div{
      span{
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #333333;
      }

    }
    .numberPeople{
      position:relative;
      color: #999999;
      &:after{
        content:'';
        width:10px;
        height:13px;
        position: absolute;
        left:px2Rem(-18px);
        top:-2px;
        background:url('../../assets/images/my@2x.png') no-repeat;
        background-size:100% 100%;
      }
    }
  }
}
</style>
