<template>
  <div>
  <div class="graduationVue" v-if="classEnd && endClass">
    <div class="content">
      <div>恭喜您！</div>
      <div>已经完成全部课程</div>
    </div>
    <div class="ImgContent">
      <div class="one fontLeave">
        <img src="../../assets/images/personalcenter/1@2x.png" />
        <div>
          <p>第一次上课</p>
          <p>{{first}}</p>
        </div>
      </div>
      <div class="two fontLeave1">
        <img src="../../assets/images/personalcenter/Path7@2x.png" />
      </div>
      <div class="three fontLeave2">
        <img src="../../assets/images/personalcenter/2@2x.png" />
        <div>
          <p>最后一次上课</p>
          <p>{{last}}</p>
        </div>
      </div>
      <div class="four fontLeave3">
        <img src="../../assets/images/personalcenter/Path8@2x.png" />
      </div>
      <div class="five fontLeave4">
        <img src="../../assets/images/personalcenter/3@2x.png" />
        <div>
          <p>{{num}}天完成课程</p>
          <p>非常棒的成绩哦！</p>
        </div>
      </div>
    </div>
    <div id="graduation" v-if="buttonEnd">
      <button @click="jieye">结业申请</button>
      <p class="p">请点击“结业申请”，教务处将会给您颁发结业申请</p>
    </div>
    <div id="graduation" v-if="!buttonEnd" class="nowNo">
       您已结业
    </div>
    <div class="courses-detail" v-if="dialog">
       <button class="button">结业详情</button>
         <div class="contentButton">{{classContent}}</div>
        <div class=" space-around">
          <button @click="chooseEndYes">确定</button>
        </div>
    </div>
    <div class="dialog-bg" v-if="dialog"></div>
</div>
<div class="noClassContent" v-if="!classEnd && endClass">
  <img src="../../assets/images/else/nodata.png">
  <p>等您的课程全部上完，可以前来申请结业哦！</p>
</div>
</div>
</template>

<script>
import { apiUrl } from '../../production.js'
import utils from '../../utils.js'
export default {
  name: 'home',
  data () {
    return {
      dd: 'daa',
      first: null,
      last: null,
      num: null,
      dialog: false,
      classEnd: true,
      endClass: false,
      buttonEnd: true,
      classContent: '教务端收到结业申请后，会通知老师填写毕业为您颁发哦！'
    }
  },
  computed: {
    data () {}
  },
  methods: {
    routerList (id) {
      this.$router.push({path: 'list', query: {id: id}})
    },
    jieye () {
      let param = {
        ctl: 'main',
        act: 'applyGraduation'
      }
      utils.GET(apiUrl, param).then(data => {
        this.dialog = true
        this.buttonEnd = false
      })
    },
    chooseEndYes () {
      this.$router.push({path: '/personalcenter'})
    }
  },
  beforeMount () {},
  created () {
    utils.setDocTitle('结业申请')
    let params = {
      ctl: 'main',
      act: 'getMyprogress'
    }
    utils.GET(apiUrl, params).then(data => {
      this.first = data.data.first
      this.last = data.data.last
      this.num = data.data.num
      console.log(this.last === '0')
      if (this.last === '0' || this.first === '0') {
        this.classEnd = false
      } else {
        this.classEnd = true
      }
    })
    let param = {
      ctl: 'main',
      act: 'applyGraduation'
    }
    utils.GET(apiUrl, param).then(data => {
      if (data.status === 1023) {
        this.buttonEnd = false
      } else if (data.status === 1022) {
        this.classEnd = false
      }
      setTimeout(() => {
        this.endClass = true
      }, 200)
    })
  },
  destroyed () {}
}
</script>

<style scoped lang="scss">
@import "../../assets/style/px2rem.scss";

#graduation{
  margin: 0 auto;
  width:100%;
  text-align:center;
  position: absolute;
  bottom:px2Rem(112px);
  button{
  height:px2Rem(52px);
  width:px2Rem(242px);
  background: #f5a024;
  border-radius:100px;
  font-size: px2Rem(18px);
  color:#fff;
  font-family: PingFangSC-Regular;
}
}

