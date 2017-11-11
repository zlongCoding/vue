import 'babel-polyfill'
import Vue from 'vue'
import store from './store'
import router from './router'
import Filter from './filter'
import Components from './components'
import $ from '@/utils'
import Mint from 'mint-ui'
import FastClick from 'fastclick'
import 'whatwg-fetch'

// require('./mock/mock')

Vue.use(Mint)
window.Mint = Mint
Vue.config.productionTip = false
FastClick.attach(document.body)
Filter(Vue)
Components(Vue)

const setProcessBar = (val, transition = '0.2s') => {
  $.ele('#processBar').style.width = `${val}%`
  $.ele('#processBar').style.transition = transition
}

let processBarTimer = null

router.beforeEach((to, from, next) => {
  if (!$.isNetwork()) {
    window.Mint.Toast('亲～没有网络啦，请检查网络～')
  }
  if (to.path === '/access') {
    next()
  } else {
    if (!store.state.Home.auth_banma) {
      store.dispatch('HOME_AUTH_BANMA', {
        vin: to.query.vin,
        authCode: to.query.authcode
      }).then(response => {
        if (response === 'SUCCESS') {
          next()
        } else {
          next('/access')
        }
      }, response => {
        next('/access')
      }).catch(err => {
        if (err) {
          console.log(err)
        }
        next('/access')
      })
    } else {
      $.ele('body').setAttribute('page', to.name)
      let done = 10
      let curve = 12
      clearInterval(processBarTimer)
      processBarTimer = setInterval(() => {
        curve -= 1
        curve = curve < 0 ? 1 : curve
        if (done >= 90) {
          clearInterval(processBarTimer)
          setProcessBar(90)
        } else {
          done += curve
          setProcessBar(done)
        }
      }, 100)
      next()
    }
  }
})

router.afterEach(route => {
  clearInterval(processBarTimer)
  setProcessBar(100)
  setTimeout(() => setProcessBar(0, '0s'), 500)
})

new Vue({router, store}).$mount('#app')
