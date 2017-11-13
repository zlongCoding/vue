import $ from '@/utils'

export default {
  name: 'checkout',
  computed: {
    data () {
      return this.$store.state.Checkout
    }
  },
  methods: {},
  beforeMount () {
    $.setDocTitle(`结算服务`)
  },
  mounted () {},
  destroyed () {}
}
