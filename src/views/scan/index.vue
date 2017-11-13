<template>
  <div id="scan">

    <div>
      <ul class="title">
        <li class="vouchersName">{{data.vouchersName}}</li>
        <li class="licenseNo">{{data.licenseNo}}</li>
      </ul>
      <h4 class="slogan">请按要求上传照片，确保车牌号清晰</h4>

      <ul class="uploadArea one" v-if="data.requiredImageCount === 1">
        <li>
          <div class="area" @click="chooseImage(0)">
            <div class="imgArea" v-if="scan.imageIndex[0]">
              <img :src="scan.imageIndex[0]" />
            </div>
            <h5>全车45°含清晰车牌照</h5>
          </div>
        </li>
      </ul>

      <ul class="uploadArea four" v-if="data.requiredImageCount === 4">
        <li>
          <span class="index">1</span>
          <div class="area" @click="chooseImage(0)">
            <div class="imgArea" v-if="scan.imgList[0]">
              <img :src="scan.imgList[0]" />
            </div>
            <h5>全车45°含清晰车牌照</h5>
          </div>
        </li>
        <li>
          <span class="index">2</span>
          <div class="area" @click="chooseImage(1)">
            <div class="imgArea" v-if="scan.imgList[1]">
              <img :src="scan.imgList[1]" />
            </div>
            <h5>碰撞处补漆前照片</h5>
          </div>
        </li>
        <li>
          <span class="index">3</span>
          <div class="area" @click="chooseImage(2)">
            <div class="imgArea" v-if="scan.imgList[2]">
              <img :src="scan.imgList[2]" />
            </div>
            <h5>碰撞出补漆中打磨照片</h5>
          </div>
        </li>
        <li>
          <span class="index">4</span>
          <div class="area" @click="chooseImage(3)">
            <div class="imgArea" v-if="scan.imgList[3]">
              <img  :src="scan.imgList[3]" />
            </div>
            <h5>碰撞出补漆后照片</h5>
          </div>
        </li>
      </ul>
      <button class="_button submit" :disabled="!(scan.imgList.filter(i => i !== null).length === 4)" @click="submit">提交审核</button>
    </div>
  </div>
</template>

<script>
import Controller from './handle'
export default Controller
</script>

<style scoped lang="sass">
@import "../../assets/style/scan/index.scss"
</style>
