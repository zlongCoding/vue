<template>
    <div id="nselect">
      <time-select @selcetli="change"  @courseList = "changeCourseList" @schoolIdli = "changeSchoolId"></time-select>
      <div class="courses_list" v-if="coursesContent">
       <ul>
         <li v-for="(values, keys) in courseListContent" v-if = "courseListIndex === keys">
          <ul>
          <li v-for="(value, key) in values" class="li_list borderPX" :class="{'bgLi' : (parseInt(value.startTime) < nowDay && userInfoMessage.data.enabled != '0') || (parseInt(value.endTime) < nowDay && userInfoMessage.data.enabled == '0')}">
            <div class="div1" @click="chooseKc(value.scheduleId, value)" :class="{'bgLi' : (parseInt(value.startTime) < nowDay && userInfoMessage.data.enabled != '0') || (parseInt(value.endTime) < nowDay && userInfoMessage.data.enabled == '0')}"><i :class="{'chooseAll' : indexArray === value.scheduleId}" ></i></div>
            <div class="space-between div2">
              <div @click="chooseKc(value.scheduleId, value)">
                <p>{{value.startTime | timeChange}} - {{value.endTime | timeChange}}</p>
                <p>课程名称：<span>{{value.name}}</span><span>{{value.currentNum}}/{{value.courseNum}}</span></p>
              </div>
              <span class="lookContent align-items" @click="contentLi(value.scheduleId)">查看详情</span>
            </div>
            <i></i>
          </li>
        </ul>
         </li>
       </ul>
      </div>
      <div class="content-no" v-else>
        <img src="../../../assets/images/else/nodata.png" />
        <p>今日无课程，请选择其他日期</p>
      </div>
      <div  class="courses_result space-between" v-if="indexArray !== 'null'">
        <button v-if="indexArray !== 'null'">已选1堂课</button>
        <button @click="chooseEnd">预定课程</button>
      </div>
      <div class="courses-detail" v-if="classContent">
        <button class="button">课程详情</button>
        <div class="courses-teacher">
          <img :src="getScheduleInfo.avatar" />
          <p>授课教师：{{getScheduleInfo.teacher}}</p>
          <div class="space-between">
            <span>
              <p class="">{{getScheduleInfo.name}}</p>
              <p>课程名称</p>
            </span>
            <span>
              <p class="borderPX-right borderPX-left">{{getScheduleInfo.startTime | timeChange}} - {{getScheduleInfo.endTime | timeChange}}</p>
              <p>课时</p>
            </span>
            <span>
              <p>{{getScheduleInfo.room}}</p>
              <p>教室编号</p>  
            </span>
          </div>
        
          <div class="divheader"><span>课程简介</span></div>
          <div class="classAll">{{getScheduleInfo.descrption}}</div>
        </div>
        <i @click="getScheduleInfoNo"></i>
      </div>
      <div class="courses-detail appointment-sure" v-if="appointmentSures">
        <button class="button">预定课程</button>
        <div class="appointmentSure">
          <p>您确定更换艺校预约课程？</p>
        </div>
        <div class="button-sure space-around">
          <button @click="chooseEndNos">取消</button>
          <button @click="chooseEndYess">确定</button>
        </div>
     </div>
     <div class="courses-detail appointment-sure" v-if="appointmentSure">
        <button class="button">预定课程</button>
        <div class="appointmentSure">
          <p>您将预定课程：</p>
          <p>{{contentArray.name}} {{contentArray.startTime | daysChange}} {{contentArray.startTime | weekChange}} {{contentArray.startTime | timeChange}}-{{contentArray.endTime | timeChange}}</p>
        </div>
        <div class="button-sure space-around">
          <button @click="chooseEndNo">取消</button>
          <button @click="chooseEndYes">继续</button>
        </div>
     </div>
    <div class="courses-detail appointment-next" v-if="appointmentNext">
        <button class="button">预定课程</button>
        <div class="appointmentNext">
          <div class="divY"  v-if="classIndex">
           <div class="m-box">
                <div class="m-duigou"></div>
           </div>
          </div>
         <div class="divYes">
            <p>课程名称：{{contentArray.name}}</p>
            <p>上课时间：{{contentArray.startTime | daysChange}} {{contentArray.startTime | weekChange}} {{contentArray.startTime | timeChange}}-{{contentArray.endTime | timeChange}}</p>
            <div class="errorContent" v-if="!classIndex">失败原因：{{errorMessage}}</div>
            <div  v-if="!classIndex" :class="{'div-no': !classIndex}"></div>
         </div>
        </div>
        <div class="button-next">
          <button @click="appointmentAllEnd">{{contentNext}}</button>
          
        </div>
     </div>
      <div class="dialog-bg" v-if="appointmentNext || appointmentSures || appointmentSure || classContent"></div>
    </div>
