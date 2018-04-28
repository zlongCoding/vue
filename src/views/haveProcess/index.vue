<template>
  <div>
    <nregisted v-if="appointment == '1' || appointment == '2'"></nregisted>
   <unregisted v-else></unregisted>
  </div>
</template>

<script>
import nregisted from './nregisted.vue'
import unregisted from './unregisted.vue'
import utils from '../../utils.js'
export default {
  name: 'home',
  data () {
    return {
    }
  },
  computed: {
    appointment () {
      return this.$store.state.Home.userInfo.data.enabled
    }
  },
  components: {
    nregisted,
    unregisted
  },
  methods: {},
  mounted () {
    utils.setDocTitle('钢琴练习')
  },
  destroyed () {}
}
</script>
