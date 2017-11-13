import $ from '@/utils'

export default {
  name: 'login',
  computed: {
    data () {
      return this.$store.state.Login
    },
    Req () {
      return this.$store.state.Login.Req
    }
  },
  methods: {
    updateForm (e) {
      let id = e.target.id
      let val = e.target.value.trim()
      if (e.target.type === 'tel') {
        val = val.replace(/[^0-9]/g, '')
        $.ele(`#${id}`).value = val
      }
      this.$store.commit('login_update', [id, val])
    },
    refreshCaptcha () {
      this.$store.commit('login_update_captcha')
    },
    submit () {
      let req = this.Req
      if (!req.userCode) {
        $.alert('经销商代码不能为空！', 'error')
      }
      if (!req.password) {
        $.alert('密码不能为空！', 'error')
      }
      if (!req.captcha) {
        $.alert('验证码不能为空！', 'error')
      }
      console.log(req)
      this.$store.commit('login_toggleLoading', true)
      $.ajax('POST')('/writeoff-web-api/auth/dealerLogin', req).then(data => {
        this.$store.commit('login_toggleLoading', false)
        if (this.$route.query.ref) {
          this.$router.replace({path: `/login?ref=${decodeURIComponent(this.$route.query.ref)}`})
        }
      }, () => {
        this.$store.commit('login_toggleLoading', false)
      })
    }
  },
  beforeMount () {
    $.setDocTitle(`安驾行`)
  },
  mounted () {},
  destroyed () {}
}
