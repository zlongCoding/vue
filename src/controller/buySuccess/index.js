import $ from '@/utils'
// const $$ = window.Mint

export default {
  name: 'buySuccess',
  data () {
    return {
      result: null
    }
  },
  methods: {
    goBack () {
      // this.$router.push({path: 'reserve'})
    }
  },
  beforeMount () {
    $.setDocTitle(`购买成功`)
    var orderNo = window.location.href
    orderNo = orderNo.split('=')
    $.post(`/ubi/init-premium/${orderNo[1]}`).then(json => {
      this.result = json
    })
  },
  mounted () {},
  destroyed () {}
}
