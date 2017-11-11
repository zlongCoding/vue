import $ from '@/utils'

export default {
  name: 'selectDealer',
  computed: {
    Options () {
      return this.$store.state.Insurance.Options
    },
    Req () {
      return this.$store.state.Insurance.Req
    }
  },
  methods: {
    goBack (item) {
      this.$router.push({path: decodeURIComponent(this.$route.query.ref)})
      if (item) {
        this.$store.dispatch('INSURANCE_TOGGLE_DEALER', item)
      }
    }
  },
  beforeMount () {
    $.setDocTitle(`选择服务经销商`)
  },
  mounted () {},
  destroyed () {}
}
