import $ from '@/utils'
// const $$ = window.Mint

export default {
  name: 'home',
  computed: {
    data() {
      return this.$store.state.Home
    },
    Data() {
      return this.$store.state.Home.Data
    },
    Company() {
      return this.$store.state.Home.company
    },
    day_behavior() {
      return this.$store.state.Home.day_behavior
    }
  },
  methods: {
    handleChange(index) {
      console.log(index)
    },
    toPage(url) {
      const self = this
      if (url === '/phonelist') {
        self.$store.dispatch('HOME_UPDATE_COMPANY', {
          data: self.$route.query.vin,
          callback: () => {
            if (Object.prototype.toString.call(self.Company) !== '[object Array]' && self.Company.result !== '') {
              self.$store.dispatch('PHONELIST_CONFIG', self.Company)
              self.$router.push({path: 'phonedetail'})
            } else {
              self.$router.push({path: 'phonelist'})
            }
          }
        })
      } else {
        self.$router.push({path: url})
      }
    }
  },
  beforeMount() {
    $.setDocTitle(`智慧车险`)
    this.$store.dispatch('HOME_UPDATE_VIN', this.$route.query.vin)
    this.$store.dispatch('HOME_UPDATE_AUTHCODE', this.$route.query.authcode)
    this.$store.dispatch('HOME_UPDATE_PREMIUM', this.$route.query.vin)
    this.$store.dispatch('HOME_UPDATE_DAY_BEHAVIOR', {
      vin: this.$route.query.vin,
      date: $.dateformat((new Date()), 'yyyyMMdd')
    })
  },
  mounted() {
  },
  destroyed() {
  }
}
