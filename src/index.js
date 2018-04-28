import Vue from 'vue'
import './assets/style/reset.scss'
import './assets/style/flex.scss'
import './assets/style/common.scss'
import store from './store'
import router from './router'
import Filter from './filter'
import Components from './components'
import FastClick from 'fastclick'
import 'whatwg-fetch'
// import weiXinConfig from './weixin.js'
import { apiUrl } from './production.js'
import utils from './utils.js'
Vue.config.productionTip = false
FastClick.attach(document.body)
Filter(Vue)
Components(Vue)

router.beforeEach((to, from, next) => {
  document.body.style.background = '#f5f5f5'
  // next()
  if (window.location.href.indexOf('code') >= 0 && !store.state.Home.userInfo.id) {
    var codeHref = window.location.href.split('?')[1].split('=')[1].split('&')[0]
    if (utils.getStore('wxCode') === codeHref) {
      let paramInfo = {
        ctl: 'teacher',
        act: 'getUserInfo'
      }
      utils.GET(apiUrl, paramInfo).then(data => {
        store.dispatch('HOME_USERINFO', data.data)
        if (data.status !== 1006) {
          // router.push('/appointment')
        } else {
          if (!to.path.includes('login')) {
            router.push('/login')
          }
        }
        next()
      })
    } else {
      setTimeout(() => {
        let paramInfo = {
          ctl: 'teacher',
          act: 'getUserInfo',
          code: codeHref
        }
        utils.GET(apiUrl, paramInfo).then(data => {
          utils.setStore('wxCode', codeHref)
          store.dispatch('HOME_USERINFO', data.data)
          if (data.status !== 1006) {
            // router.push('/appointment')
          } else {
            if (!to.path.includes('login')) {
              router.push('/login')
            }
          }
          next()
        })
      }, 1000)
    }
  } else {
    if (store.state.Home.userInfo && store.state.Home.userInfo.id) {
      next()
    } else {
      let paramInfo = {
        ctl: 'teacher',
        act: 'getUserInfo'
      }
      utils.GET(apiUrl, paramInfo).then(data => {
        store.dispatch('HOME_USERINFO', data.data)
        if (data.status !== 1006) {
          // router.push('/appointment')
        } else {
          if (!to.path.includes('login')) {
            router.push('/login')
          }
        }
        next()
      })
    }
  }
})

router.afterEach(route => {
})
new Vue({router, store}).$mount('#app')
