<template>
  <div>
  <div>
    <header class="space-between borderPX" @click="addressBlock">
      <div class="bgImg-time ">{{timeDay}}月</div>
      <div>{{schoolContent.schoolName}}<i></i></div>
    </header>

    <div class="addressSelect" v-if ="addressChoose">
      <i @click="addressNone"></i>
      <i></i>
      <div class="content " :class="{ 'contentHeight': schoolContentList.length>3}">
      <ul>
       <li class="borderPX" v-for="(value, key) in schoolContentList" @click="clickOne(value)">
         <p>{{value.schoolName}}</p>
         <div>{{value.schoolAddress}}</div>
       </li>
      </ul>
    </div>
    </div>
    <div class="dialog-bg" v-if ="addressChoose"></div>
  </div>

  <div class="compent_timeList">
    <ul class="time_list space-around">
        <li class="space-center">一</li>
        <li class="space-center">二</li>
        <li class="space-center">三</li>
        <li class="space-center">四</li>
        <li class="space-center">五</li>
        <li class="space-center">六</li>
        <li class="space-center">日</li>
      </ul>
      <ul class="space-around">
        <li class="space-center timeLine" v-for="(value, key) in timeArray" :class="{ 'liSelect' : value == nowDay }"><button>{{value}}</button></li>
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
      schoolContent: '',
      schoolContentList: [],
      addressChoose: false,
      addressId: '',
      timeArray: [],
      nowDay: '',
      timeDay: new Date().getMonth() + 1,
      contentNumber: []
    }
  },
  computed: {
    data () {}
  },
  methods: {
    addressNone () {
      this.addressChoose = false
    },
    formatDate (date) {
      var day = date.getDate()
      return day
    },
    getPinaoList (id) {
      let param = {
        ctl: 'main',
        act: 'getPinaoList',
        schoolId: id
      }
      utils.GET(apiUrl, param).then(data => {
        console.log(data.data)
        this.contentNumber = data.data
        this.$emit('courseList', data.data)
      })
    },
    addDate (date, n) {
      date.setDate(date.getDate() + n)
      return date
    },
    setWeek (date) {
      var week = date.getDay() - 1
      date = this.addDate(date, week * -1)
      for (var i = 0; i < 7; i++) {
        this.timeArray.push(this.formatDate(i === 0 ? date : this.addDate(date, 1)))
      }
      // var arryEnd = this.timeArray.splice(6, 1)
      // this.timeArray.unshift(arryEnd[0])
    },
    addressBlock () {
      this.addressChoose = true
    },
    clickOne (config) {
      this.addressChoose = false
      this.schoolContent = config
      this.getPinaoList(config.id)
      // utils.setStore('schoolId', config.id)
      // this.$emit('schoolIdChild', config.id)
    }
  },
  created () {
    if (utils.getStore('getPinaoList')) {
      this.addressId = utils.getStore('getPinaoList')
    } else {
      this.addressId = this.$store.state.Home.userInfo.data.schoolId
    }
    let param = {
      ctl: 'main',
      act: 'getSchoolList'
    }
    utils.GET(apiUrl, param).then(data => {
      this.schoolContentList = data.data
      for (let i = 0; i < data.data.length; i++) {
        if (data.data[i].id === this.addressId) {
          this.schoolContent = data.data[i]
          this.$emit('schoolIdChild', data.data[i].id)
          return
        }
      }
    })
    console.log(this.addressId)
    this.setWeek(new Date())
    this.nowDay = new Date().getDate()
    this.getPinaoList(this.addressId)
  },
  destroyed () {}
}
</script>

<style scoped lang="scss">
@import "../../assets/style/px2rem.scss";


header{
  background: #fff;
  height:px2Rem(45px);
  padding: 0 px2Rem(15px);
  i{
    display:inline-block;
    width:12px;
    height:6px;
    background:url('../../assets/images/else/Triangle@2x.png') no-repeat;
    background-size: 100% 100%;
    margin-left: 4px;
  }
}
.bgImg-time{
  width:30px;
  height:26px;
  background:url('../../assets/images/else/calendar@2x.png') no-repeat;
  background-size:100% 100%;
  line-height: 34px;
  font-size: 12px;
  text-align: center;
}
.addressSelect{
  position: absolute;
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
    background:url('../../assets/images/else/close_white@2x.png');
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
.compent_timeList{
  position: relative;
  // height:px2Rem(64px);
  padding:px2Rem(12px) 0 px2Rem(6px) 0;
  background: #fff;
  margin-bottom:px2Rem(16px);
  .timeLine{
       height:px2Rem(28px);
       width:px2Rem(28px);
       text-align: center;
  }
.time_list li{
  text-align: center;
  width:px2Rem(28px);
  margin-bottom: px2Rem(6px);
}
  .timeContent{
    width: 100%;
    overflow-x: hidden;
    // position: absolute;
    // padding-bottom: px2Rem(12px);
  }
  .timeUl{
    display: flex;
  }
  .timeLine{
    display:inline-block;

    button{
      color: #EE3B3B;
      font-size: 14px;
      width:100%;
      height:100%;
    }
  }
}
.liSelect{
   button{
     background: #3D5860;
    border-radius:50%;
    color: #FFFFFF !important;
   }
}
 @media screen and (max-width: 370px){
  .timeLine{
    width:px2Rem(30px) !important;
    height:px2Rem(30px) !important;
    margin-bottom:1px;
  }
}
</style>
