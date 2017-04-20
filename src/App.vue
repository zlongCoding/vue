<template>
  <div class="apps" >
      <transition name="router-fade" node="out-in">
         <keep-alive>
                <router-view></router-view>
         </keep-alive>
      </transition>
  </div>
</template>
<script>

export default {
  
}
</script>
<style lang="less">
.router-fade-enter-active, .router-fade-leave-active {
      transition: opacity .3s;
  }
  .router-fade-enter, .router-fade-leave-active {
      opacity: 0;
  }
</style>