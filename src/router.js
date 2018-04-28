import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// const Home = resolve => require(['@/views/home/index.vue'], resolve)
const login = resolve => require(['@/views/login/index.vue'], resolve)
const personalCenter = resolve => require(['@/views/personalCenter/index.vue'], resolve)
const certification = resolve => require(['@/views/personalCenter/certification.vue'], resolve)
const myCourses = resolve => require(['@/views/personalCenter/myCourses.vue'], resolve)
const graduation = resolve => require(['@/views/personalCenter/graduation.vue'], resolve)
const haveProcess = resolve => require(['@/views/haveProcess/index.vue'], resolve)
const appointment = resolve => require(['@/views/appointment/index.vue'], resolve)
const unClass = resolve => require(['@/views/common/unregistered/class.vue'], resolve)
const piano = resolve => require(['@/views/common/piano/index.vue'], resolve)
const pianoPractice = resolve => require(['@/views/personalCenter/pianoPractice.vue'], resolve)
const complaint = resolve => require(['@/views/personalCenter/complaint.vue'], resolve)

export default new Router({
  // base: '/student/',
  // mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/appointment'
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/personalcenter',
      name: 'personalCenter',
      component: personalCenter
    },
    {
      path: '/certification',
      name: 'certification',
      component: certification
    },
    {
      path: '/mycourses',
      name: 'myCourses',
      component: myCourses
    },
    {
      path: '/graduation',
      name: 'graduation',
      component: graduation
    },
    {
      path: '/haveprocess',
      name: 'haveprocess',
      component: haveProcess
    },
    {
      path: '/appointment',
      name: 'appointment',
      component: appointment
    },
    {
      path: '/piano',
      name: 'piano',
      component: piano
    },
    {
      path: '/unclass',
      name: 'unClass',
      component: unClass
    },
    {
      path: '/pianopractice',
      name: 'pianoPractice',
      component: pianoPractice
    },
    {
      path: '/complaint',
      name: 'complaint',
      component: complaint
    }
  ]
})
