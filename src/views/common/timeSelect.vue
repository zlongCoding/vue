<template>
  <div>
    <div>
    <header class="space-between borderPX" @click="addressBlock">
      <div class="bgImg-time ">{{timeDay}}月</div>
      <div>{{addressId == '0' ?  '请选择艺校' : schoolContent.schoolName}}<i></i></div>
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
        <li>日</li>
        <li>一</li>
        <li>二</li>
        <li>三</li>
        <li>四</li>
        <li>五</li>
        <li>六</li>
      </ul>
        <div class="timeContent" >
          <ul class='timeUl' :style="{width: boxNum * widthClient + 'px', marginLeft: marginLeft + 'px'}" @touchstart="start($event)" @touchmove="move($event)" @touchend="end($event)" :class="{shift: isMove}">
          <li class="timeLine" :style="{width: widthClient + 'px'}" v-for="liArray in timeArray">
          <ul class="space-around">
           <li class="space-center" :class="{ 'liSelect' : timeListChoose == key}" v-for="(value, key) in liArray.timeIndex" >
            <button @click="timeChoose(value, key)" :class="{'colorR': contentAll[value].length <= 0}" v-if = "dayTimeIndex != value">{{ value | dayChange}}</button><button @click="timeChoose(value, key)" :class="{'colorR': contentAll[value].length <= 0}" v-else style="font-size:12px">今天</button></li>
            
           </ul> 
            </li>
          </ul>
      </div>
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
      widthClient: 0,
      marginLeft: 0,
      isMove: true,
      startX: 0,
      boxNum: 0,
      startY: 0,
      moveX: 0,
      movrY: 0,
      endX: 0,
      endY: 0,
      m_sX: 0,
      m_sY: 0,
      e_sX: 0,
      e_xY: 0,
      sML: 0,
      index: 0,
      contentAll: null,
      schoolContent: '',
      schoolContentList: [],
      addressChoose: false,
      addressId: '0',
      timeArray: [],
      allData: [],
      timeListChoose: null,
      timeDay: null,
      nowDay: Date.parse(new Date()) / 1000,
      dayTimeIndex: null
    }
  },
  props: {
    timeId: ''
  },
  watch: {
    index: function (newValue, oldValue) {
      this.marginLeft = 0 - this.index * this.widthClient
      for (var j = 0; j < this.timeArray[this.index].timeIndex.length; j++) {
        if (this.allData[this.timeArray[this.index].timeIndex[j]].length) {
          this.timeListChoose = j
          this.timeDay = utils.conversionTime(this.timeArray[this.index].timeIndex[j], 4)
          this.$emit('selcetli', this.timeArray[this.index].timeIndex[j])
          return
        } else {
          this.timeListChoose = null
        }
      }
    }
  },
  computed: {
    data () {}
  },
  methods: {
    addressNone () {
      this.addressChoose = false
    },
    addressBlock () {
      this.addressChoose = true
    },
    clickOne (config) {
      this.addressChoose = false
      this.addressId = config.id
      this.schoolContent = config
      this.$emit('schoolIdli', config.id)
      // utils.setStore('schoolId', config.id)
      this.getSTList(config.id)
    },
    selcetLi (index) {
      this.$emit('selcetli', index)
    },
    start (event) {
      event.stopPropagation()
      this.isMove = false
      this.startX = event.changedTouches[0].clientX
      this.startY = event.changedTouches[0].clientY
      this.sML = this.marginLeft
    },
    move (event) {
      event.stopPropagation()
      this.moveX = event.changedTouches[0].clientX
      this.moveY = event.changedTouches[0].clientY
      this.m_sX = this.moveX - this.startX
      this.m_sY = this.moveY - this.startY
      var marginLeft = this.sML + this.m_sX

      marginLeft = marginLeft > 0 ? 0 : marginLeft
      marginLeft = marginLeft < this.widthClient - this.boxNum * this.widthClient ? this.widthClient - this.boxNum * this.widthClient : marginLeft
      this.marginLeft = marginLeft
    },
    end (event) {
      this.isMove = true
      var endX = event.changedTouches[0].clientX
      this.m_sX = endX - this.startX
      if (Math.abs(this.m_sX) > 100 || Math.abs(this.m_sX) < -100) {
        var multiple = this.m_sX > 0 ? -1 : 1
        var index = this.index + multiple
        index = index < 0 ? 0 : index
        index = index > this.boxNum - 1 ? this.boxNum - 1 : index
        this.index = index
      } else {
        this.marginLeft = 0 - this.index * this.widthClient
      }
    },
    timeChoose (index, content) {
      this.timeListChoose = content
      this.$emit('selcetli', index)
      this.timeDay = utils.conversionTime(index, 4)
    },
    setData (data) {
      for (var p in data.data) {
        if (data.data[p].length > 0) {
          for (var h = 0; h < data.data[p].length; h++) {
            for (var k = h + 1; k < data.data[p].length; k++) {
              if (data.data[p][h]['startTime'] > data.data[p][k]['startTime']) {
                const temp = data.data[p][h]
                data.data[p][h] = data.data[p][k]
                data.data[p][k] = temp
              }
            }
          }
          // data.data[i] = []
          // for (var k = 0; k < dataNone.length; k++) {
          //   data.data[i].push(dataNone[k])
          // }
          // for (var h = 0; h < dataArray.length; h++) {
          //   data.data[i].push(dataArray[h])
          // }
        }
      }
      this.contentAll = data.data
      this.$emit('courseList', data.data)
      var dataLength = []
      this.allData = data.data
      for (var i in data.data) {
        dataLength.push(i)
      }
      var b
      var newArray = []
      dataLength.forEach((item, index, array) => {
        var a = Math.floor(index / 7)
        if (b !== a) {
          b = a
          newArray[a] = {}
          newArray[a].timeIndex = []
        }
        newArray[a].timeIndex.push(item)
      })
      this.timeArray = newArray
      this.boxNum = this.timeArray.length
      for (var j = 0; j < this.timeArray[0].timeIndex.length; j++) {
        if (utils.conversionTime(this.timeArray[0].timeIndex[j], 2) === utils.conversionTime(this.nowDay, 2)) {
          this.timeListChoose = j
          this.dayTimeIndex = this.timeArray[0].timeIndex[j]
          this.timeDay = utils.conversionTime(this.timeArray[0].timeIndex[j], 4)
          this.$emit('selcetli', this.timeArray[0].timeIndex[j])
          // this.timeArray[0].timeIndex[j] = '今天'
          return
        } else {
          this.timeListChoose = null
        }
      }
    },
    getSTList (addressId) {
      if (this.$store.state.Home.userInfo.data.enabled === '1' || this.$store.state.Home.userInfo.data.enabled === '2') {
        let paramenabled = {
          ctl: 'main',
          act: 'getMyCourse',
          schoolId: addressId
        }
        utils.GET(apiUrl, paramenabled).then(data => {
          this.setData(data)
        })
      } else {
        let params = {
          ctl: 'main',
          act: 'getSTList',
          schoolId: addressId
        }
        utils.GET(apiUrl, params).then(data => {
          this.setData(data)
        })
      }
    }
  },
  created () {
    this.widthClient = document.documentElement.clientWidth
    if (utils.getStore('schoolId')) {
      this.addressId = utils.getStore('schoolId')
    } else {
      this.addressId = this.$store.state.Home.userInfo.data.schoolId
    }
    this.getSTList(this.addressId)
    let param = {
      ctl: 'main',
      act: 'getSchoolList'
    }
    utils.GET(apiUrl, param).then(data => {
      this.schoolContentList = data.data
      if (this.addressId !== '0') {
        for (let i = 0; i < data.data.length; i++) {
          if (data.data[i].id === this.addressId) {
            this.schoolContent = data.data[i]
            this.$emit('schoolIdChild', data.data[i].id)
            return
          }
        }
      }
    })
  },
  mounted () {
  },
  destroyed () {}
}
</script>
<style scoped lang="scss">
@import "../../assets/style/px2rem.scss";
.compent_timeList{
  position: relative;
  // height:px2Rem(64px);
  padding: px2Rem(12px) 0 px2Rem(6px) 0;
  background: #fff;
  margin-bottom:px2Rem(16px);
  .timeLine{
     li{
       height:px2Rem(28px);
       width:px2Rem(28px);
       text-align: center;
       margin-bottom:1px;
       display:inline-block;
      -webkit-tap-highlight-color:rgba(0,0,0,0);
     }
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
      -webkit-tap-highlight-color:rgba(0,0,0,0);
    }
  }
}
.shift {
  transition-property: margin-left;
  -webkit-transition-property: margin-left;
  -moz-transition-property: margin-left;
  transition-duration: .5s;
  -moz-transition-duration: .5s;
  -webkit-transition-duration: .5s;
}
.addressSelect{
  position: absolute;
  bottom: 0;
  z-index: 1000;
}
.liSelect{
   button{
     background: #3D5860;
    border-radius:50%;
    color: #FFFFFF !important;
   }
}

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
  color: #666666;
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
.colorR{
  color:#999 !important;
}
 @media screen and (max-width: 370px){
  .timeLine li{
    width:px2Rem(30px) !important;
    height:px2Rem(30px) !important;
  }
}
</style>
