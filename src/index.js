import Vue from 'vue'
import store from './store'
import router from './router'
import Filter from './filter'
import Components from './components'
import $ from '@/utils'
import { default as swal } from 'sweetalert2'
import FastClick from 'fastclick'
import 'whatwg-fetch'

Vue.config.productionTip = false
FastClick.attach(document.body)
window.swal = swal
Filter(Vue)
Components(Vue)

const setProcessBar = (val, transition = '0.2s') => {
  $.ele('#processBar').style.width = `${val}%`
  $.ele('#processBar').style.transition = transition
}

let processBarTimer = null

router.beforeEach((to, from, next) => {
  $.ele('#app').setAttribute('page', to.name)
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
})

router.afterEach(route => {
  clearInterval(processBarTimer)
  setProcessBar(100)
  window.swal.close()
  setTimeout(() => setProcessBar(0, '0s'), 500)
})

new Vue({router, store}).$mount('#app')
