<template>
  <div id="quoted">

    <div class="quotedItem" v-for="item in Data.insurance.recommended">
      <div class="info"  @click="toggleDetail(item)">
        <div :class="item" class="icon company"></div>
        <b>{{item | config('company')}}</b>
        <div class="loadingDot" v-if="Options.loadingStatus[item] === 1">计算中</div>
        <span v-if="Options.loadingStatus[item] === 2" :class="Options.loadingStatus[item] === 3 && classNode === 'true' ? classNode = 'true' : classNode = 'false' ">{{Data.result[item].totalPremium}}</span>
        <div class="noneData"  v-if="Options.loadingStatus[item] === 3">暂无报价</div>
      </div>

      <div class="detail" v-if="Data.result[item]" v-show="Options.detailShow[item]">
        <table>
          <tbody>
            <tr v-if="Data.result[item].ctpTotalPremium">
              <td class='title'>交强险</td>
              <td></td>
              <td class='title'>{{Data.result[item].ctpTotalPremium}}</td>
            </tr>
            <tr class="mini" v-if="Data.result[item].taxType">
              <td>车船税{{Data.result[item].taxType ? `(${Data.result[item].taxType})` : ''}}</td>
              <td></td>
              <td>{{Data.result[item].vehicleTaxAmount}}</td>
            </tr>
            <tr v-if="Data.result[item].bizTotalPremium">
              <td class="title">商业险</td>
              <td></td>
              <td class="title">{{Data.result[item].bizTotalPremium}}</td>
            </tr>
            <tr class="mini" v-for="kid in Data.result[item].coverages">
              <td>{{kid.name}}</td>
              <td>
                <span v-if="kid.exemptClauseCode">不计免赔</span>
                <u v-if="!kid.exemptClauseCode">不计免赔</u>
                <span v-if="kid.code === 'DAMAGE_LOSS' || kid.code === 'THEFT' || kid.code === 'SELF_IGNITE'">{{ kid.sumInsured }}</span>
                <span v-else>{{ kid.sumInsured | numberToChinese }}</span>
              </td>
              <td>{{kid.value}}</td>
            </tr>
          </tbody>
        </table>
        <button class="btn" @click="submit(Data.result[item].orderNo)">我要投保</button>
      </div>

    </div>

    <div class="quotedItem" v-for="item in Data.insurance.nonRecommended">
      <div class="info" @click="toggleDetail(item)">
        <div :class="item" class="icon company"></div>
        <b>{{item | config('company')}}</b>
        <div class="loadingDot" v-if="Options.loadingStatus[item] === 1">计算中</div>
        <span v-if="Options.loadingStatus[item] === 2" :class="Options.loadingStatus[item] === 3 && classNode === 'true' ? classNode = 'true' : classNode = 'false' ">{{Data.result[item].totalPremium}}</span>
        <div class="noneData"  v-if="Options.loadingStatus[item] === 3" >暂无报价</div>
      </div>

      <div class="detail" v-if="Data.result[item]" v-show="Options.detailShow[item]">
        <table>
          <tbody>
            <tr v-if="Data.result[item].ctpTotalPremium">
              <td class='title'>交强险</td>
              <td></td>
              <td class='title'>{{Data.result[item].ctpTotalPremium}}</td>
            </tr>
            <tr class="mini" v-if="Data.result[item].taxType">
              <td>车船税({{Data.result[item].taxType}})</td>
              <td></td>
              <td>{{Data.result[item].vehicleTaxAmount}}</td>
            </tr>
            <tr v-if="Data.result[item].bizTotalPremium">
              <td class="title">商业险</td>
              <td></td>
              <td class="title">{{Data.result[item].bizTotalPremium}}</td>
            </tr>
            <tr class="mini" v-for="kid in Data.result[item].coverages">
              <td>{{kid.name}}</td>
              <td>
                <span v-if="kid.exemptClauseCode">不计免赔</span>
                <u v-if="!kid.exemptClauseCode">不计免赔</u>
                <span v-if="kid.code === 'DAMAGE_LOSS' || kid.code === 'THEFT' || kid.code === 'SELF_IGNITE'">{{ kid.sumInsured }}</span>
                <span v-else>{{ kid.sumInsured | numberToChinese }}</span>
              </td>
              <td>{{kid.value}}</td>
            </tr>
          </tbody>
        </table>
        <button class="btn" @click="submit(Data.result[item].orderNo)">我要投保</button>
      </div>
    </div>
    <!-- <div v-if="Options.calculateDone === true && classNode ==='false' ">
      <button class="btn edit" @click="toEdit()">修改投保方案</button>
    </div> -->
    <button class="btn edit" @click="toEdit()">修改投保方案</button>
  </div>
</template>

<script>
import Controller from '@/controller/quoted/'
export default Controller
</script>

<style scoped lang="sass">
@import "../../assets/style/quoted/index.scss"
</style>
