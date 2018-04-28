<template>
  <div id="myCourses">
    <div class="introduceDialog" v-if="introduceNo">
      <section>
       <div>
        课程简介
        </div>
        <div>
        {{notClassContent}}
       </div>
      </section>
      <i @click="introduce"></i>
    </div>
    <section class="dialog-bg" v-if="introduceNo"></section>
    <ul class="changeContent clearFloat">
      <li :class="{'changeTitle' : listindex == 0}" @click="changeBg(0)">未上课程</li>
      <li :class="{'changeTitle' : listindex == 1}" @click="changeBg(1)">已上课程</li>
    </ul>
    <section class="haveClass">
      <div class="timeShow" v-if="timeChoose.freezeStatus == '1' && notClass.length > 0 && timeChoose.startAt != '0'">课程有效期： {{timeChoose.startAt | yearStyle}} 至 {{timeChoose.endAt | yearStyle}}</div>
      <div class="timeShow" v-if="timeChoose.freezeStatus == '0' && notClass.length > 0 && timeChoose.startAt != '0'">课程冻结时间： {{timeChoose.startAt | yearStyle}} 至 {{timeChoose.endAt | yearStyle}}</div>
       <ul class="yesClass" v-if="listindex === 1">
         <li class="bg-ff" v-for="(value, key) in yesClass">
          <section class="space-end">
          <div>
            <p>{{ value.endTime | dayStyle}} {{value.endTime | weekChange}} <span>{{value.startTime | timeChange}}</span>-<span>{{value.endTime | timeChange}}</span></p>
           <div class="classAddress">{{value.schoolName}}</div>
           </div>
           <div class="bgImg"></div>
          </section>
          <div class="goAddress"><img src="../../assets/images/personalcenter/address@2x.png"/> 地址：{{value.schoolAddress}}</div>
          <div class="className">
             <span>课程教师：{{value.userName}}</span>
             <span>课程名称：{{value.name}}</span>
             <span>教室编号：{{value.room}}</span>
           </div>
         </li>
       </ul>
       <ul class="noClass" v-else>
         <li class="space-center" v-for="(value, key) in notClass">
           <section>
            <div class="borderPX space-between">
             <span>课程名称：<span class="colorf6f">{{value.name}}</span></span><span>课时：<span class="colorf6f">{{value.time}}分钟</span></span>
            </div>
            <div class="bg_introduce" @click="classintroduce(value.descrption)">课程简介 <img src="../../assets/images/personalcenter/icon_zhankai.png"/></div>
          </section>
          <section @click="routerList('/appointment')">去预约</section>
         </li>
       </ul>
       <!-- {{notClass.length}} -->
       <div v-if="(((listindex == 0) && (notClass.length <= 0))||((listindex == 1) && (yesClass.length <= 0))) && setTimeYes" class="contentError">
        <!--  -->
         <img src="../../assets/images/else/nodata.png">
         <p>暂无内容</p>
       </div>
    </section>
  </div>
</template>

<script>
import utils from '../../utils.js'
import { apiUrl } from '../../production.js'
export default {
  name: 'myCourses',
  data () {
    return {
      setTimeYes: false,
      listindex: 0,
      introduceNo: false,
      notClass: '',
      yesClass: '',
      timeChoose: {},
      notClassContent: ''
    }
  },
  computed: {
    data () {}
  },
  methods: {
    routerList (content, id) {
      this.$router.push({path: content, query: {id: id}})
    },
    introduce () {
      this.introduceNo = false
      utils.overflowAuto()
    },
    changeBg (index) {
      this.listindex = index
    },
    classintroduce (content) {
      this.introduceNo = true
      utils.overflowHidden()
      this.notClassContent = content
    }
  },
  beforeCreate () {
    let param = {
      ctl: 'main',
      act: 'getNOrdercourse'
    }
    utils.GET(apiUrl, param).then(data => {
      this.notClass = data.data.list
      this.timeChoose = data.data.userCourse
    })
    let params = {
      ctl: 'main',
      act: 'getOrderCourse'
    }
    utils.GET(apiUrl, params).then(data => {
      this.yesClass = data.data
      setTimeout(() => {
        this.setTimeYes = true
      }, 300)
      // console.log(this.yesClass)
    })
  },
  mounted () {
    utils.setDocTitle('我的课程')
  },
  destroyed () {}
}
</script>

<style scoped lang="scss">
@import "../../assets/style/px2rem.scss";

