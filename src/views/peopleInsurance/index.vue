<template>
  <div id="people-insurance">
    <section class="section-img"></section>
    <insure-result buttonName="返回首页" :messages="insuranceMessage" :goRul="`/?authcode=${Data.authCode}&vin=${Data.vin}`"
                   mode="人工核保"></insure-result>

    <div style="position: absolute; left: 0 ; bottom: 10px; width: 100%; text-align: center; height: 40px; line-height: 5">
      <p style="font-size: 12px;">由上海汽车集团保险销售有限公司提供保险支持</p>
    </div>
  </div>
</template>

<script>
  import Controller from '@/controller/peopleInsurance/'

  export default Controller
</script>
<style scoped lang="sass">
  @import "../../assets/style/peopleInsurance/index.scss"
</style>
