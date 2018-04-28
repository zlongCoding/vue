<template>
      <div class="n_content">
      <div class="business">
        <span>您已经完成全部课程，目前可以前往申请结业了哦！</span>
        <span @click="goBack('/graduation')">前往</span>
      </div>
        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1513579164785&di=2b27b6fe05906953c5ca6f99ad13ab7d&imgtype=0&src=http%3A%2F%2Fimg.frbiz.com%2Fpic%2Fz1aada93-0x0-1%2Fpack_box.jpg">
        <p>赶快点击”我要预约“练习钢琴</p>
      </div>
</template>
<style scoped lang="scss">
@import "../../../assets/style/px2rem.scss";

.n_content{
  margin: 0 auto;
  text-align:center;
  img{
    width:px2Rem(100px);
  }
}
</style>
