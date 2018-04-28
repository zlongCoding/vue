<template>
  <div id="appointment">
    <!-- <n-appointment v-if="appointment"></n-appointment> -->
   <un-appointment></un-appointment>
   
  </div>
</template>

<script>
import unAppointment from '../common/unregistered/un_appointment.vue'
export default {
  name: 'home',
  data () {
    return {
    }
  },
  computed: {
    appointment () {
      return this.$store.state.Home.unregistered
    }
  },
  components: {
    unAppointment
  },
  methods: {},
  mounted () {},
  destroyed () {}
}
</script>

<style scoped lang="scss">
@import "../../assets/style/px2rem.scss";


</style>