</template>

<script>
import timeSelect from '../timeSelect.vue'
import selectAddress from '../address.vue'
import utils from '../../../utils.js'
import config from '../../../config.js'
import { apiUrl } from '../../../production.js'
export default {
  name: 'home',
  data () {
    return {
      coursesContent: true,
      liContentNo: false,
      classContent: false,
      appointmentSure: false,
      appointmentNext: false,
      appointmentSures: false,
      chooseId: '',
      nowDay: null,
      courseListIndex: null,
      getScheduleInfo: {},
      courseListContent: null,
      indexArray: 'null',
      contentArray: {},
      classIndex: true,
      contentNext: '继续',
      errorMessage: '不能预约',
      indexId: null
    }
  },
  computed: {
    userInfoMessage () {
      return this.$store.state.Home.userInfo
    }
  },
  components: {
    timeSelect,
    selectAddress
  },
  methods: {
    changeSchoolId (index) {
      console.log(index + '111111111111')
      this.indexId = index
    },
    change (index) {
      this.courseListIndex = index
      if (this.courseListContent[index].length > 0) {
        this.coursesContent = true
      } else {
        this.coursesContent = false
      }
    },
    chooseEndNos () {
      this.appointmentSures = false
    },
    chooseEndYess () {
      this.appointmentSures = false
      this.appointmentSure = true
    },
    changeCourseList (data) {
      this.courseListContent = data
    },
    showId (data) {
      this.chooseId = data
    },
    chooseKc (index, content) {
      this.contentArray = {}
      this.contentArray = content
      if ((parseInt(this.contentArray.startTime) >= this.nowDay && this.userInfoMessage.data.enabled !== '0') || (parseInt(this.contentArray.endTime) >= this.nowDay && this.userInfoMessage.data.enabled === '0')) {
        this.indexArray = index
      }
    },
    chooseEnd () {
      if ((utils.getStore('schoolId') !== this.indexId) && this.indexId) {
        this.appointmentSures = true
      } else {
        // utils.setStore('schoolId', this.indexId)
        this.appointmentSure = true
      }
    },
    chooseEndNo () {
      this.appointmentSure = false
    },
    appointmentAllEnd () {
      if (this.contentNext === '确定') {
        this.appointmentNext = false
        this.contentArray = {}
        this.indexArray = 'null'
      } else {
        this.$router.push({path: '/appointment'})
      }
    },
    chooseEndYes () {
      if (this.indexId) {
        utils.setStore('schoolId', this.indexId)
      }
      let param = {
        ctl: 'main',
        act: 'orderSchdule',
        scheduleId: this.contentArray.scheduleId
      }
      utils.GET(apiUrl, param).then(data => {
        if (data.status === 0) {
          this.classIndex = true
          this.contentNext = '继续'
        } else {
          this.classIndex = false
          this.contentNext = '确定'
          this.errorMessage = config.serverContent[data.status]
          console.log(this.errorMessage)
        }
        this.appointmentSure = false
        this.appointmentNext = true
      })
    },
    contentLi (index) {
      // console.log(index)
      // this.liContentNo = true
      let param = {
        ctl: 'main',
        act: 'getScheduleInfo',
        scheduleId: index
      }
      utils.GET(apiUrl, param).then(data => {
        console.log(data.data)
        this.classContent = true
        this.getScheduleInfo = data.data
      })
    },
    getScheduleInfoNo () {
      this.classContent = false
    },
    forDetails () {
      /**/
      let param = {
        ctl: 'main',
        act: 'getScheduleInfo',
        scheduleId: 1
      }
      utils.GET(apiUrl, param).then(data => {
        console.log(data)
      })
    },
    dueCourse () {
      let param = {
        ctl: 'main',
        act: 'orderSchdule',
        scheduleId: 1
      }
      utils.GET(apiUrl, param).then(data => {
        console.log(data)
      })
    }
  },
  mounted () {
    if (this.$store.state.Home.userInfo.data.enabled === '0') {
      utils.setDocTitle('预约试听课')
    } else {
      utils.setDocTitle('预约课程')
    }
    this.nowDay = Date.parse(new Date()) / 1000
  },
  destroyed () {}
}
</script>

<style scoped lang="scss">
@import "../../../assets/style/px2rem.scss";

