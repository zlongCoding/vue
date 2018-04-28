<template>
  <div>
    <choose-work @addressId="selectId"></choose-work>
    <div class="total-work"><span>总人数：{{listContent.total}}</span><span>未完成：{{listContent.noOver}}</span></div>
   <ul class="work-List">
    <li v-for="(value, key) in listContent.list">
      <div class="work-one space-between">
        <div class="work-title">
          <img :src="value.stuPic"/><span>{{value.stuName}}</span>
        </div>
        <div class="work-go">
          <img src="../../assets/images/present@2x.png" @click="giftContent(value)"/>
          <div>进度：
            <span  :class=" Number(value.progress.point1)  > 0 ? 'star' : 'starNo'"></span>
            <span  :class=" Number(value.progress.point2)  > 0 ? 'star' : 'starNo'"></span>
            <span  :class=" Number(value.progress.point3)  > 0 ? 'star' : 'starNo'"></span>
          </div>
        </div>
      </div>
      <div class="work-two space-around" v-if="work_message === key">
        <div>
          <span>课程曲目</span>
          <span :class=" Number(value.progress.point1)  > 0 ? 'work-down' : 'work-no'">{{ Number(value.progress.point1)  > 0 ? '已完成' : '未完成'}}</span>
        </div>
        <div>
          <span>音乐欣赏</span>
          <span :class=" Number(value.progress.point2)  > 0 ? 'work-down' : 'work-no'">{{ Number(value.progress.point2)  > 0 ? '已完成' : '未完成'}}</span>
        </div>
        <div>
          <span>音乐乐园</span>
          <span :class=" Number(value.progress.point3)  > 0 ? 'work-down' : 'work-no'">{{ Number(value.progress.point3)  > 0 ? '已完成' : '未完成'}}</span>
        </div>
      </div>
      <div class="work-three" @click="messageContent(key)">查看详情<i :class="{'upDown' : work_message === key}"></i></div>
    </li>
  </ul>
  <giving-gift :studentlist="dialogContent"></giving-gift>
  </div>
</template>
<script>
import chooseWork from './chooseWork.vue'
import givingGift from './givingGift.vue'
import utils from '../../utils.js'
import { apiUrl } from '../../production.js'
export default {
  name: 'home',
  data () {
    return {
      data: '',
      dialog: false,
      work_message: null,
      listContent: [1, 2, 3, 4],
      courseId: '',
      packageId: '',
      classId: '',
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
      })
    },
    giftContent (value) {
      var data = {
        accountCode: value.accountCode,
        studentId: value.stuId
      }
      this.$store.dispatch('GiftMessage', true)
      this.$store.dispatch('GiftMessageData', data)
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
  }
}
</script>
<style scoped lang="scss">
@import "../../assets/style/px2rem.scss";

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
        div{
          font-family: PingFangSC-Regular;
          font-size: px2Rem(14px);
          color: #999999;
        }
        img{
          width:px2Rem(26px);
          height:px2Rem(24px);
          margin-bottom:px2Rem(15px);
        }
      }
    }
  }
}
</style>
