import $ from '@/utils'
import Config from './detailConfig'
export default {
  name: 'phoneDetails',
  data () {
    return {
      companyConfig: null
    }
  },
  computed: {
    data () {
      return this.$store.state.phoneList.config
    }
  },
  methods: {
  },
  beforeMount () {
    $.setDocTitle(`电话理赔`)
    this.companyConfig = Config[this.data.insurer]
    if (!this.data.insurer) {
      this.companyConfig = Config.cpic
      const config = {
        insurer: 'cpic',
        policyType: 'ALL'
      }
      this.$store.dispatch('PHONELIST_CONFIG', config)
    }
  },
  mounted () {},
  destroyed () {}
}
