import $ from '@/utils'
import listConfig from './listConfig'

export default {
  name: 'phoneList',
  data () {
    return {
      company: null
    }
  },
  computed: {
    data() {
      return this.$store.state.Home.company
    }
  },
  methods: {
    goDetails(item) {
      this.$store.dispatch('PHONELIST_CONFIG', item)
      this.$router.push({path: 'phonedetail'})
    }
  },
  beforeMount () {
    $.setDocTitle(`电话理赔`)
    if (this.data && this.data.length > 0) {
      this.company = this.data
    } else {
      this.company = listConfig
    }
  },
  mounted () {},
  destroyed () {}
}
