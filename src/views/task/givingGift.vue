<template>
	<div>
    <div class="dialog-gift transformTranslate positionFixed" v-show="GiftMessage">
      <button class="header">奖励-{{GiftMessageData.name}}</button>
      <ul class="space-around">
        <li>
          <p>徽章奖励</p>
          <img src="../../assets/images/jinpa@2x.png" /><br/>
          <button @click="givingGetBadge()">赠送</button>
        </li>
        <li>
          <p>星星奖励</p>
          <img src="../../assets/images/star_big@2x.png" /><br/>
          <button @click="givingContent('1')">赠送</button>
          <div v-if="studentlist.type">一周累计赠送：{{valueContent}}颗</div>
        </li>
      </ul>
      <i class="transformTranslate" @click="giftNone"></i>
    </div>
    <div class="dialog-bg positionFixed" v-show="GiftMessage || contentGift"></div>
    <div v-show="errorDefault" class="errprMessageDialog transformTranslateAll">{{errorMessage}}</div>
    <!-- <dialogbg :dialog="GiftMessage"></dialogbg> -->
    <div class="contentGift positionFixed" v-show="contentGift">
      <p>请选择徽章送给“{{GiftMessageData.name}}”作为奖励？</p>
      <ul class="flex-wrap-end">
        <li v-for="(value,key) in giftArray" @click="listGift(value.id, value.enable)" :class="[{'chooseListGift': giftListId == value.id && value.enable != '0'}, {'classEnable': value.enable == '0'}]">
          <img :src="value.url"/>
          <div>{{value.name}}</div>
        </li>
      </ul>
      <div class="input"><input type="text" placeholder="给学员留言（选填）" v-model="inputValue"/></div>
      <div class="button">
        <button @click="contentGiftNo">取消</button>
         <button @click="contentGiftYes" :class="{ 'disableAll': sendGiftDisable }">确定</button>
      </div>
    </div>
	</div>
</template>
<script>
import utils from '../../utils.js'
import { apiUrl } from '../../production.js'
export default {
  name: 'givingGift',
  data () {
    return {
      errorDefault: false,
      errorMessage: '',
      contentGift: false,
      inputValue: null,
      giftListId: null,
      valueContent: null,
      sendGiftDisable: true
    }
  },
  props: {
    studentlist: {
      type: Object,
      default: {}
    }
  },
  computed: {
    GiftMessage () {
      return this.$store.state.Gift.gift_message
    },
    GiftMessageData () {
      return this.$store.state.Gift.message
    },
    GiftMessageContent () {
      return this.$store.state.Gift.dataContent
    }
  },
  watch: {
    GiftMessage (curVal, oldVal) {
      if (curVal && this.studentlist.type) {
        this.valueContent = this.GiftMessageContent[this.GiftMessageData.studentId]
      }
      if (curVal) {
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
      }
    }
  },
  methods: {
    giftNone () {
      this.$store.dispatch('GiftMessage', false)
      // this.$emit('givingno', false)
    },
    givingGetBadge () {
      let param = {
        ctl: 'feedGift',
        act: 'getBadge',
        accountCode: this.GiftMessageData.accountCode
      }
      utils.GET(apiUrl, param).then(data => {
        this.giftArray = data.data
        this.contentGift = true
        this.inputValue = null
        this.giftListId = null
        this.$store.dispatch('GiftMessage', false)
      })
    },
    listGift (id, enable) {
      this.giftListId = null
      if (enable !== '0') {
        this.giftListId = id
        this.sendGiftDisable = false
      }
    },
    contentGiftNo () {
      this.contentGift = false
      this.$store.dispatch('GiftMessage', true)
    },
    contentGiftYes (value) {
      if (this.giftListId) {
        let param = {
          ctl: 'feedGift',
          act: 'sendGift',
          resourceId: this.giftListId,
          studentId: this.GiftMessageData.studentId,
          content: this.inputValue
        }
        utils.GET(apiUrl, param).then(data => {
          this.contentGift = false
          this.errorDefault = true
          this.errorMessage = '奖励已赠送'
          setTimeout(() => {
            this.errorDefault = false
          }, 1000)
        })
      } else {
        this.sendGiftDisable = true
      }
    },
    givingContent (value) {
      let param = {
        ctl: 'feedGift',
        act: 'sendGift',
        resourceId: value,
        studentId: this.GiftMessageData.studentId
      }
      utils.GET(apiUrl, param).then(data => {
        if (data.status === 1016) {
          this.errorMessage = '每周只能送3颗'
          this.errorDefault = true
          setTimeout(() => {
            this.errorDefault = false
          }, 1000)
        } else {
          this.errorMessage = this.GiftMessageData.name + ' + 1 颗星星'
          this.errorDefault = true
          setTimeout(() => {
            this.errorDefault = false
          }, 1000)
          if (this.studentlist.type && this.GiftMessageContent[this.GiftMessageData.studentId] < 3) {
            this.GiftMessageContent[this.GiftMessageData.studentId]++
          }
          this.$store.dispatch('GiftMessage', false)
        }
      })
    }
  },
  created () {
    this.$store.dispatch('GiftMessage', false)
  },
  destroyed () {}
}
</script>
<style scoped lang="scss">
@import "../../assets/style/px2rem.scss";

