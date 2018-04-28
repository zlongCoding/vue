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
    <div class="goAddress"><img src="../../../assets/images/personalcenter/address@2x.png"/> 地址：{{value.schoolAddress}}</div>
    <div class="className">
        <span>课程教师：{{value.userName}}</span>
        <span>课程名称：{{value.name}}</span>
        <span>教室编号：{{value.room}}</span>
      </div>
      <div class="clickLop align-items-right borderPX-top">
        <button class="phone space-center" v-if ="value.status == 2" @click="doubt(value)">我有疑问</button>
        <button @click="cancelReservation(key, value.startTime)" v-if ="(value.status == 1) && (parseInt(value.endTime) >= startNowTime)"  :class="{'bg-color' : contnetNoClick.includes(value.orderId)}">取消预定</button>
        <button @click="cancelReservationAgain(key, value.startTime)" v-if ="(value.status == 1) && (parseInt(value.endTime) < startNowTime)">重新预约</button>
         <button @click="successReservation(key)" v-if ="value.status == 2">完成课程</button>
      </div>
    </li>
  </ul> 
  <div class="myAppiont marginNavigation"><button @click="goBack">我要预约</button></div>
  <loading :content="'请完成课程后再预约'" v-if="classGo"></loading>
  <loading :content="'距离上课前三十分钟无法取消预约'" v-if="classQuxiao"></loading>
  <loading :content="'您的账号已被冻结，目前不能预约课程'" v-if="noClassNumber"></loading>
  <loading :content="writeContent" v-if="writeContentIf"></loading>
  <div class="courses-detail appointment-sure" v-if="appointmentNext">
        <button class="button">取消预定</button>
        <div class="appointmentSure">
          <div>确认取消课程：{{this.listContent[this.appointmentIndex]['name']}}</div>
        </div>
        <div class="button-sure space-around">
          <button @click="chooseEndNos">取消</button>
          <button @click="chooseEndYess">确定</button>
        </div>
  </div>
  <div class="courses-detail appointment-sure" v-if="writedoubt">
    <textarea placeholder="请在这里写下你的疑问吧" type="text" class="writedoubt" v-model='writeDoubtContent'></textarea>
     <div class="button-sure space-around">
          <button @click="writedoubtNo">取消</button>
          <button @click="writedoubtYes">提交</button>
    </div>
  </div>
  <div class="dialog-bg" v-if ="appointmentNext || writedoubt"></div>
</div>
</template>

<script>
import utils from '../../../utils.js'
import { apiUrl } from '../../../production.js'
import config from '../../../config.js'
export default {
  name: 'home',
  data () {
    return {
      setTimeoutNo: false,
      listDeleteArray: [],
      classGo: false,
      classQuxiao: false,
      startNowTime: Date.parse(new Date()) / 1000 - 600,
      appointmentNext: false,
      appointmentText: null,
      contnetNoClick: [],
      noClassNumber: false,
      writedoubt: false,
      doubtContent: null,
      writeContentIf: false,
      writeContent: null,
      writeDoubtContent: null
    }
  },
  props: {
    listContent: {
      type: Array,
      default: []
    }
  },
  watch: {
    listContent (curVal, oldVal) {
    }
  },
  computed: {
    userInfo () {
      return this.$store.state.Home.userInfo
    }
  },
  methods: {
    routerList (id) {
      this.$router.push({path: 'list', query: {id: id}})
    },
    chooseEndNos () {
      this.appointmentNext = false
    },
    chooseEndYess () {
      let param = {
        ctl: 'main',
        act: 'cancelOrder',
        orderId: this.listContent[this.appointmentIndex].orderId
      }
      utils.GET(apiUrl, param).then(data => {
        this.appointmentNext = false
        this.listContent.splice(this.appointmentIndex, 1)
      })
    },
    cancelReservationAgain (index, time) {
      let param = {
        ctl: 'main',
        act: 'cancelOrder',
        orderId: this.listContent[index].orderId
      }
      utils.GET(apiUrl, param).then(data => {
        // this.appointmentNext = false
        this.listContent.splice(index, 1)
      })
    },
    cancelReservation (index, time) {
      console.log(time)
      var startNowTime = Date.parse(new Date()) / 1000 + 1800
      console.log(startNowTime)
      if (parseInt(time) > startNowTime || this.userInfo.data.enabled === '0') {
        this.appointmentNext = true
        this.appointmentIndex = index
      } else {
        if (!this.contnetNoClick.includes(this.listContent[index].orderId)) {
          this.contnetNoClick.push(this.listContent[index].orderId)
        }
        this.classQuxiao = true
        setTimeout(() => {
          this.classQuxiao = false
        }, 1000)
      }
    },
    successReservation (index) {
      let param = {
        ctl: 'main',
        act: 'overCourseOrder',
        orderId: this.listContent[index].orderId
      }
      utils.GET(apiUrl, param).then(data => {
        this.listContent.splice(index, 1)
      })
    },
    doubt (content) {
      this.writedoubt = true
      this.doubtContent = content
    },
    writedoubtNo () {
      this.writedoubt = false
    },
    writedoubtYes () {
      let param = {
        ctl: 'user',
        act: 'courseAppeal',
        coid: this.doubtContent.orderId,
        content: this.writeDoubtContent
      }
      utils.GET(apiUrl, param).then(data => {
        console.log(data.status)
        if (config.serverContent[data.status]) {
          this.writeContentIf = true
          this.writeContent = config.serverContent[data.status]
          setTimeout(() => {
            this.writeContentIf = false
          }, 1000)
        } else {
          this.writedoubt = false
          this.$router.push({path: '/complaint'})
        }
      })
    },
    goBack (id) {
      console.log(this.userInfo.data.enabled)
      if (this.userInfo.data.enabled === '1') {
        if (this.listContent.length >= 2) {
          this.classGo = true
          setTimeout(() => {
            this.classGo = false
          }, 1000)
        } else {
          this.$router.push({path: '/unclass'})
        }
      } else if (this.userInfo.data.enabled === '0') {
        if (this.listContent.length >= 1) {
          this.classGo = true
          setTimeout(() => {
            this.classGo = false
          }, 1000)
        } else {
          this.$router.push({path: '/unclass'})
        }
      } else if (this.userInfo.data.enabled === '2') {
        this.noClassNumber = true
        setTimeout(() => {
          this.noClassNumber = false
        }, 1000)
      }
    }
  },
  beforeMount () {
  },
  mounted () {
  },
  destroyed () {}
}
</script>

