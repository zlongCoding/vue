import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Home = resolve => require(['@/views/home/index.vue'], resolve)
const Reserve = resolve => require(['@/views/reserve/index.vue'], resolve)
const InsuranceList = resolve => require(['@/views/insurance/index.vue'], resolve)
const InsuranceDetail = resolve => require(['@/views/insurance/detail.vue'], resolve)
const Policy = resolve => require(['@/views/policy/index.vue'], resolve)
const Plan = resolve => require(['@/views/plan/index.vue'], resolve)
const Process = resolve => require(['@/views/process/index.vue'], resolve)
const PlanEdit = resolve => require(['@/views/plan/edit.vue'], resolve)
const Quoted = resolve => require(['@/views/quoted/index.vue'], resolve)
const Confirm = resolve => require(['@/views/policy/confirm.vue'], resolve)
const phoneList = resolve => require(['@/views/phoneClaim/list.vue'], resolve)
const phoneDetails = resolve => require(['@/views/phoneClaim/details.vue'], resolve)
const peopleInsurance = resolve => require(['@/views/peopleInsurance/index.vue'], resolve)
const insuranceFail = resolve => require(['@/views/insuranceFail/index.vue'], resolve)
const buySuccess = resolve => require(['@/views/buySuccess/index.vue'], resolve)
const selectDealer = resolve => require(['@/views/selectDealer/index.vue'], resolve)
const selectAddress = resolve => require(['@/views/policy/address.vue'], resolve)
const access = resolve => require(['@/views/access/index.vue'], resolve)
const Agreement = resolve => require(['@/views/agreement/index.vue'], resolve)
const banmaActivity = resolve => require(['@/views/banmaActivity/index.vue'], resolve)

const prizes = resolve => require(['@/views/prizes/index.vue'], resolve)
const servicesList = resolve => require(['@/views/services/servicesList.vue'], resolve)
const servicesDetail = resolve => require(['@/views/services/servicesDetail.vue'], resolve)
const sureOrder = resolve => require(['@/views/services/sureOrder.vue'], resolve)
const map = resolve => require(['@/views/map/index.vue'], resolve)
const businessList = resolve => require(['@/views/businessList/index.vue'], resolve)
const giftDetail = resolve => require(['@/views/giftDetail/index.vue'], resolve)
const userAnalysis = resolve => require(['@/views/userAnalysis/index.vue'], resolve)

const myService = resolve => require(['@/views/myService/index.vue'], resolve)
const serviceRefund = resolve => require(['@/views/serviceRefund/index.vue'], resolve)
const succeedRefund = resolve => require(['@/views/succeedRefund/index.vue'], resolve)
const PolicySucceed = resolve => require(['@/views/policy/result.vue'], resolve)
const activityInclude = resolve => require(['@/views/activityInclude/index.vue'], resolve)
const userProtocol = resolve => require(['@/views/services/userProtocol.vue'], resolve)

const information = resolve => require(['@/views/prizes/information.vue'], resolve)
export default new Router({
  base: '/banma/',
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
      component: Home
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/reserve',
      name: 'reserve',
      component: Reserve
    },
    {
      path: '/insurance/list',
      name: 'insuranceList',
      component: InsuranceList
    },
    {
      path: '/insurance/detail',
      name: 'insuranceDetail',
      component: InsuranceDetail
    },
    {
      path: '/policy',
      name: 'policy',
      component: Policy
    },
    {
      path: '/policySucceed',
      name: 'policySucceed',
      component: PolicySucceed
    },
    {
      path: '/plan',
      name: 'Plan',
      component: Plan
    },
    {
      path: '/plan/edit',
      name: 'PlanEdit',
      component: PlanEdit
    },
    {
      path: '/quoted',
      name: 'Quoted',
      component: Quoted
    },
    {
      path: '/confirm',
      name: 'Confirm',
      component: Confirm
    },
    {
      path: '/process',
      name: 'Process',
      component: Process
    },
    {
      path: '/phonelist',
      name: 'phoneList',
      component: phoneList
    },
    {
      path: '/phonedetail',
      name: 'phoneDetails',
      component: phoneDetails
    },
    {
      path: '/labor',
      name: 'peopleInsurance',
      component: peopleInsurance
    },
    {
      path: '/fail',
      name: 'insuranceFail',
      component: insuranceFail
    },
    {
      path: '/success',
      name: 'buySuccess',
      component: buySuccess
    },
    {
      path: '/selectDealer',
      name: 'selectDealer',
      component: selectDealer
    },
    {
      path: '/selectAddress',
      name: 'selectAddress',
      component: selectAddress
    },
    {
      path: '/access',
      name: 'access',
      component: access
    },
    {
      path: '/agreement',
      name: 'agreement',
      component: Agreement
    },
    {
      path: '/activity',
      name: 'activity',
      component: banmaActivity
    },
    {
      path: '/prizes',
      name: 'prizes',
      component: prizes
    },
    {
      path: '/serviceslist',
      name: 'serviceslist',
      component: servicesList
    },
    {
      path: '/servicesdetail',
      name: 'servicesdetail',
      component: servicesDetail
    },
    {
      path: '/sureorder',
      name: 'sureorder',
      component: sureOrder
    },
    {
      path: '/myservice',
      name: 'myService',
      component: myService
    },
    {
      path: '/servicerefund',
      name: 'serviceRefund',
      component: serviceRefund
    },
    {
      path: '/succeedrefund',
      name: 'succeedRefund',
      component: succeedRefund
    },
    {
      path: '/giftdetail',
      name: 'giftdetail',
      component: giftDetail
    },
    {
      path: '/businesslist',
      name: 'businesslist',
      component: businessList
    },
    {
      path: '/activityinclude',
      name: 'activityinclude',
      component: activityInclude
    },
    {
      path: '/map',
      name: 'map',
      component: map
    },
    {
      path: '/useranalysis',
      name: 'useranalysis',
      component: userAnalysis
    },
    {
      path: '/userprotocol',
      name: 'userProtocol',
      component: userProtocol
    },
    {
      path: '/information',
      name: 'information',
      component: information
    }
  ]
})
