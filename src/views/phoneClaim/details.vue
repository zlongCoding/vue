<template>
  <div id="phoneDetails">  
      <ul class="headers">
         <li class="clearfix border-width">
          <section class="left">
            <div :class="data.insurer" class="icon company"></div>
          </section>
          <section class="right">
            <span>
              <p>{{data.insurer | config('company')}}</p>
              <p class="details-name">{{data.policyType  | config('insuranceKind')}}</p>
            </span>
            <em>{{data.insurer | config('companyPhone')}}</em>
          </section>
         </li>
      </ul>
      <section class="content" v-if="companyConfig">
      <p>特色服务</p>
      <section class="message">
        <section >
          <img src="../../assets/images/server.png" />
          <p>{{companyConfig.FEATURE.LEFT}}</p>
        </section>
         <section >
          <img src="../../assets/images/breakdown.png" />
          <p>{{companyConfig.FEATURE.CENTER}}</p> 
        </section>
        <section>
          <img src="../../assets/images/doctor.png" />
          <p>{{companyConfig.FEATURE.RIGHT}}</p>
        </section>
      </section>
      <p>基础服务</p>
      <section class="serve">
      <ul>
       <li v-for=" item in companyConfig.BASICS" v-if="item">{{item}}</li>
      </ul>
      </section>
      </section>
  </div>
</template>

<script>
import Controller from '@/controller/phoneClaim/details'
export default Controller
</script>

<style scoped lang="sass">
@import "../../assets/style/phoneClaim/details.scss"
</style>
