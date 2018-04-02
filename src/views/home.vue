<template>
  <div>
    <p>daada</p>
  </div>
</template>

<script>
import { indexGet } from '../axios'
export default {
  name: 'index',
  data () {
    return {
       value1: true,
        value2: true
    }
  },
  beforeCreate() {
    this.$store.dispatch('HOME_USERINFO', {aa: 111})
  },
  created() {
    console.log(this.$store.state.Home.userInfo)
    indexGet('/get').catch(function (error) {
      console.log('aaa' + error)
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
