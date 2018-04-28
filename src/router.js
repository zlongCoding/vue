import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const login = resolve => require(['@/views/login/index.vue'], resolve)
const task = resolve => require(['@/views/home/task.vue'], resolve)
const teacherclass = resolve => require(['@/views/home/classAll.vue'], resolve)
const angel = resolve => require(['@/views/task/angelWork.vue'], resolve)
const musicians = resolve => require(['@/views/task/musiciansWork.vue'], resolve)
const classDetail = resolve => require(['@/views/classAll/index.vue'], resolve)
const correcting = resolve => require(['@/views/vedio/correcting.vue'], resolve)
const looking = resolve => require(['@/views/vedio/looking.vue'], resolve)

export default new Router({
  // base: '/teacher/',
  // mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/task'
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/task',
      name: 'task',
      component: task
    },
    {
      path: '/teacherclass',
      name: 'teacherclass',
      component: teacherclass
    },
    {
      path: '/classdetail',
      name: 'classDetail',
      component: classDetail
    },
    {
      path: '/angel',
      name: 'angel',
      component: angel
    },
    {
      path: '/musicians',
      name: 'musicians',
      component: musicians
    },
    {
      path: '/correcting',
      name: 'correcting',
      component: correcting
    },
    {
      path: '/looking',
      name: 'looking',
      component: looking
    }
  ]
})