#nselect{
}
.courses_list{
  margin-bottom:1.4rem;
 .li_list{
   background:#fff;
  padding: px2Rem(15px) px2Rem(15px);
  height:px2Rem(78px);
  position: relative;
 }
  i{
    display:inline-block;
    position:absolute;
  
    background:red;
  }
  .div1{
    height: 100%;
    display: inline-block;
    position: absolute;
    width: 45px;
    top: 0;
    background: #fff;
    left: 0;
    i{
      left: px2Rem(15px);
      top:50%;
      width: 16px;
      height:16px;
      margin-top:-8px;
      background:url('../../../assets/images/else/Oval15.png') no-repeat;
      background-size:100% 100%;
    }
  }
   .div2{
      i{
    width: 7px;
    height:14px;
    right: px2Rem(15px);
    top:50%;
    margin-top:-7px;
    background:url('../../../assets/images/else/right_arrow@2x.png') no-repeat;
    background-size:100% 100%;
   }
   }
  li{
    .space-between{
      height: 100%;
      padding-left:30px;
      padding-right:10px;
      div{
        width:70%;
        height:100%;
        position: relative;
        p:nth-child(1){
          position:absolute;
          top:0;
          width:100%;
          font-family: PingFangSC-Medium;
          font-size: 15px;
          color: #333333;
        }
        p:nth-child(2){
          position:absolute;
          bottom:0;
          width:100%;
          font-family: PingFangSC-Regular;
          font-size: 13px;
          color: #666666;
          span:nth-child(1){
            margin-right:px2Rem(22px);
            display:inline-block;
          }
        }
      }
      .lookContent{
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #666666;
        height:100%;
      }
    }
  }
}

.courses_result{
  position:fixed;
  bottom: 0;
  height:px2Rem(45px);
  // z-index:999;
  width:100%;
  button:first-child{
    height:100%;
    width:30%;
    background: #FFFFFF;
    font-family: PingFangSC-Regular;
    font-size: px2Rem(14px);
    color: #666666;
  }
  button:last-child{
    height:100%;
    width:70%;
    background: #3D5860;
    font-family: PingFangSC-Regular;
    font-size: px2Rem(18px);
    color: #FFFFFF;
  }
}
.content-no{
  text-align:center;
 img{
    margin-top:px2Rem(70px);
    width:px2Rem(165px);
    height:auto;
    margin-bottom:px2Rem(60px);
  }
  p{
    font-family: PingFangSC-Regular;
    font-size: 13px;
    color: #999999;
  }
}
.courses-detail{
  position:absolute;
  z-index:1000;
  border-radius: 8px;
  // 
  width:px2Rem(284px);
  left: 50%;
  top:px2Rem(50px);
  transform:translateX(-50%);
  -webkit-transform:translateX(-50%);
  -moz-transform:translateX(-50%);
  -o-transform:translateX(-50%);
  -moz-transform:translateX(-50%);
  i{
    display:block;
    width:px2Rem(28px);
    height:px2Rem(28px);
    background:url('../../../assets/images/else/close_b@2x.png');
    background-size:100% 100%;
    position:absolute;
    bottom:px2Rem(-64px);
    left: 50%;
    transform:translateX(-50%);
    -webkit-transform:translateX(-50%);
    -moz-transform:translateX(-50%);
    -o-transform:translateX(-50%);
    -moz-transform:translateX(-50%);
  }
  img{
    width:px2Rem(68px);
    height:px2Rem(68px);
    border-radius:50%;
    margin-top:px2Rem(15px);
    margin-bottom:px2Rem(10px);
  }
  .button{
    width:100%;
    height:px2Rem(44px);
    background: #3D5860;
    border-radius: 8px 8px 0 0;
    color:#fff;
  }
  span {
    p:nth-child(1){
      height:px2Rem(20px);
      line-height:px2Rem(20px);
      margin-bottom:px2Rem(6px);
      font-family: PingFangSC-Regular;
      font-size: 13px;
      color: #333333;
      font-weight: bolder;
    }
    p:nth-child(2){
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: #999999;
    }
  }
  .courses-teacher{
    background: #F2F2F2;
    text-align:center;
    border-radius:0 0 8px 8px;
  }
  .borderPX-right{
    padding:0 px2Rem(18px);
  }
  .space-between{
    margin-top:px2Rem(10px);
    padding:0 px2Rem(20px);
  }
  .divheader{
    margin-top:px2Rem(18px);
    font-size: 15px;
    color: #3D5860;
    position:relative;
    &:before,&:after{
      background: #DEDEDE;
      content: "";  
      height: 1px;  
      position: absolute;  
      top: 50%;  
      width: 32%;
    }
    &:before{
      left: px2Rem(9px);
    }
    &:after{
      right:px2Rem(9px);
    }
  }
}
.classAll{
  padding:px2Rem(10px) px2Rem(9px) px2Rem(12px) px2Rem(9px);
  font-size: px2Rem(14px);
  color: #666666;
  border-radius:0 0 8px 8px;
  line-height:px2Rem(18px);
}