.dialog-gift{
  position:fixed;
  z-index:1000;
  width: px2Rem(300px);
  top:px2Rem(120px);
  left:50%;
  @include borderRadiusNumber(4px);
  .header{
    width:100%;
    height:px2Rem(42px);
    background: #fff;
    font-family: PingFangSC-Regular;
    font-size: px2Rem(15px);
    color: #333333;
    border-radius: 4px 4px 0 0;
  }
  ul{
    height:px2Rem(134px);
    background: #F0F0F0;
    border-radius: 0 0 4px 4px;
    li{
      padding-top:px2Rem(10px);
      width:50%;
      text-align:center;
      height:100%;
      p {
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #666666;
        margin-bottom:px2Rem(14px);
      }
      img{
        height:px2Rem(30px);
        width:auto;
        // display:block;
      }
      button{
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #FFFFFF;
        height:px2Rem(26px);
        width:px2Rem(60px);
        margin-top:px2Rem(12px);
        margin-bottom:px2Rem(6px);
        background: #4A90E2;
        @include borderRadiusNumber(4px);
      }
      div{
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #999999;
      }
    }
  }
  i{
    position:absolute;
    bottom:px2Rem(-90px);
    left:50%;
    display: block;
    height:28px;
    width:28px;
    background:url('../../assets/images/close@2x.png') no-repeat;
    background-size: 100%;
  }
}
.contentGift{
  position: fixed;
  top:px2Rem(90px);
  z-index: 2000;
  width: 300px;
  left: 50%;
  margin-left: -150px;
  background: #fff;
  text-align: center;
  border-radius: 4px;
  p{
    padding:20px 0;
    color: #666;
    font-size: px2Rem(14px);
    // margin-bottom: 10px;
    // background: #4A90E2
  }
  ul{
    padding: 0 20px;
    background: #f5f5f5;
    padding-top: 10px;
    li{
      width: 24%;
      padding: 2px  0;
      margin-bottom: 20px;
      margin-left: 1%;
      img{
        width: 60%;
        height: auto;
      }
      div{
        margin-top:10px;
        color:#333;
        font-size: 12px;
      }
    }
  }
  .input{
    padding:0 15px;
    background: #f5f5f5;
   input{
    color:#999999;
    width: 100%;
    height: 35px;
    line-height: 35px;
    padding-left: 10px;
    border: 1px solid #dedede;
    border-radius: 4px;
    margin-bottom: px2Rem(14px);
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -ms-box-sizing: border-box;
    -o-box-sizing: border-box;
   }
  }
  .button{
    display: flex;
    display:-webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    height: 50px;
    border-top:1px solid #dedede;
    border-radius: 0 0 4px 4px;
    button{
      width: 50%;
      font-size: px2Rem(14px);
      color: #4A90E2;
    }
    button:nth-child(1){
      border-right: 1px solid #dedede;
    }
  }
}
.chooseListGift{
  border-radius: 4px;
  box-shadow: 0px 0px 10px #b3b3b3;
  div{
    color: #4A90E2 !important;
  }
}
.classEnable{
  border-radius: 4px;
  background: #dedede;
  div{
    color:#999 !important;
  }
}
.disableAll{
  background: #dedede;
  color: #fff;
}
</style>
