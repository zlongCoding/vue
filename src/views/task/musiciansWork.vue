<template>
  <div class="musiciansWork">
    <choose-work @addressId="selectId"></choose-work>
    <div class="total-work"><span>总人数：{{listContent.total}}</span><span>未完成：{{listContent.noOver}}</span></div>
   <ul class="work-List">
    <li v-for="(value, key) in listContent.list">
      <div class="work-one space-between">
        <div class="work-title">
          <img :src="value.stuPic"/><span>{{value.stuName}}</span>
        </div>
        <div class="work-go">
          <img src="../../assets/images/video@2x.png" @click="vedioDialogBlock(value.stuId, value.courseId)" v-if="value.courseType == '2'" class="imgOne"/><img src="../../assets/images/present@2x.png" @click="giftContent(value)" class="imgTwo"/>
          <i v-if="value.newVideo != '0'"></i>
          <div>进度：
             <span  :class=" Number(value.progress.point1)  > 0 ? 'star' : 'starNo'"></span>
            <span  :class=" Number(value.progress.point2)  > 0 ? 'star' : 'starNo'"></span>
            <span  :class=" Number(value.progress.point3)  > 0 ? 'star' : 'starNo'"></span>
          </div>
        </div>
      </div>
      <div class="work-two space-around" v-if="work_message === key">
        <div>
           <span v-if="value.packageTypeId == '1'">课程曲目</span>
          <span v-else>伴奏</span>
          <span :class=" Number(value.progress.point1)  > 0 ? 'work-down' : 'work-no'">{{ Number(value.progress.point1)  > 0 ? '已完成' : '未完成'}}</span>
        </div>
        <div>
          <span v-if="value.packageTypeId == '1'">音乐欣赏</span>
          <span v-else>乐理</span>
          <span :class=" Number(value.progress.point2)  > 0 ? 'work-down' : 'work-no'">{{ Number(value.progress.point2)  > 0 ? '已完成' : '未完成'}}</span>
        </div>
        <div>
          <span v-if="value.packageTypeId == '1'">音乐乐园</span>
          <span v-else>回课</span>
        <span :class=" Number(value.progress.point3)  > 0 ? 'work-down' : 'work-no'">{{ Number(value.progress.point3)  > 0 ? '已完成' : '未完成'}}</span>
        </div>
      </div>
      <div class="work-three" @click="messageContent(key)">查看详情<i :class="{'upDown' : work_message === key}"></i></div>
    </li>
  </ul>
  <div class="reviewClass transformTranslate positionFixed" v-show="vedioDialog">
    <button class="header">回课</button>
    <ul v-if="vedioList.length > 0" :class="{'oneListHeight': vedioList.length == 1}">
      <li v-for="(value, key) in vedioList">
        <div class="space-between">
          <span>{{value.createTime | yearStyle}}</span>
          <!-- class="end-work" -->
          <span v-if="value.status == '0'">待批改</span> 
           <span class="end-work" v-else>已批改</span>
        </div>
        <div @click="goWorkDown(value.id,value.status, value.url, value.time)">
            <p></p>
            <img src="../../assets/images/play_m@2x.png" class="transformTranslateAll"/>
        </div>
      </li>
    </ul>
    <div class="videoListNo" v-else>
      <img src="../../assets/images/none@2x.png" />
      <div>暂无回课</div>
    </div>
    <div class="bgNone"></div>
    <i class="transformTranslate" @click="vedioDialogClick"></i>
  </div>
  <div class="dialog-bg positionFixed" v-show="vedioDialog"></div>
  <!-- <dialogbg :dialog="vedioDialog"></dialogbg> -->
   <giving-gift :studentlist="dialogContent"></giving-gift>
   <div class="positionFixed"></div>
  </div>
</template>
<script>
import chooseWork from './chooseWork.vue'
import utils from '../../utils.js'
import givingGift from './givingGift.vue'
import { apiUrl } from '../../production.js'
export default {
  name: 'home',
  data () {
    return {
      data: '',
      dialog: false,
      work_message: null,
      listContent: [],
      vedioList: [],
      vedioDialog: false,
      courseId: '',
      classId: '',
      packageId: '',
      vedioDefault: false,
      dialogContent: {type: false}
    }
  },
  components: {
    chooseWork,
    givingGift
  },
  methods: {
    selectId (id) {
      this.courseId = id
      this.sendList()
    },
    sendList () {
      let param = {
        ctl: 'main',
        act: 'checkWork',
        classId: this.classId,
        courseId: this.courseId,
        packageId: this.packageId
      }
      utils.GET(apiUrl, param).then(data => {
        this.listContent = data.data
        setTimeout(() => {
          this.$nextTick(() => {
            window.scrollTo(0, 1)
            window.scrollTo(0, 0)
          })
        }, 0)
      })
    },
    giftContent (value) {
      var data = {
        accountCode: value.accountCode,
        studentId: value.stuId,
        name: value.stuName
      }
      this.$store.dispatch('GiftMessage', true)
      this.$store.dispatch('GiftMessageData', data)
    },
    vedioDialogClick () {
      this.vedioDialog = false
    },
    vedioDialogBlock (stuId, courseId) {
      let param = {
        ctl: 'video',
        act: 'getVideoList',
        stuId: stuId,
        courseId: courseId
      }
      utils.GET(apiUrl, param).then(data => {
        this.vedioList = data.data
        this.vedioDialog = true
        var className = document.getElementsByClassName('positionFixed')
        if (document.documentElement.clientHeight >= document.body.offsetHeight) {
          for (var i = 0; i < className.length; i++) {
            className[i].style.position = 'absolute'
          }
        } else {
          for (var j = 0; j < className.length; j++) {
            className[j].style.position = 'fixed'
          }
        }
      })
    },
    goWorkDown (id, status, url, time) {
      utils.setStore('videoUrl', url)
      utils.setStore('videoTime', time)
      if (status === '0') {
        this.$router.push({path: '/looking', query: {id: id}})
      } else {
        this.$router.push({path: '/correcting', query: {id: id}})
      }
    },
    messageContent (index) {
      if (this.work_message === index) {
        this.work_message = null
      } else {
        this.work_message = index
      }
    }
  },
  created () {
    this.classId = JSON.parse(utils.getStore('classGo')).classId
    this.packageId = JSON.parse(utils.getStore('classGo')).packageId
    utils.setDocTitle('作业详情')
  },
  mounted () {
  }
}
</script>
<style scoped lang="scss">
@import "../../assets/style/px2rem.scss";