.appointment-sure{
  top:px2Rem(104px);
  border-radius:8px;
  .appointmentSure{
    background:  #F2F2F2;
    text-align:center;
    padding: px2Rem(17px) 0 px2Rem(14px) 0;
    p:first-child{
      margin-bottom:4px;
    }
    p{
       font-size: 14px;
       color: #666666;
    }
  }
  .button-sure{
    width:100%;
    background:#F2F2F2;
    border-radius:0 0 8px 8px;
    overflow: hidden;
    height:px2Rem(50px);
    button{
      height:100%;
      font-size: px2Rem(17px);
      color: #0076FF;
      width:50%;
      border-top: 1px solid #DEDEDE;
    }
    button:first-child{
      border-right: 1px solid #DEDEDE;
    }
  }
}


.appointment-next{
  background:#F2F2F2;
  border-radius:8px;
  top:px2Rem(104px);
  .appointmentNext{
    font-family: PingFangSC-Regular;
    padding: 0 px2Rem(18px) px2Rem(18px) px2Rem(18px);
    font-size: 14px;
    color: #666666;
    .divYes{
      padding-top:px2Rem(17px);
      position:relative;
      p{
        font-size: 14px;
         color: #666666;
      }
      // .div-yes{
    
      //    background:url('../../../assets/images/else/ok@2x.png') no-repeat;
      //    background-size:100% 100%;
      //    // transform:translateY(-50%);
      // }
      .div-no{
        position:absolute;
         width:px2Rem(22px);
         height:px2Rem(22px);
         right:0;
         top:px2Rem(18px);
         background:url('../../../assets/images/else/Page1@2x.png') no-repeat !important;
         background-size:100% 100% !important; 
      }
    }
    p:first-child{
      margin-bottom:6px;
    }
  }
  .button-next{
    width:100%;
    border-radius:0 0 8px 8px;
    overflow:hidden;
    border-top:1px solid #DEDEDE;
    button{
      width:100%;
      height:px2Rem(44px);
      font-family: PingFangSC-Medium;
      font-size: px2Rem(17px);
      color: #0076FF;
      border-radius:0 0 8px 8px;
    }
  }
}
.chooseAll{
    background:url('../../../assets/images/else/xuanzhong@2x.png') no-repeat !important;
    background-size:100% 100% !important;
}
@media screen and (max-width: 370px){
  .courses-detail span p:nth-child(1){
   font-size:12px;
  }
.divYes{
    p{
        font-size: 12px !important;
      }
    }
}
.errorContent{
  margin-top:px2Rem(10px);
  line-height:18px;
}
.bgLi{
  background:#eee !important;
}
.divNone{
  display: none !important;
}
.divY{

  width:100%;
  text-align: center;
}

    .m-box {
      width: 30px;
      height: 30px;
      position: relative;
      margin: 0 auto;
      margin-top:px2Rem(17px);
      border:1px solid #00ED70;
      border-radius: 50%;
    }

    .m-duigou {
      width: 20px;
      height: 10px;
      position: absolute;
      left: 50%;
      top: 50%;
      margin-top: -8px;
      margin-left: -10px;
      /*margin: -12px 0 0 -16px;*/
      -webkit-transform: rotate(-45deg);
      -moz-transform: rotate(-45deg);
      -ms-transform: rotate(-45deg);
      -o-transform: rotate(-45deg);
      transform: rotate(-45deg);
      overflow: hidden
    }

    .m-duigou:before,
    .m-duigou:after {
      content: "";
      position: absolute;
      background: #00ED70;
      border-radius: 2px
    }

    .m-duigou:before {
      width: 2px;
      height: 10px;
      left: 0;
      -webkit-animation: dgLeft 0.5s linear 0s 1 both;
      animation: dgLeft 0.5s linear 0s 1 both
    }

    .m-duigou:after {
      width: 20px;
      height: 2px;
      bottom: 0;
      -webkit-animation: dgRight 0.5s linear 0.5s 1 both;
      animation: dgRight 0.5s linear 0.5s 1 both
    }

    @-webkit-keyframes dgLeft {
      0% {
        top: -100%
      }
      100% {
        top: 0%
      }
    }

    @-webkit-keyframes dgLeft {
      0% {
        top: -100%
      }
      100% {
        top: 0%
      }
    }

    @-webkit-keyframes dgRight {
      0% {
        left: -100%
      }
      100% {
        left: 0
      }
    }

    @-webkit-keyframes dgRight {
      0% {
        left: -100%
      }
      100% {
        left: 0
      }
    }
</style>