<style scoped lang="scss">
@import "../../../assets/style/px2rem.scss";

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
     background:url('../../../assets/images/personalcenter/uesd@2x.png') no-repeat;
     background-size:100% 100%;
   }
  }
}

.clickLop{
  .phone{
    border: 1px solid #EE3B3B;
    border-radius: 100px;
    color:#f04f4f;
  }
  width:100%;
  background:#fff;
  text-align: right;
  height:px2Rem(44px);
  border-radius: 0 0 8px 8px;
  button{
    border: 1px solid #3D5860;
    width:px2Rem(84px);
    height:px2Rem(28px);
    border-radius: px2Rem(100px);
  }
  button:last-child{
    margin-left: px2Rem(15px);
  }
}
.myAppiont{
  text-align:center;
   button{
      height:px2Rem(52px);
      width:px2Rem(242px);
      margin-top:px2Rem(88px);
      background: #3D5860;
      font-family: PingFangSC-Regular;
      font-size: px2Rem(18px);
      color: #FFFFFF;
      box-shadow: 0 2px 4px 2px rgba(61,88,96,0.20);
      border-radius: px2Rem(100px);
   }
}

.display-none{
  display:none;
}

 .courses-detail{
  position:fixed;
  z-index:1000;
  border-radius: 8px;
  width:px2Rem(284px);
  left: 50%;
  font-size:px2Rem(14px);
  top:50%;
  transform:translate(-50%, -50%);
  -webkit-transform:translate(-50%, -50%);
  -moz-transform:translate(-50%, -50%);
  -ms-transform:translate(-50%, -50%);
  -o-transform:translate(-50%, -50%);
  .button{
    width:100%;
    height:px2Rem(44px);
    background: #3D5860;
    border-radius: 8px 8px 0 0;
    color:#fff;
  }

}
.appointment-sure{
  border-radius:8px;
  overflow:hidden;
  .appointmentSure{
    background:  #F2F2F2;
    text-align:center;
    font-size:px2Rem(14px);
    padding: px2Rem(25px) 0 px2Rem(25px) 0;
  }
  .button-sure{
    width:100%;
    background:#F2F2F2;
    border-radius:0 0 8px 8px;
    overflow: hidden;
    height:px2Rem(50px);
    button{
      height:100%;
      font-size: px2Rem(14px);
      color: #0076FF;
      width:50%;
      border-top: 1px solid #DEDEDE;
    }
    button:first-child{
      border-right: 1px solid #DEDEDE;
    }
  }
}
.writedoubt{
  width: 100%;
  background:#F2F2F2;;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #666666;
  height: px2Rem(100px);
  resize:none;
  border:none;
  padding:0 px2Rem(20px);
  padding-top:px2Rem(12px);
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  margin-bottom: -2px;
  outline: none;
  &::-webkit-input-placeholder{
    color: #666666;
  }
}
.bg-color{
  background: #eee !important;
  border: 1px solid #eee !important;
  color: #999 !important;
}
</style>