.musiciansWork{
  height:100%;
  overflow:auto;
  -webkit-overflow-scrolling: touch;
}
.total-work{
  span{
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: #666666;
  }
  margin-top:px2Rem(12px);
  padding-left: px2Rem(15px);
  margin-bottom:2px;
  span:nth-child(1){
    display:inline-block;
    margin-right:px2Rem(18px);
  }
}
.work-List{
  li {
    background:#fff;
    margin-bottom:px2Rem(10px);
    .work-three{
      height:px2Rem(26px);
      line-height:px2Rem(26px);
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: #999999;
      text-align:center;
     i{
      display:inline-block;
      width:14px;
      height:8px;
      background:url('../../assets/images/down_arrow@2x.png') no-repeat;
      background-size: 100% 100%;
      margin-left: 4px;
     }
     .upDown{
        background:url('../../assets/images/up_arrow@2x.png') no-repeat;
        background-size: 100% 100%;
     }
    }
    .work-two{
      border-top: 1px solid #EDEDED;
      height:px2Rem(71px);
      padding: px2Rem(16px) 0;
      span {
        display:block;
        font-family: PingFangSC-Regular;
        font-size: px2Rem(14px);
        color: #333333;
        text-align:center;
      }
      .work-down{
        color: #27A88F;
      }
      .work-no{
        color: #D05D5D;
      }
      div{
      span:nth-child(1){
        margin-bottom:px2Rem(12px);
       }
      }
    }
    .work-one{
      height:px2Rem(78px);
      padding: 0 px2Rem(15px);
      .work-title{
        img{
          width:px2Rem(44px);
          height:px2Rem(44px);
          margin-right:px2Rem(8px);
          @include borderRadiusNumber(50%);
        }
        span{
          font-family: PingFangSC-Regular;
          font-size: px2Rem(16px);
          color: #333333;
        }
      }
      .work-go{
        text-align: right;
        position:relative;
        i{
          position:absolute;
          display:block;
          height:10px;
          width:10px;
          background:#d0021b;
          top:-4px;
          right:42px;
          @include borderRadiusNumber(50%);
        }
        div{
          font-family: PingFangSC-Regular;
          font-size: px2Rem(14px);
          color: #999999;
        }
        .imgOne{
          width:px2Rem(27px);
          height:px2Rem(22px);
          margin-bottom:px2Rem(15px);
          margin-right:20px;
        }
        .imgTwo{
          width:px2Rem(26px);
          height:px2Rem(24px);
          margin-bottom:px2Rem(15px);
        }
      }
    }
  }
}
.reviewClass{
  position:fixed;
  z-index:1000;
  width: px2Rem(300px);
  top:px2Rem(70px);
  left:50%;
  @include borderRadiusNumber(4px);
  .header{
    background: #FFFFFF;
    border-radius: 4px 4px 0 0;
    height:px2Rem(42px);
    width:100%;
    background:#fff;
    font-family: PingFangSC-Medium;
    font-size: px2Rem(15px);
    color: #333333;
  }
  .bgNone{
    position:absolute;
    width:100%;
    height:px2Rem(10px);
    background:#F0F0F0;
    left:0;
    bottom:0;
    border-radius: 0 0 4px 4px;
  }
  ul{
    width:100%;
    background: #F0F0F0;
    border-radius: 0 0 4px 4px;
    padding:px2Rem(18px) px2Rem(10px) 0 px2Rem(10px);
    height:px2Rem(292px);
    overflow: auto;
  }
  li{
    div:nth-child(1){
      margin-bottom:px2Rem(8px);
      span:nth-child(1){
        font-family: PingFangSC-Regular;
        font-size: px2Rem(14px);
        color: #666666;
      }
      span:nth-child(2){
        font-family: PingFangSC-Regular;
        font-size: px2Rem(14px);
        color: #D0021B;
      }
    }
    div:nth-child(2){
      position:relative;
      margin-bottom: px2Rem(30px);
     p{
       width:100%;
       height:px2Rem(134px);
       background:#000;
     }
     img{
       position:absolute;
       width:px2Rem(40px);
       height:px2Rem(40px);
       left:50%;
       top:50%;
     }
    }
  }
  i{
    position:absolute;
    bottom:px2Rem(-106px);
    left:50%;
    display: block;
    height:28px;
    width:28px;
    background:url('../../assets/images/close@2x.png') no-repeat;
    background-size: 100%;
  }
}
.videoListNo{
  height:px2Rem(292px);
  width:100%;
  text-align:center;
  background:#F0F0F0;
  border-radius: 0 0 4px 4px;
  img{
    height:px2Rem(94px);
    width:auto;
    margin-top:px2Rem(63px);
    margin-bottom:px2Rem(50px);
  }
  div{
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #999999;
  }
}
.end-work{
  color: #27A88F !important;
}
.oneListHeight{
  height:px2Rem(210px) !important;
}
</style>
