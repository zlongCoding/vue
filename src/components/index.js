import Header from './Header.vue'
import Loading from './Loading.vue'
import FullScreenLoading from './FullScreenLoading.vue'
import PopMask from './PopMask.vue'
import CountDown from './CountDown.vue'
import Infinite from './Infinite.vue'

export default(Vue) => {
  Vue.component('navbar', Header)
  Vue.component('loading', Loading)
  Vue.component('fsLoading', FullScreenLoading)
  Vue.component('popMask', PopMask)
  Vue.component('countDown', CountDown)
  Vue.component('infinite', Infinite)
}
