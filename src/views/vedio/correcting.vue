<template>
	<div>
    <div class="videoContent">
      <video  webkit-playsinline="true" x-webkit-airplay="true"  x5-video-player-type="h5" x5-video-player-fullscreen="true" playsinline>
        <source :src="videoSource" type="video/mp4">
        </source>
      </video>
    </div>
    <div id="output">
       <!-- v-if="listShow" -->
    <div class="bgOutput">
      <div class="ulLast">
        <ul class="student-message">
          <li v-for="(value, key) in ulContent" :class = "{'liNoneColor' : (startTimeEnd >= Number(value.time) && indexOne == key) }" @click="changeLiTime(value.time,value.type, value.url)">
          <div v-if="value.type == '1'"><span>{{value.time | secondTime}}</span>{{value.content}}</div>
          <div v-else><span>{{value.time | secondTime}}</span><i></i><img src="../../assets/images/audio.gif" v-if="audioIcon && indexOne == key"/></div></li>
        </ul>
      </div>
    </div>
    </div>
    <div class="__cov-contrl-content">
      <i class="transformTranslateY" @click="videoPlayPause" :class="{'iImg': videoPlay}"></i>
      <button>{{startTimeEnd | secondTime}}</button>
      <div class="__cov-contrl-video-slider">
         <div class="__cov-contrl-video-inner" :style="{ 'transform': 'translate3d(' + video.Icon + 'px, 0, 0)'}"></div>
        <ul class="__cov-contrl-video-ul"></ul>
        <div class="__cov-contrl-video-rail" @click="playOver">
          <div class="__cov-contrl-video-rail-inner" @click="playOver" :style="{ 'width':video.innerRail + 'px'}"></div>
         </div>
      </div>
      <button>{{allTime | secondTime }}</button>
    </div>
	</div>