#myCourses{
  font-family: PingFangSC-Semibold;
}
.changeContent{
  background: #fff;
  position:fixed;
  top:0 ;
  z-index:100;
  width:100%;
  li{
    float: left;
    width:50%;
    height:px2Rem(45px);
    line-height: px2Rem(45px);
    text-align: center;
    font-size: 14px;
    color: #3D5860;
  }
  margin-bottom:px2Rem(16px);
}
.haveClass{
  margin-top:px2Rem(52px);
.yesClass{
  li{
    margin:0 auto;
    position: relative;
    margin-bottom:px2Rem(15px);
    width:px2Rem(344px);
    border-radius: 8px;
    // height:px2Rem(135px);
     padding: px2Rem(13px) px2Rem(16px) px2Rem(20px) px2Rem(15px);
    .classAddress{
      font-family: PingFangSC-Semibold;
      font-size: 15px;
      color: #555555;
      margin-bottom:1px;
    }
    .goAddress{
      font-family: PingFangSC-Regular;
      font-size: 15px;
      color: #555555;
      margin-top:4px;
      img{
        width:14px;
        height:auto;
        position: relative;
        top:-2px;
      }
    }
    section{
      // background:red;

      p{
        font-family: PingFangSC-Regular;
        font-size: 14px;
        margin-bottom:px2Rem(12px);
        color: #888888;
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
    margin-top:px2Rem(22px);
    // padding: 0 px2Rem(16px) 0 px2Rem(15px);
    font-family: PingFangSC-Regular;
    font-size:px2Rem(14px);
    color: #555555;
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
.noClass{
   li {
     margin: 0 auto;
     margin-bottom: px2Rem(16px);
     height:px2Rem(80px);
     overflow: hidden;
     section:nth-child(1){
       position:relative;
       background: #FFFFFF;
       border-radius: 8px;
       height:100%;
       width:px2Rem(258px);
       padding:0 px2Rem(20px);
       div:nth-child(1){
        padding: px2Rem(12px) 0 px2Rem(14px) 0;
        font-size: 15px;
        color: #888888;
        span:nth-child(1){
          display:inline-block;
        }
       }
       div:nth-child(2){
        padding: px2Rem(11px) 0 px2Rem(12px) 0; 
        text-align:center;
        color: #666666;
        font-size: 15px;
        img{
          width:10px;
          height:auto;
        }
       }
     }
     section:nth-child(2){
        width:px2Rem(88px);
        line-height:px2Rem(80px);
        text-align:center;
        background: #FFE7E0;
        border-radius: 8px;
        height:100%;
        color: #3D5860;
        font-size:15px;
        // padding: px2Rem(10px) 0 px2Rem(10px) 0;
     }
   }
 }
}
.introduceDialog{
  z-index:9991;
  position:fixed;
  top:px2Rem(96px);
  width:px2Rem(284px);
  left:50%;
  border-radius: 8px;
  transform:translateX(-50%);
   -webkit-transform:translateX(-50%);
  -moz-transform:translateX(-50%);
  -o-transform:translateX(-50%);
  -moz-transform:translateX(-50%);
  i{
   display:inline-block;
   height:28px;
   width:28px;
   text-align:center;
   margin-top:px2Rem(68px);
   position: fixed;
   left:50%;
   transform:translateX(-50%);
  -webkit-transform:translateX(-50%);
  -moz-transform:translateX(-50%);
  -o-transform:translateX(-50%);
  -moz-transform:translateX(-50%);
   background:url('../../assets/images/personalcenter/close@2x.png') no-repeat; 
   background-size: 100% 100%;
  }
  section{
  }
  div:nth-child(1){
    height:px2Rem(44px);
    line-height:px2Rem(44px);
    text-align:center;
    background: #3D5860;
    border-radius: 8px 8px 0 0;
    font-family: PingFangSC-Medium;
    font-size: 15px;
    width:100%;
    color: #FFFFFF;
  }
  div:nth-child(2){
    padding:px2Rem(20px);
    border-radius: 0 0 8px 8px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #666666;
    background: #F2F2F2;
    line-height:18px;
    padding:px2Rem(24px) px2Rem(18px);
  }
}
.colorf6f{
  color: #000000;
}
.changeTitle{
  background: #3D5860;
  color:#fff !important;
}

@media screen and (max-width: 370px) {
    .noClass li section,.noClass li section span, .bg_introduce{
      font-size:14px !important;
    }
    .yesClass li p{
      font-size:12px !important;
    }
    .classAddress,.goAddress{
      font-size:13px !important;
    }
}
.contentError{
  text-align:center;
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
    margin-bottom:px2Rem(44px);
  }
}
.timeShow{
    text-align: center;
    margin-bottom: .42rem;
    height: px2Rem(40px);
    line-height: px2Rem(40px);
    background: #fff;
    color: #666;
    font-size: 13px;
}
</style>
