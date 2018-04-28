<template>
    <div id="unregistered" class="marginNavigation">
      <list-appointment  v-if = "(appointmentContent.length > 0) && appointmentChoose" :listContent="appointmentContent"></list-appointment>
      <appointment v-if = "(appointmentContent.length <= 0) && appointmentChoose"></appointment>
      <navigation></navigation>
    </div>
</template>

<script>
import utils from '../../../utils.js'
import { apiUrl } from '../../../production.js'
import appointment from './appointment.vue'
import listAppointment from './listAppointment.vue'
export default {
  name: 'home',
  data () {
    return {
      appointmentContent: '',
      appointmentChoose: false
    }
  },
  components: {
    appointment,
    listAppointment
  },
  methods: {
    goBack () {
      this.$router.push({path: '/unclass'})
    }
  },
  created () {
    utils.setDocTitle('课程表')
    let param = {
      ctl: 'main',
      act: 'getMyorders'
    }
    utils.GET(apiUrl, param).then(data => {
      this.appointmentContent = data.data
      // this.appointmentContent = []
    })
    setTimeout(() => {
      this.appointmentChoose = true
    }, 200)
  },
  destroyed () {}
}
</script>

<style scoped lang="scss">
@import "../../../assets/style/px2rem.scss";

</style>
