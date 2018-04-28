<template>
  <div id="myCourses">
    <piano v-if="appointmentChoose && pianoContent.length <= 0"></piano>
    <section class="marginContent" v-if="appointmentChoose &&pianoContent.length > 0">
       <ul class="noClass" >
        <li class="bg-ff" v-for="(value, key) in pianoContent">
          <section class="borderPX">
            <p>{{value.endTime| dayStyle}} {{value.endTime| weekChange}} <span>{{value.startTime| timeChange}}</span>-<span>{{value.endTime| timeChange}}</span></p>
            <div >{{value.schoolName}}</div>
            <div class="classAddress">地址：{{value.schoolAddress}}</div>
            <div class="className space-between">
              <!-- <span>课程教师：{{value.schoolAddress}}</span> -->
              <!-- <span>课程名称：{{value.pianoName}}</span> -->
              <span>房间号：{{value.pianoName}}</span>
            </div>
            <img src="../../assets/images/else/bg-paino.png" />
          </section>
          <section>
            <button class="phone" v-if ="parseInt(value.startTime) <= Date.parse(new Date()) / 1000"><a :href="'tel:'+value.schooltel" class="space-center">我有疑问</a></button>
             <button @click="finishEnd(value, key)" v-if ="parseInt(value.startTime)>Date.parse(new Date()) / 1000">取消预约</button>
            <button @click="finishClass(value, key)" v-if ="parseInt(value.startTime) <= Date.parse(new Date()) / 1000">完成练琴</button>
          </section>
        </li>
      </ul>
      <div class="myAppiont marginNavigation"><button @click="piano">我要预约</button></div>
    </section>
    <loading :content="'请完成练习后再预约'" v-if="classGo"></loading>
    <loading :content="'您的账号已被冻结，目前不能预约练琴'" v-if="pianoClass"></loading>
    <navigation></navigation>
  </div>
</template>
<script>
import piano from './piano.vue'
import utils from '../../utils.js'
import { apiUrl } from '../../production.js'
export default {
  name: 'myCourses',
  data () {
    return {
      dd: 'daa',
      listindex: 0,
      introduceNo: false,
      pianoContent: '',
      classGo: false,
      nowTimeDay: Date.parse(new Date()) / 1000,
      appointmentChoose: false,
      pianoClass: false
    }
  },
  components: {
    piano
  },
  computed: {
    userInfo () {
      return this.$store.state.Home.userInfo
    }
  },
  methods: {
    routerList (id) {
      this.$router.push({ path: 'list', query: { id: id } })
    },
    introduce () {
      this.introduceNo = false
    },
    changeBg (index) {
      this.listindex = index
    },
    classintroduce (content) {
      this.introduceNo = true
    },
    piano () {
      if (this.userInfo.data.enabled === '2') {
        this.pianoClass = true
        setTimeout(() => {
          this.pianoClass = false
        }, 1000)
      } else {
        if (this.pianoContent.length > 0) {
          this.classGo = true
          setTimeout(() => {
            this.classGo = false
          }, 1000)
        } else {
          this.$router.push({path: '/piano'})
        }
      }
    },
    finishEnd (content, index) {
      let param = {
        ctl: 'main',
        act: 'cancelPianoOrder',
        orderId: content.id
      }
      utils.GET(apiUrl, param).then(data => {
        this.pianoContent.splice(index, 1)
        // this.pianoContent = data.data
      })
    },
    finishClass (content, index) {
      let param = {
        ctl: 'main',
        act: 'overPianoOrder',
        orderId: content.id
      }
      utils.GET(apiUrl, param).then(data => {
        this.pianoContent.splice(index, 1)
      })
    }
  },
  created () {
    let param = {
      ctl: 'main',
      act: 'getMyPianoOrder'
    }
    utils.GET(apiUrl, param).then(data => {
      // console.log(data)
      this.pianoContent = data.data
    })
  },
  mounted () {
    setTimeout(() => {
      this.appointmentChoose = true
    }, 300)
  },
  destroyed () {}
}
</script>
<style scoped lang="scss">
@import "../../assets/style/px2rem.scss";

.marginContent{
  padding: px2Rem(16px) px2Rem(16px) 0 px2Rem(16px) ;
}
.noClass{
 li{
  border-radius:8px;
  box-shadow: 0 2px 4px 2px #fff;
  section:nth-child(1) {
    padding: 0 px2Rem(15px);
    p{
      padding-top: px2Rem(50px);
      padding-bottom: px2Rem(16px);
    }
    .classAddress{
      padding-top:px2Rem(16px);
      padding-bottom:px2Rem(35px);
    }
    .className{
      padding-bottom:px2Rem(50px);
    }
  }
  section:nth-child(2) {
    padding:px2Rem(12px) 0;
    padding-right: px2Rem(15px);
    text-align: right;
    border-radius: 0 0 8px 8px;
    button {
       border: 1px solid #3D5860;
       border-radius:px2Rem(100px);
      -webkit-border-radius: px2Rem(100px);
      -moz-border-radius: px2Rem(100px);
      -ms-border-radius: px2Rem(100px);
      -o-border-radius: px2Rem(100px);
       padding: px2Rem(4px) px2Rem(14px);
    }
  }
 }
}
.borderPX{
  background-color: #3D5860;
  color: #FFFFFF;
  // background-image: url(../../assets/images/else/bg-paino.png) no-repeat;
  
  border-radius: 8px 8px 0 0;
  position: relative;
  // background-size:100% 100%;
  img{
    height: px2Rem(102px);
    width: auto;
    top:px2Rem(10px);
    position:absolute; 
    right:px2Rem(15px);
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
      -webkit-border-radius: px2Rem(100px);
      -moz-border-radius: px2Rem(100px);
      -ms-border-radius: px2Rem(100px);
      -o-border-radius: px2Rem(100px);
   }
}
  .phone{
    border:1px solid #EE3B3B;
    border-radius: 100px;
    -webkit-border-radius: 100px;
    -moz-border-radius: 100px;
    -ms-border-radius: 100px;
    -o-border-radius: 100px;
    a{
      color:#f04f4f;
      height: 100%;
      width: 100%;
    }
  }
</style>