</template>
<script>
import utils from '../../utils.js'
import { apiUrl } from '../../production.js'
export default {
  name: 'correcting',
  data () {
    return {
      data: '',
      videoPlay: false,
      startTime: null,
      startTimeEnd: null,
      allTime: null,
      video: {
        Icon: 0,
        innerRail: 0,
        divWidth: null,
        divWidthLeft: null
      },
      // videoLineTotal: null,
      // setTimeoutFirst: true,
      timeLine: [1, 15, 40],
      ulContent: [],
      ulContentLength: -1,
      indexOne: 0,
      videoSource: '',
      listShow: false,
      clickNoScroll: true,
      audioIcon: false
    }
  },
  watch: {
    ulContent (curVal, oldVal) {
      this.$nextTick(() => {
        var studentMessage = document.querySelector('.student-message')
        var ulLast = document.querySelector('.ulLast')
        if (studentMessage.offsetHeight >= 160) {
          ulLast.style.height = '180px'
        }
      })
    },
    startTimeEnd (curVal, oldVal) {
      for (var i = 0; i < this.ulContent.length; i++) {
        if (this.ulContent[i].time || this.indexOne === 0) {
          if (this.ulContent[i + 1]) {
            if (this.ulContent[i].time <= curVal && curVal < this.ulContent[i + 1].time) {
              this.indexOne = i
              break
            }
          } else {
            if (curVal < this.ulContent[this.ulContent.length - 1].time) {
              this.indexOne = 0
              break
            } else {
              this.indexOne = this.ulContent.length - 1
              break
            }
          }
        }
      }
      var ulContentLengths = document.querySelectorAll('.student-message li')
      var ulLast = document.querySelector('.ulLast')
      var studentMessage = document.querySelector('.student-message')
      if (this.indexOne > this.ulContentLength && ulLast && ulContentLengths[this.indexOne]) {
        if ((ulLast.getBoundingClientRect().height - 20) <= ulContentLengths[this.indexOne].offsetTop) {
          var timeParse = parseInt(ulContentLengths[this.indexOne].offsetTop / 160)
          studentMessage.scrollTop = timeParse * 160
        } else {
          studentMessage.scrollTop = ulContentLengths[this.indexOne].offsetTop - 10
        }
      }
      this.ulContentLength = this.indexOne
    }
  },
  computed: {
  },
  methods: {
    changeLiTime (value, type, url) {
      var video = document.querySelector('video')
      this.clickNoScroll = true
      video.currentTime = value
      this.startTimeEnd = value
      this.audioIcon = true
      if (type === '2') {
        console.log(type)
        var outputVideo = document.querySelector('#output audio')
        if (!outputVideo) {
          var output = document.querySelector('#output')
          var wxAudio = document.createElement('audio')
          wxAudio.className = 'wx-audio-content'
          wxAudio.src = url
          output.appendChild(wxAudio)
          wxAudio.play()
          wxAudio.volume = 1
          wxAudio.addEventListener('ended', () => {
            this.audioIcon = false
            // video.play()
            // this.videoPlay = true
          })
        } else {
          outputVideo.src = url
          outputVideo.play()
          outputVideo.volume = 1
          outputVideo.addEventListener('ended', () => {
            this.audioIcon = false
            // video.play()
            // this.videoPlay = true
          })
        }
        video.pause()
        this.videoPlay = false
      }
    },
    pad (val) {
      val = Math.floor(val)
      if (val < 10) {
        return '0' + val
      }
      return val + ''
    },
    timeParse (sec) {
      let min = 0
      min = Math.floor(sec / 60)
      sec = sec - min * 60
      return this.pad(min) + ':' + this.pad(sec)
    },
    videoPlayPause () {
      var video = document.querySelector('video')
      if (this.videoPlay) {
        this.videoPlay = false
        video.pause()
        this.clickNoScroll = true
      } else {
        this.videoPlay = true
        video.play()
        this.clickNoScroll = false
      }
    },
    playOver (ev) {
      var pageX = ev.pageX
      var video = document.querySelector('video')
      var lineWidth = document.querySelector('.__cov-contrl-video-rail')
      var divWidth = lineWidth.getBoundingClientRect().width - 12
      var divWidthLeft = lineWidth.getBoundingClientRect().left
      var current = ((pageX - divWidthLeft) * this.allTime) / divWidth
      video.currentTime = current
      // this.startTime = this.timeParse(current)
      this.startTimeEnd = current
      pageX = pageX - divWidthLeft
      this.video.Icon = pageX
    },
    addEventListenerVideo () {
      var video = document.querySelector('video')
      var lineWidth = document.querySelector('.__cov-contrl-video-rail')
      var innerLine = document.querySelector('.__cov-contrl-video-inner')
      setTimeout(() => {
        this.video.divWidth = lineWidth.getBoundingClientRect().width - 12
        this.video.divWidthLeft = lineWidth.getBoundingClientRect().left
      }, 500)
      video.oncanplaythrough = () => {
        this.startTimeEnd = video.currentTime
      }
      video.addEventListener('timeupdate', (e) => {
        const percent = video.currentTime / this.allTime
        const current = ((lineWidth.getBoundingClientRect().width - 12) * percent).toFixed(3)
        this.startTimeEnd = video.currentTime
        this.video.Icon = current
        this.video.innerRail = current
        if (video.currentTime === video.duration) {
          this.videoPlay = false
        }
      })
      innerLine.addEventListener('touchmove', (event) => {
        video.currentTime = ((event.targetTouches[0].pageX - this.video.divWidthLeft) * this.allTime) / this.video.divWidth
        this.startTimeEnd = video.currentTime
      })
      video.addEventListener('x5videoexitfullscreen', () => {
        this.videoPlay = false
        video.pause()
      })
      video.addEventListener('x5videoenterfullscreen', () => {
        this.videoPlay = true
      })
      // this.listShow = true
    }
  },
  mounted () {
    this.addEventListenerVideo()
    if (utils.isIOS()) {
      var videoContent = document.querySelector('.videoContent')
      videoContent.style.paddingBottom = '48px'
    }
  },
  created () {
    utils.setDocTitle('作业详情')
    this.videoSource = utils.getStore('videoUrl')
    this.allTime = Number(utils.getStore('videoTime'))
    let param = {
      ctl: 'comment',
      act: 'getComments',
      videoId: this.$route.query.id
    }
    utils.GET(apiUrl, param).then(data => {
      this.ulContent = data.data
      var lineWidth = document.querySelector('.__cov-contrl-video-rail')
      var ulAll = document.querySelector('.__cov-contrl-video-ul')
      var divWidth = lineWidth.getBoundingClientRect().width - 12
      for (var p = 0; p < data.data.length; p++) {
        var li = document.createElement('li')
        const palive = Number(data.data[p].time) / Number(this.allTime)
        li.style.left = palive * divWidth + 'px'
        li.className = 'liPosition'
        ulAll.appendChild(li)
      }
    })
  },
  destroyed () {}
}
</script>
<style scoped lang="scss">
@import "../../assets/style/px2rem.scss";
    .__cov-contrl-content {
      position: absolute;
      display: flex;
      display: -webkit-flex;
      display: -moz-flex;
      display: -ms-flex;
      display: -o-flex;
      z-index:100;
      height:48px;
      left: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.75);
      width: 100%;
      z-index: 2147483647;
      padding-left:px2Rem(50px);
      padding-right:px2Rem(18px);
      i{
        display:inline-block;
        height:px2Rem(30px);
        width:px2Rem(30px);
        background:url('../../assets/images/puse.png') no-repeat;
        background-size:100%;
        position:absolute;
        top:50%;
        left: px2Rem(15px);
      }
      .iImg{
        background:url('../../assets/images/pause2@2x.png') no-repeat !important;
        background-size:100% !important;
      }
      button{
        font-family: PingFangSC-Light;
        font-size: 10px;
        color: #FFFFFF;
        // position:absolute;
      }
    }

    .__cov-contrl-video-rail {
      position: absolute;
      top: 50%;
      width: 100%;
      height: 5px;
      margin-top: -2.5px;
      background: #fff;
      // overflow: hidden;
      @include borderRadiusNumber(100px);
    }
   .__cov-contrl-video-ul{
    position:absolute;
     top: 50%;
     margin-top:-2.5px;
     z-index:999;
     li{

      // left:100px;
      // z-index:1000;
     }
   }
    .__cov-contrl-video-slider {
      position: relative;
      display: inline-block;
      height:100%;
      width: 100%;
      // overflow: hidden;
      margin: 0 4px;
      transition: all .2s ease-in;
    }

    .__cov-contrl-video-inner {
      position: absolute;
      display: inline-block;
      left: 0;
      top: 50%;
      background: #fff;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      margin-top: -6px;
      z-index: 1000;
      cursor: pointer;
      transition: all 16ms;
    }

    .__cov-contrl-video-rail-inner {
      position: absolute;
      top: 0;
      left: 0;
      /*width: 100%;*/
      height:5px;
      @include borderRadiusNumber(100px);
      background: #F5A623;
      transition: transform .2s;
    }
  .ulLast{
    //  height:px2Rem(180px);
     width:100%;
     z-index:1000;
     padding: 10px px2Rem(15px);
     overflow: scroll;
     box-sizing: border-box;
    }
   .student-message{
      height:100%;
      overflow:scroll;
      img{
        width: px2Rem(30px);
        height: auto;
        position: relative;
        left: px2Rem(-75px);
      }
     li{
      font-family: PingFangSC-Medium;
       font-size: 13px;
       color: #333;
       margin-bottom:px2Rem(4px);
       line-height:16px;
       div{
        display:inline-block;
        // padding-left:10px;
        font-family: PingFangSC-Medium;
        font-size: px2Rem(13px);
        color: #333;
       }
       i{
        display:inline-block;
        height:px2Rem(32px);
        width:px2Rem(80px);
        background: #333;
        @include borderRadiusNumber(4px);
        position:relative;
        margin-right:6px;
        left:10px;
        line-height: px2Rem(32px);
        &:after{
         content:'';
         display:block;
         width:0;
         height:0;
         border-width:5px 8px 5px 0;
         border-style:solid;
         border-color:transparent #333 transparent transparent;
         position:absolute;
         top:50%;
         margin-top:-5px;
         left:-8px;
        }
       }
       span{
        
        color:#333;
        display:inline-block;
        margin-right: px2Rem(6px);
       }
     }
   }
   .videoContent{
    // z-index:1000;
    position:absolute;
    width:100%;
    height:100%;
    background:#000;
    // padding-bottom: 48px;
    video{
      width:100%;
      // height: auto;
      height:100%;
      // position: absolute;
      // top: 50%;
      // background: red;
      
      padding-bottom: -48px;
      box-sizing: border-box;
    }
   }
   #output{
    position:fixed;
    width:100%;
    height:100%;
    padding-bottom:px2Rem(48px);
    background: rgba(0,0,0,.1);
    .bgOutput{
     position:absolute;
     width: 100%;
     bottom:px2Rem(48px);
     z-index:100;
     left:0;
     box-sizing: border-box;
     -webkit-box-sizing: border-box;
     -moz-box-sizing: border-box;
     -ms-box-sizing: border-box;
    }
   }
   .liNoneColor{
    div{
      color: #FFFFFF !important;
    }
     color: #FFFFFF !important;
     span{
      color: #FFE031 !important;
     }
     i{
      background:#fff !important;
      &:after{
        border-color:transparent #fff transparent transparent !important;
      }
     }
   }
</style>
