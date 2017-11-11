<template>
 <div id="phoneList">

   <section class="header"><span>常见保险公司电话</span></section>
   <ul class="content">
    <li class="clearfix" v-for = "item in company">
      <section class="left">
       <!-- <img src="../../assets/images/GPIC.png" class="imgborder" /> -->
       <div :class="item.insurer" class="icon company"></div>
    </section>
    <section class="border-width right" @click="goDetails(item)">
       <span>{{item.insurer | config('company')}}</span>
       <div>{{item.insurer | config('companyPhone')}}</div>
    </section>
 </li>
</ul>
</div>
</template>

<script>
   import Controller from '@/controller/phoneClaim/list'
   export default Controller
</script>

<style scoped lang="sass">
   @import "../../assets/style/phoneClaim/list.scss"
</style>
