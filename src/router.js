import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Home = resolve => require(['@/views/home/index.vue'], resolve)
const Orders = resolve => require(['@/views/orders/index.vue'], resolve)
const Login = resolve => require(['@/views/login/index.vue'], resolve)
const Checkout = resolve => require(['@/views/checkout/index.vue'], resolve)
const Settle = resolve => require(['@/views/settle/index.vue'], resolve)
const SettleDetail = resolve => require(['@/views/settledetail/index.vue'], resolve)
const Invoice = resolve => require(['@/views/invoice/index.vue'], resolve)
const Scan = resolve => require(['@/views/scan/index.vue'], resolve)
const ScanStatus = resolve => require(['@/views/scan/status.vue'], resolve)

export default new Router({
  base: '/writeoff/',
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/checkout',
      name: 'Checkout',
      component: Checkout
    },
    {
      path: '/orders',
      name: 'Orders',
      component: Orders
    },
    {
      path: '/settle',
      name: 'Settle',
      component: Settle
    },
    {
      path: '/settledetail',
      name: 'SettleDetail',
      component: SettleDetail
    },
    {
      path: '/invoice',
      name: 'Invoice',
      component: Invoice
    },
    {
      path: '/scan',
      name: 'Scan',
      component: Scan
    },
    {
      path: '/scan/:status',
      name: 'ScanStatus',
      component: ScanStatus
    }
  ]
})
