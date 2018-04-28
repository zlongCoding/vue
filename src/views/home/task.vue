<template>
	<div id="task">
    <!-- changeTitle -->
    <ul class="space-center titleheader borderPX">
      <li class="space-center" :class="{'changeTitle': titleIndex == value.id}"
          v-for="(value, key) in titleArray" @click="changeContene(value.id, value.name)"
            >{{value.name}}</li>
    </ul>
    <ul class="content-angel marginNavigation">
      <li  v-for="(value, key) in contentAngel">
        <div class="one space-between">
          <div>
            <p>{{value.className}}</p>
            <p>作业进度：{{value.courseName}}</p>
          <!-- <p>作业进度：暂无作业</p> -->
          </div>
          <div>
          <!-- class="buttonOne" -->
          <button @click="goWorks(value.classId, value.courseName, value.courseId, value.packageId)">查看作业</button><button @click="homeWorks(value.classId)">布置作业</button>
          </div>
        </div>
        <div class="two">{{value.schoolName}}</div>
      </li>
    </ul>
    <div class="dialogAngel transformTranslate" v-if="dialogAngel">
       <button class="dialogTitle">{{titleMessage}}作业安排</button>
       <!-- dialogNoClick -->
       <ul class="flex-wrap" :class="{'ulHeighr' : angelHomework.length > 15}">
         <li class="space-center" v-for="(value, key) in angelHomework" @click="angelOneHomeWork(value)" :class="[{'dialogClick': value.id === angelOneHomeWorkIndex}, {'dialogNoClick':  value.status == '1'}]">{{value.name}}</li>
       </ul> 
       <div class="button space-between">
         <button @click="homeWorkNo">取消</button>
         <button @click="homeWorkYes">确定</button>
       </div>
    </div>
    <div class="dialog-bg" v-if="dialogAngel"></div>
    <div v-if="errorDefault" class="errprMessageDialog transformTranslateAll">{{errorMessage}}</div>
		<navigation></navigation>
	</div>
</template>
<script>
import utils from '../../utils.js'
import { apiUrl } from '../../production.js'
import weiXinConfig from '../../weixin.js'
export default {
  name: 'home',
  data () {
    return {
      data: '',
      titleIndex: null,
      titleContent: ['音乐小天使', '小小音乐家'],
      contentAngel: [],
      contentMusicians: [],
      dialogAngel: false,
      // arr
      angelOneHomeWorkIndex: null,
      angelOneHomeWorkName: null,
      titleArray: [],
      angelHomework: [],
      classId: '',
      errorDefault: false,
      errorMessage: '',
      titleMessage: ''
    }
  },
  computed: {
  },
  methods: {
    changeContene (index, name) {
      if (this.titleIndex === index) return
      if (index) {
        this.titleIndex = index
        this.titleMessage = name
      }
      let param = {
        ctl: 'main',
        act: 'getClassList',
        packageId: this.titleIndex
      }
      utils.GET(apiUrl, param).then(data => {
        this.contentAngel = data.data
      })
    },
    homeWorks (value) {
      this.classId = value
      let param = {
        ctl: 'main',
        act: 'getPacakgeList',
        classId: this.classId
      }
      utils.GET(apiUrl, param).then(data => {
        this.angelHomework = data.data
        this.dialogAngel = true
      })
    },
    homeWorkNo () {
      this.dialogAngel = false
      this.angelOneHomeWorkIndex = null
    },
    homeWorkYes () {
      if (this.angelOneHomeWorkIndex || this.angelOneHomeWorkIndex === '0') {
        let param = {
          ctl: 'main',
          act: 'pushWork',
          classId: this.classId,
          courseId: this.angelOneHomeWorkIndex
        }
        utils.GET(apiUrl, param).then(data => {
          if (data.status === 1015) {
            this.errorMessage = '未按顺序布置作业'
            this.errorDefault = true
            setTimeout(() => {
              this.errorDefault = false
            }, 1000)
          } else if (data.status === -1) {
          } else if (data.status === 0) {
            this.dialogAngel = false
            this.angelOneHomeWorkIndex = null
            this.errorMessage = `${this.angelOneHomeWorkName}作业已布置`
            this.errorDefault = true
            setTimeout(() => {
              this.errorDefault = false
            }, 1000)
          }
        })
      }
    },
    angelOneHomeWork (value) {
      if (value.status === '1') return
      this.angelOneHomeWorkIndex = value.id
      this.angelOneHomeWorkName = value.name
    },
    goWorks (id, name, courseId, packageId) {
      var data = {
        classId: id,
        name: name,
        courseId: courseId,
        packageId: packageId
      }
      utils.setStore('classGo', data)
      this.$router.push({path: '/musicians'})
    }
  },
  mounted () {
    if (!this.$store.state.Home.wxConfig.appId) {
      var urlWin
      if (window.location.href.indexOf('code') >= 0) {
        urlWin = location.href.split('#')[0]
      } else {
        urlWin = location.href.split('#')[0]
      }
      let param = {
        ctl: 'teacher',
        act: 'getSignPackage',
        url: urlWin
      }
      utils.GET(apiUrl, param).then(data => {
        this.$store.dispatch('HOME_WXCONFIG', data.data)
        weiXinConfig.Config(data.data)
      })
    }
  },
  created () {
    utils.setDocTitle('知音宝贝-教师版')
    let param = {
      ctl: 'main',
      act: 'getPackages'
    }
    utils.GET(apiUrl, param).then(data => {
      this.titleArray = data.data
      this.titleIndex = data.data[0].id
      this.titleMessage = data.data[0].name
      console.log(this.titleIndex)
      this.changeContene()
    })
  },
  destroyed () {}
}
</script>
<style scoped lang="scss">
@import "../../assets/style/px2rem.scss";

