<template>
  <div id="pianoPractice" v-show="appointmentChoose">
    <div class="allTime">
      <div>剩余练习时常</div>
      <div class="">
        <p >{{contentListNumber}}</p>
       <p>小时</p>
      </div>

    </div>
    <div class="content">
      <header>历史记录</header>
      <div class="noContent" v-if="contentList.length <= 0">暂无内容</div>
      <ul v-else>
        <li v-for="(value, key) in contentList">
         <div class="contentlI">
            <p>{{value.endTime| dayStyle}} {{value.endTime| weekChange}} {{value.startTime| timeChange}}-{{value.endTime| timeChange}}</p>
           <p>{{value.schoolName}}</p>
            <div class="goAddress"><img src="../../assets/images/personalcenter/address@2x.png"/> {{value.schoolAddress}}</div>
            <p>房间号：{{value.pianoName}}</p>
         </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import utils from '../../utils.js'
import { apiUrl } from '../../production.js'
export default {
  name: 'home',
  data () {
    return {
      contentList: null,
      contentListNumber: null,
      appointmentChoose: false
    }
  },
  computed: {
    data () {}
  },
  methods: {
    routerList (id) {
      this.$router.push({path: 'list', query: {id: id}})
    }
  },
  created () {
    this.contentList = []
    let param = {
      ctl: 'main',
      act: 'getMyPianoHistory'
    }
    utils.GET(apiUrl, param).then(data => {
      this.contentList = data.data.list
      this.contentListNumber = data.data.freeHours
    })
    setTimeout(() => {
      this.appointmentChoose = true
    }, 0)
  },
  mounted () {
    utils.setDocTitle('钢琴练习')
  },
  destroyed () {}
}
</script>

<style scoped lang="scss">
@import "../../assets/style/px2rem.scss";

.allTime{
  width: 100%;
  height:px2Rem(200px);
  background:url('../../assets/images/personalcenter/pinaobg@2x.png') no-repeat;
  background-size: 100% 100%;
  position: relative;
  position:fixed;
  top:0;
  z-index: 1;
  div:first-child{
    position:absolute;
    font-size: 14px;
    color: #DFDFDF;
    top:10px;
    left:15px;
  }
  div:last-child{
    position:absolute;
    line-height: 100%;
    text-align: center;
    width:100%;
    height:40px;
    top:50%;
    margin-top:-25px;
    p:first-child{
      font-size: 24px;
      color: #FFFFFF;
    }
    p:last-child{
      margin-top:10px;
      font-size: 16px;
      color: #FFFFFF;
    }
  }
}
.content{
  padding-top:px2Rem(200px);
  position:relative;
  overflow: hidden;
  header{
    z-index:1;
    position:fixed;
    width:100%;
    background:#f5f5f5;
    padding-left:px2Rem(15px);
    height:45px;
    line-height:45px;
    font-family: PingFangSC-Semibold;
    font-size: 14px;
    color: #333333;
  }
  .noContent{
    padding-top:145px;
    text-align:center;
    font-size:16px;
    color: #333333;
  }
  ul{
    padding-top:45px;
  }
  li{
    height:px2Rem(120px);
    padding-left:px2Rem(16px);
    background: #FFFFFF;
    img{
      width:14px;
      height:auto;
      position:relative;
      top:-3px;
    }
    .contentlI{
      height:100%;
      width:100%;
      font-family: PingFangSC-Regular;
      border-bottom: 1px solid #DEDEDE;
      padding-left:px2Rem(15px); 
      padding-top:px2Rem(12px);
      p:nth-child(1){
        font-size: 14px;
        color: #333333;
        margin-bottom:px2Rem(16px);
      } 
     p:nth-child(2){
        font-size: 15px;
        color: #555555;
        font-family: PingFangSC-Semibold;
      }
      p:nth-child(3){
       font-size: 14px;
       color: #555555;
      }
      .goAddress{
        font-size: 15px;
        color: #555555;
        margin-top: px2Rem(6px);
        margin-bottom: px2Rem(12px);
      }
    }
  }
}
</style>
