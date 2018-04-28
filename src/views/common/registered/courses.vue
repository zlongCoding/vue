<template>
        <ul class="yesClass appointmentMarginTop" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10" >      
        <li class="bg-ff" v-for="(item , index) in data">
          <section class="borderPX">
            <p>12/13 周三 <span>16:34</span>-<span>16:34</span></p>
            <div class="classAddress">知音琴行贝多芬广场</div>
            <div>地址：长宁区我们的</div>
            <div class="className">
              <span>课程教师：张龙</span>
              <span>课程名称：ST</span>
              <span>教室编号：1010</span>
            </div>
          </section>
          <section>
            <button><a href="tel:021-63663188">我有疑问</a></button>
            <button @click="finishClass()">完成上课</button>
          </section>
        </li>
      </ul>
</template>

<script>

export default {
  name: 'notClass',
  data () {
    return {
      data: [1, 2, 3, 4, 5],
      count: 1,
      busy: false
    }
  },
  methods: {
    routerList (id) {
      this.$router.push({path: 'list', query: {id: id}})
    },
    loadMore () {
      // this.busy = true
      // for (var i = 0, j = 1; i < j; i++) {
      //   this.data.push({ name: this.count++ })
      // }
      // this.busy = false
    },
    finishClass () {
      console.log(2221111)
    }
  },
  beforeMount () {},
  mounted () {
  },
  destroyed () {}
}
</script>

<style scoped lang="scss">
@import "../../../assets/style/px2rem.scss";

   .yesClass{
    li {
      position: relative;
      margin-top: px2Rem(10px);  
      .classAddress {
        margin: px2Rem(6px) 0 px2Rem(6px) 0;
      }

      .className {
        display: flex;
        display: -webkit-box;
        display: -webkit-flex;
        display: -moz-flex;
        display: -ms-flex;
        display: -o-flex;
        display: -ms-flexbox;
        justify-content: space-between;
        -o-justify-content: space-between;
        -ms-justify-content: space-between;
        -moz-justify-content: space-between;
        -webkit-box-pack: justify;
        -moz-box-pack: justify;
        -ms-box-pack: justify;
        box-pack: justify;
        -webkit-justify-content: space-between;
        -ms-flex-pack: justify;
        -webkit-flex-pack: justify;
        -moz-flex-pack: justify;
        -o-flex-pack: justify;
        margin-top: px2Rem(6px);
      }
      .bgImg {
        position: absolute;
        width: px2Rem(45px);
        height: px2Rem(45px);
        background: red;
        border-radius: 50%;
        right: px2Rem(20px);
        margin-top: px2Rem(-30px);
        top: 50%;
      }
      section:nth-child(1) {
        padding: px2Rem(20px) px2Rem(50px) px2Rem(10px) px2Rem(20px);
      }
      section:nth-child(2) {
        padding-right: px2Rem(20px);
        text-align: right;
        height:px2Rem(40px);
        line-height:px2Rem(40px);
        button {
          border: 1px solid #eee;
          border-radius: 5px;
          padding: px2Rem(4px) px2Rem(6px);
        }
        button:last-child {
          margin-left: px2Rem(8px);
        }
      }
    }
    li:nth-child(1) {
      margin-top: 0;
    }
  }
</style>
