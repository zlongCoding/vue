 <template>
    <div id="nselect">
      <vue-address   @courseList = "changeCourseList"></vue-address>
      <div class="courses_list" v-if="coursesContent">
        <ul class="flex-wrap" v-if ="courseListContent">
          <li v-for="(value, key) in courseListContent.piano" v-if = "courseListContent.pianoConfig[value.id]">
            <div>
              <p>房间号：{{value.pianoName}}</p>
              <img src="../../../assets/images/else/piano_y@2x.png" />
            </div>
            <button @click="pianoClick(value)">预约</button>
          </li>
        </ul>
      </div>
      <div class="content-no" v-else>
        <img src="../../../assets/images/else/nodata.png" />
        <p>今日无课程，请选择其他日期</p>
      </div>
      <div class="pinaoDialog" v-if="pianoNext">
        <button class="buttonChild">选择钢琴练习时间</button>
        <div class="pinaoDialog-content" :class="{'pinaoDialogHeight': timeArray.length > 4}">
          <ul>
            <li class="space-between" @click="clickTime(key, value.start,value.orderCount, value.roomNum)" v-for="(value, key) in timeArray" :class="{'contentListNo': pianoContent >= value.start || value.orderCount >= value.roomNum}">
              <div >
                <i :class="{'chooseI' : chooseIndex === key}"></i>
                {{value.start}}:00-{{value.end}}:00
              </div>
              <div v-if="pianoContent >= value.start || value.orderCount >= value.roomNum ">已被预约</div>
              <div v-else>{{value.orderCount}}/{{value.roomNum}}</div>
            </li>
          </ul>
        </div>
        <div class="button">
          <button @click="surePiano">确认预约</button>
        </div>
        
        <i class="icons" @click="pianoClickNo"></i>
      </div>
      <div class="dialog-bg" v-if ="pianoNext"></div>
      <loading :content="'赠送练琴时间不足'" v-if="noClassNumber"></loading>
    </div>
</template>

<script>
import vueAddress from '../address.vue'
import utils from '../../../utils.js'
import { apiUrl } from '../../../production.js'
export default {
  name: 'home',
  data () {
    return {
      pianoNext: false,
      courseListContent: null,
      courseListIndex: null,
      coursesContent: true,
      pianoContent: null,
      chooseIndex: null,
      timeArray: [],
      surePianoTime: null,
      noClassNumber: false
    }
  },
  components: {
    vueAddress
  },
  methods: {
    changeCourseList (data) {
      this.courseListContent = data
      console.log(this.courseListContent)
    },
    pianoClick (content) {
      this.pianoNext = true
      this.timeArray = []
      if (this.courseListContent.pianoConfig[content.id]) {
        const pianoConfig = this.courseListContent.pianoConfig[content.id]
        for (var p = 0; p < pianoConfig.length; p++) {
          var startT = utils.conversionTime(pianoConfig[p].openStartTime, 6)
          var startEndT = utils.conversionTime(pianoConfig[p].openEndTime, 6) - utils.conversionTime(pianoConfig[p].openStartTime, 6)
          for (let t = 0; t < startEndT; t++) {
            this.timeArray.push({start: startT, end: startT + 1, roomNum: content.roomNum, orderCount: 0})
            startT = startT + 1
          }
        }
      }
      console.log(this.timeArray)
      this.surePianoTime = content
      let param = {
        ctl: 'main',
        act: 'getPianoOrder',
        pianoId: content.id
      }
      utils.GET(apiUrl, param).then(data => {
        for (var i = 0; i < data.data.length; i++) {
          // this.pianoContent.push(utils.conversionTime(data.data[i].startTime, 6))
          for (var K = 0; K < this.timeArray.length; K++) {
            if (utils.conversionTime(data.data[i].startTime, 6) === this.timeArray[K].start) {
              this.timeArray[K].orderCount = data.data[i].orderCount
              break
            }
          }
        }
        this.pianoContent = new Date().getHours()
      })
    },
    pianoClickNo () {
      this.pianoNext = false
    },
    surePiano () {
      console.log(this.chooseIndex)
      console.log(this.timeArray)
      console.log(this.timeArray[this.chooseIndex].start)
      if (this.chooseIndex || this.chooseIndex === 0) {
        var startT = this.timeArray[this.chooseIndex].start
        var startTimes = new Date().setHours(startT, 0, 0, 0) / 1000
        let param = {
          ctl: 'main',
          act: 'pianoOrder',
          pianoId: this.surePianoTime.id,
          start: startTimes
        }
        utils.GET(apiUrl, param).then(data => {
          if (data.status === 1027) {
            this.noClassNumber = true
            setTimeout(() => {
              this.noClassNumber = false
            }, 1000)
          } else {
            this.$router.push({path: '/haveprocess'})
          }
        })
      }
    },
    clickTime (content, startT, orderCount, roomNum) {
      if (this.pianoContent >= startT || orderCount >= roomNum) return
      this.chooseIndex = content
    }
  },
  mounted () {
    utils.setDocTitle('预约钢琴练习')
  },
  destroyed () {}
}
</script>