.p{
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #AAAAAA;
  font-size:12px;
  margin-top: px2Rem(15px);
}
.content{
  font-family: PingFangSC-Medium;
  font-size: px2Rem(20px);
  color: #F5A024;
  text-align:center;
  position:absolute;
  top:px2Rem(12px);
  width:100%;
  z-index: 100;
}
.graduationVue{
  // background:
}
.ImgContent{
  width:100%;
  height:px2Rem(264px);
  background:url('../../assets/images/personalcenter/bg@2x.png') no-repeat;
  background-size:100%;
  position:relative;
  div{
     position:absolute;
  }
  .one{
    opacity: 0;
    top:px2Rem(116px);
    left:px2Rem(137px);
    img {
      width:px2Rem(19px);
    }
    div{
      width:98px;
      background:url('../../assets/images/personalcenter/talk@2x.png') no-repeat;
      background-size:100%;
      height:42px;
      bottom:-44px;
      left:-30px;
      text-align:center;
      padding-top:10px;
      p:last-child{
        margin-top:2px;
      }
      p{
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #FFFFFF;
      }
    }
  }
  .two{
    opacity: 0;
     top:px2Rem(147px);
     left:px2Rem(140px);
    img{
      width:px2Rem(128px);
    }
  }
  .three{
   opacity: 0;
    top:px2Rem(123px);
    left:px2Rem(251px);
    img {
      width:px2Rem(40px);
    } 
    div{
      width:98px;
      background:url('../../assets/images/personalcenter/talk@2x.png') no-repeat;
      background-size:100%;
      height:42px;
      bottom:-38px;
      left:px2Rem(-20px);
      text-align:center;
      padding-top:10px;
      p:last-child{
        margin-top:2px;
      }
      p{
         font-family: PingFangSC-Regular;
         font-size: 12px;
         color: #FFFFFF;
      } 
    }
  }
  .four{
    opacity: 0;
    top:px2Rem(172px);
    left:px2Rem(60px);
    img{
      width:px2Rem(204px);
    }
  }
  .five{
    opacity: 0;
    top:px2Rem(150px);
    left:px2Rem(30px);
    img{
      width:px2Rem(68px);
    }
    div{
      width:98px;
      background:url('../../assets/images/personalcenter/talk@2x.png') no-repeat;
      background-size:100%;
      height:42px;
      bottom:-63px;
      text-align:left;
      padding-top:10px;
      padding-left:1px;
      // line-height: 40px;
     p{
       font-family: PingFangSC-Regular;
       font-size: 12px;
       line-height:14px;
      color: #F5A024;
     }
    }
  }
}
.fontLeave{
  animation:fontSize 1s linear forwards;
}
@keyframes fontSize
 {
  from {
    opacity: 0;
  }
  to {
    opacity:1
  }
 }
.fontLeave1{
  animation:fontSizeo 1s linear forwards;
 animation-delay: 0s;
}
@keyframes fontSizeo
 {
  from {
    opacity: 0;
  }
  to {
    opacity:1
  }
 }
 .fontLeave1{
  animation:fontSizeo 1s linear forwards;
 animation-delay: 2s;
}
@keyframes fontSizeo
 {
  from {
    opacity: 0;
  }
  to {
    opacity:1
  }
 }
 .fontLeave2{
  animation:fontSizeT 1s linear forwards;
 animation-delay: 3s;
}
@keyframes fontSizeT
 {
  from {
    opacity: 0;
  }
  to {
    opacity:1
  }
 }
 .fontLeave3{
  animation:fontSizeott 1s linear forwards;
 animation-delay:4s;
}
@keyframes fontSizeott
 {
  from {
    opacity: 0;
  }
  to {
    opacity:1
  }
 }
  .fontLeave4{
  animation:fontSizeottf 1s linear forwards;
 animation-delay: 5s;
}
@keyframes fontSizeottf
 {
  from {
    opacity: 0;
  }
  to {
    opacity:1
  }
 }
.appointment-sure{
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
}

.courses-detail{
  position:fixed;
  z-index:1000;
  border-radius: 8px;
  background: #F2F2F2;
  width:px2Rem(284px);
  left: 50%;
  top:px2Rem(130px);
  margin-left:px2Rem(-142px);
  // transform:translateY(-50%);
  .button{
    width:100%;
    height:px2Rem(44px);
    background: #3D5860;
    border-radius: 8px 8px 0 0;
    color:#fff;
  }
}
.space-around{
   button{
    font-family: PingFangSC-Medium;
     font-size: px2Rem(17px);
    color: #0076FF;
    width:100%;
    height:px2Rem(50px);
    border-top: 1px solid #DEDEDE;
   }
}
.contentButton{
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #666666;
  line-height:18px;
  padding:px2Rem(18px) px2Rem(18px);
}

.noClassContent{
  text-align:center;
  width:100%;
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
    line-height:px2Rem(18px);
    padding:0 px2Rem(60px);
    margin-bottom:px2Rem(44px);
  }
}
.nowNo{
  color: #333;
  font-size: .4rem;
}
</style>
