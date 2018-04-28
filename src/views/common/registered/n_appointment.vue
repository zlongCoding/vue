<template>
    <div id="nregistered">
      <header>
          <ul class="clearFloat">
            <li :class="{'liColor_border': liIndex === 0}" @click="liChange(0)">预约课程</li>
            <li :class="{'liColor_border': liIndex === 1}" @click="liChange(1)">预约练习</li>
          </ul>
          <div @click="goBack()">我要预约</div>
      </header>
      <courses v-if ="(liIndex === 0) && coursesContent"></courses>
      <no-courses v-if ="(liIndex === 0) && !coursesContent"></no-courses>
      <piano v-if ="(liIndex === 1) && pianoContent"></piano>
      <no-piano v-if ="(liIndex === 1) && !pianoContent"></no-piano>
      <navigation></navigation>
    </div>
</template>

<script>
import courses from './courses.vue'
import noCourses from './noCourses.vue'
import noPiano from './noPiano.vue'
import piano from './piano.vue'
export default {
  name: 'home',
  data () {
    return {
      liIndex: 0,
      business: true,
      coursesContent: false,
      pianoContent: false
    }
  },
  components: {
    courses,
    noCourses,
    noPiano,
    piano
  },
  methods: {
    liChange (index) {
      this.liIndex = index
    },
    goBack (content) {
      if (content) {
        console.log(1111)
      } else {
        console.log(22222)
        if (this.liIndex === 0) {
          this.$router.push({path: 'nselect'})
        } else if (this.liIndex === 1) {
          this.$router.push({path: 'practise'})
        }
      }
    }
  },
  mounted () {},
  destroyed () {}
}
</script>

<style scoped lang="scss">
@import "../../../assets/style/px2rem.scss";

#nregistered{
  header{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 99;
    background: #fff;
    height:px2Rem(40px);
    line-height: px2Rem(40px);
    padding: 0 px2Rem(20px);
    background: #fff;
    display:flex;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flex;
    display: -ms-flexbox;
    justify-content:space-between;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    -moz-justify-content: space-between;
    -ms-justify-content: space-between;
    -o-justify-content: space-between;
    -ms-flex-pack: justify;
    ul{
      li{
        float:left;
      }
      li:last-child{
        margin-left: px2Rem(20px);
      }
    }
  }
  .business{
    height:px2Rem(40px);
    line-height:px2Rem(40px);
    color: #fff;
    background:#000;
    opacity:0;
    padding:0 px2Rem(4px);
    display:flex;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    justify-content:space-between;
    -webkit-box-pack: justify;
    -moz-box-pack: justify;
    -ms-box-pack: justify;
    -o-box-pack: justify;
    -webkit-justify-content: space-between;
    -o-justify-content: space-between;
    -ms-justify-content: space-between;
    -moz-justify-content: space-between;
    -ms-flex-pack: justify;
    span:last-child{
      height:100%;
      display:inline-block;
      text-decoration: underline;
    }
  }
}
.liColor_border{
  color:red;
  position: relative;
}
.liColor_border:after{
  position:absolute;
  content:'';
  height:px2Rem(1px);
  width:60%;
  background:red;
  bottom: 0;
  left:50%;
  margin-left:-30%;
}
.business_opcaity{
   opacity: .4 !important;
}
</style>
