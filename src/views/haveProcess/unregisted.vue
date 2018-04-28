<template>
  <div class="no-piano">
      <img src="../../assets/images/else/nodata.png" />
        <p>预约钢琴练习需成为正式学员！</p>
      <navigation></navigation>
    </div>
</template>

<script>

export default {
  name: 'Class',
  data () {
    return {
      dd: 'daa'
    }
  },
  computed: {
    data () {}
  },
  methods: {
    routerList (id) {
      this.$router.push({path: 'list', query: {id: id}})
    },
    finishJean () {
      console.log(44444)
    }
  },
  beforeMount () {},
  mounted () {
  },
  destroyed () {}
}
</script>

<style scoped lang="scss">
@import "../../assets/style/px2rem.scss";
.no-piano{
  margin: 0 auto;
  text-align: center;
}
 img{
    margin-top: px2Rem(112px);
    margin-bottom: px2Rem(158px);
    width:px2Rem(165px);
    height:auto;
  }
</style>