.titleheader{
  height:px2Rem(48px);
  background:#fff;
  li{
    height:100%;
    font-family: PingFangSC-Regular;
    font-size: px2Rem(18px);
    color: #999999;
    width: 50%;
  }
  // line-height
}
.content-angel{
  li{
    height:px2Rem(90px);
    padding: 0 px2Rem(17px);
    padding-top:px2Rem(15px);
    background:#fff;
    margin-bottom: px2Rem(10px);
    .two{
      font-size:12px;
      color:#b3b3b3;
      width:100%;
      text-align:left;
      margin-top:px2Rem(11px);
    }
    .one{
    div:nth-child(1){
      p:nth-child(1){
        font-family: PingFangSC-Regular;
        font-size: px2Rem(15px);
        color: #333333;
      }
      p:nth-child(2){
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #666666;
        margin-top: px2Rem(14px);
      }
    }
    div:nth-child(2){
     button{
       height:px2Rem(32px);
       width:px2Rem(72px);
       font-family: PingFangSC-Regular;
       font-size: 12px;
       color: #FFFFFF;
     }
     button:nth-child(1){
        background: #F39724;
        border-radius: 2px;
        margin-right: px2Rem(14px);
     }
     button:nth-child(2){
        background: #27A88F;
        border-radius: 2px;
     }
    }
    }
  }
}
.changeTitle{
  color: #1E82D2 !important;
  position:relative;
  &:after{
    position: absolute;
    bottom:0;
    content:'';
    height:px2Rem(4px);
    width:px2Rem(120px);
    left:50%;
    z-index:10;
    margin-left:px2Rem(-60px);
    background: #1E82D2;
    border-radius: 100px;
  }
}
.buttonOne{
  background: #CACACA !important;
  color: #999999 !important;
}
@media screen and (max-width: 320px) {
  .content-angel{
    li{
      padding:0 6px;
      padding-top: 0.4rem;
      div:nth-child(2){
        button:nth-child(1){
          margin-right:6px;
        }
      }
    }
  }
}
.dialogAngel{
  position:fixed;
  z-index:1000;
  width:px2Rem(306px);
  left:50%;
  top:px2Rem(48px);
  border-radius:4px;
  .dialogTitle{
    height:px2Rem(46px);
    width:100%;
    font-family: PingFangSC-Regular;
    font-size: px2Rem(15px);
    color: #333333;
    background: #FFFFFF;
    border-radius: 4px 4px 0 0;
  }
  ul{
    // 
    background: #F2F2F2;
    width:100%;
    padding:px2Rem(12px);
    padding-bottom: 0;
    overflow:auto;
    li{
      background: #FFFFFF;
      width:px2Rem(86px);
      height:px2Rem(42px);
      margin-bottom:px2Rem(12px);
     @include borderRadiusNumber(5px);
     font-family: PingFangSC-Regular;
     font-size: px2Rem(14px);
     color: #666666;
    }
  }
  .button{
    width:100%;
    border-top: 1px solid #DEDEDE;
    background: #FFFFFF;
    height:px2Rem(46px);
    border-radius:0 0 4px 4px;
    button{
      width:50%;
      font-size: 17px;
      color: #0076FF;
      height:100%;
    }
    button:nth-child(1){
      font-family: PingFangSC-Regular;
      border-right: 1px solid #DEDEDE;
    }
    button:nth-child(2){
      font-family: PingFangSC-Medium;
    }
  }
}
.dialogClick{
  color: #2083D2 !important;
  border: 1px solid #2083D2 !important;
}
.dialogNoClick{
  background: #ccc !important;
  color: #fff !important;
}
.ulHeighr{
  height:px2Rem(282px);
}
</style>
