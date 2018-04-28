<template>
  <div>
  <div class="videoContent">
      <video  webkit-playsinline="true" x-webkit-airplay="true"  x5-video-player-type="h5" x5-video-player-fullscreen="true" playsinline>
        <!-- style="object-fit: fill"> -->
        <source :src="videoUrl">
        </source>
      </video>
    </div>
    <div id="output">
    <div class="bgOutput">
      <div class="ulLast">
        <ul class="student-message" id="chatContainer">
          <li v-for="(value, key) in ulContent" :class = "{'liNoneColor' : (startTimeEnd >= Number(value.time) && indexOne == key) }">
          <div v-if="value.type == '1'" @click="changeLiTime(value.time)"><span class="span">{{value.time | secondTime}}</span>{{value.content}}</div>
          <div v-else @click="changeLiSay(value.content)"><span class="span">{{value.time | secondTime}}</span><i></i><img src="../../assets/images/audio.gif" v-if="audioIcon && indexOne == key"/></div>
          <span class="closeInline" @click="deleteThisLine(key)" :style="{'color': (startTimeEnd >= Number(value.time) && indexOne == key) ? '#fff' : '#333'}"></span>
        </li>
        </ul>
      </div>
    </div>
    </div>
    <div class="__cov-contrl-content">
      <i class="transformTranslateY" @click="videoPlayPause" :class="{'iImg': videoPlay}"></i>
      <button class="button">{{startTimeEnd | secondTime}}</button>
      <div class="__cov-contrl-video-slider">
         <div class="__cov-contrl-video-inner" :style="{ 'transform': 'translate3d(' + video.Icon + 'px, 0, 0)'}"></div>
        <ul class="__cov-contrl-video-ul"></ul>
        <div class="__cov-contrl-video-rail" @click="playOver">
          <div class="__cov-contrl-video-rail-inner" @click="playOver" :style="{ 'width':video.innerRail + 'px'}"></div>
         </div>
      </div>
      <button class="button">{{videoLineTotal | secondTime}}</button>
      <button class="buttonCl" @click="videoClick">完成批改</button>
    </div>
   <div class="send-message">
     <div class="write space-between" v-show="langualeWrite">
       <img src="../../assets/images/languale.png" @click="langualeClick"/>
       <form  v-on:submit.prevent="onSubmit" >
          <!-- @click="inputFouce" -->
         <input type="text" placeholder="点评（最多输入50个字符）"  @focus="inputFouce"  v-model='textNode' id="inputSubmit"  />
      </form>
       <button @click="onSubmit">发送</button>
     </div>
    <div class="write space-between" v-show="!langualeWrite">
       <img src="../../assets/images/key@2x.png" @click="writeClick"/>
       <div class="langualeAll space-center" @click="saySthing" id="saySubmit">{{audioMessage}}</div>
       <button>发送</button>
     </div>
   </div>
   <div class="dialog-video" v-if="dialogVideo">
     <div class="content">
       <p>请确认是否为该学生点亮“回课”星星</p>
       <div><label><input type="checkbox" class="mgc"  v-model="checkboxBoolean.status"/>&nbsp;是否点亮</label></div>
     </div>
     <div class="buttondiv space-between ">
       <button @click="videoNone">取消</button>
       <button @click="videoYes">完成批改</button>
     </div>
   </div>
    <div class="dialog-video" v-if="dialogTishi">
     <div class="tishixinxi">
       <p>删除点评</p>
       <div>确认删除这条点评吗？</div>
     </div>
     <div class="buttondiv space-between ">
       <button @click="videoTishi">取消</button>
       <button @click="videoTishiYes">确认</button>
     </div>
   </div>
   <div class="dialog-bg" v-if="dialogVideo || dialogTishi"></div>
   <div v-if="errorDefault" class="errprMessageDialog transformTranslateAll">与上次批改时间间隔太短</div>
   <!-- <dialogbg :dialog="dialogVideo || dialogTishi"></dialogbg> -->
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
      startTimeEnd: 0,
      allTime: null,
      langualeWrite: true,
      video: {
        Icon: 0,
        innerRail: 0,
        divWidth: null,
        divWidthLeft: null
      },
      videoLineTotal: null,
      setTimeoutFirst: true,
      timeLine: [],
      ulContent: [],
      ulContentTime: [],
      dialogVideo: false,
      ulContentLength: 0,
      ulContentIndex: -1,
      textNode: null,
      indexOne: 0,
      arrayLength: -1,
      checkboxBoolean: {
        one: false,
        status: false
      },
      dialogTishi: false,
      dialogTishiIndex: -1,
      addListNode: -1,
      contentJson: [],
      videoId: null,
      videoUrl: utils.getStore('videoUrl'),
      wx: '',
      addEventArray: -1,
      audioMessage: '按住 说话',
      clickNoScroll: true,
      writerLastTime: 0,
      errorDefault: false,
      audioIcon: false
    }
  },
  watch: {
    addEventArray () {
      var studentMessage = document.querySelector('.student-message')
      var ulLast = document.querySelector('.ulLast')
      if (studentMessage.getBoundingClientRect().height > 150) {
        if (studentMessage.getBoundingClientRect().height !== 180) {
          ulLast.style.height = '180px'
        }
      }
      this.$nextTick(() => {
        var container = this.$el.querySelector('#chatContainer')
        container.scrollTop = container.scrollHeight
      })
    },
    startTimeEnd (curVal, oldVal) {
      var studentMessage = document.querySelector('.student-message')
      var ulLast = document.querySelector('.ulLast')
      // this.ulContentTime = []
      var ulContentLengths = document.querySelectorAll('.student-message li')
      if (ulContentLengths.length > this.ulContentLength) {
        if (studentMessage.getBoundingClientRect().height > 150) {
          ulLast.style.height = '180px'
          studentMessage.style.height = '100%'
        }
      }
      this.ulContentLength = ulContentLengths.length
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
      if (studentMessage.getBoundingClientRect().height > 150) {
        // && !this.clickNoScroll
        if (this.indexOne > this.ulContentIndex && ulLast && ulContentLengths[this.indexOne]) {
          if ((ulLast.getBoundingClientRect().height - 20) <= ulContentLengths[this.indexOne].offsetTop) {
            var timeParse = parseInt(ulContentLengths[this.indexOne].offsetTop / 160)
            studentMessage.scrollTop = timeParse * 160
          } else {
            studentMessage.scrollTop = ulContentLengths[this.indexOne].offsetTop - 10
          }
        }
      }
      this.ulContentIndex = this.indexOne
    }
  },
  computed: {
  },
  methods: {
    inputFouce () {
      // document.getElementById('inputSubmit').focus()
    },
    scrollTopLi () {
      var studentMessage = document.querySelector('.student-message')
      var ulContentLengths = document.querySelectorAll('.student-message li')
      var ulLast = document.querySelector('.ulLast')
      if (studentMessage.getBoundingClientRect().height > 150) {
        if (studentMessage.getBoundingClientRect().height !== 180) {
          ulLast.style.height = '180px'
          studentMessage.style.height = '100%'
        }
        if ((ulLast.getBoundingClientRect().height - 20) <= ulContentLengths[ulContentLengths.length - 1].offsetTop) {
          studentMessage.scrollTop = ulContentLengths[ulContentLengths.length - 1].offsetTop + 40
        }
      }
    },
    changeLiTime (value) {
      this.clickNoScroll = true
      var video = document.querySelector('video')
      video.currentTime = value
      this.startTimeEnd = value
      // this.videoPlay = true
      // video.play()
    },
    changeLiSay (content) {
      this.clickNoScroll = true
      this.audioIcon = true
      this.playVoice(content)
      this.onVoicePlayEnd(content)
    },
    deleteThisLine (key) {
      this.dialogTishiIndex = key
      this.dialogTishi = true
    },
    videoTishi () {
      this.dialogTishi = false
    },
    videoTishiYes () {
      this.dialogTishi = false
      if (this.dialogTishiIndex !== -1) {
        this.ulContent.splice(this.dialogTishiIndex, 1)
        var ulLiList = document.querySelectorAll('.__cov-contrl-video-ul li')
        var ulLiAll = document.querySelector('.__cov-contrl-video-ul')
        ulLiAll.removeChild(ulLiList[this.dialogTishiIndex])
      }
      this.dialogTishiIndex === -1
    },
    langualeClick () {
      this.langualeWrite = false
      var saySubmit = document.getElementById('saySubmit')
      var video = document.querySelector('video')
      var recordTimer
      var START
      saySubmit.addEventListener('touchstart', () => {
        if (new Date().getTime() - this.writerLastTime > 5000) {
          event.preventDefault()
          this.videoPlay = false
          video.pause()
          START = new Date().getTime()
          recordTimer = setTimeout(() => {
            this.wx.startRecord({
              success: (res) => {
                this.audioMessage = '松开 结束'
              },
              cancel: () => {
                alert('用户拒绝授权录音')
              }
            })
          }, 300)
        } else {
          this.errorDefault = true
          setTimeout(() => {
            this.errorDefault = false
          }, 1000)
        }
      })
      saySubmit.addEventListener('touchend', (event) => {
        event.preventDefault()
        if (new Date().getTime() - START < 300) {
          clearTimeout(recordTimer)
          this.audioMessage = '按住 说话'
        } else {
          this.wx.stopRecord({
            success: (res) => {
              this.audioMessage = '按住 说话'
              this.contentArray(res.localId, '2')
              this.uploadVoice(res.localId)
            },
            fail: (res) => {
              this.audioMessage = '按住 说话'
              alert(JSON.stringify(res))
            }
          })
        }
        // this.videoPlay = true
        // video.play()
        // this.clickNoScroll = false
      })
    },
    playVoice (id) {
      var video = document.querySelector('video')
      this.videoPlay = false
      video.pause()
      this.wx.playVoice({
        localId: id
      })
    },
    onVoicePlayEnd () {
      // var video = document.querySelector('video')
      this.wx.onVoicePlayEnd({
        success: (res) => {
          this.audioIcon = false
          // this.videoPlay = true
          // video.play()
          // this.clickNoScroll = false
        }
      })
    },
    uploadVoice (id) {
      this.wx.uploadVoice({
        localId: id,
        isShowProgressTips: 1,
        success: (res) => {
          this.writerLastTime = new Date().getTime()
          for (var i = 0; i < this.ulContent.length; i++) {
            if (this.ulContent[i].content === id && this.ulContent[i].type === '2') {
              this.ulContent[i].soundId = res.serverId
            }
          }
        }
      })
    },
    writeClick () {
      this.langualeWrite = true
    },
    videoNone () {
      this.dialogVideo = false
    },
    videoClick () {
      this.dialogVideo = true
      this.checkboxBoolean.status = false
    },
    onSubmit () {
      if (new Date().getTime() - this.writerLastTime > 5000) {
        if (this.textNode && this.textNode.length <= 50 && this.textNode.length > 0) {
          var contentNode = this.textNode.trim()
          this.contentArray(contentNode, '1')
          this.writerLastTime = new Date().getTime()
          // this.scrollTopLi()
        } else {
          return
        }
      } else {
        this.errorDefault = true
        setTimeout(() => {
          this.errorDefault = false
        }, 1000)
      }
    },
    contentArray (contentNode, type) {
      if (this.ulContent.length === 0) {
        this.ulContent.push({time: this.startTimeEnd, content: contentNode, type: type})
        this.addListNode = 0
      } else {
        for (var p = 0; p < this.ulContent.length; p++) {
          if (this.ulContent[p].time <= this.startTimeEnd && this.ulContent[p + 1]) {
            if (this.ulContent[p].time <= this.startTimeEnd && this.startTimeEnd <= this.ulContent[p + 1].time) {
              this.ulContent.splice(p, 0, {time: this.startTimeEnd, content: contentNode, type: type})
              this.addListNode = p
              break
            }
          } else {
            this.ulContent.push({time: this.startTimeEnd, content: contentNode, type: type})
            this.addListNode = this.ulContent.length - 1
            break
          }
        }
      }
      this.indexOne = this.ulContent.length - 1
      this.textNode = ''
      this.timeLine.push(this.startTimeEnd)
      var lineWidth = document.querySelector('.__cov-contrl-video-rail')
      var divWidth = lineWidth.getBoundingClientRect().width - 12
      var ulAll = document.querySelector('.__cov-contrl-video-ul')
      var ulListAll = document.querySelectorAll('.__cov-contrl-video-ul li')
      var li = document.createElement('li')
      const palive = Number(this.startTimeEnd) / Number(this.videoLineTotal)
      li.style.left = palive * divWidth + 'px'
      li.className = 'liPosition'
      if (ulListAll && ulListAll[this.addListNode]) {
        ulAll.insertBefore(li, ulListAll[this.addListNode].nextSibling)
      } else {
        ulAll.appendChild(li)
      }
      this.addEventArray = this.timeLine.length
    },
    saySthing () {
    },
    videoYes () {
      // for (var i = 0; i < this.ulContent.length; i++) {
      //   if (this.ulContent[i].type === '2') {
      //     // delete this.ulContent[i].content
      //   }
      // }
      let param = {
        ctl: 'comment',
        act: 'addComments',
        videoId: this.videoId,
        finish: this.checkboxBoolean.status,
        comments: JSON.stringify(this.ulContent)
      }
      utils.GET(apiUrl, param).then(data => {
      })
      this.$router.push({path: '/musicians'})
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
      var current = ((pageX - divWidthLeft) * video.duration) / divWidth
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
      // var ulAll = document.querySelector('.__cov-contrl-video-ul')
      video.oncanplaythrough = () => {
        // this.startTime = this.timeParse(video.currentTime)
        this.startTimeEnd = video.currentTime
        // this.allTime = this.timeParse(video.duration)
        // this.videoLineTotal = video.duration
      }
      video.addEventListener('timeupdate', (e) => {
        const percent = video.currentTime / video.duration
        const current = ((lineWidth.getBoundingClientRect().width - 12) * percent).toFixed(3)
        // this.startTime = this.timeParse(video.currentTime)
        this.startTimeEnd = video.currentTime
        this.video.Icon = current
        this.video.innerRail = current
        if (video.currentTime === video.duration) {
          this.videoPlay = false
        }
      })
      innerLine.addEventListener('touchmove', (event) => {
        video.currentTime = ((event.targetTouches[0].pageX - this.video.divWidthLeft) * this.videoLineTotal) / this.video.divWidth
        this.startTimeEnd = video.currentTime
      })
      video.addEventListener('x5videoexitfullscreen', () => {
        this.videoPlay = false
        video.pause()
        if (utils.isAndroid()) {
          var titleClass = document.querySelector('.__cov-contrl-content')
          titleClass.style.top = '0'
        }
      })
      video.addEventListener('x5videoenterfullscreen', () => {
        this.videoPlay = true
        if (utils.isAndroid()) {
          var titleClass = document.querySelector('.__cov-contrl-content')
          titleClass.style.top = '40px'
        }
      })
    }
  },
  mounted () {
    this.addEventListenerVideo()
    var inputSubmit = document.getElementById('inputSubmit')
    inputSubmit.addEventListener('touchstart', () => {
      var video = document.querySelector('video')
      this.videoPlay = false
      video.pause()
    })
    if (!utils.getStore('allowRecord') || utils.getStore('allowRecord') !== 'true') {
      this.wx.startRecord({
        success: () => {
          utils.setStore('allowRecord', 'true')
          this.wx.stopRecord()
        }
      })
    }
    if (utils.isIOS()) {
      var videoContent = document.querySelector('.videoContent')
      videoContent.style.padding = '48px 0'
    }
  },
  created () {
    utils.setDocTitle('作业详情')
    this.videoId = this.$route.query.id
    this.wx = window.wx
    this.videoLineTotal = Number(utils.getStore('videoTime'))
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
      z-index:50;
      height:48px;
      left: 0;
      top: 0;
      background-color: rgba(0, 0, 0, 0.05);
      width: 100%;
      padding-left:px2Rem(50px);
      padding-right:px2Rem(84px);
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
      .button{
        font-family: PingFangSC-Light;
        font-size: 10px;
        color: #FFFFFF;
        // position:absolute;
      }
      .buttonCl{
        position:absolute;
        width:px2Rem(64px);
        right:px2Rem(15px);
        top:50%;
        margin-top:px2Rem(-14px);
        height:px2Rem(28px);
        background: #3B99FC;
        border-radius: 4px;
        font-family: PingFangSC-Medium;
        font-size: 12px;
        color: #FFFFFF;
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
      overflow: hidden;
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
    // height:px2Rem(180px);
     width:100%;
     z-index:1000;
     padding: px2Rem(10px) px2Rem(15px);
     overflow: scroll;
    }
   .student-message{
      height:100%;
      overflow:auto;
      img{
        width: px2Rem(30px);
        height: auto;
        position: relative;
        left: px2Rem(-75px);
      }
     li{
      font-family: PingFangSC-Medium;
       font-size: 13px;
        position:relative;
       color: #333;
       margin-bottom:px2Rem(4px);
       line-height:16px;
       padding-right:18px;
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
        width:px2Rem(85px);
        background: #FFFFFF;
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
         border-color:transparent #fff transparent transparent;
         position:absolute;
         top:50%;
         margin-top:-5px;
         left:-8px;
        }
       }
       .span{
        color: #333;
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
    // padding: 48px 0;
    background:#000;
    video{
      width:100%;
      height:100%;
      // position: absolute;
      // top: 50%;
      // background: red;
      // padding: px2Rem(48px) 0;
    }
   }
   #output{
    // position:fixed;
    // width:100%;
    // height:100%;
    // z-index:10;
    // padding-bottom:px2Rem(48px);
    .bgOutput{
      position:absolute;
     bottom:px2Rem(48px);
     z-index:100;
     width:100%;
     left:0;
     z-index:9999;
     box-sizing: border-box;
     -webkit-box-sizing: border-box;
     -moz-box-sizing: border-box;
     -ms-box-sizing: border-box;
    }
   }
   .send-message{
     position:absolute;
     bottom:1px;
     left:0;
     width:100%;
     z-index:50;
     height:48px;
     z-index:9999;
     background:#fff;
     .write{
      width:100%;
      padding: 0 px2Rem(15px);
      height: 100%;
      img{
       width:px2Rem(28px);
       height:px2Rem(28px);
      }
      button{
        background: #3B99FC;
       border-radius: 4px;
       width:px2Rem(60px);
       height:px2Rem(35px);
       font-family: PingFangSC-Regular;
       font-size: px2Rem(14px);
       color: #FFFFFF;
      }
      input{
        padding-left:10px;
        background: #F6F6F6;
        border: 1px solid #ECECEC;
        border-radius: 4px;
        height:35px;
        line-height: 35px;
        width:px2Rem(232px);
        font-size:px2Rem(14px);
        color:#999;
      }
     }
   }
   .dialog-video{
     position:fixed;
     z-index:1000;
     border-radius: 8px;
     width:px2Rem(284px);
     left: 50%;
     font-size:px2Rem(14px);
     top:px2Rem(250px);
     background:#f5f5f5;
     transform:translate(-50%, -50%);
     -webkit-transform:translate(-50%, -50%);
     -moz-transform:translate(-50%, -50%);
     -ms-transform:translate(-50%, -50%);
     -o-transform:translate(-50%, -50%);
     .tishixinxi{
      text-align:center;
        p {
          padding:px2Rem(15px) 0;
          
          color:#fff;
          font-size:px2Rem(14px);
          background: #fff;
          color:#666;
          border-radius: 8px 8px 0 0;
        }
        div{
          color:#333;
          font-size:14px;
          padding:px2Rem(30px) 0;
        }
     }
    .content{

      p {
        padding:px2Rem(15px) 0;
        text-align:center;
        color:#333;
        font-size:px2Rem(14px);
        background: #fff;
        border-radius: 8px 8px 0 0;
      }
      div{
       text-align: center;
       padding:px2Rem(30px) 0;
       label{
        color:#333;
        input{
          position:relative;
          top:-2px;
          position: relative;
          width: 16px;
          height: 16px;
          background-clip: border-box;
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          margin: -.15px .6px 0 0;
          vertical-align: text-bottom;
          border-radius: 3px;
          -webkit-transition: background-color .25s;
          transition: background-color .25s;
          background-color: #fff;
          border: 1px solid #d7d7d7;
        }
       }
      }
    }
    .buttondiv{
      width:100%;
      border-radius:0 0 8px 8px;
      height:px2Rem(50px);
      background:#fff;
      border-top:1px solid #ededed;
      button{
        height:100%;
        font-size: px2Rem(14px);
        color: #4A90E2;
        width:50%;
      }
      button:nth-child(1){
        border-right:1px solid #ededed;
      }
    }
   }
   .mgc:checked:after {
    border-color: #414141;
}
.langualeAll{
  height:px2Rem(35px);
  text-align:center;
  font-size:14px;
  color:#999;
  // line-height:px2Rem(35px);
  @include borderRadiusNumber(8px);
  border: 1px solid #dedede;
  width:px2Rem(232px);
}
.mgc:checked:after {
    content: '';
    display: block;
    height: 4px;
    width: 7px;
    border: 0 solid #333;
    border-width: 0 0 2px 2px;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
    position: absolute;
    top: 3px;
    left: 3px;
}
   .liNoneColor{
    div{
      color: #FFFFFF !important;
    }
     color: #FFFFFF !important;
     .span{
      color: #FFE031 !important;
     }
   }

   .closeInline {
    /* still bad on picking color */
    // color: #000 !important;
    /* make a round button */
    border-radius: 12px;
    /* center text */
    line-height: 13px;
    text-align: center;
    height: 13px;
    width: 13px;
    font-size: 13px;
    // padding: 1px;
}
/* use cross as closeInline button */
.closeInline::before {
    content: "\2716";
}
/* place the button on top-right */
.closeInline {
    top: 50%;
    margin-top:-6.6px;
    right: 0px;
    position: absolute;
}
#saySubmit{
  user-select:none;
}
</style>
