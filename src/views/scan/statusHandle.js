import $ from '@/utils'

export default {
  name: 'statusHandle',
  computed: {
    data () {
      return this.$store.state.Scan.Data
    },
    status () {
      return this.$route.params.status
    }
  },
  methods: {
    toOrders () {
      this.$router.push({path: `/orders`})
    },
    goBack () {
      this.$router.go(-1)
    }
  },
  beforeMount () {
    $.setDocTitle(`核销${this.status === 'success' ? '成功' : '失败'}`)
  },
  mounted () {},
  destroyed () {}
}