<style scoped lang="scss">
@import "../../../assets/style/px2rem.scss";

#nselect{
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

.courses_list{
  ul{
    padding: 0 4%;
  }
  li{
    display: inline-block;
     width:48%;
     padding-bottom:48%;
     height:0px;
     background: #FFFFFF;
     margin-bottom:px2Rem(16px);
     position: relative;
     border-radius: 8px;
     img{
        width:50%;
        height:auto;
        position:absolute;
        left:50%;
        transform:translateX(-50%);
        -webkit-transform:translateX(-50%);
        -moz-transform:translateX(-50%);
        -o-transform:translateX(-50%);
        -moz-transform:translateX(-50%);
        margin-top: 6%;
     }
     p{
      font-size: 12px;
      color: #3D5860;
      padding-left: px2Rem(10px);
      padding-top: px2Rem(10px);
     }
     button{
      background: #3D5860;
      width:100%;
      position:absolute;
      bottom: 0;
      height:px2Rem(34px);
      font-size: 14px;
      color: #FFFFFF;
      border-radius:0 0 8px 8px;
     }
  }
}
.pinaoDialog{
  position:fixed;
  z-index:1000;
  // 
  width:px2Rem(284px);
  left: 50%;
  top:px2Rem(50px);
  border-radius: 8px;
  transform:translateX(-50%);
  -webkit-transform:translateX(-50%);
  -moz-transform:translateX(-50%);
  -o-transform:translateX(-50%);
  -moz-transform:translateX(-50%);
  text-align:center;
  .buttonChild{
    height:px2Rem(44px);
    width:100%;
    background: #3D5860;
   border-radius: 8px 8px 0 0;
   font-size: 15px;
   color: #FFFFFF;
  }
  .button{
    background: #F2F2F2;
    border-radius: 0 0 8px 8px;
    padding:px2Rem(10px) 0;
    button{
      font-size: 14px;
      color: #3D5860;
      border-radius: px2Rem(100px);
      border: 1px solid #3D5860;
      width:px2Rem(128px);
      height:px2Rem(30px);
    }
  }
  .icons{
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
  .pinaoDialogHeight{
    height:px2Rem(200px) !important;
  }
  .pinaoDialog-content{
    height:auto;
    overflow: auto;
    ul{
      li{
        height:px2Rem(45px);
        background: #FFFFFF;
        padding:0 px2Rem(16px);
        border-bottom:1px solid #EDEDED;
        div{
          font-size: 14px;
          color: #333;
        }
        div
        i{
           display:inline-block;
           height:16px;
           width:16px;
           background:url('../../../assets/images/else/Oval15.png') no-repeat;
           background-size:100%;
           position:relative;
           top:-1px;
           margin-right:px2Rem(20px);
        }

      }
    }
  }
}
.contentListNo{
  background: #E5E5E5 !important;
  div{
    color: #aaa !important;
  }
}

.chooseI {
  background:url('../../../assets/images/else/xuanzhong@2x.png') no-repeat !important;
  background-size:100% !important;
}

</style>
