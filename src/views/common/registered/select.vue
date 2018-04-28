<template>
    <div id="nselect">
      <select-address></select-address>
      <time-select @selcetli="change"></time-select>
      <div class="courses_list">
        <ul>
          <li>
            <i></i>
            <div class="space-between">
              <div>
                <p>10-12 : 2121</p>
                <p>课程名称：<span>A1</span><span>06</span></p>
              </div>
              <span>查看详情</span>
            </div>
            <i></i>
          </li>
        </ul>
      </div>
      <div  class="courses_result space-between">
        <span>已选1堂课</span>
        <span>预定课程</span>
      </div>
    </div>
</template>

<script>
import timeSelect from '../timeSelect.vue'
import dialogDetermine from '../dialogDetermine.vue'
import selectAddress from '../address.vue'
export default {
  name: 'home',
  data () {
    return {
      data: '2121121'
    }
  },
  components: {
    timeSelect,
    dialogDetermine,
    selectAddress
  },
  methods: {
    change (index) {
      alert(index)
    }
  },
  mounted () {},
  destroyed () {}
}
</script>

<style scoped lang="scss">
@import "../../../assets/style/px2rem.scss";

#nselect{
}
.courses_list{
  background:#fff;
  padding: px2Rem(10px) px2Rem(20px);
  padding-left: px2Rem(50px);
  padding-right: px2Rem(50px);
  position: relative;
  i{
    display:inline-block;
    position:absolute;
    width: px2Rem(20px);
    height:px2Rem(20px);
    background:red;
  }
  i:first-child{
    left: px2Rem(20px);
    top:50%;
    margin-top:px2Rem(-10px);
  }
  i:last-child{
    right: px2Rem(20px);
    top:50%;
    margin-top:px2Rem(-10px);
  }
  li{
    div{
     
    }
  }
}

.courses_result{
  position:fixed;
  bottom: 0;
  height:px2Rem(65px);
  line-height:px2Rem(65px);
  z-index:999;
  width:100%;
  span{
    display:inline-block;
    text-align: center;
  }
  span:first-child{
    width:40%;
    background:red;
  }
 span:last-child{
    width:60%;
  }
}
</style>
