import $ from '@/utils'

export default {
  name: 'plan',
  computed: {
    data () {
      return this.$store.state.Demo
    }
  },
  methods: {},
  beforeMount () {
    $.setDocTitle(`选择投保方案`)
  },
  mounted () {},
  destroyed () {}
}
