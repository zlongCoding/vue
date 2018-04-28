<template>
  <div>
  <ul class="yesClass">
  <li class="bg-ff" v-for="(value, key) in listContent">
  <section class="space-end">
   <div>
    <p>{{value.startTime | daysChange}} {{value.startTime | weekChange}} <span>{{value.startTime | timeChange}}</span>-<span>{{value.endTime | timeChange}}</span></p>
    <div class="classAddress">{{value.schoolName}}</div>
   </div>
   </section>
    <div class="goAddress"><img src="../../assets/images/personalcenter/address@2x.png"/> 地址：{{value.schoolAddress}}</div>
    <div class="className">
        <span>课程教师：{{value.userName}}</span>
        <span>课程名称：{{value.scheduleName}}</span>
        <span>教室编号：{{value.room}}</span>
      </div>
      <div class="clickLop align-items-right borderPX-top">
         <button class="buttonImage" @click="successReservation(key)" v-if="value.appealStatus == '0'">等待处理</button>
         <button @click="successReservation(key)" v-if="value.appealStatus == '1'">已处理</button>
         <button @click="successReservation(key)" v-if="value.appealStatus == '2'">驳回</button>
      </div>
    </li>
  </ul>
  <div class="noClassContent" v-if="classEnd && listContent.length <= 0">
  <img src="../../assets/images/else/nodata.png">
  <p>目前没有申诉的课程！</p>
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
      setTimeoutNo: false,
      listDeleteArray: [],
      startNowTime: Date.parse(new Date()) / 1000 - 600,
      appointmentText: null,
      listContent: null,
      classEnd: false
    }
  },
  methods: {
    complaintContent () {
      let param = {
        ctl: 'user',
        act: 'myCourseAppeal'
      }
      utils.GET(apiUrl, param).then(data => {
        this.listContent = data.data
        setTimeout(() => {
          this.classEnd = true
        }, 200)
      })
    }
  },
  beforeMount () {
    utils.setDocTitle('我的申诉')
    this.complaintContent()
  },
  mounted () {
  },
  destroyed () {}
}
</script>

<style scoped lang="scss">
@import "../../assets/style/px2rem.scss";

.yesClass{
  li{
    margin:0 auto;
    position: relative;
    margin-top:px2Rem(15px);
    width:px2Rem(344px);
     border-radius: 8px;
     padding: px2Rem(13px) px2Rem(16px) 0 px2Rem(15px);
    .classAddress{
      font-family: PingFangSC-Regular;
      font-size: px2Rem(13px);
      color: #333333;
      margin-bottom:px2Rem(4px);
    }
    .goAddress{
      font-family: PingFangSC-Regular;
      font-size: px2Rem(13px);
      color: #333333;
      margin-top:4px;
      img{
        width:14px;
        height:auto;
        position: relative;
        top:-3px;
      }
    }
    section{

      p{
        font-family: PingFangSC-Regular;
        font-size: px2Rem(14px);
        margin-bottom:px2Rem(14px);
        color: #131313;
        font-weight: 600;
      }
    }
   .className{
    display:flex;
    display:box;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    justify-content:space-between;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    -ms-flex-pack: justify;
    margin-top:px2Rem(6px);
    margin-top:px2Rem(12px);
    padding-bottom:px2Rem(14px);
    // padding: 0 px2Rem(16px) 0 px2Rem(15px);
    font-family: PingFangSC-Regular;
    font-size:12px;
    color: #666;
    background:#fff;
   }
   .bgImg{
     // position:absolute;
     width:px2Rem(55px);
     height:px2Rem(41px);
     // border-radius:50%;
     // margin-top:px2Rem(-30px);
     // top:50%;
     background:url('../../assets/images/personalcenter/uesd@2x.png') no-repeat;
     background-size:100% 100%;
   }
  }
}

.clickLop{
  .phone{
    border: 1px solid #EE3B3B;
    border-radius: 100px;
    a{
      color:#f04f4f;
      height: 100%;
      width: 100%;
    }
  }
  width:100%;
  background:#fff;
  text-align: right;
  height:px2Rem(44px);
  border-radius: 0 0 8px 8px;
  button{
    font-size: 15px;
    color: #999999;
    width:px2Rem(84px);
    height:px2Rem(28px);
    
  }
  .buttonImage {
    position: relative;
    &:after{
      content:'';
      background: url('../../assets/images/personalcenter/complainte.png') no-repeat;
      background-size: 100% 100%;
      width:15px;
      display:block;
      height:15px;
      position: absolute;
      top:50%;
      margin-top: -7.5px;
      left: -7px;
    }
  }
  // button:last-child{
  //   margin-left: px2Rem(15px);
  // }
}


.display-none{
  display:none;
}



.bg-color{
  background: #eee !important;
  border: 1px solid #eee !important;
  color: #999 !important;
}
.noClassContent{
  text-align:center;
  width:100%;
    img{
    margin-top: px2Rem(112px);
    margin-bottom: px2Rem(158px);
    width:px2Rem(165px);
    height:auto;
  }
  p{
    font-family: PingFangSC-Regular;
    color: #333333;
    font-size: px2Rem(15px);
    line-height:px2Rem(18px);
    padding:0 px2Rem(60px);
    margin-bottom:px2Rem(44px);
  }
}
</style>
