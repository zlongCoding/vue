<template>
  <div id="planEdit">
    <h5>交强险调整</h5>
    <div class="cellList">
      <ul>
        <li>
          <b>交强险</b>
          <span  @click="toogleTCI()">{{TCIvalue.key}}</span>
          <i class="arrow-right"></i>
        </li>
      </ul>
    </div>
    <h5>商业险调整</h5>
    <div class="cellList">
      <ul>
        <li v-for="(item, index) in policylist" :key="item.seriaNo" v-show="detectShow(index)">
          <b>{{item.name}}</b> 
          <i class="tip" v-show="item.exemptClauseCode" @click="toogleTip(index)" :class="{tipOpacity: item.exemptSelected == 0}">
            <i class="checkbox-core checkout"></i>
            <i class="text">不计免赔</i>
          </i>
          <span @click="tooglePop(index)"> {{ item | insure }} </span>
          <i class="arrow-right"></i>
        </li>
        <li class="expand" v-show="showExpand" @click="showMore">
          <div v-show="!packup">
            <i>展开更多</i>
            <i class="d-arrow-down"></i>
          </div>
          <div v-show="packup">
            <i>收起</i>
            <i class="d-arrow-up"></i>
          </div>
        </li>
      </ul>
    </div>
    <button class="btn" @click="back">下一步</button>
    <mt-popup v-model="showTCI" position="bottom">
      <mt-picker :slots="TCIslots" @change="onTCIChange" value-key="key" :showToolbar="true" :visibleItemCount='3'>
        <span class="mint-datetime-action mint-datetime-cancel" @click="toogleTCI()">取消</span>
        <span class="mint-datetime-action mint-datetime-confirm" @click="selectTCI()">确定</span>
        <div class="picker-toolbar-hr"></div>
      </mt-picker>
    </mt-popup>
    <mt-popup v-model="policyFlag[index]" position="bottom" v-for="(item, index) in policylist" :key="item.code">
      <mt-picker :slots="slots[index]" @change="onValuesChange" value-key="key" :showToolbar="true" :visibleItemCount='3'>
        <span class="mint-datetime-action mint-datetime-cancel" @click="tooglePop(index)">取消</span>
        <span class="mint-datetime-action mint-datetime-confirm" @click="selectItem(index)">确定</span>
        <div class="picker-toolbar-hr"></div>
      </mt-picker>
    </mt-popup>
  </div>
</template>

<script>
import Controller from '@/controller/plan/edit'
export default Controller
</script>

<style scoped lang="sass">
@import "../../assets/style/plan/edit.scss"
</style>
