import $ from '@/utils'

export default {
  name: 'process',
  computed: {
    data () {
      return this.$store.state.Demo
    }
  },
  data () {
    return {
      rotate: null
    }
  },
  methods: {},
  beforeMount () {
    $.setDocTitle(`处理中`)
  },
  beforeRouteLeave (to, from, next) {
    window.clearInterval(this.rotate)
    next()
  },
  mounted () {
    let start = 0
    var self = this
    let rotateDone = () => {
      self.$router.push({path: 'success'})
    }
    let startRotate = () => {
      self.rotate = setInterval(() => {
        start += 5
        $.ele('#processCount').innerHTML = `${start}%`
        if (start === 100) {
          window.clearInterval(self.rotate)
          rotateDone()
        }
        $.ele('.ko-progress-circle').setAttribute('data-progress', start)
      }, 200)
    }
    setTimeout(startRotate, 200)
  },
  destroyed () {}
}
