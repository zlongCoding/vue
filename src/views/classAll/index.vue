<template>
	<div>
	 <ul class="flex-wrap-end">
    <li class="liList" v-for="(value, key) in content" @click="giftContent(value)">
          <img :src="value.pic" />
          <p>{{value.name}}</p>
    </li> 
   </ul>
   <giving-gift :studentlist="dialogContent"></giving-gift>
	</div>
</template>
<script>
import utils from '../../utils.js'
import { apiUrl } from '../../production.js'
import givingGift from '../task/givingGift.vue'
export default {
  name: 'classDetail',
  data () {
    return {
      data: '',
      content: [],
      dialogContent: {}
    }
  },
  components: {
    givingGift
  },
  computed: {
    GiftMessageContent () {
      return this.$store.state.Gift.dataContent
    }
  },
  methods: {
    giftContent (value) {
      if (this.GiftMessageContent[value.id] === 0 || this.GiftMessageContent[value.id] > value.star) {
      } else {
        this.GiftMessageContent[value.id] = Number(value.star)
      }
      var data = {
        accountCode: value.accountCode,
        studentId: value.id,
        name: value.name
      }
      this.dialogContent = {
        type: true,
        value: value.star
      }
      this.$store.dispatch('GiftMessage', true)
      this.$store.dispatch('GiftMessageData', data)
    }
  },
  created () {
    utils.setDocTitle('班级详情')
    var classId = this.$route.query.classId
    let param = {
      ctl: 'main',
      act: 'getClassInfo',
      classId: classId
    }
    utils.GET(apiUrl, param).then(data => {
      this.content = data.data
    })
  },
  destroyed () {}
}
</script>
<style scoped lang="scss">
@import "../../assets/style/px2rem.scss";

.liContent{
  text-align: center;
  img{
    width: px2Rem(63px);
    height: px2Rem(63px);
  }
  div{
    background: #FFFFFF;
    border: 1px solid #EBB311;
    @include borderRadiusNumber(100px);
    height:20px;
    margin-top: px2Rem(-4px);
    margin-bottom: px2Rem(3px);
    position:relative;
    top:px2Rem(-4px);
  }
  p{
    font-family: PingFangSC-Medium;
   font-size: px2Rem(15px);
   position:relative;
   top:px2Rem(-4px);
   color: #333333;
   margin-top:px2Rem(10px);
  }
}
ul{
  width: 100%;
}
.liList{
  // width:100%;
  // padding: 0 px2Rem(15px);
  margin-top:px2Rem(20px);
  text-align: center;
  width: 25%;
  img{
    width: px2Rem(63px);
    height: px2Rem(63px);
  }
  p{
  font-family: PingFangSC-Medium;
   font-size: px2Rem(14px);
   position:relative;
   top:px2Rem(-4px);
   color: #333333;
   margin-top:px2Rem(10px);
  }
  // ul{
  //   width: 100%;
  //   li{
  //     display: inline-block;
  //     width: 25%;
  //   }
  // }
}

</style>
