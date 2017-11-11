<template>
  <div class="inner-content">
    <div class="upper">
      <div class="left">
        <div>
          <div class="icon icon1"></div>
          <div>{{item.time | formatMinute}}</div>
        </div>
        <div>
          <div class="icon icon2"></div>
          <div>{{item.driverMileage}}公里</div>
        </div>
      </div>
      <div class="right">
        <div>
          <span v-if="item.userType === '1'">{{item.premium}}</span>
          <span v-else>{{item.score}}</span>
          <span v-if="item.userType === '1'"></span>
          <span v-else>分</span>
        </div>
        <p v-if="item.userType === '1'">花费金马力</p>
        <p v-else>行驶评分</p>
      </div>
    </div>
    <div class="lower">
      <div>
        <div class="icon icon3"></div>
        <div class="text">{{item.sharpTurn}}次 急转弯</div>
      </div>
      <div>
        <div class="icon icon4"></div>
        <div class="text">{{item.rapidAcceleration}}次 急加速</div>
      </div>
      <div>
        <div class="icon icon5"></div>
        <div class="text">{{item.rapidBrake}}次 急刹车</div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['item']
  }
</script>
<style lang="sass" scoped>
  @import "../../assets/style/reserve/statistics.scss"
</style>
