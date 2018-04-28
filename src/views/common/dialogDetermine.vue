<template>
  <div class="dialog_determine">
    <div class="dialog-bg"></div>
      <div class="dialog_courses bg-ff">
        <div>预定课程</div>
        <div>
          <p>您将预定课程：A1、A1</p>
          <ul><li>12/213</li></ul>
        </div>
        <div class="space-between">
          <span>取消</span>
          <span @click="determineSure">确认</span>
        </div>
      </div>
  </div>
</template>

<script>

export default {
  name: 'home',
  data () {
    return {
      dd: 'daa'
    }
  },
  props: {
  },
  methods: {
    determineSure (id) {
    }
  },
  beforeMount () {},
  mounted () {
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/style/px2rem.scss";

.dialog_courses{
  z-index:9999;
  position:absolute;
  width:px2Rem(200px);
  top: 50%;   
  left: 50%;
  border-radius:5px;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  div{
    text-align:center;
  }
  div:last-child{
    span{
      display:inline-block;
    }
  }
}
</style>
