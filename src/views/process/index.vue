<template>
  <div id="processContainer">
    <div id="processContainerWrap">
      <div class="process">
        <div class="ko-progress-circle" data-progress="0">
        <div class="ko-circle">
            <div class="full ko-progress-circle__slice">
                <div class="ko-progress-circle__fill"></div>
            </div>
            <div class="ko-progress-circle__slice">
                <div class="ko-progress-circle__fill"></div>
                <div class="ko-progress-circle__fill ko-progress-circle__bar"></div>
            </div>
        </div>
          <div class="ko-progress-circle__overlay">
            <h5 id="processCount"></h5>
          </div>
      </div>
      </div>
    </div>
    <div class="tip">
      <h3>请勿退出应用</h3>
      此订单正在努力生成中
    </div>
  </div>
</template>

<script>
import Controller from '@/controller/process/'
export default Controller
</script>

<style scoped lang="sass">
@import "../../assets/style/process/index.scss"
</style>
